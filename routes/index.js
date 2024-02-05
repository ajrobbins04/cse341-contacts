const express = require('express');
const contactRoutes = require('./contacts');
const indexController = require('../controllers/index');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.use('/', swaggerRoutes); // mount to be included in apiDocs
router.get('/', indexController.promptContactsRoute);
router.use('/contacts', contactRoutes);

module.exports = router;
