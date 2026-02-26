import mongoose from 'mongoose';

const matriculaSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    descripcion: { type: String },
    creditos: { type: Number, required: true },
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    },
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante',
        required: true
    }
}, {
    timestamps: true
});

const Matricula = mongoose.model('Matricula', matriculaSchema);
export default Matricula;
