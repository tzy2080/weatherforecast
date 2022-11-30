import ConvertFirstWordUpper from "./ConvertFirstWordUpper";
import moment from 'moment';
import { MdVisibility } from 'react-icons/md';
import { WiWindy, WiStrongWind, WiHumidity, WiBarometer, WiCloudy } from 'react-icons/wi';

// Template for displaying hourly data
const Hourly = ({index, data, timezone}) => {
    const collapseName = "collapse" + index;
    const headingName = "heading" + index;
    const time = moment.unix(data.dt).utcOffset(timezone/60).format('D/M/YYYY h:mm A');
    const icon = data.weather[0].icon;
    const weatherDescription = ConvertFirstWordUpper(data.weather[0].description);
    const temperature = data.main.temp;
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    const windSpeed = data.wind_speed;
    const windGust = data.wind_gust;
    const tempFeelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const cloudiness = data.clouds.all;
    const visibility = data.visibility;
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
                                { minTemp!==undefined &&
                                    <div className="row mb-2">
                                        <div className="col px-0">
                                            <span className="weather-label"><i className="bi bi-thermometer-low weather-icon-bootstrap px-1"></i> Min Temp:</span> 
                                        </div>
                                        <div className="col px-0">
                                            <span className="weather-data">{minTemp} m/s</span>
                                        </div>
                                    </div>
                                }
                                { maxTemp!==undefined &&
                                    <div className="row mb-2">
                                        <div className="col px-0">
                                            <span className="weather-label"><i className="bi bi-thermometer-high weather-icon-bootstrap px-1"></i> Max Temp:</span> 
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
const HourlyWeather = ({hourly}) => {
    const hourlyData = hourly.list;

    return (
        hourlyData.map((currentHour, index) => {
            return (
                <Hourly data={currentHour} timezone={hourly.city.timezone} index={index} key={index}/>
            )
        })
    );
}

export default HourlyWeather;