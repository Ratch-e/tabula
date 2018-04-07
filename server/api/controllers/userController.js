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
  user.occupation = 'Должность не указана';
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

    if(req.body.name) {
      user.name = req.body.name;
    }
    if(req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if(req.body.birthday) {
      user.birthday = req.body.birthday;
    }
    if(req.body.occupation) {
      user.occupation = req.body.occupation;
    }
    if(req.body.params) {
      user.params = req.body.params;
    }

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