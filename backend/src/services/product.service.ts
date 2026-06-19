import { Product } from '../models/Product';
import { analyzeProductImage } from './ai.service';

export const createPendingProduct = async (brandName: string, productName: string, imageUrl: string) => {
  const product = await Product.create({
    brandName,
    productName,
    imageUrl,
    aiInsights: { processingStatus: 'Pending' }
  });
  return product;
};

export const getAllProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const triggerProductAnalysis = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');
  
  await Product.findByIdAndUpdate(productId, { 'aiInsights.processingStatus': 'Processing' });
  
  // Start analysis asynchronously
  analyzeProductImage(productId, product.imageUrl).catch(console.error);
  
  return { message: 'Analysis started', productId };
};

export const deleteProductById = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};
