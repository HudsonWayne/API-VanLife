const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const Booking = require("../models/bookingModel");
const Van = require("../models/vanModel");
const User = require("../models/userModel");

// Mocking the models
jest.mock("../models/bookingModel", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  mockImplementation: jest.fn(),
}));

jest.mock("../models/vanModel", () => ({
  findById: jest.fn(),
}));

jest.mock("../models/userModel", () => ({
  findById: jest.fn(),
}));

describe("Booking Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("createBooking", () => {
    it("should create a booking successfully", async () => {
      req.body = {
        userId: "userId123",
        vanId: "vanId123",
        startDate: "2024-10-01",
        endDate: "2024-10-05",
      };

      User.findById.mockResolvedValue({}); 
      Van.findById.mockResolvedValue({}); 
      Booking.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({}),
      }));

      await createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Booking created successfully",
        booking: expect.any(Object),
      });
    });

    it("should return 404 if van is not found", async () => {
      req.body = { userId: "userId123", vanId: "vanId123" };
      Van.findById.mockResolvedValue(null); 

      await createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Van not found" });
    });

    it("should return 404 if user is not found", async () => {
      req.body = { userId: "userId123", vanId: "vanId123" };
      Van.findById.mockResolvedValue({}); 
      User.findById.mockResolvedValue(null); 

      await createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe("getAllBookings", () => {
    it("should return all bookings", async () => {
      Booking.find.mockResolvedValue([{}]); 
      await getAllBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ bookings: expect.any(Array) });
    });
  });

  describe("getBookingById", () => {
    it("should return a booking by ID", async () => {
      req.params.id = "bookingId123";
      Booking.findById.mockResolvedValue({}); 
      await getBookingById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ booking: expect.any(Object) });
    });

    it("should return 404 if booking not found", async () => {
      req.params.id = "bookingId123";
      Booking.findById.mockResolvedValue(null); 
      await getBookingById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Booking not found" });
    });
  });

  describe("updateBooking", () => {
    it("should update a booking", async () => {
      req.params.id = "bookingId123";
      req.body = { startDate: "2024-10-01", endDate: "2024-10-05" };
      Booking.findByIdAndUpdate.mockResolvedValue({}); // Mock booking found
      await updateBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Booking updated successfully",
        booking: expect.any(Object),
      });
    });

    it("should return 404 if booking not found", async () => {
      req.params.id = "bookingId123";
      Booking.findByIdAndUpdate.mockResolvedValue(null); // No booking found
      await updateBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Booking not found" });
    });
  });

  describe("deleteBooking", () => {
    it("should delete a booking", async () => {
      req.params.id = "bookingId123";
      Booking.findByIdAndDelete.mockResolvedValue({}); // Mock booking found
      await deleteBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Booking deleted successfully",
      });
    });

    it("should return 404 if booking not found", async () => {
      req.params.id = "bookingId123";
      Booking.findByIdAndDelete.mockResolvedValue(null); // No booking found
      await deleteBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Booking not found" });
    });
  });
});

