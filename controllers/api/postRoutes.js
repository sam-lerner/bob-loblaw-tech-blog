const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
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
                },
            ],
        })
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json(err)
    }
});
// GET one post
router.get('/:id', async (req, res) => {
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
        res.status(200).json(onePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT to update a post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            title: req.body.title,
            body: req.body.body,
            where: {
                id: req.params.id
            },
        })
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const deleteId = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        }
      })
      res.status(200).json(deleteId);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router