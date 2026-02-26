import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';

// Importar rutas
import authRoutes from './src/routes/authRoutes.js';
import materiaRoutes from './src/routes/materiaRoutes.js';
import estudianteRoutes from './src/routes/estudianteRoutes.js';
import matriculaRoutes from './src/routes/matriculaRoutes.js';

// Configuración inicial
dotenv.config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/matriculas', matriculaRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('API de Sistema de Matrículas funcionando');
});

// Arrancar el Servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
