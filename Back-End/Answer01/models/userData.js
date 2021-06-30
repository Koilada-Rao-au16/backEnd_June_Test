const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const UserData = mongoose.model('userData', UserDataSchema);

module.exports = UserData;
