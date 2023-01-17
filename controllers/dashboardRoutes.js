const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET Route for all user posts
// router.get('/', withAuth, (req, res) => {
//   console.log("Getting all posts on Dashboard.")  
//   Post.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ['id', 'title', 'body', 'created_at'],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['name'],
//           },
//         },
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     })
//       .then((dbPostData) => {
//         const posts = dbPostData.map((post) => post.get({ plain: true }));
//         res.render('dashboard', {
//           posts,
//           logged_in: true,
//           name: req.session.name,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

router.get('/', withAuth, async (req, res) => {
  console.log("Getting all posts on Dashboard.")
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
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
   
    const posts = postData.map((post) => post.get({ plain: true }));

    // res.status(200).json(postData);
    res.render('dashboard', {
      posts,
      logged_in: true,
      name: req.session.name,
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

// GET Route for one user post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const onePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name'],
          },
        },
      ],
    })
    if (!onePost) {
      res.status(404).json({ message: 'No post found with that id!' })
      return
    }
    // res.status(200).json(onePost);
    // Add res.render
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for new post
router.get('/new', async (req, res) => {
  try {
    res.render('new-post', { name: req.session.name })
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;