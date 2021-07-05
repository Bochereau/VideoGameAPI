// videogame model require
const Videogame = require('../models/videogameModel');

// request to find allvideogames by user
exports.getAllVideogames = async (req, res) => {
  try {
    const videogame = await Videogame.find({ _userId: req.body.userData.userId }).sort('name');
    return res.status(201).json(videogame);
  } catch (err) {
    return res.status(404).json({error: "Nous ne parvenons pas à trouver votre liste de jeux"});
  }
}

// request to find one videogame by id
exports.getVideogameById = async (req, res) => {
  try {
    const videogame = await Videogame.findById(req.params.id);
    return res.status(201).json(videogame);
  } catch (err) {
    return res.status(500).json({error: "Une erreur s'est produite"});
  }
}

// request to add a new videogame to DB by user
exports.addVideogame = async (req, res) => {
  try {
    const addVideogame = new Videogame({
      name: req.body.name,
      hardware: req.body.hardware,
      editor: req.body.editor,
      developer: req.body.developer,
      release: req.body.release,
      _userId: req.body.userData.userId,
    });
    await addVideogame.save()
    .then(data => {
      return res.status(201).json({ message: "Le jeu "+addVideogame.name+" a bien été ajouté", data});
    })
  } catch (err) {
    return res.status(500).json({ message: "Une erreur s'est produite", err});
  }
}

// request to patch one videogame by id
exports.updateVideogame = async (req, res) => {
  const {
    finished,
    box,
    manual,
    physical,
    demat,
    description
  } = req.body;
  try {
    const videogame = await Videogame.findById(req.params.id);
    videogame.finished = finished;
    videogame.box = box;
    videogame.manual = manual;
    videogame.physical = physical;
    videogame.demat = demat;
    videogame.description = description;
    // const errors = await videogame.validate();
    // if (errors.length > 0) throw errors;
    await videogame.save()
    .then (data => {
      return res.status(201).json(data);
    })
    .catch(error => {
      res.json(error);
    })
  }
  catch (err) {
    return res.status(404).json({err: 'Le jeu est introuvable'})
  }
}

// request to delete one videogame by id
exports.deleteVideogame = async (req, res) => {
  try {
    const videogame = await Videogame.findById(req.params.id);
    await videogame.remove();
    return res.status(201).json({ message: "Le jeu "+videogame.name+" a bien été supprimé" });
  } catch (err) {
    return res.status(404).json({err: 'Le jeu est introuvable'})
  }
}
