const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: { type: Number, required: true },
<<<<<<< HEAD

  
  queueNumber: {
    type: Number,
  },
  status: {
    type: String,
    default: 'pending'
  },

=======
  status: { type: String, default: 'pending' },
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);