import mongoose from 'mongoose';

const materiaSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true, unique: true },
    descripcion: { type: String },
    creditos: { type: Number, required: true }
}, {
    timestamps: true
});

const Materia = mongoose.model('Materia', materiaSchema);
export default Materia;
