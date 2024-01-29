// import express module from node_modules
const express = require('express');

// will contain the actions to be executed for defined routes
const contactsController = require('../controllers/contacts');

const router = express.Router();

router.get('/', contactsController.getAllData);
router.post('/', contactsController.createContact);

router.get('/:id', contactsController.getDataById);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
