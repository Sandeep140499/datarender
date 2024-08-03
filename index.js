const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;


const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  
    // Create a new user instance
    const newUser = new User({
      name: 'Alice',
      age: 28,
      mobile: '1234567890'
    });
  
    // Save the user to the database
    newUser.save()
      .then((savedUser) => {
        console.log('User saved:', savedUser);
        mongoose.connection.close(); // Close the connection after saving
      })
      .catch((err) => {
        console.error('Error saving user:', err);
      });
  })
  .catch((err) => {
    console.error('Connection error', err);
  });



// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for the homepage
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example of a route with a parameter
app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.send(`User ID: ${userId}`);
});

// POST request example
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({
    message: 'Data received',
    data
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
