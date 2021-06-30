require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get the header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (bearerHeader !== 'undefined') {
      // split at the spaces
      const bearer = bearerHeader.split(' ');
      // get the token from the array
      const bearerToken = bearer[1];
      // set the token
      req.token = bearerToken;

      next();
    }
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
