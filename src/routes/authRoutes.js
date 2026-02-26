import express from 'express';
import { login, registrarUsuario } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/registrar', registrarUsuario);

export default router;
