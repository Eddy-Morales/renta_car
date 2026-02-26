import Vehiculo from '../models/Vehiculo.js';

export const getVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find();
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener vehículos', error: error.message });
    }
};

export const getVehiculoById = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);
        if (!vehiculo) return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        res.json(vehiculo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener vehículo', error: error.message });
    }
};

export const createVehiculo = async (req, res) => {
    try {
        const nuevoVehiculo = new Vehiculo(req.body);
        await nuevoVehiculo.save();
        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear vehículo', error: error.message });
    }
};

export const updateVehiculo = async (req, res) => {
    try {
        const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!vehiculoActualizado) return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        res.json(vehiculoActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar vehículo', error: error.message });
    }
};

export const deleteVehiculo = async (req, res) => {
    try {
        const vehiculoEliminado = await Vehiculo.findByIdAndDelete(req.params.id);
        if (!vehiculoEliminado) return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        res.json({ mensaje: 'Vehículo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar vehículo', error: error.message });
    }
};
