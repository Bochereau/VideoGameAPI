// videogame model require
const Videogame = require('../models/videogameModel');

// request to find allvideogames
exports.getAllVideogames = async (req, res) => {
  try {
    const videogame = await Videogame.find({}).sort('name');
    return res.status(201).json(videogame);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
}

// request to find one videogame by id
exports.getVideogameById = async (req, res) => {
  try {
    const videogame = await Videogame.findById(req.params.id);
    return res.status(201).json(videogame);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({error: 'Something went wrong'});
  }
}

// request to add a new videogame to DB
exports.addVideogame = async (req, res) => {
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
    console.log("new game added");
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  })
}

// request to patch one videogame by id
exports.updateVideogame = async (req, res) => {
  const {
    name,
    hardware,
    editor,
    developer,
    release,
    finished,
    box,
    manual,
    physical,
    demat,
    description
  } = req.body;
  try {
    const videogame = await Videogame.findById(req.params.id);
    console.log(videogame);
    videogame.name = name || videogame.name;
    videogame.hardware = hardware || videogame.hardware;
    videogame.editor = editor || videogame.editor;
    videogame.developer = developer || videogame.developer;
    videogame.release = release || videogame.release;
    videogame.finished = finished || videogame.finished;
    videogame.box = box || videogame.box;
    videogame.manual = manual || videogame.manual;
    videogame.physical = physical || videogame.physical;
    videogame.demat = demat || videogame.demat;
    videogame.description = description || videogame.description;
    // const errors = await videogame.validate();
    // if (errors.length > 0) throw errors;
    await videogame.save()
    .then (data => {
      console.log('game updated');
      return res.json(data);
    })
    .catch(error => {
      res.json(error);
    })
  }
  catch (err) {
    return res.status(404).json({err: 'Videogame is not found'})
  }
}

// request to delete one videogame by id
exports.deleteVideogame = async (req, res) => {
  try {
    const videogame = await Videogame.findById(req.params.id);
    await videogame.remove();
    res.send({ data: true });
    console.log("game deleted");
  } catch (err) {
    return res.status(404).json({err: 'Videogame is not found'})
  }
}


