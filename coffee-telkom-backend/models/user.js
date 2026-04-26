const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     String,
  email:    { type: String, unique: true, sparse: true },
  password: String,
<<<<<<< HEAD

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

=======
  role:     { type: String, default: 'user' },
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
  googleId: { type: String, sparse: true },
  avatar:   String,
}, { timestamps: true });

<<<<<<< HEAD
module.exports = mongoose.model('User', userSchema);
=======
module.exports = mongoose.model('User', userSchema);
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
