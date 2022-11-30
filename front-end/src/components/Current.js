import ConvertFirstWordUpper from "./ConvertFirstWordUpper";
import moment from 'moment';
import { MdVisibility } from 'react-icons/md';
import { WiWindy, WiStrongWind, WiHumidity, WiBarometer, WiCloudy } from 'react-icons/wi';

// Displays current weather data
const CurrentWeather = ({current}) => {
    const icon = current.weather[0].icon;
    const weatherDescription = ConvertFirstWordUpper(current.weather[0].description);
    const temperature = current.main.temp;
    const minTemp = current.temp_min;
    const maxTemp = current.temp_max;
    const time = moment.unix(current.dt).utcOffset(current.timezone/60).format('h:mm A');
    const windSpeed = current.wind_speed;
    const windGust = current.wind_gust;
    const tempFeelsLike = current.main.feels_like;
    const humidity = current.main.humidity;
    const pressure = current.main.pressure;
    const cloudiness = current.clouds.all;
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
                    { minTemp!==undefined &&
                        <div className="row mb-2">
                            <div className="col px-0">
                                <span className="weather-label"><i className="bi bi-thermometer-low weather-icon-bootstrap"></i>Min Temp:</span> 
                            </div>
                            <div className="col px-0">
                                <span className="weather-data">{minTemp} m/s</span>
                            </div>
                        </div>
                    }
                    { maxTemp!==undefined &&
                        <div className="row mb-2">
                            <div className="col px-0">
                                <span className="weather-label"><i className="bi bi-thermometer-high weather-icon-bootstrap"></i>Max Temp:</span> 
                            </div>
                            <div className="col px-0">
                                <span className="weather-data">{maxTemp} m/s</span>
                            </div>
                        </div>
                    }
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

export default CurrentWeather;