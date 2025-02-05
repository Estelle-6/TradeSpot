// routes/productRoutes.js
import express from 'express';
// routes/productRoutes.js
import { auth } from '../middleware/auth.js';  // Note the .js extension
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', auth, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

export default router;