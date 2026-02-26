import express from 'express';
import {
    getMatriculas,
    getMatriculaById,
    createMatricula,
    updateMatricula,
    deleteMatricula
} from '../controllers/matriculaController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de matrículas requieren autenticación
router.use(protectRoute);

router.route('/')
    .get(getMatriculas)
    .post(createMatricula);

router.route('/:id')
    .get(getMatriculaById)
    .put(updateMatricula)
    .delete(deleteMatricula);

export default router;
