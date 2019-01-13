const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('Event', eventSchema);
