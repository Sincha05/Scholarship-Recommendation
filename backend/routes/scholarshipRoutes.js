const express = require('express');
const router = express.Router();
const { getAllScholarships } = require('../controllers/scholarshipController');

router.get('/', async (req, res) => {
  try {
    const scholarships = await getAllScholarships();
    
    // Ensure we always return an array, even if empty
    const responseData = Array.isArray(scholarships) ? scholarships : [];
    
    res.status(200).json({
      success: true,
      data: responseData,
      count: responseData.length
    });
  } catch (err) {
    console.error('Error fetching scholarships:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scholarships'
    });
  }
});

module.exports = router;