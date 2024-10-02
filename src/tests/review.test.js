const {
  createReview,
  getAllReviews,
  getReviewsByVanId,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController"); 
const Review = require("../models/reviewModel");
const Van = require("../models/Van");

// Mock the Review and Van models
jest.mock("../models/reviewMode");
jest.mock("../models/vanModel");

describe("Review Controller", () => {
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

  describe("createReview", () => {
    it("should create a new review successfully", async () => {
      req.body = {
        userId: "userId123",
        vanId: "vanId123",
        rating: 5,
        comment: "Great van!",
      };

      Van.findById.mockResolvedValue({ _id: "vanId123", reviews: [] });
      Review.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({ _id: "reviewId123" }),
      }));

      await createReview(req, res);

      expect(Van.findById).toHaveBeenCalledWith("vanId123");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Review created successfully",
        review: expect.any(Object),
      });
    });

    it("should return 404 if the van is not found", async () => {
      req.body = { vanId: "nonExistentVanId" };

      Van.findById.mockResolvedValue(null);

      await createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Van not found" });
    });

    it("should handle internal server errors", async () => {
      req.body = { vanId: "vanId123" };

      Van.findById.mockRejectedValue(new Error("Internal error"));

      await createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getAllReviews", () => {
    it("should return all reviews", async () => {
      Review.find.mockResolvedValue([{}]);

      await getAllReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reviews: expect.any(Array) });
    });

    it("should handle internal server errors", async () => {
      Review.find.mockRejectedValue(new Error("Internal error"));

      await getAllReviews(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getReviewsByVanId", () => {
    it("should return reviews for a specific van", async () => {
      req.params.vanId = "vanId123";
      Review.find.mockResolvedValue([{}]);

      await getReviewsByVanId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ reviews: expect.any(Array) });
    });

    it("should handle internal server errors", async () => {
      req.params.vanId = "vanId123";
      Review.find.mockRejectedValue(new Error("Internal error"));

      await getReviewsByVanId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("updateReview", () => {
    it("should update a review successfully", async () => {
      req.params.id = "reviewId123";
      req.body = { rating: 4 };

      Review.findByIdAndUpdate.mockResolvedValue({
        _id: "reviewId123",
        rating: 4,
      });

      await updateReview(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Review updated successfully",
        review: expect.any(Object),
      });
    });

    it("should return 404 if the review is not found", async () => {
      req.params.id = "nonExistentReviewId";
      Review.findByIdAndUpdate.mockResolvedValue(null);

      await updateReview(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Review not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "reviewId123";
      Review.findByIdAndUpdate.mockRejectedValue(new Error("Internal error"));

      await updateReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("deleteReview", () => {
    it("should delete a review successfully", async () => {
      req.params.id = "reviewId123";

      Review.findByIdAndDelete.mockResolvedValue({ _id: "reviewId123" });

      await deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Review deleted successfully",
      });
    });

    it("should return 404 if the review is not found", async () => {
      req.params.id = "nonExistentReviewId";
      Review.findByIdAndDelete.mockResolvedValue(null);

      await deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Review not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "reviewId123";
      Review.findByIdAndDelete.mockRejectedValue(new Error("Internal error"));

      await deleteReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});

// touch __tests__/reviewController.test.js
