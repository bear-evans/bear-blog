// =============================================
//  Page Routes
// ---------------------------------------------
// Handles serving of static resources via
// handlebars templates
// =============================================
const router = require("express").Router();

// Gets homepage
router.get("/", (req, res) => {
  res.render("home", {
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});

// Gets about page
router.get("/about", (req, res) => {
  res.render("about", {
    name: req.session.name,
    loggedIn: req.session.loggedIn,
  });
});

// Gets about page
router.get("/create", (req, res) => {
  if (req.session.loggedIn) {
    res.render("create", {
      name: req.session.name,
      loggedIn: req.session.loggedIn,
    });
  } else {
    res.render("signup", { error: "You must log in first!" });
  }
});

router.get("/signup", (req, res) => {
  // If user is already logged in, redirect to the homepage instead
  if (req.session.loggedIn) {
    res.render("home", {
      name: req.session.name,
      loggedIn: req.session.loggedIn,
    });
  } else {
    res.render("signup");
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.render("home", {
      name: req.session.name,
      loggedIn: req.session.loggedIn,
    });
  } else {
    res.render("login");
  }
});

module.exports = router;
