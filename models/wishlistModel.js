const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema ({
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  _userId: Schema.Types.ObjectId,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema, 'wishlist');

module.exports = Wishlist;
