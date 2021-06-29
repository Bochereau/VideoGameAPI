const express = require('express');
const router = express.Router();

// checkAuth
const checkAuth = require("../middleware/checkAuth");

// Videogame controller required
const VideogameController = require('../controllers/VideogameController');

// route to get all videogames
router.get('/', checkAuth, VideogameController.getAllVideogames);

// route to get one videogame by id
router.get('/:id', checkAuth, VideogameController.getVideogameById);

// route to add videogame
router.post('/add', checkAuth, VideogameController.addVideogame);

// route to update videogame by id 
router.put('/:id', checkAuth, VideogameController.updateVideogame);

// route to delete videogame by id
router.delete('/:id', checkAuth, VideogameController.deleteVideogame);

// export videogame router
module.exports = router;
