
const router = require('express').Router();


router.post('/register', validation, async (req, res) => {
  try {



  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});


router.post("/login", validation, async (req, res) => {
  try {


  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});



module.exports = router;
