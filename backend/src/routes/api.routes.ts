import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import * as productController from '../controllers/product.controller';
import { getInsights } from '../controllers/insights.controller';
import { handleChat } from '../controllers/chat.controller';

const router = Router();

// Configure multer for local file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// MVP Routes
router.post('/upload', upload.single('image'), productController.uploadProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProduct);
router.post('/chat', handleChat);
router.get('/market-insights', getInsights);

export default router;
