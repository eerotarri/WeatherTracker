import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import { CurrentWeather } from '../components/CurrentWeather';
import { act } from 'react-dom/test-utils';

beforeAll(cleanup);
afterEach(cleanup);

it('renders CurrentWeather component when request is bad', async () => {
    axios.get.mockResolvedValueOnce({data: {
        "cod": 400,
        "message": "wrong longitude"
    }});

    const location = {
        name: 'Helsinki',
        lat: 60.1699,
    };

    let component;
    await act(async () => {
        component = render(<CurrentWeather location={location} />);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather?lat=60.1699&lon=undefined&appid=1234567890');

    await waitFor(() => {
        expect(component.getByTestId('api-error')).toBeInTheDocument();
    });
    
    expect(component.getByTestId('api-error')).toHaveTextContent('wrong longitude');
});

it('renders CurrentWeather component when data is received', async () => {
    axios.get.mockResolvedValueOnce({data: {
        "coord": {
            "lon": 23.7871,
            "lat": 61.4991
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 269.96,
            "feels_like": 265.27,
            "temp_min": 267.49,
            "temp_max": 270.21,
            "pressure": 1001,
            "humidity": 90
        },
        "visibility": 10000,
        "wind": {
            "speed": 3.6,
            "deg": 180
        },
        "clouds": {
            "all": 0
        },
        "dt": 1678473565,
        "sys": {
            "type": 2,
            "id": 2041582,
            "country": "FI",
            "sunrise": 1678424389,
            "sunset": 1678464656
        },
        "timezone": 7200,
        "id": 634963,
        "name": "Tampere",
        "cod": 200
    }});

    const location = {
        name: 'Helsinki',
        lat: 60.1699,
        lon: 24.9384
    };

    let component;
    await act(async () => {
        component = render(<CurrentWeather location={location} />);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather?lat=60.1699&lon=24.9384&appid=1234567890');

    await waitFor(() => {
        expect(component.getByTestId('current-weather')).toBeInTheDocument();
    });

    expect(component.getByTestId('date')).toHaveTextContent('March 10');
    expect(component.getByTestId('time')).toHaveTextContent('20:39');
    expect(component.getByTestId('name')).toHaveTextContent('Helsinki');
    expect(component.getByTestId('temperature')).toHaveTextContent('-3 \u2103');
    expect(component.getByTestId('description')).toHaveTextContent('clear sky');
    expect(component.getByTestId('humidity')).toHaveTextContent('Humidity: 90 %');
    expect(component.getByTestId('wind')).toHaveTextContent('Wind: 3.6');
    expect(component.getByTestId('rain')).toHaveTextContent('Precipitation (3 h): 0 mm');
});