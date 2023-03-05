import { CurrentWeather } from "./CurrentWeather";
import { Forecasts } from "./Forecasts";

/**
 * A React component that contains the current weather and forecast blocks for a given location.
 * Represents the container which holds the current weather and forecast weather information blocks for a given location.
 * @param {Object} props.location - An object that contains the location information for which weather is to be displayed.
 * @param {string} props.location.name - The name of the location.
 * @param {number} props.location.lat - The latitude of the location.
 * @param {number} props.location.lon - The longitude of the location.
 * @returns {JSX.Element} - A div with the current weather and forecast weather information for the given location.
 */

export const LocationContainer = (props) => {
	return (
        <div className="location-container">
            <CurrentWeather location={props.location} />
            <Forecasts location={props.location} />
        </div>
    );
};
