const { User } = require('../models');

const userData = [
    {
        name: "sam_lerner",
        email: "sam.a.lerner@gmail.com",
        password: "rootroot",
    },
    {
        name: "slerner",
        email: "s_lerner@hotmail.com",
        password: "password",
    },
    {
        name: "chloeisthebest",
        email: "chloe@email.com",
        password: "chloe1234",
    },
];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;