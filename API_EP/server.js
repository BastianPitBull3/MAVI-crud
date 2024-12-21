// Importación de dependencias
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { sequelize, authenticateDatabase } = require('./config/db');
const User = require('./models/User');
const clientRoutes = require('./routes/clients');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

// Creación el servidor
const app = express();

// Función para crear un usuario inicial
const createInitialUser = async () => {
  try {
    const firstName = "Diego";
    const lastName = "Valle";
    const email = 'admin@example.com';
    const password = 'password123';

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('El usuario inicial ya existe.');
      return;
    }

    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log(`Usuario inicial creado: ${email}`);
  } catch (error) {
    console.error('Error creando el usuario inicial:', error);
  }
};

// Configuración del servidor
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080', // El frontend está en este puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/api/clients', clientRoutes);
app.use('/api', authRoutes);

// Inicializar el servidor y la base de datos
const startServer = async () => {
  try {
    await authenticateDatabase(); // Verificar conexión a la base de datos
    await sequelize.sync(); // Sincronizar las tablas
    await createInitialUser(); // Crear el usuario inicial si no existe

    // Iniciar el servidor
    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();