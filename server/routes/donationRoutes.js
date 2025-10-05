const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  getDonationById,
} = require('../controllers/donationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createDonation).get(protect, admin, getDonations);
router.route('/:id').get(protect, getDonationById);

module.exports = router;