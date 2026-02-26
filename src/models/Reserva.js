import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    descripcion: { type: String },
    
    vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehiculo',
        required: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    }
}, {
    timestamps: true
});

const Reserva = mongoose.model('Reserva', reservaSchema);
export default Reserva;
