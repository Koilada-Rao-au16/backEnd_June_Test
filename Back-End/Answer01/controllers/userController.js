const UserData = require('../models/userData');
const jwt = require('jsonwebtoken');

exports.getAllPosts = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const posts = await UserData.find({});
        res.status(200).json({
          status: 'success',
          results: posts.length,
          data: {
            posts: posts,
          },
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const post = await UserData.findById(req.params.id);
        res.status(200).json({
          status: 'success',
          data: {
            post: post,
          },
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const newPost = await UserData.create(req.body);

        res.status(201).json({
          status: 'success',
          data: {
            post: newPost,
          },
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const post = await UserData.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });

        res.status(200).json({
          status: 'success',
          data: {
            post: post,
          },
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        await UserData.findByIdAndDelete(req.params.id);
        res.status(204).json({
          status: 'success',
          data: null,
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
