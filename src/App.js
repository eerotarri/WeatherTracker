import './App.css';
import React, { useState } from 'react';
import locations from './data/locations.json';
import { LocationContainer } from './components/LocationContainer';
import { LocationSelector } from './components/LocationSelector';

function App() {
  const [selectedOption, setSelectedOption] = useState('Kaikki sijainnit');
  
  // Create component array from locations.json
  const locationArray = locations.values.map((city, index) => {
    return <LocationContainer key={index} location={city} />
  });

  const selectOption = (option) => {
    setSelectedOption(option);
  }

  return (
    <div className="App">
      <div className='heading' ><p>Säätutka</p></div>
      <LocationSelector handleSelect={selectOption} />
      { selectedOption === 'Kaikki sijainnit' ? locationArray : <LocationContainer key={selectedOption} location={locations.values.find(loc => loc.name === selectedOption)}/> }
    </div>
  );
}

export default App;
