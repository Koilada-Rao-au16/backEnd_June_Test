const PostModel = require('../models/post');
const CommentModel = require('../models/coment');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const postDoc = await PostModel.create({
      title: req.body.title,
      content: req.body.content,
    });
    const result = await postDoc.save();
    res.status(200).json({
      status: 'success',
      data: {
        createdPost: result,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.createPostComment = async (req, res) => {
  try {
    const foundPostDoc = await PostModel.findById(req.params.id);
    const commentDoc = await CommentModel.create(req.body);
    commentDoc.post = foundPostDoc;
    const commentResult = await commentDoc.save();
    foundPostDoc.comments.push(commentDoc);
    const postResult = await foundPostDoc.save();
    console.log('postResult', postResult);

    res.status(200).json({
      status: 'success',
      data: {
        commentResult,
        postResult,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const update = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        post: update,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};
