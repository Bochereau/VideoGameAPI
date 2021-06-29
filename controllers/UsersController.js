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
      return res.status(500).json({ message: "L'adresse email "+sameMailUser[0].email+" est déjà utilisée"});
    }
    // validate unique pseudo
    const samePseudoUser = await User.find({ pseudo });
    if (samePseudoUser.length > 0) {
      return res.status(500).json({ message: "Le pseudo "+samePseudoUser[0].pseudo+" est déjà utilisé"});
    }
    // generate encryption key
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hashSync(password, salt);
    // create new User model
    const signedUpUser = new User({
      pseudo,
      email,
      password: hashedPassword,
    });
    // saving user in DB
    await signedUpUser.save()
    .then(user => {
      res.status(201).json({ message: "Inscription réussie, vous pouvez vous connecter", user});
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
  try {
    const user = await User.findOne({ pseudo: req.body.pseudo}).exec();
    if(!user) {
      return res.status(400).send({ message: "Le pseudo n'éxiste pas" });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).send({ message: "Le mot de passe est invalide" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Authentification réussie",
      token,
    });
  } catch (err) {
    res.status(500).send({ message: "L'authentification a échoué", err });
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
