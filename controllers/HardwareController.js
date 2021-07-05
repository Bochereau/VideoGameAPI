// Hardware model require
const Hardware = require('../models/hardwareModel');

// request to find all hardware by user
exports.getAllHardware = async (req, res) => {
  try {
    const hardware = await Hardware.find({ _userId: req.body.userData.userId });
    return res.status(201).json(hardware);
  } catch (err) {
    return res.status(500).json({error: "Une erreur s'est produite"});
  }
};

// request to add new hardware in DB by user
exports.addHardware = async (req, res) => {
  try {
    const newHardware = req.body.name;
    const sameHardware = await Hardware.find({ _userId: req.body.userData.userId, name: newHardware });
    if (sameHardware.length > 0) {
      return res.status(500).json({ message: "La console "+sameHardware[0].name+" à déjà été ajoutée"});
    }
    const addHardware = new Hardware({
      name: newHardware,
      company: req.body.company,
      _userId: req.body.userData.userId,
    });
    addHardware.save()
    .then(data => {
      console.log("new hardware added");
      return res.status(201).json({message: "La console "+addHardware.name+" a bien été ajoutée", data});
    })
  } catch (err) {
    return res.status(500).json({ message: "Une erreur s'est produite", err});
  }
};

// request to delete hardware by id
exports.deleteHardware = async (req, res) => {
  try {
    const hardware = await Hardware.findById(req.params.id);
    await hardware.remove();
    res.send({ data: true });
    console.log("hardware deleted");
  } catch (err) {
    return res.status(404).json({err: 'Hardware is not found'})
  }
};