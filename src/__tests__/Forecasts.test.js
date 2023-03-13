import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Forecasts } from '../components/Forecasts';
import { act } from 'react-dom/test-utils';

beforeAll(cleanup);
afterEach(cleanup);

it('renders Forecasts component when request is bad', async () => {
    axios.get.mockResolvedValueOnce({data: {
        "cod": "400",
        "message": "test-error"
    }});

    const location = {
        name: 'Helsinki',
        lat: 60.1699,
        lon: 24.9384
    };

    let component;
    await act(async () => {
        component = render(<Forecasts location={location} />);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast?lat=60.1699&lon=24.9384&appid=1234567890&cnt=6');

    await waitFor(() => {
        expect(component.getByTestId('api-error')).toBeInTheDocument();
    });
    
});

it('renders Forecasts component when data is received', async () => {
    axios.get.mockResolvedValueOnce({data: {
        "cod": "200",
        "list": [
            {
                "dt": 1552777600,
                "main": {
                    "temp": 269.96,
                    "humidity": 90
                },
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "wind": {
                    "speed": 1.5,
                },
                "dt_txt": "2019-03-18 00:00:00"
            },
            {
                "dt": 1552788400,
                "main": {
                    "temp": 269.96,
                    "humidity": 90
                },
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "wind": {
                    "speed": 1.5
                },
                "dt_txt": "2019-03-18 03:00:00"
            },
            {
                "dt": 1552799200,
                "main": {
                    "temp": 269.96,
                    "humidity": 90
                },
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "wind": {
                    "speed": 1.5,
                },
                "dt_txt": "2019-03-18 06:00:00"
            },
            {
                "dt": 1552810000,
                "main": {
                    "temp": 269.96,
                    "humidity": 90
                },
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "wind": {
                    "speed": 1.5
                },
                "dt_txt": "2019-03-18 09:00:00"
            },
            {
                "dt": 1552820800,
                "main": {
                    "temp": 269.96,
                    "humidity": 90
                },
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "wind": {
                    "speed": 1.5
                },
                "dt_txt": "2019-03-18 12:00:00"
            },
            {
                "dt": 1552831600,
                "main": {
                    "temp": 269.96,
                    "humidity": 90
                },
                "weather": [
                    {
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "wind": {
                    "speed": 1.5,
                },
                "dt_txt": "2019-03-18 15:00:00"
            }
        ],
    }});

    const location = {
        name: 'Helsinki',
        lat: 60.1699,
        lon: 24.9384
    };

    let component;
    await act(async () => {
        component = render(<Forecasts location={location} />);
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast?lat=60.1699&lon=24.9384&appid=1234567890&cnt=6');

    await waitFor(() => {
        expect(component.getByTestId('forecasts')).toBeInTheDocument();
    });
    
});