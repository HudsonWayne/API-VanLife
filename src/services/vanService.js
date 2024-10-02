const Van = require('../models/Van');

// Create a new van
const createVan = async (req, res) => {
  try {
    const { ownerId, model, year, capacity, description, pricePerDay, images } = req.body;

    const van = new Van({
      ownerId,
      model,
      year,
      capacity,
      description,
      pricePerDay,
      images,
    });

    await van.save();

    return res.status(201).json({ message: 'Van created successfully', van });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all vans
const getAllVans = async (req, res) => {
  try {
    const vans = await Van.find().populate('ownerId');
    return res.status(200).json({ vans });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get van by ID
const getVanById = async (req, res) => {
  try {
    const van = await Van.findById(req.params.id).populate('ownerId');
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }
    return res.status(200).json({ van });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a van
const updateVan = async (req, res) => {
  try {
    const van = await Van.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }
    return res.status(200).json({ message: 'Van updated successfully', van });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a van
const deleteVan = async (req, res) => {
  try {
    const van = await Van.findByIdAndDelete(req.params.id);
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }
    return res.status(200).json({ message: 'Van deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createVan,
  getAllVans,
  getVanById,
  updateVan,
  deleteVan,
};