import express from 'express';
import {
    getEstudiantes,
    getEstudianteById,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante
} from '../controllers/estudianteController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de estudiantes requieren autenticación
router.use(protectRoute);

router.route('/')
    .get(getEstudiantes)
    .post(createEstudiante);

router.route('/:id')
    .get(getEstudianteById)
    .put(updateEstudiante)
    .delete(deleteEstudiante);

export default router;
