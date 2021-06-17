const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  pseudo: {
    type: String,
    trim: true,
    required: [true, 'Veuillez entrer un pseudo']
  },
  email: {
    type: String,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Votre adresse E-mail n\'est pas valide',
    ],
    required: [true, 'Veuillez entrer une adresse E-mail'],
    unique: true,
    lowercase: true,
    dropDups: true
  },
  password: {
    type: String,
    required: [true, 'Veuillez entrer un mot de passe'],
    minlength: [6, 'Votre mot de passe doit contenir au moins 6 caractères'],
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;