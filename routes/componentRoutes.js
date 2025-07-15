const express = require('express');
const router = express.Router();
const {
  searchComponents,
} = require('../controllers/componentController');

router.get('/search/components', searchComponents);

module.exports = router;
