const express = require('express');
const router = express.Router();
const axios = require('axios');
const { ensureAuthenticated } = require('../middlewares/middlewares');

// Function to fetch countries data
// async function fetchCountries() {
//     const apiUrl = '';
//     try {
//         const response = await axios.get(apiUrl);
//         if (response.status === 200 && response.data && response.data.data) {
//             return response.data.data;
//         } else {
//             throw new Error('Failed to fetch countries');
//         }
//     } catch (error) {
//         console.error('Error fetching countries:', error);
//         return null;
//     }
// }

async function fetchCountries(lang = 'EN') {
    let apiUrl = `https://api.soccersapi.com/v2.2/countries/?user=Kenzheahmetov0403&token=7b7886886f3f106402ddefe7dfe8fdd6&t=list`;

    if (lang !== 'EN') {
        apiUrl += `&lang=${lang}`;
    }

    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200 && response.data && response.data.data) {
            return response.data.data;
        } else {
            throw new Error('Failed to fetch countries');
        }
    } catch (error) {
        console.error('Error fetching countries:', error);
        return null;
    }
}


router.get('/league', ensureAuthenticated, async (req, res) => {
    const lang = req.session.user && req.session.user.language ? req.session.user.language : (req.query.lang || 'EN');
    const countries = await fetchCountries(lang);

    const loggedIn = req.session.user ? true : false;
    res.render('league', { 
        countries: countries,
        isAdmin: req.session.user && req.session.user.isAdmin,
        loggedIn: loggedIn
    });
});



module.exports = router;
