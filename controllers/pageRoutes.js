// =============================================
//  Page Routes
// ---------------------------------------------
// Handles serving of static resources via
// handlebars templates
// =============================================
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
