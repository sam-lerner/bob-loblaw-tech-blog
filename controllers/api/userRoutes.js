const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include:
        [
          { model: Post },
        ]
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
})

// GET User by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        { model: Post },
      { model: Comment }
    ,]
    });

if (!userData) {
  res.status(404).json({ message: 'No user found with that id!' });
  return
}
res.status(200).json(userData);
  } catch (err) {
  res.status(500).json(err)
}
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.table(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.name;
      req.session.logged_in = true;
      res
        .status(201)
        .json({ message: `Successfully created ${userData.name}` });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
