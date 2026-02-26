import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar que el usuario exista
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            mensaje: `Bienvenido - ${usuario.nombre}`,
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
};

// Crear usuario (para poder hacer login inicial)
export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;

        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) return res.status(400).json({ mensaje: 'El email ya está registrado.' });

        // Hashear password
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            email,
            password: passwordHasheada
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
};
