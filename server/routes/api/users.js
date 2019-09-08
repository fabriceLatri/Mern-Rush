const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route  GET api/users
//@desc   Get all users
//@access Private

router.get('/', auth, async (req, res) => {
  console.log('Je rentre dans la fonction');
  
  try {
    const users = await User.find();
    res.json(users);
    console.log(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/users
//@desc   Get user by ID
//@access Private
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findOne({_id: req.params.id });
    if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }
    
    res.json(user);
  console.log(user);

  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'User not found' });
      }
    res.status(500).send('Server Error');
      }
});

// @route   PUT api/users
// @desc    Update user name, email, password
// @access Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
    ]
  ],

  async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({  $or:
        [
          { name: name },
          {email: email }
        ] });

      if (user) {
        if (user.name === name) {
          return res
          .status(400)
          .json({ errors: [{ msg: 'Name already exists' }] });
        }
        if (user.email === email) {
          return res
          .status(400)
          .json({ errors: [{ msg: 'Email already exists' }] });
        }
      }
    } catch (err){
      console.error(err.message);
      res.status(500).send('Server error');
    }

    userUpdate ={
      name,
      email,
      password
    };
    const salt = await bcrypt.genSalt(10);

    userUpdate.password = await bcrypt.hash(password, salt);

    User.findByIdAndUpdate(req.params.id, { $set : userUpdate } , function(err, user){      
      if(err){
        console.error(err.message);
        res.status(500)
          .send('Server Error');
      }
      console.log(user);
    res.json({ user });
    });
  }
)

module.exports = router;
