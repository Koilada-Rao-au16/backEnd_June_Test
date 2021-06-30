require('dotenv').config();
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connectDB = () => {
  mongoose
    .connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('Database connection established');
    })
   ;
};

module.exports = connectDB;
