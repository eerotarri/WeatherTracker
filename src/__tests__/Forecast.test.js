import { render, screen, cleanup } from '@testing-library/react';
import { Forecast } from '../components/Forecast';

afterEach(() => {
    cleanup();
});

test('should render Forecast component', () => {
    const forecast = {
        dt_txt: '2023-03-01 12:00:00',
        weather: [{ icon: '01d' }],
        main: { temp: 294.2, humidity: 80 },
        wind: { speed: 3.0 },
        rain: { '3h': 1.6 }
    };
    render(<Forecast forecast={forecast} />);
    const forecastElement = screen.getByTestId('forecast');
    expect(forecastElement).toBeInTheDocument();
});

test('should render correct temperature', () => {
    const forecast = {
        dt_txt: '2023-03-01 12:00:00',
        weather: [{ icon: '01d' }],
        main: { temp: 294.2, humidity: 80 },
        wind: { speed: 3.0 },
        rain: { '3h': 1.6 }
    };
    render(<Forecast forecast={forecast} />);
    const tempElement = screen.getByText('21 ℃');
    expect(tempElement).toBeInTheDocument();
});

test('should render precipitation amount', () => {
    const forecast = {
        dt_txt: '2023-03-01 12:00:00',
        weather: [{ icon: '01d' }],
        main: { temp: 294.2, humidity: 80 },
        wind: { speed: 3.0 },
        rain: { '3h': 1.6 }
    };
    render(<Forecast forecast={forecast} />);
    const rainElement = screen.getByText('2 mm');
    expect(rainElement).toBeInTheDocument();
});