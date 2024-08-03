// models/user.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  mobile: {
    type: String,
    required: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
