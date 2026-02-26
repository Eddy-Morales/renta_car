import express from 'express';
import {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
} from '../controllers/clienteController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de clientes requieren autenticación
router.use(protectRoute);

router.route('/')
    .get(getClientes)
    .post(createCliente);

router.route('/:id')
    .get(getClienteById)
    .put(updateCliente)
    .delete(deleteCliente);

export default router;
