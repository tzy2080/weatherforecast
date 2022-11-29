import CurrentWeather from "./Current";
import HourlyWeather from "./Hourly";

// Display weather data
const DisplayWeather = ({weatherData}) => {
    const current = weatherData.current;
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
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-current" role="tabpanel" aria-labelledby="pills-current-tab">
                        <CurrentWeather current={current} />
                    </div>
                    <div className="tab-pane fade" id="pills-hourly" role="tabpanel" aria-labelledby="pills-tab">
                        <HourlyWeather hourly={hourly}/>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DisplayWeather;