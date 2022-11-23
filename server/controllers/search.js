// Packages
const axios = require('axios');
require("dotenv").config();

// Functino for searching coordinates of cities
const searchCityCoord = async (req, res) => {
    try {
        const cityName = req.params.city;

        const params = {
            access_key: process.env.REACT_APP_GEOCOORD_API_KEY,
            query: cityName
        }

        // Getting location coordinates
        axios.get('http://api.positionstack.com/v1/forward', {params})
            .then(response => {
                res.json(response.data);
            }).catch(error => {
                console.log(error);
                res.status(500).send();
            });
    } catch (error){
        console.log(error);
        res.status(500).send();
    }
}

// Function for letting the server to handle the API request from the front end
const searchWeather = async (req, res) => {
    try {
        const latitude = req.query.lat;
        const longitude = req.query.lon;
        // Getting forecast data based on the location coordinates
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
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

module.exports = { searchWeather, searchCityCoord }