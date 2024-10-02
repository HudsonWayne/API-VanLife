// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./src/config/dbConfig'); // Ensure this is correct // Correctly importing db module

const app = express();
dotenv.config();

// Connect to the database
connectToDatabase();

// Start the server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});

// Define your API routes here
// ...

module.exports = app;