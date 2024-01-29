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
    res.status(500).json({ error: 'Internal Server Error' });
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
module.exports = { getAllData, getDataById, createContact };
