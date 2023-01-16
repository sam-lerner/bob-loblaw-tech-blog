const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET Route for all posts
router.get('/', async (req, res) => {
  try {
    Post.findAll({
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
          model: User,
          attributes: ['name'],
        }
      ],
    })
    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
