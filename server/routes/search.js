// Packages
const router = require('express').Router();

// Controllers
const {searchWeatherCurrent, searchWeatherDaily, searchCityCoord} = require('../controllers/search');

// Search current weather forecast
router.get('/current', searchWeatherCurrent);

// Search daily weather forecast
router.get('/daily', searchWeatherDaily);

// Search city coordinates
router.get('/cities/:city', searchCityCoord);

module.exports = router;