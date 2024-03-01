const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated } = require('../middlewares/middlewares');

router.get('/admin', ensureAuthenticated, async (req, res) => {
    try {
        const users = await User.find();
        const isAdmin = req.session.user.isAdmin ? true : false;
        const loggedIn = req.session.user ? true : false;

        res.render('admin', {
            users: users,
            isAdmin: isAdmin,
            loggedIn: loggedIn
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error loading admin page');
    }
});

router.post('/admin/adduser', ensureAuthenticated, async (req, res) => {
    const { username, password, firstName, lastName, age, gender, country } = req.body;
    const role = 'User';
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        const user = new User({
            firstName,
            lastName,
            username,
            role,
            password,
            age,
            gender,
            country
        });

        await user.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Server error');
    }
});

router.post('/admin/edituser/:userId', ensureAuthenticated, async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, firstName, lastName, age, gender, country /* other fields */ } = req.body;

        await User.findByIdAndUpdate(userId, { username, firstName, lastName, age, gender, country /* other fields */ });

        res.redirect('/admin');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
});

router.post('/admin/deleteuser/:userId', ensureAuthenticated, async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.redirect('/admin');
});

module.exports = router;
