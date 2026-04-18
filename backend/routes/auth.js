const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // sukses -> kirim token atau redirect ke frontend
  res.redirect(`${process.env.FRONTEND_URL}/auth-success`);
});

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/auth-success`);
});

module.exports = router;
