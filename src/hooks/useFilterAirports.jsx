import { useEffect } from 'react';

const useFilterAirports = (term, airports, key, changeFlightsTabState) => {
  useEffect(() => {
    if (term.trim() === '') return;

    const filteredAirports = airports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(term.toLowerCase()) ||
        airport.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredAirports.length < 4) {
      changeFlightsTabState(key, filteredAirports);
    }
  }, [term, airports, key, changeFlightsTabState]);
};

export default useFilterAirports;
