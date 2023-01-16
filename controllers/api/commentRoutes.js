const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        if (commentData.length === 0) {
            res.status(404).json({ message: 'No comments found' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// GET one comment
router.get('/:id', async (req, res) => {
    try {
        const oneComment = await Comment.findByPk(req.params.id);
        if (oneComment.length === 0) {
            res.status(404).json({ message: 'No comment found matching that id.' });
            return;
        }
        res.status(200).json(oneComment);
    } catch (err) {
        res.status(500).json(err);
    }
});
// POST comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
})
// PUT to edit comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                comment: req.body.comment,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!updatedComment) {
            res
                .status(404)
                .json({ message: 'No comment found with that id.' });
            return;
        }
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({
                message: 'No comment found with that id.'
            });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router