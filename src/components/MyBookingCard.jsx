import FlightInfo from "./FlightInfo";

function MyBookingCard(props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <FlightInfo text={'Departure'} props={props} type={'departureFlight'} seats={'selectedDepartureSeats'} />
        <FlightInfo text={'Return'} props={props} type={'returnFlight'} seats={'selectedReturnSeats'} />
      </div>
    </section>
  );
}

export default MyBookingCard;