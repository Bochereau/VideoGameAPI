const express = require('express');
const router = express.Router();

// User model require
const User = require('../models/userModel');

// singup route 
router.post('/signup', async (req, res) => {
  try {
    const newEmail = req.body.email;
    const sameMailUser = await User.find({ email: newEmail });
    if (sameMailUser.length > 0) {
      return res.status(500).json({ message: "The email adress "+sameMailUser[0].email+" is already used"})
    }
    const signedUpUser = new User({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: req.body.password,
    });
    signedUpUser.save()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    })
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err});
  }
});

// get users route
router.get('/', async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
});

module.exports = router;
