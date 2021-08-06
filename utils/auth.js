const authBlock = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    res.redirect('/signup?error=noLogin');
  } else {
    next();
  }
};

module.exports = authBlock;
