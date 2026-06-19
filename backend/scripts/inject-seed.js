const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, '../seed-data.json'), 'utf8'));

const productSchema = new mongoose.Schema({
  brandName: { type: String, required: true },
  productName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  revenue: { type: Number, default: 0 },
  category: { type: String },
  aiInsights: {
    rawExtractedText: { type: String },
    claims: [{ type: String }],
    heroIngredients: [{ type: String }],
    positioning: { type: String },
    confidenceScore: { type: Number },
    classificationReasoning: { type: String },
    classificationConfidence: { type: String },
    processingStatus: { type: String, default: 'Pending' }
  }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

async function inject() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-trend-assistant';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Wipe existing data to ensure a clean demo state
    await Product.deleteMany({});
    console.log('Cleared existing products');

    const formattedData = seedData.map(item => ({
      brandName: item.brand,
      productName: item.productName,
      imageUrl: '/uploads/demo-product-placeholder.jpg', // dummy image for seed data
      revenue: item.revenue,
      category: item.category,
      aiInsights: {
        rawExtractedText: 'Seeded from market data',
        claims: item.claims,
        heroIngredients: item.ingredients,
        positioning: 'Leading market product',
        confidenceScore: 99,
        classificationReasoning: 'Seeded ground truth',
        classificationConfidence: 'High',
        processingStatus: 'Completed' // Mark as completed so it shows in dashboard
      }
    }));

    await Product.insertMany(formattedData);
    console.log(`Successfully injected ${formattedData.length} records!`);
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Injection failed', error);
    process.exit(1);
  }
}

inject();
