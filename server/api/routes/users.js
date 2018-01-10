const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MyTest');

const userController = require('../controllers/userController');

router.use((req, res, next) => {
  next();
});

router.route('/users')
  .get(userController.getAllUsers)
  .post(userController.addUser);

router.route('/users/:user_id')
  .get(userController.getUser)
  .put(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;