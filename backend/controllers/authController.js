const bcrypt = require('bcryptjs');
const User = require('../models/User');


exports.register = async (req, res) => {
const { name, email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
try {
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'User already exists' });
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);
const user = await User.create({ name, email, password: hashed });
// optionally log user in immediately
req.login(user, (err) => {
if (err) return res.status(500).json({ message: 'Login after register failed' });
res.json({ message: 'Registered', user: { id: user.id, email: user.email, name: user.name } });
});
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.login = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Invalid credentials' });
req.login(user, (err) => {
if (err) return res.status(500).json({ message: 'Login failed' });
res.json({ message: 'Logged in', user: { id: user.id, email: user.email, name: user.name } });
});
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.logout = (req, res) => {
req.logout(() => {
res.json({ message: 'Logged out' });
});
};