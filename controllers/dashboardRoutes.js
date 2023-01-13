const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET Route for all user posts
router.get('/', withAuth, async (req, res) => {
    try {
        const allComments = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
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
        res.status(200).json(allComments);
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
            res.status(404).json({ message: 'No post found with that id!'})
            return
        }
        res.status(200).json(onePost);
    } catch (err) {
        res.status(500).json(err);
    }
});
