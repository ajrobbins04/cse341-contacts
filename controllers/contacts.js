const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { connectDB } = require('../db/connect');
const Contact = require('../models/contacts');

const createContact = async (req, res) => {
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });
  const result = await contact.save();
  res.send(result);
};

const createContact1 = async (req, res) => {
  const contact = new Contact({
    firstName: 'Mary',
    lastName: 'Kirkendall',
    email: 'mk@gmail.com',
    favoriteColor: 'blue',
    birthday: '1995-09-27',
  });
  const result = await contact.save();
  res.send(result);
};

const getAllDataFromDB = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log('Data from MongoDB:', contacts);
    res.json(contacts);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  }
};

const getAllDataFromDB2 = async (req, res) => {
  const client = await connectDB();

  try {
    const db = client.db('02-personal');
    const collection = db.collection('contacts');
    const result = await collection.find().toArray();
    console.log('Data from MongoDB:', result);
    res.send(result);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  } finally {
    // Close the connection when done
    await client.close();
  }
};

const getDataFromDB = async (req, res) => {
  const client = await connectDB();
  const userId = new ObjectId(req.params.id);

  try {
    const db = client.db('02-personal');
    const collection = db.collection('contacts');
    const result = await collection.find({ _id: userId }).toArray();

    console.log('Data from MongoDB:', result);
    res.send(result);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error.message);
  } finally {
    // Close the connection when done
    await client.close();
  }
};

// exports obj containing these methods
module.exports = { getAllDataFromDB, getDataFromDB, createContact1 };
