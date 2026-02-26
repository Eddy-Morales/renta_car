import Matricula from '../models/Reserva.js';

export const getMatriculas = async (req, res) => {
    try {
        // Poblamos para devolver los datos relevantes de Materia y Estudiante
        const matriculas = await Matricula.find()
            .populate('materia', 'nombre codigo creditos')
            .populate('estudiante', 'nombre apellido cedula');
        res.json(matriculas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener matrículas', error: error.message });
    }
};

export const getMatriculaById = async (req, res) => {
    try {
        const matricula = await Matricula.findById(req.params.id)
            .populate('materia', 'nombre codigo creditos')
            .populate('estudiante', 'nombre apellido cedula');
        if (!matricula) return res.status(404).json({ mensaje: 'Matrícula no encontrada' });
        res.json(matricula);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener matrícula', error: error.message });
    }
};

export const createMatricula = async (req, res) => {
    try {
        const nuevaMatricula = new Matricula(req.body);
        await nuevaMatricula.save();
        res.status(201).json(nuevaMatricula);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear matrícula', error: error.message });
    }
};

export const updateMatricula = async (req, res) => {
    try {
        const matriculaActualizada = await Matricula.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
            .populate('materia', 'nombre codigo creditos')
            .populate('estudiante', 'nombre apellido cedula');

        if (!matriculaActualizada) return res.status(404).json({ mensaje: 'Matrícula no encontrada' });
        res.json(matriculaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar matrícula', error: error.message });
    }
};

export const deleteMatricula = async (req, res) => {
    try {
        const matriculaEliminada = await Matricula.findByIdAndDelete(req.params.id);
        if (!matriculaEliminada) return res.status(404).json({ mensaje: 'Matrícula no encontrada' });
        res.json({ mensaje: 'Matrícula eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar matrícula', error: error.message });
    }
};
