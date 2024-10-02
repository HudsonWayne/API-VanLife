const express = require("express");


const getAllBookings =
  require("../../src/controllers/bookingController").getAllBookings;
const getBookingById =
  require("../../src/controllers/bookingController").getBookingById;
const createBooking =
  require("../../src/controllers/bookingController").createBooking;
const updateBooking =
  require("../../src/controllers/bookingController").updateBooking;
const deleteBooking =
  require("../../src/controllers/bookingController").deleteBooking;

const router = express.Router();


router.get("/bookings", getAllBookings);
router.get("/bookings/:id", getBookingById);
router.post("/bookings", createBooking);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);

module.exports = router;
