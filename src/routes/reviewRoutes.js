const express = require("express");


const getAllReviews =
  require("../../src/controllers/reviewController").getAllReviews;
const getReviewById =
  require("../../src/controllers/reviewController").getReviewById;
const createReview =
  require("../../src/controllers/reviewController").createReview;
const updateReview =
  require("../../src/controllers/reviewController").updateReview;
const deleteReview =
  require("../../src/controllers/reviewController").deleteReview;

const router = express.Router();


router.get("/reviews", getAllReviews);
router.get("/reviews/:id", getReviewById);
router.post("/reviews", createReview);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

module.exports = router;
