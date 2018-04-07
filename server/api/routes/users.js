const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MyTest');

const userController = require('../controllers/userController');
const occupationController = require('../controllers/occupationController');

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

router.route('/occupation')
  .get(occupationController.getAllOccupations)
  .post(occupationController.addOccupation);

router.route('/occupation/:user_id')
  .get(occupationController.getOccupation)
  .delete(occupationController.deleteOccupation);

module.exports = router;