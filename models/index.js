// =============================================
//  Model Index
// ---------------------------------------------
// Creates the models used by Sequelize and
// defines their relationships to each other
// =============================================
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Users can have many posts or comments
User.hasMany(Post, { foreignKey: "author_id", onDelete: "CASCADE" });
User.hasMany(Comment, { foreignKey: "author_id" });

// posts belong to a single user, but can have many comments
Post.belongsTo(User, { foreignKey: "author_id" });
Post.hasMany(Comment, { foreignKey: "on_post" });

// comments belong to one author and one post
Comment.belongsTo(User, { foreignKey: "author_id" });
Comment.belongsTo(Post, { foreignKey: "on_post" });

module.exports = { User, Post, Comment };
