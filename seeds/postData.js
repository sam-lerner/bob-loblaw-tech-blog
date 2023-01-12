const { Post } = require('../models');

const postData = [
    {
        title: 'First tech post',
        body: 'This is my first tech post. It is neat.',
        user_id: 1,
    },
    {
        title: 'Post about JavaScript',
        body: 'JavaScript is super confusing. I think I would rather work on databases.',
        user_id: 1,
    },
    {
        title: 'Microsoft Works?',
        body: 'Why is it called Microsoft Works when it doesnt?',
        user_id: 1,
    },
    {
        title: 'Miracles do happen',
        body: 'I think I get what we are supposed to do here. Hopefully people will hire me one day.',
        user_id: 3,
    },
    {
        title: 'MacBook Pro',
        body: 'Can I just get a MacBook amateur instead? It seems way easier.',
        user_id: 3,
    },
];

const seedPostData = () => Post.bulkCreate(postData);

module.exports = seedPostData;