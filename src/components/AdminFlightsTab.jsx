import { useContext, useState, useEffect } from 'react';
import React from 'react';
import AdminFlightCard from './AdminFlightCard';
import { formatDateToISO } from '../common/utils';
import { formatDate } from '../common/utils';
import { AppContext } from '../context/AppContext';
import AdminGetFlightsForm from './AdminGetFlightsForm';
import AdminAddFlightForm from './AdminAddFlightForm';
import ButtonComponent from './ButtonComponent';
import useFilterAirports from '../hooks/useFilterAirports';

function FlightsTab() {
  const { state } = useContext(AppContext);
  const { homeSearch } = state || {};
  const { departure, destination } = homeSearch || {};

  const initialFlightsTabState = {
    departuresList: [],
    destinationsList: [],
    flightDate: formatDate(new Date()),
    minDate: formatDate(new Date()),
    noFlightsFound: '',
    adminFlights: [],
    editFlight: '',
    addFlightTab: false,
  };
  const [flightsTabState, setFlightsTabState] = useState(
    initialFlightsTabState
  );

  const filteredDepartures = useFilterAirports(departure);
  const filteredDestinations = useFilterAirports(destination);

  const changeFlightsTabState = (fieldname, value) => {
    setFlightsTabState((prevState) => ({
      ...prevState,
      [fieldname]: value,
    }));
  };

  useEffect(() => {
    changeFlightsTabState("departuresList", filteredDepartures);
  }, [filteredDepartures]);

  useEffect(() => {
    changeFlightsTabState("destinationsList", filteredDestinations);
  }, [filteredDestinations]);

  return (
    <section className="flex flex-col gap-y-[20px]">
      <AdminGetFlightsForm
        departure={departure}
        destination={destination}
        flightsTabState={flightsTabState}
        changeFlightsTabState={changeFlightsTabState}
      />
      <div className="px-4 lg:px-0">
        <ButtonComponent
          buttonFunction={() => {
            changeFlightsTabState('addFlightTab', true);
          }}
          buttonText={'Add new flight'}
          buttonType={'primary'}
        />
      </div>
      {!flightsTabState.addFlightTab ? (
        <section className="p-4 lg:px-[0]">
          <div className="flex flex-col gap-y-4">
            {flightsTabState.adminFlights?.map((f, i) => {
              return (
                <AdminFlightCard
                  key={i}
                  flight={f}
                  editFlight={flightsTabState.editFlight}
                  departure={departure}
                  destination={destination}
                  flightDate={formatDateToISO(flightsTabState.flightDate)}
                  changeFlightsTabState={changeFlightsTabState}
                />
              );
            })}
          </div>
          <p className="text-red-500">{flightsTabState.noFlightsFound}</p>
        </section>
      ) : (
        <AdminAddFlightForm
          changeFlightsTabState={changeFlightsTabState}
          flightsTabState={flightsTabState}
        />
      )}
    </section>
  );
}
export default FlightsTab;
