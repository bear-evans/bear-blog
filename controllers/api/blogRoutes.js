// =============================================
//  Blog Routes
// ---------------------------------------------
// API routes related to blog content, posting,
// and commenting
// =============================================
const router = require("express").Router();
const { Post, User } = require("../../models");

router.get("/", (req, res) => {});

// Creates a new post using /api/blogs
router.post("/", async (req, res) => {
  try {
    console.log("Trying to post!");

    console.log("Title = " + req.body.title);
    console.log("Content = " + req.body.content);
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user_id,
    });

    const postData = newPost.get({ plan: true });
    console.log(postData);
    res.status(200).json(postData.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
