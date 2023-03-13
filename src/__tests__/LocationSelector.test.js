
import { render, screen, fireEvent } from '@testing-library/react';
import { LocationSelector } from '../components/LocationSelector';
import locations from '../data/locations.json';

test('renders dropdown menu', () => {
  render(<LocationSelector handleSelect={() => {return}} />);
  const locationSelector = screen.getByTestId('location-selector');
  expect(locationSelector).toBeInTheDocument();

  const dropdownHeader = screen.getByTestId('dropdown-header');

  fireEvent.click(dropdownHeader);

  const dropdownList = screen.getByTestId('dropdown-list');

  locations.values.forEach(location => {
    expect(dropdownList).toHaveTextContent(location.name);
  });
})