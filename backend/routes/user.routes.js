const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.verifyToken, userController.getAll);
router.get('/:id', userController.verifyToken, userController.getOne);
router.post('/', userController.create);
router.put('/', userController.verifyToken, userController.update);
router.delete('/:id', userController.verifyToken, userController.delete);

module.exports = router;