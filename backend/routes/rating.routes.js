const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.post('/load', ratingController.loadFromCSV);
router.post('/', ratingController.rateFilm);
router.get('/:userId', ratingController.getRatings);

module.exports = router;