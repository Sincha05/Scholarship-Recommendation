const express = require('express');
const router = express.Router();
const { getAllScholarships } = require('../controllers/scholarshipController');

router.get('/', async (req, res) => {
  try {
    const scholarships = await getAllScholarships();

    if (!Array.isArray(scholarships)) {
      console.error('Invalid data format for scholarships');
      return res.status(500).json({
        success: false,
        error: 'Invalid data format received from server'
      });
    }

    res.status(200).json({
      success: true,
      data: scholarships,
      count: scholarships.length
    });
  } catch (err) {
    console.error('Error fetching scholarships:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scholarships. Please try again later.',
      details: err.message || 'Unexpected error'
    });
  }
});

module.exports = router;