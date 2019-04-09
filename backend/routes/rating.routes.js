const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.post('/load', ratingController.loadFromCSV);

module.exports = router;