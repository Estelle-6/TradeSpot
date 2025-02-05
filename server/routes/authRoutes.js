// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyToken);

export default router;