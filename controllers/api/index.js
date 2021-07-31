// =============================================
//  API Routes
// ---------------------------------------------
// Splits the routes into user login vs. content
// creation calls
// =============================================
const router = require("express").Router();

const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes.js");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
