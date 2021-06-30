require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connectDB = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('Database Connected'));
};

module.exports = connectDB;
