export interface AIInsights {
  rawExtractedText: string;
  claims: string[];
  heroIngredients: string[];
  positioning: string;
  confidenceScore: number;
  classificationReasoning: string;
  classificationConfidence: string;
  processingStatus: 'Pending' | 'Processing' | 'Completed' | 'Failed';
}

export interface Product {
  _id: string;
  brandName: string;
  productName: string;
  imageUrl: string;
  revenue?: number;
  category: string;
  aiInsights?: AIInsights;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatResponse {
  answer: string;
  relevantProducts: Product[];
}
