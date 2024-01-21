const { connectDB } = require('../db/connect');

const getDataFromDB = async () => {
  const client = await connectDB();

  try {
    const db = client.db('02-personal');
    const collection = db.collection('contacts');
    const result = await collection.find().toArray();
    console.log('Data from MongoDB:', result);

  } catch {
    console.error('Error retrieving data from MongoDB:', error.message);
  } finally {
    // Close the connection when done
    await client.close();
  }
};

module.exports = { getDataFromDB };