const Review = require('../models/Review');
const Van = require('../models/Van');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { userId, vanId, rating, comment } = req.body;

    const van = await Van.findById(vanId);
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }

    const review = new Review({
      userId,
      vanId,
      rating,
      comment,
    });

    await review.save();

    van.reviews.push(review._id);
    await van.save();

    return res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId vanId');
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get reviews by van ID
const getReviewsByVanId = async (req, res) => {
  try {
    const reviews = await Review.find({ vanId: req.params.vanId }).populate('userId vanId');
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    return res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByVanId,
  updateReview,
  deleteReview,
};