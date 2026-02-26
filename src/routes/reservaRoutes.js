import express from 'express';
import {
    getReservas,
    getReservaById,
    createReserva,
    updateReserva,
    deleteReserva
} from '../controllers/reservaController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de reservas requieren autenticación
router.use(protectRoute);

router.route('/')
    .get(getReservas)
    .post(createReserva);

router.route('/:id')
    .get(getReservaById)
    .put(updateReserva)
    .delete(deleteReserva);

export default router;
