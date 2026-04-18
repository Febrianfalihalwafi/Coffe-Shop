const midtransClient = require('midtrans-client');


const snap = new midtransClient.Snap({
isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
serverKey: process.env.MIDTRANS_SERVER_KEY,
clientKey: process.env.MIDTRANS_CLIENT_KEY
});


exports.createTransaction = async (req, res) => {
try {
const { order_id, gross_amount, items, customer } = req.body;
const parameter = {
transaction_details: { order_id, gross_amount },
item_details: items || [],
customer_details: customer || {},
};
const transaction = await snap.createTransaction(parameter);
// transaction: { token, redirect_url }
res.json(transaction);
} catch (err) {
console.error('Midtrans create error', err);
res.status(500).json({ message: 'Failed to create transaction' });
}
};


// notification handler (Midtrans server -> this endpoint)
exports.notification = async (req, res) => {
try {
const notificationBody = req.body;
// You can validate signature or fetch transaction status via Core API
console.log('Midtrans notification:', notificationBody);
// handle status change (e.g., settlement, capture, cancel)
res.status(200).json({ ok: true });
} catch (err) {
console.error(err);
res.status(500).json({ ok: false });
}
};