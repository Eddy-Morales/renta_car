import express from 'express';
import {
    getVehiculos,
    getVehiculoById,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
} from '../controllers/vehiculoController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de vehículos requieren autenticación
router.use(protectRoute);

router.route('/')
    .get(getVehiculos)
    .post(createVehiculo);

router.route('/:id')
    .get(getVehiculoById)
    .put(updateVehiculo)
    .delete(deleteVehiculo);

export default router;
