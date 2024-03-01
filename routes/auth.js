const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    console.log("Login attempt for user:", req.body.username);
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.user = { username, isAdmin: true };
        return res.redirect('/admin');
    }

    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = { username, isAdmin: !!user.isAdmin };
        return res.redirect('/');
    }

    res.render('login', { message: 'Invalid username or password' });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, password, age, gender, country } = req.body;
        
        if (!firstName || !lastName || !username || !password || !age || !gender || !country) {
            return res.status(400).render('register', { message: 'All fields are required' });
        }
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).render('register', { message: 'Username already exists' });
        }
        
        const user = new User({
            firstName,
            lastName,
            username,
            role: 'user',
            age,
            gender,
            country,
            password
        });
        
        await user.save();
        
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).render('register', { message: 'Server error' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error while logging out:', err);
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;