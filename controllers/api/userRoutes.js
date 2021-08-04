// =============================================
//  User Routes
// ---------------------------------------------
// Handles user-related requests such as logins,
// logouts, and settings
// =============================================
const router = require("express").Router();
const { User } = require("../../models");

router.get("/", (req, res) => {});

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

module.exports = router;
