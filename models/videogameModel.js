const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videogameSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Veuillez entrer un jeu'],
  },
  hardware: {
    type: String,
    trim:true,
    required: [true, 'Veuillez indiquer une console'],
  },
  editor: {
    type: String,
    maxLength: 30,
    required: [true, 'Veuillez ajouter un éditeur'],
  },
  developer: {
    type: String,
    maxLength: 30,
    required: [true, 'Veuillez ajouter un développeur'],
  },
  release: {
    type: Number,
    required: [true, 'Veuillez ajouter une année de sortie'],
  },
  finished: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default:"",
  },
  box: {
    type: Boolean,
    default: false,
  },
  manual: {
    type: Boolean,
    default: false,
  },
  physical: {
    type: Boolean,
    default: false,
  },
  demat: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  _hardwareId:Schema.Types.ObjectId,
  _userId: Schema.Types.ObjectId,
});

const Videogame = mongoose.model('Videogame', videogameSchema, 'videogame');

module.exports = Videogame;
