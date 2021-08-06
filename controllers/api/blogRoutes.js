// =============================================
//  Blog Routes
// ---------------------------------------------
// API routes related to blog content, posting,
// and commenting
// =============================================
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', (req, res) => {});

// Creates a new post using /api/blogs
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user_id,
    });

    const postData = newPost.get({ plain: true });
    console.log(postData);
    res.status(200).json(postData.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/comment', async (req, res) => {
  try {
    const newComment = await Comment.create({
      author_id: req.session.user_id,
      content: req.body.content,
      on_post: req.body.on_post,
    });

    const commentData = newComment.get({ plain: true });
    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
