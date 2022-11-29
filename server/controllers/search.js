// Packages
const axios = require('axios');
require("dotenv").config();

// Returns a list of cities with its coordinates
const searchCityCoord = async (req, res) => {
    try {
        const cityName = req.params.city;

        // Getting location coordinates
        axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
            .then(response => {
                res.json(response.data.results);
            }).catch(error => {
                console.log(error);
                res.status(500).send();
            });
    } catch (error){
        console.log(error);
        res.status(500).send();
    }
}

// Returns data for current weather forecast
const searchWeatherCurrent = async (req, res) => {
    try {
        // Coordinates
        const latitude = req.query.lat;
        const longitude = req.query.lon;

        // Getting forecast data based on the location coordinates
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}&units=metric`)
            .then((response) => {
                res.json(response.data);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).send();
            })
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

// Returns data for daily weather forecast
const searchWeatherDaily = async (req, res) => {
    try {
        // Coordinates
        const latitude = req.query.lat;
        const longitude = req.query.lon;

        // Getting forecast data based on the location coordinates
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.API_KEY}&units=metric`)
            .then((response) => {
                res.json(response.data);
            })
            .catch((error) => {
                console.log(error);
                res.status(404).send();
            })
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

module.exports = { searchWeatherDaily, searchWeatherCurrent, searchCityCoord }