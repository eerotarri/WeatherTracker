import { useEffect, useState } from "react";
import { unixTimeStampToDate } from "../utils";
import { KELVIN, refreshRate } from "../constants/constants.js";
import axios from "axios";

/**
* A React component that displays the current weather information for a given location.
* Represents the current weather information block for a given location.
* @param {Object} props.location - An object that contains the location information for which weather is to be displayed.
* @param {string} props.location.name - The name of the location.
* @param {number} props.location.lat - The latitude of the location.
* @param {number} props.location.lon - The longitude of the location.
* @returns {JSX.Element} - A div with the current weather information for the given location.
*/

export const CurrentWeather = (props) => {
    const [ currentWeather, setCurrentWeather] = useState({});

    /**
     * A function that fetches the current weather information for a given location and saves it to state.
     */
    const getCurrentWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.location.lat}&lon=${props.location.lon}&appid=${window.env.APPID}`)
        .then(response => response.data)
        .then(data => {
            setCurrentWeather(data);
        })
        .catch(error => {
            setCurrentWeather(error.response.data);
        });

        // Reiterate the function after refreshRate
        setTimeout(() => {
            getCurrentWeather();
        }, refreshRate); // refreshRate can be adjusted in constants/constants.js
    }
    
    useEffect(() => {
        getCurrentWeather();
    }, [])

    // If the data has not been fetched yet, display a message
    if (!currentWeather) {
        return <div>{ 'Data has not been fetched yet' }</div>;
    }

    // If the data has been fetched but the API returns an error, display the error message
    if (currentWeather.cod !== 200) {
        return <div>{ currentWeather.message }</div>;
    }

	return (
        <div data-testid={'current-weather-1'} className="currentweather-container" >
            <div className="top-left">
                <div className="city-name">{ props.location.name || 'Undefined' }</div>
                <div className="small-grey">{ currentWeather.weather[0].description }</div>
            </div>
            <div className="top-right">
                <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="Icon" />
                <span className="temperature">{ `${Math.round(currentWeather.main.temp - KELVIN)} \u2103` }</span>
            </div>
            { unixTimeStampToDate(currentWeather.dt + currentWeather.timezone) }
            <div className="bottom-right small-grey">
                <div>{ 'Wind: ' + currentWeather.wind.speed }</div>
                <div>{ 'Humidity: ' + currentWeather.main.humidity + ' %' }</div>
                { currentWeather.rain && currentWeather.rain.hasOwnProperty('3h') ? 
                    <div>{ 'Precipitation (3 h): ' + (currentWeather.rain["3h"]) + ' mm' }</div> 
                    : <div>{ 'Precipitation (3 h): 0 mm' }</div>  }
            </div>
        </div>
    );
};

export default CurrentWeather;