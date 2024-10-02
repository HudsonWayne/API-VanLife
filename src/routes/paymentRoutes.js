const express = require("express");


const getAllPayments =
  require("../../src/controllers/paymentController").getAllPayments;
const getPaymentById =
  require("../../src/controllers/paymentController").getPaymentById;
const createPayment =
  require("../../src/controllers/paymentController").createPayment;
const updatePayment =
  require("../../src/controllers/paymentController").updatePayment;
const deletePayment =
  require("../../src/controllers/paymentController").deletePayment;

const router = express.Router();


router.get("/payments", getAllPayments);
router.get("/payments/:id", getPaymentById);
router.post("/payments", createPayment);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);

module.exports = router;
