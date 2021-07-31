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

module.exports = router;
