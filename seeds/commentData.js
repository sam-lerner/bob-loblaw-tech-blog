const { Comment } = require('../models');

const commentData = [
    {
        comment: 'I totally feel the same way.',
        user_id: 3,
        post_id: 1,
    },
    {
        comment: 'How did you conclude that?',
        user_id: 2,
        post_id: 1,
    },
    {
        comment: 'This.',
        user_id: 1,
        post_id: 4,
    },
    {
        comment: 'Glad to hear it.',
        user_id: 2,
        post_id: 1,
    },
    
];

const seedCommentData = () => Comment.bulkCreate(commentData);

module.exports = seedCommentData;
