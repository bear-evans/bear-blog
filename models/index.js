// =============================================
//  Model Index
// ---------------------------------------------
// Creates the models used by Sequelize and
// defines their relationships to each other
// =============================================
const User = require("./User");
const Post = require("./Post");

module.exports = { User, Post, Comment };
