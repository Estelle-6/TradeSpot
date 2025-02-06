// routes/productRoutes.js
import express from 'express';
// routes/productRoutes.js
import { auth } from '../middleware/auth.js';  // Note the .js extension
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, uploadMiddleware } from '../controllers/productController.js';

const router = express.Router();

router.post('/products', auth, uploadMiddleware, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id', auth, updateProduct);
router.delete('/products/:id', auth, deleteProduct);

export default router;