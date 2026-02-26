import Estudiante from '../models/Cliente.js';

export const getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estudiantes', error: error.message });
    }
};

export const getEstudianteById = async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id);
        if (!estudiante) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estudiante', error: error.message });
    }
};

export const createEstudiante = async (req, res) => {
    try {
        const nuevoEstudiante = new Estudiante(req.body);
        await nuevoEstudiante.save();
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear estudiante', error: error.message });
    }
};

export const updateEstudiante = async (req, res) => {
    try {
        const estudianteActualizado = await Estudiante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!estudianteActualizado) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.json(estudianteActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar estudiante', error: error.message });
    }
};

export const deleteEstudiante = async (req, res) => {
    try {
        const estudianteEliminado = await Estudiante.findByIdAndDelete(req.params.id);
        if (!estudianteEliminado) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.json({ mensaje: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar estudiante', error: error.message });
    }
};
