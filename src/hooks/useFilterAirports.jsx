import { useState, useEffect } from 'react';

import airports from './../mock-data/airports.json';

const useFilterAirports = (term) => {
  const [filteredAirports, setFilteredAirports] = useState([]);

  useEffect(() => {
    if (term.trim() === '') return;

    const filteredSearchResults = airports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(term.toLowerCase()) ||
        airport.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredSearchResults.length > 0 && filteredSearchResults.length < 4) {
      setFilteredAirports(filteredSearchResults);
    }
  }, [term]);

  return filteredAirports;
};

export default useFilterAirports;
