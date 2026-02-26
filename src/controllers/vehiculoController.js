import Materia from '../models/Vehiculo.js';

export const getMaterias = async (req, res) => {
    try {
        const materias = await Materia.find();
        res.json(materias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener materias', error: error.message });
    }
};

export const getMateriaById = async (req, res) => {
    try {
        const materia = await Materia.findById(req.params.id);
        if (!materia) return res.status(404).json({ mensaje: 'Materia no encontrada' });
        res.json(materia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener materia', error: error.message });
    }
};

export const createMateria = async (req, res) => {
    try {
        const nuevaMateria = new Materia(req.body);
        await nuevaMateria.save();
        res.status(201).json(nuevaMateria);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear materia', error: error.message });
    }
};

export const updateMateria = async (req, res) => {
    try {
        const materiaActualizada = await Materia.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!materiaActualizada) return res.status(404).json({ mensaje: 'Materia no encontrada' });
        res.json(materiaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar materia', error: error.message });
    }
};

export const deleteMateria = async (req, res) => {
    try {
        const materiaEliminada = await Materia.findByIdAndDelete(req.params.id);
        if (!materiaEliminada) return res.status(404).json({ mensaje: 'Materia no encontrada' });
        res.json({ mensaje: 'Materia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar materia', error: error.message });
    }
};
