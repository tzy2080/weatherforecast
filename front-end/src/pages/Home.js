import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CityList from '../components/CityList';
import '../css/Index/index.css';
import DisplayWeather from '../components/DisplayWeather';

const GetForecast = () => {
    // State hooks
    const [cityName, setCityName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [selectSearchResult, setSelectSearchResult] = useState(false);

    // Renders again after retrieving the data from the api
    useEffect(() => {
    },[weatherData]);
        
    return (
        <div className="body-wrapper">
            <div className="row mx-0 justify-content-center">
                <div className="col-12 col-sm-7 text-center">
                    <h1 className="page-title">WEATHER FORECAST APP</h1>
                    <h2 className="page-title">Powered by React.js and OpenWeatherMap</h2>
                </div>
            </div>
            <SearchBar cityName={cityName} setCityName={setCityName} setSearchResult={setSearchResult} setSelectSearchResult={setSelectSearchResult} setNotFound={setNotFound} />
            <div className="row mx-0 justify-content-center">
                <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
                    { (searchResult !== {} && !selectSearchResult) && <CityList cityName={cityName} searchResult={searchResult} setWeatherData={setWeatherData} setSelectSearchResult={setSelectSearchResult}/> }
                    { selectSearchResult && <DisplayWeather weatherData={weatherData}/>}
                    { notFound && 
                        <div className="text-center">
                            No result found, please ensure that the city name is correct
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GetForecast;