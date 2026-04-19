const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// POST /api/order
router.post('/', auth, async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0)
    return res.status(400).json({ msg: 'Items tidak boleh kosong' });

  try {
    // Hitung total dari data cart yang dikirim frontend
    // (tidak perlu lookup ke DB karena menu ada di CartContext)
    const processedItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const totalAmount = processedItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    const newOrder = new Order({
      userId: req.user._id,
      items: processedItems,
      totalAmount,
      status: 'pending',
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
