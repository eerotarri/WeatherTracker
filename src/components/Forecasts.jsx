import axios from 'axios';
import { useEffect, useState } from "react";
import { Forecast } from "./Forecast";
import { refreshRate } from "../data/constants";

/**
* A React component that contains the forecast blocks for a given location.
* Represents the container which holds the forecast weather information blocks for a given location.
* @param {Object} props.location - An object that contains the location information for which forecast is to be displayed.
* @param {string} props.location.name - The name of the location.
* @param {number} props.location.lat - The latitude of the location.
* @param {number} props.location.lon - The longitude of the location.
* @returns {JSX.Element} - A div with the forecast weather information for the given location.
*/

export const Forecasts = (props) => {
    const [ forecast, setForecast ] = useState(null);
    
    /**
     * A function that fetches the forecast data for a given location and saves it to state.
     */
    const getForecast = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.location.lat}&lon=${props.location.lon}&appid=${window.env.APPID}&cnt=6`)
        .then(response => response.data)
        .then(data => {
            setForecast(data);
        })
        .catch(error => {
            setForecast(error.response.data);
        });

        // Reiterate the function after refreshRate.
        setTimeout(() => {
            getForecast();
        }, refreshRate); // refreshRate can be adjusted in constants/constants.js
    }

    useEffect(() => {
        getForecast();
    }, [])

    // If the data has not been fetched yet, display a message
    if (!forecast) {
        return <div data-testid="loading" >{ 'Loading...' }</div>;
    }

    // If the data has been fetched but the API returns an error, display the error message
    if (forecast.cod !== "200") {
        return <div data-testid="api-error" >{ forecast.message }</div>;
    }

    // Take API data and map it to Forecast components
    const containers = forecast.list.slice(1, 6).map((forecast, index) => {
        return <Forecast key={index} forecast={forecast} />;
    }) 

	return (
        <div className="forecasts-container" data-testid={'forecasts'}>{ containers }</div>
    );
};