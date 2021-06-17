const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const UsersController = require('../controllers/UsersController');

// singup route
router.post("/signup", UsersController.user_create_user);

// get all users route
router.get('/', UsersController.user_getAll);

module.exports = router;
