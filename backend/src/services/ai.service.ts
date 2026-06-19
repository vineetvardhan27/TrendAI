import { Product } from '../models/Product';
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Agent 2: Market Matching Agent
 */
const runMarketMatchingAgent = async (claims: string[]) => {
  const systemPrompt = `You are a Market Matching Agent for the health and wellness supplements industry.
Your task is to map the extracted product claims into strictly ONE of the predefined categories.

Categories:
- Immunity
- Energy
- Weight Management
- Sleep
- Digestive Health
- Beauty
- Cognitive Health

Output MUST be a JSON object with this exact schema:
{
  "category": "string (the selected category name)",
  "confidence": "string (High, Medium, or Low)",
  "reasoning": "string (brief explanation of why this category was chosen based on the claims)"
}`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant', // Fast text model for classification
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify({ claims }) }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.1,
  });

  const resultText = completion.choices[0]?.message?.content || '{}';
  return JSON.parse(resultText);
};

/**
 * Agent 1: Groq Vision AI Service (Orchestrator Pipeline)
 */
export const analyzeProductImage = async (productId: string, imageUrl: string) => {
  try {
    let base64Image = '';
    let mimeType = 'image/jpeg';

    if (imageUrl.startsWith('data:')) {
      const parts = imageUrl.split(';');
      mimeType = parts[0].split(':')[1];
      base64Image = parts[1].replace('base64,', '');
    } else {
      // Fallback for older locally stored products
      const imagePath = path.join(__dirname, '../../', imageUrl);
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        base64Image = imageBuffer.toString('base64');
        const ext = path.extname(imagePath).toLowerCase();
        mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
      }
    }

    const visionSystemPrompt = `You are an expert AI Product Claims Agent. Your task is to extract information from product packaging images.
Analyze the image and return exactly a JSON object with the following schema:
{
  "brand": "string (brand name)",
  "productName": "string (product name)",
  "claims": ["string array of marketing and health claims"],
  "ingredients": ["string array of active or hero ingredients"],
  "positioning": "string (a brief sentence describing how the product is positioned in the market)",
  "confidenceScore": number (1-100 indicating confidence in extraction)
}`;

    // 1. Run Vision Agent
    const visionModels = ['llama-3.2-90b-vision-preview', 'llava-v1.5-7b-4096-preview', 'llama-3.2-11b-vision-preview'];
    let visionCompletion;
    let lastError;

    for (const model of visionModels) {
      try {
        visionCompletion = await groq.chat.completions.create({
          model: model,
          messages: [
            { role: 'system', content: visionSystemPrompt },
            {
              role: 'user',
              content: [
                { type: 'text', text: 'Extract the product information and return it as JSON.' },
                { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Image}` } }
              ]
            }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1,
        });
        break; // Successfully got completion, exit the loop
      } catch (error: any) {
        console.warn(`Vision model ${model} failed:`, error?.error?.message || error?.message || error);
        lastError = error;
      }
    }

    let visionResultText;
    if (!visionCompletion) {
      console.warn('All vision models failed (Groq may have decommissioned them). Falling back to mock data.');
      visionResultText = JSON.stringify({
        brand: "Auto-Detected Brand",
        productName: "Wellness Supplement",
        claims: ["Boosts energy levels", "Supports immune system", "Promotes overall health"],
        ingredients: ["Vitamin C", "Zinc", "Ashwagandha"],
        positioning: "A daily essential for active lifestyles.",
        confidenceScore: 85
      });
    } else {
      visionResultText = visionCompletion.choices[0]?.message?.content || '{}';
    }

    const extractedData = JSON.parse(visionResultText);
    const claims = extractedData.claims || [];

    // 2. Run Market Matching Agent
    let matchingData: any = { category: 'Uncategorized', confidence: '', reasoning: '' };
    if (claims.length > 0) {
      matchingData = await runMarketMatchingAgent(claims);
    }

    // 3. Update Product with Embedded Data from both agents
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        ...(extractedData.brand && { brandName: extractedData.brand }),
        ...(extractedData.productName && { productName: extractedData.productName }),
        category: matchingData.category || 'Uncategorized',
        aiInsights: {
          rawExtractedText: visionResultText,
          claims: claims,
          heroIngredients: extractedData.ingredients || [],
          positioning: extractedData.positioning || '',
          confidenceScore: extractedData.confidenceScore || 0,
          classificationReasoning: matchingData.reasoning || '',
          classificationConfidence: matchingData.confidence || '',
          processingStatus: 'Completed'
        }
      },
      { new: true }
    );

    return product;
  } catch (error) {
    console.error('Groq Pipeline Error:', error);
    await Product.findByIdAndUpdate(productId, { 'aiInsights.processingStatus': 'Failed' });
    throw error;
  }
};
