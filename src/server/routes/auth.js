
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validation = require('../middleware/validation');
const verification = require('../middleware/verification');
let User = require('../models/users.model');


router.post('/register', validation, async (req, res) => {
  try {

    const { phone, username, password, roomId, invite } = req.body;

    // Check if username or phone already exists
    const query = await User.find({$or: [{ username: username }, { phone: phone }]}).exec();

    if(query.length !== 0) {
      return res.status(401).json("User already exists");
    }

    // Encrynting the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const avatar = Math.floor(Math.random() * 4);

    const user = new User({username, phone, password: bcryptPassword, roomId, avatar});

    const newUser = await user.save();

    const token = jwtGenerator(newUser._id);

    res.json({
      cred: {
        token: token,
        user: newUser
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


router.post("/login", validation, async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.find({username: username}).exec();

    if(user.length === 0) {
      return res.status(401).json("Username or Password is incorrect");
    }
    // console.log(user);

    const validPassword = await bcrypt.compare(password, user[0].password);

    if(!validPassword) {
      return res.status(401).json("Username or Password is incorrect");
    }

    const token = jwtGenerator(user[0]._id);

    res.json({
      cred: {
        token: token,
        user: user[0]
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


router.get("/verify", verification, async (req, res) => {
  try {

    const userAgent = req.useragent;

    const user = await User.findById(req.user.id).exec();

    res.json({
      cred: {
        user: user
      },
      userAgent: userAgent
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


router.get("/isOnline", verification, async (req, res) => {
  try {

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { isOnline: true }
    ).exec();

    res.json({
      online: true
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


router.get("/logout", verification, async (req, res) => {
  try {

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { isOnline: false }
    ).exec();

    res.json({
      online: false
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


router.get("/getuseragent", (req, res) => {
  res.send(req.useragent);
});

module.exports = router;
