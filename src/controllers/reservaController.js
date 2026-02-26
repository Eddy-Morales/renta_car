import Reserva from '../models/Reserva.js';

export const getReservas = async (req, res) => {
    try {
        // Poblamos para devolver los datos relevantes de Materia y Estudiante
        const reservas = await Reserva.find()
            .populate('materia', 'nombre codigo creditos')
            .populate('estudiante', 'nombre apellido cedula');
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reservas', error: error.message });
    }
};

export const getReservaById = async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id)
            .populate('materia', 'nombre codigo creditos')
            .populate('estudiante', 'nombre apellido cedula');
        if (!reserva) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        res.json(reserva);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener reserva', error: error.message });
    }
};

export const createReserva = async (req, res) => {
    try {
        const nuevaReserva = new Reserva(req.body);
        await nuevaReserva.save();
        res.status(201).json(nuevaReserva);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear reserva', error: error.message });
    }
};

export const updateReserva = async (req, res) => {
    try {
        const reservaActualizada = await Reserva.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate('materia', 'nombre codigo creditos')
            .populate('estudiante', 'nombre apellido cedula');

        if (!reservaActualizada) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        res.json(reservaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar reserva', error: error.message });
    }
};

export const deleteReserva = async (req, res) => {
    try {
        const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
        if (!reservaEliminada) return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        res.json({ mensaje: 'Reserva eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar reserva', error: error.message });
    }
};
