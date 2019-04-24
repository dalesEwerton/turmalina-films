const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film.controller');

router.post('/load', filmController.loadFromCSV);
router.get('', filmController.getAllFilms);
router.get('/genre/:genre', filmController.getByGenre);
router.get('/year/:year', filmController.getByYear);
router.get('/title/:title', filmController.getByTitle);

module.exports = router;