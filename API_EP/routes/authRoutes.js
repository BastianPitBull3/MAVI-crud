// routes/authRoutes.js
const express = require('express');
const { login } = require('../controllers/authController');
const createUser = require('../createUser');
const router = express.Router();

// Ruta para login
router.post('/login', login);

// Ruta para crear un nuevo usuario
router.post('/register', createUser);

module.exports = router;
