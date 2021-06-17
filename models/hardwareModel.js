const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hardwareSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Veuillez entrer une console']
  },
  company: {
    type: String,
    trim: true,
    required: [true, 'Veuillez entrer une console']
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

const Hardware = mongoose.model('Hardware', hardwareSchema, 'hardware');

module.exports = Hardware;
