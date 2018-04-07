const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Профессия пользователя
 */
const OccupationSchema = new Schema({
  title: String,
  versionKey: false
});

module.exports = mongoose.model('Occupation', OccupationSchema);