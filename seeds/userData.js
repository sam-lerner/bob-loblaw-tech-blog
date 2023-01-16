const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
    {
        name: "sam_lerner",
        password: "rootroot",
    },
    {
        name: "slerner",
        password: "password",
    },
    {
        name: "chloeisthebest",
        password: "chloe1234",
    },
];

const seedUserData = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,

    });
}
module.exports = seedUserData;