import axios from "axios";

// Displays the list of cities after clicking search
const CityList = ({cityName, searchResult, setWeatherData, setSelectSearchResult}) => {
    // Retrieve weather forecast data based on the selected city
    const getWeatherForecast = (latitude, longitude) => {
        let currentWeatherData = null;
        let hourlyWeatherData= null;

        return (  
            axios.get(`http://localhost:5000/search/current?lat=${latitude}&lon=${longitude}`)
            .then((res) => {
                currentWeatherData = res.data;
                axios.get(`http://localhost:5000/search/daily?lat=${latitude}&lon=${longitude}`)
                .then((res) => {
                    hourlyWeatherData = res.data;
                    setWeatherData({"current": currentWeatherData, "hourly": hourlyWeatherData});
                    setSelectSearchResult(true);
                }).catch((error) => {
                    console.log(error);
                    setSelectSearchResult(false);
                })
            })
            .catch((error) => {
                console.log(error);
                setSelectSearchResult(false);
            })
        );
    }

    // Template for displaying each city
    const City = ({data}) => {
        return (
            <li className="list-group-item btn items text-left pl-2 pl-sm-5 py-3" onClick={() => getWeatherForecast(data.latitude, data.longitude) }>
                {`${data.name}, ${data.admin1}, ${data.country}` }
            </li>
        )
    }

    return (
        <div className="row mx-0 justify-content-center">
            <div className="col-12 col-md-8">
                <span className="search-result-description pb-4">Showing <strong>{searchResult.length}</strong> locations for {`"${cityName}"`}</span>
                <ul className="list-group frame mt-2">
                    {
                        searchResult.map((city, index) => {
                            return (
                                <City data={city} key={index} />
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default CityList;