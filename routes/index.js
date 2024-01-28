const express = require('express');
const contactRoutes = require('./contacts');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('GET request to homepage');
});

router.use('/contacts', contactRoutes);
