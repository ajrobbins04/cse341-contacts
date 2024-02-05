const express = require('express');
const contactRoutes = require('./contacts');
const indexController = require('../controllers/index');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.get('/', indexController.promptContactsRoute);
router.use('/contacts', contactRoutes);
router.use('/', swaggerRoutes); // mount to be included in apiDocs

module.exports = router;
