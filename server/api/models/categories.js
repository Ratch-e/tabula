const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Категории
 */
const Categories = new Schema({
  name: String,
  versionKey: false
});

module.exports = mongoose.model('Categories', UserSchema);