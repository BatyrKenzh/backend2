const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ensureAuthenticated } = require('../middlewares/middlewares');

router.get('/readMore', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get('https://api.sportsdata.io/v4/soccer/scores/json/Areas?key=129b42a837514cec97ddde2de07292a7');
        const data = response.data;
        const isAdmin = req.session.user ? req.session.user.isAdmin : false;
        const loggedIn = req.session.user ? true : false;

        res.render('readMore', {
            data: data,
            isAdmin: isAdmin,
            loggedIn: loggedIn
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
