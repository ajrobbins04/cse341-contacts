const express = require('express');
const contactRoutes = require('./contacts');
const indexController = require('../controllers/index');

const router = express.Router();

router.get('/', indexController.promptContactsRoute);
router.use('/contacts', contactRoutes);

module.exports = router;
