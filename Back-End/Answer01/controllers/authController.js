const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validation');

exports.postSignup = async (req, res) => {
  try {
    // Validate the data before saving a user.
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.details[0].message,
      });
    }
    // Checking if the user is already registered
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email already exists',
      });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user created to database
    const savedUser = await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Register successful',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'failed',
      message: 'Internal Server Error User not created',
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    // Validate the data before logging a user.
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        status: 'failed',
        message: error.details[0].message,
      });
    }
    // Checking if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      });
    }

    // Checking if the password is correct
    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalid Password',
      });
    }

    // Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .cookie('jwt', token, {
        secure: true,
        httpOnly: true,
      })
      .json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: user,
          token,
        },
      });

    // Redirecting to the Uploading files page
  } catch (error) {
    if (error) {
      return res.status(400).json({
        status: 'failed',
        message: `Internal Error ${error.message}`,
      });
    }
  }
};
