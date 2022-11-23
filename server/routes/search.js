// Packages
const router = require('express').Router();

// Controllers
const controller = require('../controllers/search');

// Search weather
router.get('/city', controller.searchWeather);

// Search city coordinates
router.get('/cities/:city', controller.searchCityCoord);

module.exports = router;