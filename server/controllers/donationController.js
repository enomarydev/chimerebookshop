const Donation = require('../models/Donation');

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private
const createDonation = async (req, res) => {
  const { amount, paymentMethod, paymentResult } = req.body;

  const donation = new Donation({
    user: req.user._id,
    amount,
    paymentMethod,
    paymentResult,
    isPaid: true,
    paidAt: Date.now(),
  });

  try {
    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({}).populate('user', 'id name');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get donation by ID
// @route   GET /api/donations/:id
// @access  Private
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (donation) {
      res.json(donation);
    } else {
      res.status(404).json({ message: 'Donation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonationById,
};