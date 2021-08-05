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

// Gets new post page, redirecting to signup if not logged in
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
  switch (req.query.error) {
    case "BadLogin":
      res.render("signup", { error: "No user found with those credentials." });
      break;
    case "DBErr":
      res.render("signup", {
        error: "There was a problem connecting to the database.",
      });
      break;
    default:
      if (req.session.loggedIn) {
        res.render("home", {
          name: req.session.name,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.render("signup");
      }
  }
});

module.exports = router;
