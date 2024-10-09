const {
  createVan,
  getAllVans,
  getVanById,
  updateVan,
  deleteVan,
} = require("../controllers/vanController"); 
const Van = require("../models/vanModel");

// Mock the Van model
jest.mock("../models/vanModel");

describe("Van Controller", () => {
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

  describe("createVan", () => {
    it("should create a new van successfully", async () => {
      req.body = {
        ownerId: "ownerId123",
        model: "Ford Transit",
        year: 2020,
        capacity: 12,
        description: "Spacious van",
        pricePerDay: 100,
        images: ["image1.jpg", "image2.jpg"],
      };

      Van.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({
          _id: "vanId123",
          ...req.body,
        }),
      }));

      await createVan(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Van created successfully",
        van: expect.any(Object),
      });
    });

    it("should handle internal server errors", async () => {
      Van.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Internal error")),
      }));

      await createVan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getAllVans", () => {
    it("should return all vans", async () => {
      Van.find.mockResolvedValue([{ _id: "vanId123" }]);

      await getAllVans(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ vans: expect.any(Array) });
    });

    it("should handle internal server errors", async () => {
      Van.find.mockRejectedValue(new Error("Internal error"));

      await getAllVans(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getVanById", () => {
    it("should return a van by ID", async () => {
      req.params.id = "vanId123";
      Van.findById.mockResolvedValue({
        _id: "vanId123",
        model: "Ford Transit",
      });

      await getVanById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ van: expect.any(Object) });
    });

    it("should return 404 if the van is not found", async () => {
      req.params.id = "nonExistentVanId";
      Van.findById.mockResolvedValue(null);

      await getVanById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Van not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "vanId123";
      Van.findById.mockRejectedValue(new Error("Internal error"));

      await getVanById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("updateVan", () => {
    it("should update a van successfully", async () => {
      req.params.id = "vanId123";
      req.body = { model: "Mercedes Sprinter" };

      Van.findByIdAndUpdate.mockResolvedValue({ _id: "vanId123", ...req.body });

      await updateVan(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Van updated successfully",
        van: expect.any(Object),
      });
    });

    it("should return 404 if the van is not found", async () => {
      req.params.id = "nonExistentVanId";
      Van.findByIdAndUpdate.mockResolvedValue(null);

      await updateVan(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Van not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "vanId123";
      Van.findByIdAndUpdate.mockRejectedValue(new Error("Internal error"));

      await updateVan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("deleteVan", () => {
    it("should delete a van successfully", async () => {
      req.params.id = "vanId123";

      Van.findByIdAndDelete.mockResolvedValue({ _id: "vanId123" });

      await deleteVan(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Van deleted successfully",
      });
    });

    it("should return 404 if the van is not found", async () => {
      req.params.id = "nonExistentVanId";
      Van.findByIdAndDelete.mockResolvedValue(null);

      await deleteVan(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Van not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "vanId123";
      Van.findByIdAndDelete.mockRejectedValue(new Error("Internal error"));

      await deleteVan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});

// touch __tests__/vanController.test.js
