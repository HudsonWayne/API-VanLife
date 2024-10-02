const express = require("express");


const getAllVans = require("../../src/controllers/vanController").getAllVans;
const getVanById = require("../../src/controllers/vanController").getVanById;
const createVan = require("../../src/controllers/vanController").createVan;
const updateVan = require("../../src/controllers/vanController").updateVan;
const deleteVan = require("../../src/controllers/vanController").deleteVan;

const router = express.Router();


router.get("/vans", getAllVans);
router.get("/vans/:id", getVanById);
router.post("/vans", createVan);
router.put("/vans/:id", updateVan);
router.delete("/vans/:id", deleteVan);

module.exports = router;
