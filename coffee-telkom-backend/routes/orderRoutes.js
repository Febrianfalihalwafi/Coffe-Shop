const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
<<<<<<< HEAD
const admin = require('../middleware/admin');


// USER 

// GET /api/order/my → user lihat pesanan sendiri
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// POST /api/order → user buat pesanan
router.post('/', auth, async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ msg: 'Items tidak boleh kosong' });
  }

  try {
=======

// POST /api/order
router.post('/', auth, async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0)
    return res.status(400).json({ msg: 'Items tidak boleh kosong' });

  try {
    // Hitung total dari data cart yang dikirim frontend
    // (tidak perlu lookup ke DB karena menu ada di CartContext)
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
    const processedItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const totalAmount = processedItems.reduce(
<<<<<<< HEAD
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // nomor antrian otomatis
    const lastOrder = await Order.findOne().sort({ queueNumber: -1 });
    const queueNumber =
      lastOrder && lastOrder.queueNumber ? lastOrder.queueNumber + 1 : 1;

=======
      (sum, item) => sum + item.price * item.quantity, 0
    );

>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
    const newOrder = new Order({
      userId: req.user._id,
      items: processedItems,
      totalAmount,
<<<<<<< HEAD
      queueNumber,
=======
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
      status: 'pending',
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

<<<<<<< HEAD

// ADMIN

// GET /api/order/all → admin lihat semua order
router.get('/all', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// PUT /api/order/:id/status → admin update status
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ msg: 'Order tidak ditemukan' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
=======
module.exports = router;
>>>>>>> dbf93039bff7ee776a341311335251917a043ddf
