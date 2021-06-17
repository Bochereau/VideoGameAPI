const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// checkAuth
const checkAuth = require("../middleware/checkAuth");

// User model require
const User = require('../models/userModel');

// create new user in DB
exports.user_create_user = async (req, res) => {
  try {
    // recover body informations
    const { pseudo, email, password } = req.body;

    // validate unique email
    const sameMailUser = await User.find({ email });
    if (sameMailUser.length > 0) {
      return res.status(500).json({ message: "The email adress "+sameMailUser[0].email+" is already used"})
    }

    // validate unique pseudo
    const samePseudoUser = await User.find({ pseudo });
    if (samePseudoUser.length > 0) {
      return res.status(500).json({ message: "The nickname "+samePseudoUser[0].email+" is already used"})
    }
    
    // generate encryption key
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new User model
    const signedUpUser = new User({
      pseudo,
      email,
      password: hashedPassword,
    });

    // saving user in DB
    await signedUpUser.save()
    .then(user => {
      res.status(201).json({ message: "User added to DB", user});
    })
    .catch(err => {
      return res.status(500).json({ message: "Something went wrong", err });
    })
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err});
  }
}

// user login
exports.user_login = async (req, res) => {
  const { pseudo, password } = req.body;
  try {
    const user = await User.findOne({ pseudo });
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) {
        return res.status(401).json({
          message: "Authentication failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Authentication successful",
          token,
        });
      }
    })
  } catch (err) {
    res.status(401).json({ message: "Authentication failed", err });
  }
}

// get all users in DB
exports.user_getAll = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
}
