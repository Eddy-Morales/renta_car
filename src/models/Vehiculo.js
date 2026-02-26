import mongoose from 'mongoose';

const vehiculoSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true},
    anio_fabricacion: { type: Number, required: true },
    placa: { type: String, required: true, unique: true },
    color: { type: String },
    tipo_vehiculo: { type: String, required: true },
    kilometraje: { type: Number, required: true },
    descripcion: { type: String },
}, {
    timestamps: true
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
export default Vehiculo;
