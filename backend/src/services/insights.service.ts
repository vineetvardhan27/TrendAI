import { Product } from '../models/Product';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getMarketInsights = async () => {
  const products = await Product.find({ 'aiInsights.processingStatus': 'Completed' });

  const total = products.length;
  if (total === 0) {
    return { 
      categoryDistribution: [], 
      mostCommonIngredients: [], 
      fastestGrowingClaims: [], 
      emergingTrends: ["Not enough data to analyze trends."] 
    };
  }

  const catCount: Record<string, number> = {};
  const ingCount: Record<string, number> = {};
  const claimCount: Record<string, number> = {};

  products.forEach(p => {
    // Categories
    catCount[p.category] = (catCount[p.category] || 0) + 1;
    
    // Ingredients
    p.aiInsights?.heroIngredients?.forEach(ing => {
      // Normalize ingredient names slightly (trim, lowercase for matching, but keep original for display)
      const key = ing.trim().toLowerCase();
      // Use original casing if it doesn't exist, else increment
      ingCount[ing.trim()] = (ingCount[ing.trim()] || 0) + 1;
    });

    // Claims
    p.aiInsights?.claims?.forEach(claim => {
      claimCount[claim.trim()] = (claimCount[claim.trim()] || 0) + 1;
    });
  });

  const categoryDistribution = Object.keys(catCount).map(c => ({
    category: c,
    count: catCount[c],
    percentage: Math.round((catCount[c] / total) * 100)
  })).sort((a, b) => b.count - a.count);

  const mostCommonIngredients = Object.keys(ingCount).map(i => ({
    ingredient: i,
    count: ingCount[i]
  })).sort((a, b) => b.count - a.count).slice(0, 10);

  const fastestGrowingClaims = Object.keys(claimCount).map(c => ({
    claim: c,
    frequency: claimCount[c]
  })).sort((a, b) => b.frequency - a.frequency).slice(0, 10);

  // Emerging Trends generation using Groq
  let emergingTrends: string[] = [];
  try {
    const prompt = `You are an expert Market Trend Analyst in the consumer health, wellness, and supplements industry.
Based on the following aggregated data from recently ingested products, identify exactly 3 emerging trends. 
Be specific, insightful, and concise.

Data:
Top Ingredients: ${JSON.stringify(mostCommonIngredients)}
Top Claims: ${JSON.stringify(fastestGrowingClaims)}
Top Categories: ${JSON.stringify(categoryDistribution)}

Return strictly a JSON object with this exact schema:
{
  "emergingTrends": ["string (trend 1)", "string (trend 2)", "string (trend 3)"]
}`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'system', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    });

    const parsed = JSON.parse(completion.choices[0]?.message?.content || '{}');
    emergingTrends = parsed.emergingTrends || ["Trending data unavailable."];
  } catch (err) {
    console.error('Failed to generate emerging trends with AI:', err);
    emergingTrends = ["AI trend generation is currently unavailable."];
  }

  return {
    categoryDistribution,
    mostCommonIngredients,
    fastestGrowingClaims,
    emergingTrends
  };
};
