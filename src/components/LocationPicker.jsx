import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import homeActions from '../context/actions/home-actions';
import SearchAirport from './SearchAirport';

function LocationPicker({
  type,
  variant,
  departuresList,
  destinationsList,
  onChangeFlightField,
}) {
  const { state } = useContext(AppContext);
  const { homeSearch } = state || {};
  const { departure, destination } = homeSearch || {};

  const selectedHomeSearchStateSlice =
    type === 'departure' ? 'departure' : 'destination';

  const searchTerm = type === 'departure' ? departure : destination;

  useEffect(() => {
    homeActions.setHomeSearch({
      homeSearch: {
        departure: '',
        destination: '',
        adultsNumber: 1,
        startDate: '',
        endDate: '',
      },
    });
  }, []);

  const onListItemClick = (item) => {
    homeActions.setHomeSearch({
      homeSearch: {
        [selectedHomeSearchStateSlice]: item.name,
      },
    });

    if (onChangeFlightField) {
      onChangeFlightField(
        type === 'departure' ? 'departureAirport' : 'destinationAirport',
        item
      );
    }
  };

  const onAirportChange = (e) => {
    homeActions.setHomeSearch({
      homeSearch: {
        [selectedHomeSearchStateSlice]: e.target.value,
      },
    });
  };

  return (
    <SearchAirport
      placeholderText={'Choose departure airport'}
      value={searchTerm}
      onChange={onAirportChange}
      variant={variant}
      list={type === 'departure' ? departuresList : destinationsList}
      onClick={onListItemClick}
      departure={searchTerm}
      type={type}
    />
  );
}
export default LocationPicker;
