const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.verifyToken, userController.getAll);
router.get('/:id', userController.verifyToken, userController.getOne);
router.post('/', userController.create);
router.post('/login', userController.login);
router.put('/', userController.verifyToken, userController.update);
router.delete('/:id', userController.verifyToken, userController.delete);
router.post('/load', userController.loadFromCSV);

module.exports = router;
