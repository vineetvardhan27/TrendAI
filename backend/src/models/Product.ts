import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  productName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  revenue: { type: Number, default: 0 },
  category: { 
    type: String, 
    enum: ['Immunity', 'Energy', 'Weight Management', 'Sleep', 'Digestive Health', 'Beauty', 'Cognitive Health', 'Uncategorized'],
    default: 'Uncategorized'
  },
  aiInsights: {
    rawExtractedText: { type: String },
    claims: [{ type: String }],
    heroIngredients: [{ type: String }],
    positioning: { type: String },
    confidenceScore: { type: Number },
    classificationReasoning: { type: String },
    classificationConfidence: { type: String },
    processingStatus: { 
      type: String, 
      enum: ['Pending', 'Processing', 'Completed', 'Failed'], 
      default: 'Pending' 
    }
  }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
