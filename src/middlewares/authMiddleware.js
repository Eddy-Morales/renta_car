import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Agregar info de usuario al request
            req.usuario = decoded;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ mensaje: 'No autorizado, token falló' });
        }
    }

    if (!token) {
        res.status(401).json({ mensaje: 'No autorizado, no hay token' });
    }
};
