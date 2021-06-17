const express = require('express');
const router = express.Router();

// videogame model require
const Videogame = require('../models/videogameModel');

// add videogame route
router.post('/add', async (req, res) => {
  const addVideogame = new Videogame({
    name: req.body.name,
    hardware: req.body.hardware,
    editor: req.body.editor,
    developer: req.body.developer,
    release: req.body.release,
    _userId: "60c9aa80a520a563aa3077ba",
  });
  addVideogame.save()
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  })
});

// get all videogames route
router.get('/', async (req, res) => {
  try {
    const videogame = await Videogame.find({});
    return res.status(201).json(videogame);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
});

module.exports = router;
