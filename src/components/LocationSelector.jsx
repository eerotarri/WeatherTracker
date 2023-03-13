import React, { useState } from 'react';
import locations from '../data/locations.json';

/**
 * A React component that contains the dropdown menu for selecting a location.
 * @param {Function} props.handleSelect - A function that handles the selection of a location.
 * @returns {JSX.Element} - A div with the dropdown menu for selecting a location.
 */

export const LocationSelector = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Kaikki sijainnit');
  const options = ['Kaikki sijainnit', ...locations.values.map((value) => {return value.name}) ];
  locations.values.map((value) => {
    return value.name;
  });
  
  /**
   * Handles the selection of a location.
   * @param {string} option - The name of the location that was selected.
   */
  function handleOptionClick(option) {
      setSelectedOption(option);
      setIsOpen(false);
      props.handleSelect(option);
  }

  // Open and close the dropdown menu
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="dropdown-container" data-testid={'location-selector'}>
      <div className="dropdown-header" onClick={toggleDropdown} data-testid={'dropdown-header'}>
        <div>{selectedOption || 'Select an option'}</div>
        <img src={'/dropdown-icon-14.jpg'} alt="dd-icon" className="dropdown-image" />
      </div>
      {isOpen && (
        <div data-testid="dropdown-list" className="dropdown-list">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
