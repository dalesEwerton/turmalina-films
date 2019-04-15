const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film.controller');

router.post('/load', filmController.loadFromCSV);
router.get('', filmController.getAllFilms);

module.exports = router;