const mongoose = require('mongoose');
const { Schema } = mongoose;

const ColorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  class: { type: String, required: true, unique: true },
  selectedClass: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Color', ColorSchema);
