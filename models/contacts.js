const mongoose = require('mongoose');

// define shape of documents w/in contacts collection
const contactSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String,
});

// create Contact model (model name used by mongoose, not the db)
const Contact = mongoose.model('Contact', contactSchema);

// export Contact model as module
module.exports = Contact;
