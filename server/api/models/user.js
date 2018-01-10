const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Юзер
 */
const UserSchema = new Schema({
  name: String,
  lastName: String,
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema);