import { useEffect } from "react";

/**
 * A React component that displays the forecast weather information for a given location.
 * Represents the forecast weather information block for a given locations single forecast for given time.
 * @param {Object} props.forecast - An object that contains the forecast information for which weather is to be displayed. 
 * For more information on the structure of this object, see the OpenWeatherMap API documentation at https://openweathermap.org/forecast5#JSON. 
 * @returns {JSX.Element} - A div with the forecast weather information for the given location and time.
 */

export const Forecast = (props) => {

    useEffect(() => {
    }, [])

	return (
        <div className="forecast-container" data-testid={'forecast-1'} >
            <div className="upper-white">
                <div className="small-grey">{ props.forecast.dt_txt.substr(11, 5) }</div>
                <img src={`http://openweathermap.org/img/wn/${props.forecast.weather[0].icon}@2x.png`} alt="Icon" />
                <div className="forecast-temp">{ props.forecast.main ? Math.round(props.forecast.main.temp - 273.15) + ' \u2103' : null}</div>
            </div>
            <div className="lower-blue">
                <div>{ props.forecast.wind ? props.forecast.wind.speed + ' m/s' : null}</div>
                <div>{ props.forecast.main ? props.forecast.main.humidity + ' %' : null}</div>
                { props.forecast.rain && props.forecast.rain.hasOwnProperty('3h') ? 
                    <div>{ (props.forecast.rain["3h"]) + ' mm' }</div> 
                    : <div>{ '0 mm' }</div>  }
            </div>
        </div>
    );
};

export default Forecast;