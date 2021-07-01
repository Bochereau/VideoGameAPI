const express = require('express');
const router = express.Router();

// checkAuth
const checkAuth = require("../middleware/checkAuth");

// WishList controller required
const WishlistController = require('../controllers/WishlistController');

// route to get all WishLists
router.get('/', checkAuth, WishlistController.getWishlist);

// route to add WishList
router.post('/add', checkAuth, WishlistController.addWish);

// route to delete WishList by id
router.delete('/:id', checkAuth, WishlistController.deleteWish);

// export WishList router
module.exports = router;
