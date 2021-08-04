// =============================================
//  Page Routes
// ---------------------------------------------
// Handles serving of static resources via
// handlebars templates
// =============================================
const router = require("express").Router();

// Gets homepage
router.get("/", (req, res) => {
  res.render("home", { loggedIn: req.session.loggedIn });
});

router.get("/signup", (req, res) => {
  // If user is already logged in, redirect to the homepage instead
  if (req.session.loggedIn) {
    res.render("home");
  } else {
    res.render("signup");
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("home", { loggedIn: req.session.loggedIn });
  } else {
    res.render("login");
  }
});

module.exports = router;
