import FlightInfo from "./FlightInfo";

function MyBookingCard(props) {
  return (
    <section className="border-2 border-primaryBlue flex justify-between p-2">
      <FlightInfo text={'Departure'} props={props} type={'departureFlight'} seats={'selectedDepartureSeats'}/>
      <FlightInfo text={'Return'} props={props} type={'returnFlight'} seats={'selectedReturnSeats'}/>
    </section>
  );
}

export default MyBookingCard;