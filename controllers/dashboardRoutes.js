const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET Route for all user posts
router.get ('/', withAuth, (req, res) => 
Post.findAll({ 
    where: {
        user_id: req.session.user_id,
    },

}))
// GET Route for one user post
