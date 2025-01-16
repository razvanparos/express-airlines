import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import airports from '../mock-data/airports.json';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../components/Loader';
import { setFlights } from '../services/flightService';
import { AppContext } from '../context/AppContext';
import LocationPicker from '../components/LocationPicker';
import FlightDatePicker from '../components/FlightDatePicker';
import AdultsNumberPicker from '../components/AdultsNumberPicker';
import HomeArticle from '../components/HomeArticle';
import useFilterAirports from '../hooks/useFilterAirports';

function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { userDetails } = state;
  const { homeSearch } = state;
  const { departure, destination, adultsNumber, startDate, endDate } =
    homeSearch;

  const initialFlightsState = {
    departureAirport: '',
    destinationAirport: '',
    departuresList: [],
    destinationsList: [],
    loading: false,
    searchError: '',
  };
  const [homeState, setHomeState] = useState(initialFlightsState);

  const filteredDepartures = useFilterAirports(departure);
  const filteredDestinations = useFilterAirports(destination);

  const changeFlightStateField = (fieldname, value) => {
    setHomeState((prevState) => ({
      ...prevState,
      [fieldname]: value,
    }));
  };

  useEffect(() => {
    if (userDetails?.[0]?.isAdmin === true) {
      navigate('/admin-dashboard');
    }
  }, [userDetails]);

  useEffect(() => {
    changeFlightStateField('departuresList', filteredDepartures);
  }, [filteredDepartures]);

  useEffect(() => {
    changeFlightStateField('destinationsList', filteredDestinations);
  }, [filteredDestinations]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (
      departure != homeState.departuresList[0]?.name ||
      destination != homeState.destinationsList[0]?.name
    ) {
      changeFlightStateField('searchError', 'Select airports from the list');
      return;
    } else {
      changeFlightStateField('searchError', '');
    }
    if (departure && destination && startDate && endDate) {
      changeFlightStateField('loading', true);
      changeFlightStateField('searchError', '');
      await setFlights(
        dispatch,
        departure,
        destination,
        startDate,
        endDate,
        adultsNumber,
        homeState.departureAirport,
        homeState.destinationAirport,
        navigate
      );
      changeFlightStateField('loading', false);
    } else {
      changeFlightStateField('searchError', 'Fields cannot be empty');
    }
  };
  return (
    <div className="flex flex-col items-center relative">
      <h1 className="text-white mt-[20px] sm:text-2xl">
        Search for flights all over the world
      </h1>
      <p className="2xl:px-[10%] text-red-500 mt-2 hidden 2xl:block w-full">
        {homeState.searchError}
      </p>
      <form
        onSubmit={handleForm}
        action=""
        className="relative flex flex-col px-4 pt-8 w-full bg-darkBlue gap-y-[1px] lg:px-[10%] 2xl:pb-[80px] 2xl:grid 2xl:grid-cols-8"
      >
        <LocationPicker
          type="departure"
          onChangeFlightField={changeFlightStateField}
          departuresList={homeState.departuresList}
        />
        <LocationPicker
          type="destination"
          onChangeFlightField={changeFlightStateField}
          destinationsList={homeState.destinationsList}
        />
        <FlightDatePicker startDate={startDate} type={'departure'} />
        <FlightDatePicker
          startDate={startDate}
          endDate={endDate}
          type={'destination'}
        />
        <AdultsNumberPicker />
        <p className="text-red-500 mt-2 2xl:hidden">{homeState.searchError}</p>
        <button
          type="submit"
          className="bg-primaryBlue text-white font-semibold my-4 py-2 rounded-lg 2xl:h-full 2xl:my-0 2xl:rounded-l-none 2xl:text-xl"
        >
          {homeState.loading ? <Loader /> : 'Search'}
        </button>
      </form>
      <HomeArticle />
    </div>
  );
}
export default Home;
