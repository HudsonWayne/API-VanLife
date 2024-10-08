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
import bookingRoutes from "./src/routes/bookingRoutes";
import paymentRoutes from "./src/routes/paymentRoutes";
import reviewRoutes from "./src/routes/reviewRoutes";
import userRoutes from "./src/routes/userRoutes";
import vanRoutes from "./src/routes/vanRoutes";

app.use("./src/routes/userRoutes.js", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/van", vanRoutes);
app.use("/api/booking", bookingRoutes);

module.exports = app;