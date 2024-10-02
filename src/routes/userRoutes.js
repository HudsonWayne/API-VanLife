const express = require("express");


const getAllUsers = require("../../src/controllers/userController").getAllUsers;

const getUserById = require("../../src/controllers/userController").getUserById;
const createUser = require("../../src/controllers/userController").createUser;
const updateUser = require("../../src/controllers/userController").updateUser;
const deleteUser = require("../../src/controllers/userController").deleteUser;

const router = express.Router();


router.get("/users", getAllUsers);
router.get("/users/:id", getUserById); 
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
