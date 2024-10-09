const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController"); // Adjust the path as needed
const User = require("../models/userModel");

// Mock the User model
jest.mock("../models/userModel");

describe("User Controller", () => {
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

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({
          _id: "userId123",
          name: "John Doe",
          email: "john@example.com",
        }),
      }));

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created successfully",
        user: expect.any(Object),
      });
    });

    it("should handle internal server errors", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      };

      User.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Internal error")),
      }));

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      User.find.mockResolvedValue([{}]);

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ users: expect.any(Array) });
    });

    it("should handle internal server errors", async () => {
      User.find.mockRejectedValue(new Error("Internal error"));

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      req.params.id = "userId123";
      User.findById.mockResolvedValue({ _id: "userId123", name: "John Doe" });

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user: expect.any(Object) });
    });

    it("should return 404 if the user is not found", async () => {
      req.params.id = "nonExistentUserId";
      User.findById.mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "userId123";
      User.findById.mockRejectedValue(new Error("Internal error"));

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("updateUser", () => {
    it("should update a user successfully", async () => {
      req.params.id = "userId123";
      req.body = { name: "Jane Doe" };

      User.findByIdAndUpdate.mockResolvedValue({
        _id: "userId123",
        name: "Jane Doe",
      });

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User updated successfully",
        user: expect.any(Object),
      });
    });

    it("should return 404 if the user is not found", async () => {
      req.params.id = "nonExistentUserId";
      User.findByIdAndUpdate.mockResolvedValue(null);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "userId123";
      User.findByIdAndUpdate.mockRejectedValue(new Error("Internal error"));

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user successfully", async () => {
      req.params.id = "userId123";

      User.findByIdAndDelete.mockResolvedValue({ _id: "userId123" });

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
      });
    });

    it("should return 404 if the user is not found", async () => {
      req.params.id = "nonExistentUserId";
      User.findByIdAndDelete.mockResolvedValue(null);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle internal server errors", async () => {
      req.params.id = "userId123";
      User.findByIdAndDelete.mockRejectedValue(new Error("Internal error"));

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});

// touch __tests__/userController.test.js
