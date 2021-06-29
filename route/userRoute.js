const express = require('express');
const router = express.Router();

// checkAuth
const checkAuth = require("../middleware/checkAuth");

const UsersController = require('../controllers/UsersController');

// singup route
router.post("/signup", UsersController.user_create_user);

// signin route
router.post("/signin", UsersController.user_login);

// get all users route
router.get('/', UsersController.user_getAll);


// export user router
module.exports = router;
