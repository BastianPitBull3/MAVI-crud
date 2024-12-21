const express = require('express');
const Client = require('../models/Client');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Crear un cliente
router.post('/', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, motherLastName, address, email } = req.body;
    const client = await Client.create({ firstName, lastName, motherLastName, address, email });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error creando el cliente', error });
  }
});

// Leer todos los clientes
router.get('/', verifyToken, async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo los clientes', error });
  }
});

// Leer un cliente por ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo el cliente', error });
  }
});

// Actualizar un cliente
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, motherLastName, address, email } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    await client.update({ firstName, lastName, motherLastName, address, email });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando el cliente', error });
  }
});

// Eliminar un cliente
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    await client.destroy();
    res.status(200).json({ message: 'Cliente eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando el cliente', error });
  }
});

module.exports = router;
