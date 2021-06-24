const express = require('express');
const router = express.Router();

// Videogame controller required
const VideogameController = require('../controllers/VideogameController');


// get all videogames route
router.get('/', VideogameController.getAllVideogames);

// get one videogame by id
router.get('/:id', VideogameController.getVideogameById);

// add videogame route
router.post('/add', VideogameController.addVideogame);

// update videogame route
router.put('/:id', VideogameController.updateVideogame)

// delete videogame by id route
router.delete('/:id', VideogameController.deleteVideogame);



module.exports = router;
