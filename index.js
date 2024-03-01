const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

const languageMiddleware = require('./middlewares/language');
const connectDB = require('./database');
const mainRoutes = require('./routes/main');
const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const readRoutes = require('./routes/readMore');
const leagueRoutes = require('./routes/league');

// Configure dotenv
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));

app.use(languageMiddleware);

app.use(mainRoutes);
app.use(blogRoutes);
app.use(adminRoutes);
app.use(authRoutes);
app.use(readRoutes);
app.use(leagueRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

app.get('/change-language', (req, res) => {
    const selectedLanguage = req.query.lang;
    if (selectedLanguage) {
        req.session.language = selectedLanguage;
    }

    res.redirect(req.headers.referer || '/');
});


// async function changeLang(lang){
//     if (lang == 'en' || URL == '/main'){
//         document.getElementById('lang').className = 'fi fi-gb';
//         window.location.href = '/main/';
//     }else{
//         document.getElementById('lang').className = 'fi fi-ru';
//         window.location.href = '/main/ru';
//         photoUrl = photoData.urls.regular;
//     }
// }