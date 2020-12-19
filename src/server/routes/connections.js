
const router = require('express').Router();
let Friends = require('../models/friends.model');
let User = require('../models/users.model');
const verification = require('../middleware/verification');

router.post("/friendrequest", verification, async (req, res) => {
  try {
    const { requester, recipient } = req.body;

    const connection = await Friends.findOneAndUpdate(
      { requester: requester, recipient: recipient },
      { $set: { status: 1 }},
      { upsert: true, new: true }
    ).exec();

    const updateRequester = await User.findOneAndUpdate(
      { _id: requester },
      { $push: { pending: recipient } }
    ).exec();

    const updaterecipient = await User.findOneAndUpdate(
      { _id: recipient },
      { $push: { requests: requester } }
    ).exec();

    res.json({request: true});

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post("/friendaccept", verification, async (req, res) => {
  try {
    const { requester, recipient } = req.body;

    const connection = await Friends.findOneAndUpdate(
      { requester: requester, recipient: recipient },
      { $set: { status: 2 }},
      { upsert: true, new: true }
    ).exec();

    const updateRequester = await User.findOneAndUpdate(
      { _id: requester },
      {
        $pull: { pending: recipient },
        $push: { friends: recipient }
      }
    ).exec();

    const updaterecipient = await User.findOneAndUpdate(
      { _id: recipient },
      {
        $pull: { requests: requester },
        $push: { friends: requester }
      }
    ).exec();

    res.json({accept: true});

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.post("/friendreject", verification, async (req, res) => {
  try {
    const { requester, recipient } = req.body;

    const connection = await User.findOneAndDelete({ requester: requester, recipient: recipient }).exec();

    const updateRequester = await User.findOneAndUpdate(
      { _id: requester },
      {
        $pull: { pending: recipient }
      }
    ).exec();

    const updaterecipient = await User.findOneAndUpdate(
      { _id: recipient },
      {
        $pull: { requests: requester }
      }
    ).exec();

    res.json({reject: true});

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


module.exports = router;
