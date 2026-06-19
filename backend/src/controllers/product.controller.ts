import { Request, Response } from 'express';
import * as productService from '../services/product.service';
import { Product } from '../models/Product';

export const uploadProduct = async (req: Request, res: Response) => {
  try {
    const { brandName, productName } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    
    const product = await productService.createPendingProduct(
      brandName || 'Unknown Brand', 
      productName || 'Unknown Product', 
      imageUrl
    );
    
    // Automatically trigger analysis for MVP convenience
    await productService.triggerProductAnalysis(product._id as unknown as string);
    
    res.status(202).json({ 
      message: 'Product uploaded and analysis started', 
      productId: product._id 
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id as string);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.deleteProductById(id as string);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
