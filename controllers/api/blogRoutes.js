// =============================================
//  Blog Routes
// ---------------------------------------------
// API routes related to blog content, posting,
// and commenting
// =============================================
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const authBlock = require('../../utils/auth');

router.get('/', (req, res) => {});

// Creates a new post using /api/blogs
router.post('/', authBlock, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user_id,
    });

    const postData = newPost.get({ plain: true });

    res.status(200).json(postData.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new comment
router.post('/comment', authBlock, async (req, res) => {
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

// Updates an existing blog post
router.put('/:id', authBlock, async (req, res) => {
  try {
    const upPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        author_id: req.session.user_id,
      },
      { where: { id: req.params.id } }
    );

    const postData = upPost.get({ plain: true });
    res.status(200).json(postData.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes an existing blog post
//FIXME: Technically anyone logged in can delete any post, not just the owner.
// In a real production project this would need to be fixed.
router.delete('/:id', authBlock, async (req, res) => {
  try {
    const delPost = await Post.destroy({ where: { id: req.params.id } });

    if (!delPost) {
      res.status(404).json({ message: 'No post found with that ID!' });
      return;
    }

    res.status(200).json(delPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
