const express = require('express');
const router = express.Router();

// checkAuth
const checkAuth = require("../middleware/checkAuth");

const HardwareController = require("../controllers/HardwareController");

// route to get all hardware
router.get('/', checkAuth, HardwareController.getAllHardware);

// route to add hardware
router.post('/add', checkAuth, HardwareController.addHardware);

// route to delete hardware
router.delete('/:id', checkAuth, HardwareController.deleteHardware);

// export hardware router
module.exports = router;
