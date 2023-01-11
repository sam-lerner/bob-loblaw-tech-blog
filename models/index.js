const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// Users can make multiple posts. Persist without User.
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// Users can make multiple comments.
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});

// Posts belong to Users.
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});

// Comments belong to Users.
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});

// Posts have many Comments.
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
});

// Comments belong to Posts.
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
});

module.exports = { User, Post, Comment };