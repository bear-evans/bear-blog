// =============================================
//  User Routes
// ---------------------------------------------
// Handles user-related requests such as logins,
// logouts, and settings
// =============================================
const router = require("express").Router();
const { User } = require("../../models");

// Creates a new user account using /api/users/signup
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "There was a problem accessing the database." });
  }
});

// Logs in a previously created user using /api/users/login
router.post("/login", async (req, res) => {
  try {
    // If the user's email doesn't match one in the database, reject
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: "Incorrect email or password" });
    }

    // If the user's password doesn't match the one in the database, reject
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password" });
    }

    // Store the session and log the user in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData.name, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logs out a currently logged in user using /api/users/logout
router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204);
      res.render("home");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
