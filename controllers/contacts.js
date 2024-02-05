const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { connectDB } = require('../db/connect');
const Contact = require('../models/contacts');

const createContact = async (req, res) => {
  try {
    // use Contact model to create a new contact
    const contact = new Contact({
      // retrieve all necessary data from request body
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    });

    // save new contact to the db
    const result = await contact.save();

    // return 201 status and the id of the new contact
    // eslint-disable-next-line no-underscore-dangle
    res.status(201).json({ id: result._id });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error occurred while creating a contact.' });
  }
};

const updateContact = async (req, res) => {
  // retrieve id from request parameters
  const userId = new ObjectId(req.params.id);
  try {
    // retrieve contact that will be updated by id
    const currContact = await Contact.findById(userId);

    if (!currContact) {
      // the contact with the given ID is not found
      res.status(404).json({ error: 'Contact not found.' });
    }

    // Update the existing contact with the new data
    currContact.firstName = req.body.firstName;
    currContact.lastName = req.body.lastName;
    currContact.email = req.body.email;
    currContact.favoriteColor = req.body.favoriteColor;
    currContact.birthday = req.body.birthday;

    // Save the updated contact
    const result = await currContact.save();
    console.log(result);
    // send 204 status when contact successfully updated
    res.status(204).send();
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error occurred while updating a contact.' });
  }
};

const deleteContact = async (req, res) => {
  // retrieve id from request parameters
  const userId = new ObjectId(req.params.id);
  try {
    // delete contact by the associated id
    const result = await Contact.findByIdAndDelete(userId);
    console.log(result);
    // send 200 status when contact successfully deleted
    res.status(200).send();
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error occurred while deleting a contact.' });
  }
};

const getAllData = async (req, res) => {
  try {
    // find all contacts in the db
    const contacts = await Contact.find();
    console.log('Data from MongoDB:', contacts);
    // respond with the list of contacts
    res.json(contacts);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  }
};

const getDataById = async (req, res) => {
  // retrieve id from request parameters
  const userId = new ObjectId(req.params.id);

  try {
    // find and retrieve a specific contact by id
    const contact = await Contact.findById(userId);
    console.log('Data from MongoDB:', contact);
    res.json(contact);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  }
};

// exports obj containing these methods
module.exports = {
  getAllData,
  getDataById,
  createContact,
  updateContact,
  deleteContact,
};
