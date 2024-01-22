import express from 'express';
import auth from '../middleware/auth.mjs';
import AuthController from '../controllers/AuthController.mjs';

const router = express.Router();

router.post('/register', AuthController.register)
router.post('/login', AuthController.login);

router.get('/user', auth, AuthController.getAuthUser);

export default router;