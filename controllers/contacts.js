const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { connectDB } = require('../db/connect');
const Contact = require('../models/contacts');

const createContact = async (req, res) => {
  try {
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    });

    const result = await contact.save();
    // eslint-disable-next-line no-underscore-dangle
    res.status(201).json({ id: result._id });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error occurred while creating a contact.' });
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const currContact = await Contact.findById(userId);

    // Update the existing contact with the new data
    currContact.firstName = req.body.firstName;
    currContact.lastName = req.body.lastName;
    currContact.email = req.body.email;
    currContact.favoriteColor = req.body.favoriteColor;
    currContact.birthday = req.body.birthday;

    // Save the updated contact
    const result = await currContact.save();
    console.log(result);
    res.status(204).send();
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error occurred while updating a contact.' });
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const result = await Contact.findByIdAndDelete(userId);
    console.log(result);
    res.status(204).send();
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error occurred while deleting a contact.' });
  }
};

const getAllData = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log('Data from MongoDB:', contacts);
    res.json(contacts);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  }
};

const getDataById = async (req, res) => {
  const userId = new ObjectId(req.params.id);

  try {
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
