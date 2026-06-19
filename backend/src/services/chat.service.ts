import { Product } from '../models/Product';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const processChatQuery = async (query: string) => {
  // 1. Fetch Context: All completed products
  const products = await Product.find({ 'aiInsights.processingStatus': 'Completed' });

  // 2. Data Minimization: Condense to save tokens
  const condensedContext = products.map(p => ({
    id: p._id,
    brand: p.brandName,
    name: p.productName,
    category: p.category,
    ingredients: p.aiInsights?.heroIngredients || [],
    claims: p.aiInsights?.claims || [],
    positioning: p.aiInsights?.positioning || ''
  }));

  // 3. Groq LLM Prompt
  const systemPrompt = `You are a helpful Market Trend AI Assistant connected to a product database.
You will be provided with a JSON array of the current database state containing products, their ingredients, claims, and categories.
Your job is to answer the user's natural language query based ONLY on the provided context.

Context Data:
${JSON.stringify(condensedContext)}

You MUST respond strictly with a JSON object following this schema:
{
  "answer": "string (A conversational, helpful answer to the user's question, citing the data)",
  "relevantProductIds": ["string", "string"] (An array of the 'id' fields of the products that match or are most relevant to the query. Leave empty if none match.)
}`;

  // 4. Call Groq
  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.1,
  });

  const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}');
  const answerText = parsed.answer || "I'm sorry, I couldn't process your request.";
  const relevantIds = parsed.relevantProductIds || [];

  // 5. Hydration: Fetch the full product objects for the relevant IDs
  const relevantProducts = await Product.find({ _id: { $in: relevantIds } });

  return {
    answer: answerText,
    relevantProducts
  };
};
