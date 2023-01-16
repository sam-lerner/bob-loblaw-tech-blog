const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET Route for all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'body', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['name'],
        },
      },
      {
        model: User,
        attributes: ['name'],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
        name: req.session.name,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Log in or log out
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Sign in page
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
