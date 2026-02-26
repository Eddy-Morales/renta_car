import Cliente from '../models/Cliente.js';

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
    }
};

export const getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener cliente', error: error.message });
    }
};

export const createCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear cliente', error: error.message });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!clienteActualizado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(clienteActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar cliente', error: error.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
        if (!clienteEliminado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json({ mensaje: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar cliente', error: error.message });
    }
};
