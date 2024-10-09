// src/app.js
import express from 'express';
import dotenv from 'dotenv'; // Change to import
import { connectToDatabase } from './src/config/dbConfig.js'; // Ensure this is correct and add .js extension

const app = express();
dotenv.config();

// Connect to the database
connectToDatabase();

// Start the server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});

// Define your API routes here
import bookingRoutes from "./src/routes/bookingRoutes.js"; // Add .js extension
import paymentRoutes from "./src/routes/paymentRoutes.js"; // Add .js extension
import reviewRoutes from "./src/routes/reviewRoutes.js"; // Add .js extension
import userRoutes from "./src/routes/userRoutes.js"; // Add .js extension
import vanRoutes from "./src/routes/vanRoutes.js"; // Add .js extension

// Use the routes
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/van", vanRoutes);
app.use("/api/booking", bookingRoutes);

export default app; // Change to export default