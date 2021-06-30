const router = require('express').Router();
const userController = require('../controllers/userController');

router
  .route('/')
  .get(userController.getAllPosts)
  .post(userController.createPost);
router
  .route('/:id')
  .get(userController.getPost)
  .patch(userController.updatePost)
  .delete(userController.deletePost);

module.exports = router;
