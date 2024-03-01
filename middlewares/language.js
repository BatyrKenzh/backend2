const fs = require('fs');
const path = require('path');

function loadTranslations(language) {
    const filepath = path.join(__dirname, '..', 'locales', language + '.json');
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

function languageMiddleware(req, res, next) {
    const language = req.query.lang || req.session.language || 'en';
    req.session.language = language; 
    res.locals.language = language;
    res.locals.translations = loadTranslations(language);
    next();
}

module.exports = languageMiddleware;