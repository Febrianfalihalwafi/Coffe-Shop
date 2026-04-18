const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


// create snap token
router.post('/snap-token', paymentController.createTransaction);


// midtrans notification
router.post('/notification', paymentController.notification);


module.exports