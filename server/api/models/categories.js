const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Юзер
 */
const Categories = new Schema({
  name: String,
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);