const express = require('express');
const router = express.Router();

// Hardware model require
const Hardware = require('../models/hardwareModel');

// add hardware route
router.post('/add', async (req, res) => {
  console.log(req.body.name);
  try {
    const newHardware = req.body.name;
    const sameHardware = await Hardware.find({ name: newHardware });
    if (sameHardware.length > 0) {
      return res.status(500).json({ message: "The hardware "+sameHardware[0].name+" as already been added"});
    }
    const addHardware = new Hardware({
      name: req.body.name,
      company: req.body.company,
      _userId: req.body.userId,
    });
    addHardware.save()
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

// get all hardware route
router.get('/', async (req, res) => {
  try {
    const userId = req.body.userId;
    const hardware = await Hardware.find({ _userId: userId });
    return res.status(201).json(hardware);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
});

module.exports = router;
