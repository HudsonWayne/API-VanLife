
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  rentalId: { type: String, required: true, ref: "Booking" },
  paymentMethod: { type: String, required: true },
  currency: { type: String, required: true },
  paymentType: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentAmount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  paymentNotes: String,
});

module.exports = mongoose.model("Payment", paymentSchema);