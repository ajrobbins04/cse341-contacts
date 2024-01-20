// load environment variables from .env file
const dotenv = require('dotenv').config();

const { MongoClient } = require('mongodb');

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('MongoDB connected');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = connectDB;