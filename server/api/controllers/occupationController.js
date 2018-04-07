const Occupation = require('../models/occupation');

/**
 * Добавление новой долности
 *
 * @param req
 * @param res
 */
exports.addOccupation = (req, res) => {
  const occupation = new Occupation;
  occupation.title = req.body.title;
  occupation.save((err) => {
    err ? res.send(err) : res.json(occupation);
  })
};

/**
 * Получение всех должностей
 *
 * @param req
 * @param res
 */
exports.getAllOccupations = (req, res) => {
  Occupation.find((err, list) => {
    err ? res.send(err) : res.json(list);
  });
};

/**
 * Получение должности по ID
 *
 * @param req
 * @param res
 */
exports.getOccupation = (req, res) => {
  Occupation.findById(req.params.occupation_id, (err, occupation) => {
    err ? res.send(err) : res.json(occupation);
  })
};

/**
 * Удаление должности
 *
 * @param req
 * @param res
 */
exports.deleteOccupation = (req, res) => {
  Occupation.remove({
    _id: req.params.occupation_id
  }, (err) => {
    err ? res.send(err) : res.json({ message: `Occupation deleted!` });
  });
};