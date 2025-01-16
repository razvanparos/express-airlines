import { useState } from 'react';
import Loader from './Loader';
import LocationPicker from './LocationPicker';
import { getFlightsAdmin } from '../services/flightService';
import { formatDateToISO } from '../common/utils';

function AdminGetFlightsForm({
  flightsTabState,
  changeFlightsTabState,
  departure,
  destination,
}) {
  const [searchError, setSearchError] = useState('');
  const [loading, setLoading] = useState(false);

  const getFLights = async (e) => {
    e.preventDefault();
    changeFlightsTabState('addFlightTab', false);

    if (
      flightsTabState.showDepartureAirportsList ||
      flightsTabState.showDestinationAirportsList
    ) {
      setSearchError('Select airports from the list');
      return;
    } else {
      setSearchError('');
    }

    if (departure && destination && flightsTabState.flightDate) {
      setSearchError('');
      setLoading(true);
      let queryResponse = await getFlightsAdmin(
        departure,
        destination,
        formatDateToISO(flightsTabState.flightDate),
        'Flights'
      );
      if (queryResponse.length < 1) {
        changeFlightsTabState('noFlightsFound', 'No flights found');
      } else {
        changeFlightsTabState('noFlightsFound', '');
      }
      changeFlightsTabState('adminFlights', queryResponse);
    } else {
      setSearchError('Fields cannot be empty');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={getFLights}
      action=""
      className="flex flex-col px-4 lg:px-0 pt-8 w-full 2xl:grid 2xl:grid-cols-5"
    >
      <LocationPicker
        type="departure"
        variant="admin"
        departuresList={flightsTabState.departuresList}
      />
      <LocationPicker
        type="destination"
        variant="admin"
        destinationsList={flightsTabState.destinationsList}
      />
      <input
        type="date"
        className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl 2xl:h-[80px]"
        value={flightsTabState.flightDate}
        onChange={(e) => {
          changeFlightsTabState('flightDate', e.target.value);
        }}
      />
      <p className="text-red-500 mt-2 2xl:hidden">{searchError}</p>
      <button
        type="submit"
        className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl"
      >
        {loading ? <Loader /> : 'Search'}
      </button>
      <p className="text-red-500 mt-2 hidden 2xl:block w-full">{searchError}</p>
    </form>
  );
}
export default AdminGetFlightsForm;
