const express = require('express');
const usersRoutes = require('./routes/usersRoutes'); 
const profileRoutes = require('./routes/profileRoutes'); 
const imageProfileRoutes = require('./routes/imagesPerfilRoutes');
const levelRoutes = require('./routes/levelRoutes');
const path = require('path');
const connectDB = require('./database/mongodb'); 
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Conectar a MongoDB
connectDB();

// Ruta base para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando correctamente!');
});

// Usar las rutas de usuarios bajo el path /users
app.use('/users', usersRoutes);
app.use('/profile',profileRoutes);
app.use('/images/profiles', imageProfileRoutes);
app.use('/levels', levelRoutes);


// Puerto configurado en .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
 