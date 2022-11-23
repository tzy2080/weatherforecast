import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import momenttz from 'moment-timezone';
import { HiExclamationCircle } from 'react-icons/hi';
import { GiRadiations } from 'react-icons/gi';
import { MdVisibility } from 'react-icons/md';
import { WiWindy, WiStrongWind, WiHumidity, WiBarometer, WiCloudy, WiRaindrop } from 'react-icons/wi';
import '../../css/GetForecast/GetForecast.css';

const GetForecast = () => {
    // State hooks
    const [weatherData, setWeatherData] = useState({});
    const [cityName, setCityName] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [selectSearchResult, setSelectSearchResult] = useState(false);

    // Function that handles the button 
    const Search = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/search/cities/${cityName}`)
            .then((res) => {
                setSelectSearchResult(false);
                setSearchResult(res.data.data);
                if (res.data.data.length === 0){
                    setNotFound(true);
                } else {
                    setNotFound(false);
                }
            }).catch(error => {
                console.log(error);
            })
    }

    // Renders again after retrieving the data from the api
    useEffect(() => {
    },[weatherData]);

    // Converts each word in the input sentence to uppercase
    function convertFirstWordUpper (sentence) {
        const words = sentence.split(" ");
        words[0] = words[0][0].toUpperCase() + words[0].substr(1);
        return words.join(" ");
    }
    
    // Displays current weather data
    function currentWeather(current){
        const icon = current.weather[0].icon;
        const weatherDescription = convertFirstWordUpper(current.weather[0].description);
        const temperature = current.temp;
        const time = moment.unix(current.dt).utcOffset(weatherData.timezone_offset/60).format('h:mm A');
        const windSpeed = current.wind_speed;
        const windGust = current.wind_gust;
        const tempFeelsLike = current.feels_like;
        const humidity = current.humidity;
        const pressure = current.pressure;
        const cloudiness = current.clouds;
        const uvi = current.uvi;
        const dewPoint = current.dew_point;
        const visibility = current.visibility;
        return (
            <div className="ml-2 ml-md-4">
                <div className="row mb-4">
                    <span className="align-self-center ml-2 ml-sm-4 time">{time}</span>
                    <img className="condition-icon-hourly ml-2 ml-sm-5" src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather-condition"></img>
                    <span className="align-self-center temp ml-2 ml-sm-4">{temperature}°C</span>
                    <span className="align-self-center description ml-2 ml-sm-4">{weatherDescription}</span>
                    {tempFeelsLike!==undefined && <span className="align-self-center realfeel ml-2 ml-sm-4">Real Feel: {tempFeelsLike}°C</span>}
                </div>
                <div className="row">
                    <div className="col-6 pl-4">
                        {windSpeed!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label"><WiWindy className="weather-icon"/>Wind Speed:</span> 
                                </div>
                                <div className="col px-0">
                                    <span className="weather-data">{windSpeed} m/s</span>
                                </div>
                            </div>
                        }
                        {windGust!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label"><WiStrongWind className="weather-icon"/>Wind Gust:</span> 
                                </div>
                                <div className="col px-0">
                                    <span className="weather-data">{windGust} m/s</span>
                                </div>
                            </div>
                        }
                        {pressure!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label"><WiBarometer className="weather-icon"/>Pressure:</span> 
                                </div>
                                <div className="col">
                                    <span className="weather-data">{pressure} hPa</span>
                                </div>
                            </div>
                        }
                        {humidity!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label"><WiHumidity className="weather-icon"/>Humidity:</span> 
                                </div>
                                <div className="col px-0">
                                    <span className="weather-data">{humidity}%</span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="col-6">
                        {cloudiness!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label"><WiCloudy className="weather-icon"/>Cloudiness:</span> 
                                </div>
                                <div className="col px-0">
                                    <span className="weather-data">{cloudiness}%</span>
                                </div>
                            </div>
                        }
                        {uvi!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label pl-2"><GiRadiations className="uv-icon"/> UV index:</span> 
                                </div>
                                <div className="col px-0">
                                    <span className="weather-data">{uvi}</span>
                                </div>
                            </div>
                        }
                        {dewPoint!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label"><WiRaindrop className="weather-icon"/>Dew point:</span> 
                                </div>
                                <div className="col px-0">
                                    <span className="weather-data">{dewPoint}°C</span>
                                </div>
                            </div>
                        }
                        {visibility!==undefined && 
                            <div className="row mb-2">
                                <div className="col px-0">
                                    <span className="weather-label"><MdVisibility className="weather-icon"/>Visibility:</span> 
                                </div>
                                <div className="col px-0">
                                    <span className="weather-data">{visibility/1000} km</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    // Template for displaying hourly data
    const Hourly = props => {
        const collapseName = "collapse" + props.index;
        const headingName = "heading" + props.index;
        const time = (momenttz.tz(`${moment.unix(props.data.dt).utcOffset(weatherData.timezone_offset/60).format('D/M/YYYY h:mm A')}`, "D/M/YYYY h:mm A", weatherData.timezone)).format("h A");
        const icon = props.data.weather[0].icon;
        const weatherDescription = convertFirstWordUpper(props.data.weather[0].description);
        const temperature = props.data.temp;
        const windSpeed = props.data.wind_speed;
        const windGust = props.data.wind_gust;
        const tempFeelsLike = props.data.feels_like;
        const humidity = props.data.humidity;
        const pressure = props.data.pressure;
        const cloudiness = props.data.clouds;
        const uvi = props.data.uvi; 
        const dewPoint = props.data.dew_point;
        const visibility = props.data.visibility;
        return (
            <div id="accordion" className="my-3">
                <div className="card shadow-sm">
                    <div className="card-header btn btn-link py-0 inner-card-style" id={headingName} data-toggle="collapse" data-target={`#${collapseName}`} aria-expanded="false" aria-controls={collapseName}>
                        <div className="row">
                            <span className="align-self-center ml-2 ml-sm-4 time">{time}</span>
                            <img className="condition-icon-hourly ml-2 ml-sm-5" src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather-condition"></img>
                            <span className="align-self-center temp ml-2 ml-sm-4">{temperature}°C</span>
                            <span className="align-self-center description ml-2 ml-sm-4">{weatherDescription}</span>
                            {tempFeelsLike!==undefined && <span className="align-self-center realfeel ml-2 ml-sm-4">Real Feel: {tempFeelsLike}°C</span>}
                        </div>
                    </div>

                    <div id={collapseName} className="collapse show" aria-labelledby={headingName} data-parent="#accordion">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6 pl-4">
                                    {windSpeed!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiWindy className="weather-icon"/>Wind Speed:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{windSpeed} m/s</span>
                                            </div>
                                        </div>
                                    }
                                    {windGust!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiStrongWind className="weather-icon"/>Wind Gust:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{windGust} m/s</span>
                                            </div>
                                        </div>
                                    }
                                    {pressure!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiBarometer className="weather-icon"/>Pressure:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{pressure} hPa</span>
                                            </div>
                                        </div>
                                    }
                                    {humidity!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiHumidity className="weather-icon"/>Humidity:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{humidity}%</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-6">
                                    {cloudiness!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label"><WiCloudy className="weather-icon"/>Cloudiness:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{cloudiness}%</span>
                                                </div>
                                            </div>
                                        }
                                        {uvi!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label pl-2"><GiRadiations className="uv-icon"/> UV index:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{uvi}</span>
                                                </div>
                                            </div>
                                        }
                                        {dewPoint!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label"><WiRaindrop className="weather-icon"/>Dew point:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{dewPoint}°C</span>
                                                </div>
                                            </div>
                                        }
                                        {visibility!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label"><MdVisibility className="weather-icon"/>Visibility:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{visibility/1000} km</span>
                                                </div>
                                            </div>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Displays hourly weather data
    function hourlyWeather(hourly){
        // Filter off data that is not at the current day (API provides up to 48 hours of forecast, requires filter)
        const hourlyData = [];
        hourly.forEach(current => {
            const endTime = momenttz.tz(`${moment.unix(weatherData.current.dt).utcOffset(weatherData.timezone_offset/60).format('D/M/YYYY')} 11:59 PM`, "D/M/YYYY h:mm A", weatherData.timezone);
            const currentTime = momenttz.tz(`${moment.unix(current.dt).utcOffset(weatherData.timezone_offset/60).format('D/M/YYYY h:mm A')}`, "D/M/YYYY h:mm A", weatherData.timezone);
            
            if (currentTime.isBefore(endTime)){
                hourlyData.push(current)
            }
        })
        return (
            hourlyData.map((currentHour, index) => {
                return (
                    <Hourly data={currentHour} index={index} key={index}/>
                )
            })
        );
    }

    // Template for displaying daily data
    const Daily = props => {
        const collapseName = "collapse" + props.index;
        const headingName = "heading" + props.index;
        const time = (momenttz.tz(`${moment.unix(props.data.dt).utcOffset(weatherData.timezone_offset/60).format('D/M/YYYY h:mm A')}`, "D/M/YYYY h:mm A", weatherData.timezone)).format("ddd D/M");
        const icon = props.data.weather[0].icon;
        const weatherDescription = convertFirstWordUpper(props.data.weather[0].description);
        const temperatureMin = props.data.temp.min;
        const temperatureMax = props.data.temp.max;
        const windSpeed = props.data.wind_speed;
        const windGust = props.data.wind_gust;
        const tempFeelsLikeDay = props.data.feels_like.day;
        const tempFeelsLikeNight = props.data.feels_like.night;
        const humidity = props.data.humidity;
        const pressure = props.data.pressure;
        const cloudiness = props.data.clouds;
        const uvi = props.data.uvi; 
        const dewPoint = props.data.dew_point;
        const visibility = props.data.visibility;
        return (
            <div id="accordion" className="my-3">
                <div className="card shadow-sm">
                    <div className="card-header btn btn-link py-0 inner-card-style" id={headingName} data-toggle="collapse" data-target={`#${collapseName}`} aria-expanded="false" aria-controls={collapseName}>
                        <div className="row">
                            <span className="align-self-center ml-2 ml-sm-4 time">{time}</span>
                            <img className="condition-icon-hourly ml-2 ml-sm-5" src={`http://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather-condition"></img>
                            <span className="align-self-center temp ml-2 ml-sm-4">{temperatureMin}°C Min/{temperatureMax}°C Max</span>
                            <span className="align-self-center description ml-2 ml-sm-4">{weatherDescription}</span>
                            {(tempFeelsLikeDay!==undefined && tempFeelsLikeNight!==undefined) && <span className="align-self-center realfeel ml-2 ml-sm-4">Real Feel: {tempFeelsLikeDay}°C Day/{tempFeelsLikeNight}°C Night</span>}
                        </div>
                    </div>

                    <div id={collapseName} className="collapse show" aria-labelledby={headingName} data-parent="#accordion">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6 pl-4">
                                    {windSpeed!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiWindy className="weather-icon"/>Wind Speed:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{windSpeed} m/s</span>
                                            </div>
                                        </div>
                                    }
                                    {windGust!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiStrongWind className="weather-icon"/>Wind Gust:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{windGust} m/s</span>
                                            </div>
                                        </div>
                                    }
                                    {pressure!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiBarometer className="weather-icon"/>Pressure:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{pressure} hPa</span>
                                            </div>
                                        </div>
                                    }
                                    {humidity!==undefined && 
                                        <div className="row mb-2">
                                            <div className="col px-0">
                                                <span className="weather-label"><WiHumidity className="weather-icon"/>Humidity:</span> 
                                            </div>
                                            <div className="col px-0">
                                                <span className="weather-data">{humidity}%</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="col-6">
                                    {cloudiness!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label"><WiCloudy className="weather-icon"/>Cloudiness:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{cloudiness}%</span>
                                                </div>
                                            </div>
                                        }
                                        {uvi!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label pl-2"><GiRadiations className="uv-icon"/> UV index:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{uvi}</span>
                                                </div>
                                            </div>
                                        }
                                        {dewPoint!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label"><WiRaindrop className="weather-icon"/>Dew point:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{dewPoint}°C</span>
                                                </div>
                                            </div>
                                        }
                                        {visibility!==undefined && 
                                            <div className="row mb-2">
                                                <div className="col px-0">
                                                    <span className="weather-label"><MdVisibility className="weather-icon"/>Visibility:</span> 
                                                </div>
                                                <div className="col px-0">
                                                    <span className="weather-data">{visibility/1000} km</span>
                                                </div>
                                            </div>
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Displays daily data
    function dailyWeather(daily){
        return (
            daily.map((currentDay, index) => {
                return (
                    <Daily data={currentDay} index={index} key={index}/>
                )
            })
        )
    }

    // Displays the retrieved weather data after clicking the search button
    function displayResult(){
        const current = weatherData.current;
        const daily = weatherData.daily;
        const hourly = weatherData.hourly;

        return (
            <div className="card shadow py-4 my-4">
                <div className="container-fluid">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active nav-pill-btn" id="pills-current-tab" data-toggle="pill" href="#pills-current" role="tab" aria-controls="pills-current" aria-selected="true">Current</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-pill-btn" id="pills-tab" data-toggle="pill" href="#pills-hourly" role="tab" aria-controls="pills-hourly" aria-selected="false">Hourly</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-pill-btn" id="pills-daily-tab" data-toggle="pill" href="#pills-daily" role="tab" aria-controls="pills-daily" aria-selected="false">Daily</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-current" role="tabpanel" aria-labelledby="pills-current-tab">{currentWeather(current)}</div>
                        <div className="tab-pane fade" id="pills-hourly" role="tabpanel" aria-labelledby="pills-tab">{hourlyWeather(hourly)}</div>
                        <div className="tab-pane fade" id="pills-daily" role="tabpanel" aria-labelledby="pills-daily-tab">{dailyWeather(daily)}</div>
                    </div>
                </div>
            </div>
        )
    }

    // Function that handles the selection of the city from the city result list
    const getWeatherForecast = (latitude,longitude) => {
        axios.get(`http://localhost:5000/search/city?lat=${latitude}&lon=${longitude}`)
            .then((res) => {
                setWeatherData(res.data);
                setSelectSearchResult(true);
            })
            .catch((error) => {
                console.log(error);
                setSelectSearchResult(false);
            })
    }

    // Template for displaying each city search result
    const City = props => {
        return (
            <li className="list-group-item btn items text-left pl-2 pl-sm-5 py-3" onClick={() => getWeatherForecast(props.data.latitude, props.data.longitude) }>
                {`${props.data.name}, ${props.data.region}, ${(props.data.county? `${props.data.county}, `:'')} ${props.data.country}` }
            </li>
        )
    }

    // Displays the list of cities after clicking search
    function displaySearchResult(){
        return (
            <div className="row mx-0 justify-content-center">
                <div className="col-12 col-md-8">
                    <span className="search-result-description pb-4">Showing <strong>{searchResult.length}</strong> locations for {`"${cityName}"`}</span>
                    <ul className="list-group frame mt-2">
                        {
                            searchResult.map((city, index) => {
                                return (
                                    <City data={city} index={index} key={index} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }

        
    return (
        <div className="body-wrapper">
            <div className="row mx-0 justify-content-center">
                <div className="col-12 col-sm-7 text-center">
                    <h1 className="page-title">WEATHER FORECAST APP</h1>
                    <h2 className="page-title">Powered by React.js and OpenWeatherMap</h2>
                </div>
            </div>
            <div className="row pt-5 mx-0 justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-5">
                    <form onSubmit={ Search }>
                        <div className="form-group">
                            <input type='text'
                                className="form-control pl-3"
                                value={ cityName }
                                placeholder="Search city"
                                onChange={ (e) => setCityName(e.target.value) }
                            />
                            <div className="row">
                                <div className="col-2 pr-0 mt-2 text-center">
                                    <HiExclamationCircle className="note-icon"/>
                                </div>
                                <div className="col-10 px-0 mt-2">
                                    <p className="advice-text mb-0">Please try to include country code for more accurate searching since there are countries that shares the same city name. Example, "London, GB" and "London, US".</p>
                                </div>
                            </div>
                            <div className="form-group pt-3 text-center">
                                <input type="submit" value="Search" className="btn btn btn-primary search-btn" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mx-0 justify-content-center">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
                    { (searchResult !== {} && !selectSearchResult) && displaySearchResult() }
                    { selectSearchResult && displayResult()}
                    { notFound && 
                        <div className="text-center">
                            Result cannot be found, please ensure city name is correct
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GetForecast;