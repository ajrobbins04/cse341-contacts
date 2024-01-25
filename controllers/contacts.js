const { ObjectId } = require('mongodb');
const { connectDB } = require('../db/connect');

const getAllDataFromDB = async (req, res, next) => {
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

const getDataFromDB = async (req, res, next) => {
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
module.exports = { getAllDataFromDB, getDataFromDB };
