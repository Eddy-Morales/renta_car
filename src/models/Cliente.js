import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    fecha_nacimiento: { type: Date, required: true },
    ciudad: { type: String },
    direccion: { type: String },
    telefono: { type: String },
    email: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

const Cliente = mongoose.model('Cliente', clienteSchema);
export default Cliente;
