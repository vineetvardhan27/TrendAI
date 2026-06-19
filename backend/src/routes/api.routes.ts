import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import * as productController from '../controllers/product.controller';
import { getInsights } from '../controllers/insights.controller';
import { handleChat } from '../controllers/chat.controller';

const router = Router();

// Configure multer for memory storage (required for Vercel Serverless)
const storage = multer.memoryStorage();

const upload = multer({ storage });

// MVP Routes
router.post('/upload', upload.single('image'), productController.uploadProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProduct);
router.post('/chat', handleChat);
router.get('/market-insights', getInsights);

export default router;
