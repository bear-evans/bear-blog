// =============================================
//  Page Routes
// ---------------------------------------------
// Handles serving of static resources via
// handlebars templates
// =============================================
const router = require('express').Router();
const { User, Post } = require('../models');

// Gets homepage
router.get('/', async (req, res) => {
  const postData = await Post.findAll({
    include: [{ model: User, attributes: ['name'] }],
  });

  let posts = postData.map((post) => post.get({ plain: true }));
  console.log(posts);

  // Trims the post prevuew if it's over 150 characters
  posts.forEach((post, i, arr) => {
    post.content = post.content.substring(0, 150);
  });

  res.render('home', {
    posts: posts,
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});

// Gets about page
router.get('/about', (req, res) => {
  res.render('about', {
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});

// Gets new post page, redirecting to signup if not logged in
router.get('/create', (req, res) => {
  if (req.query.error) {
    res.render('create', {
      name: req.session.name,
      loggedIn: req.session.loggedIn,
      error: 'Error submiting post to database.',
    });
  }
  if (req.session.loggedIn) {
    res.render('create', {
      name: req.session.name,
      loggedIn: req.session.loggedIn,
    });
  } else {
    res.render('signup', { error: 'You must log in first!' });
  }
});

router.get('/signup', (req, res) => {
  // If user is already logged in, redirect to the homepage instead
  switch (req.query.error) {
    case 'BadLogin':
      res.render('signup', { error: 'No user found with those credentials.' });
      break;
    case 'DBErr':
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

// Gets a single post view
router.get('/blogs/:id', async (req, res) => {
  try {
    // const postData = await Post.findOne({ where: { id: req.params.id } });
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name'] }, { model: Comment }],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('post', {
      post,
      loggedIn: req.session.loggedIn,
      name: req.session.name,
    });
  } catch (err) {
    res.status(404).json({ message: 'No post found with that ID.' });
  }
});

module.exports = router;
