const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
<<<<<<< HEAD
  desc: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
=======
  price: { type: Number, required: true },
  image: String,
  category: String
});

module.exports = mongoose.model('menu', menuSchema);
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
