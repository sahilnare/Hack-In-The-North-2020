
const router = require('express').Router();
let User = require('../models/users.model');
const verification = require('../middleware/verification');

router.get("/getallfriends", verification, async (req, res) => {
  try {
    const { id } = req.user;

    const friendsData = await User.findById(req.user.id, 'friends requests pending').exec();

    const friendPendings = await User.find({
      _id: { $in: friendsData.pending }
    }, '_id username isOnline roomId avatar').exec();

    const friendRequests = await User.find({
      _id: { $in: friendsData.requests }
    }, '_id username isOnline roomId avatar').exec();

    const friendConfirmed = await User.find({
      _id: { $in: friendsData.friends }
    }, '_id username isOnline roomId avatar').exec();

    res.json({
      friendsData: {
        friends: friendConfirmed,
        pending: friendPendings,
        requests: friendRequests
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post("/searchuser", verification, async (req, res) => {
  try {
    const { username } = req.body;

    const users = await User.find({ username: { $regex: username } }, '_id username isOnline roomId avatar').exec();

    res.json(users);

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


module.exports = router;
