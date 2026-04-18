const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// Endpoint untuk seed menu ke database
router.post('/seed', async (req, res) => {
  const menuItems = [
    {
      name: "Espresso",
      desc: "Kopi hitam murni dengan rasa kuat dan aroma tajam.",
      img: "/espresso.jpg",
      price: 25000,          // 👈 Diubah jadi angka
      category: "Hot"
    },
    {
      name: "Cappuccino",
      desc: "Kombinasi espresso, susu hangat, dan foam lembut di atasnya.",
      img: "/cappucino.jpeg",
      price: 28000,          // 👈 Diubah jadi angka
      category: "Hot"
    },
    {
      name: "Latte",
      desc: "Espresso lembut dengan susu steamed hangat dan sedikit foam.",
      img: "/latte.jpg",
      price: 30000,          // 👈 Diubah jadi angka
      category: "Hot"
    },
    {
      name: "Cold Brew",
      desc: "Kopi diseduh dingin selama 12 jam, rasa halus dan menyegarkan.",
      img: "/coldbrew.jpeg",
      price: 33000,          // 👈 Diubah jadi angka
      category: "Cold"
    },
    {
      name: "Iced Latte",
      desc: "Latte versi dingin dengan susu segar dan es batu.",
      img: "/iced-latte.jpg",
      price: 30000,          // 👈 Diubah jadi angka
      category: "Cold"
    },
    {
      name: "Matcha Latte",
      desc: "Teh hijau Jepang dengan susu segar — lembut dan menenangkan.",
      img: "/matcha-latte.jpg",
      price: 33000,          // 👈 Diubah jadi angka
      category: "Non-Coffee"
    }
  ];

  try {
    // Hapus semua menu lama (opsional)
    await Menu.deleteMany({});

    // Tambahkan semua menu baru
    await Menu.insertMany(menuItems);

    res.status(201).json({ msg: 'Menu seeded successfully', data: menuItems });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Endpoint untuk mendapatkan semua menu
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// GET /api/menu/all - Untuk lihat semua menu
router.get('/all', async (req, res) => {
  try {
    const menus = await Menu.find().select('_id name price'); // Hanya tampilkan ID, nama, harga
    res.json(menus);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/menu - Tambah menu baru
router.post('/', async (req, res) => {
  const { name, price, image, description } = req.body;

  try {
    const newMenu = new Menu({
      name,
      price: Number(price),  // 👈 Pastikan price jadi angka
      image,
      description
    });

    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;