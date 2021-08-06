// =============================================
//  Page Routes
// ---------------------------------------------
// Handles serving of static resources via
// handlebars templates
// =============================================
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const authBlock = require('../utils/auth');

// ------------------------------------------------------------------------------------------------
// Gets homepage
router.get('/', async (req, res) => {
  const postData = await Post.findAll({
    include: [{ model: User, attributes: ['name'] }],
  });

  // Converts the post to plain json and trims the post prevuew if it's over 150 characters
  let posts = postData.map((post) => post.get({ plain: true }));
  posts.forEach((post, i, arr) => {
    post.content = post.content.substring(0, 150);
  });

  res.render('home', {
    posts: posts,
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Gets about page
router.get('/about', (req, res) => {
  res.render('about', {
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Gets new post page, redirecting to signup if not logged in
router.get('/create', authBlock, (req, res) => {
  if (req.query.error) {
    res.render('create', {
      name: req.session.name,
      loggedIn: req.session.loggedIn,
      error: 'Error submiting post to database.',
    });
  } else {
    res.render('create', {
      name: req.session.name,
      loggedIn: req.session.loggedIn,
    });
  }
});
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Gets the signup page. Grabs the error URL query to customize an error message
router.get('/signup', (req, res) => {
  // If user is already logged in, redirect to the homepage instead
  switch (req.query.error) {
    case 'noLogin':
      res.render('signup', { error: 'You must log in first!' });
      break;
    case 'BadLogin':
      res.render('signup', { error: 'No user found with those credentials.' });
      break;
    case 'DBError':
      res.render('signup', {
        error: 'There was a problem connecting to the database.',
      });
      break;
    default:
      if (req.session.loggedIn) {
        res.render('home', {
          name: req.session.name,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.render('signup');
      }
  }
});
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Gets a single post view
router.get('/blogs/:id', async (req, res) => {
  try {
    // const postData = await Post.findOne({ where: { id: req.params.id } });
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['name'] },
        {
          model: Comment,
          attributes: ['content', 'author_id', 'createdAt'],
          required: false,
          include: [{ model: User, attributes: ['name'] }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
    });
  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
});
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Gets the dashboard and grabs a list of previous posts by the same author
router.get('/dashboard', authBlock, async (req, res) => {
  const rawPosts = await Post.findAll({
    where: { author_id: req.session.user_id },
  });

  // check to may sure rawPosts returned anything before doing something with it
  let posts;
  if (rawPosts) {
    posts = rawPosts.map((post) => post.get({ plain: true }));
  }

  res.render('dashboard', {
    posts,
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Grabs the post editor. Population of the fields is done client side using URL parameters
router.get('/edit', authBlock, async (req, res) => {
  res.render('edit', {
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
module.exports = router;
