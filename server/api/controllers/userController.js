const User = require('../models/user');

/**
 * Добавление нового пользователя
 *
 * @param req
 * @param res
 */
exports.addUser = (req, res) => {
  const user = new User;
  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.save((err) => {
    err ? res.send(err) : res.json(user);
  })
};

/**
 * Получение всех пользователей
 *
 * @param req
 * @param res
 */
exports.getAllUsers = (req, res) => {
  User.find((err, list) => {
    err ? res.send(err) : res.json(list);
  });
};

/**
 * Получение пользователя по ID
 *
 * @param req
 * @param res
 */
exports.getUser = (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    err ? res.send(err) : res.json(user);
  })
};

/**
 * Изменение пользователя
 *
 * @param req
 * @param res
 */
exports.editUser = (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) { res.send(err) }
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.save((err) => {
      err ? res.send(err) : res.json(user);
    });
  });
};

/**
 * Удаление пользователя
 *
 * @param req
 * @param res
 */
exports.deleteUser = (req, res) => {
  User.remove({
    _id: req.params.user_id
  }, (err) => {
    err ? res.send(err) : res.json({ message: `User deleted!` });
  });
};