const router = require('express').Router();
const postController = require('../controllers/postsController');

// // Get all data
// router.get('/');

// // Get posts by id
// router.get('/:id');

// // Create Post
// router.post('/');

// router.post('/addcomment/:id');

// router.patch('/:id');

// router.delete('/:id');

router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route('/addcomment/:id').post(postController.createPostComment);

module.exports = router;
