import express from 'express';
import {
    getMaterias,
    getMateriaById,
    createMateria,
    updateMateria,
    deleteMateria
} from '../controllers/materiaController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de materias requieren autenticación
router.use(protectRoute);

router.route('/')
    .get(getMaterias)
    .post(createMateria);

router.route('/:id')
    .get(getMateriaById)
    .put(updateMateria)
    .delete(deleteMateria);

export default router;
