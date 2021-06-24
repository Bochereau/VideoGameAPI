const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const UsersController = require('../controllers/UsersController');

// singup route
router.post("/signup", UsersController.user_create_user);

// signin route
router.post("/signin", UsersController.user_login);

// get all users route
router.get('/', UsersController.user_getAll);

module.exports = router;
