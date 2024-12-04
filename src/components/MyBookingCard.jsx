function MyBookingCard(props) {
  return (
    <section className="border-2 border-primaryBlue flex justify-between p-2">
        <div className="flex flex-col">
            <p className="font-bold">Departure</p>
            <p>{props.b.departureFlight.departure}</p>
            <p>{props.b.departureFlight.destination}</p>
            <p>{props.b.departureFlight.flightDate}</p>
            <p>{props.b.departureFlight.takeOff}-{props.b.departureFlight.landing}</p>
            <div className="flex flex-wrap gap-x-2 max-w-[60%]">{props.b.selectedDepartureSeats.map((s,i)=>{
                return <div className="text-primaryBlue font-bold" key={i}>{s}</div>
                })}</div>
        </div>
        <div className="flex flex-col text-end items-end">
            <p className="font-bold">Return</p>
            <p className="">{props.b.returnFlight.departure}</p>
            <p className="">{props.b.returnFlight.destination}</p>
            <p>{props.b.returnFlight.flightDate}</p>
            <p>{props.b.returnFlight.takeOff}-{props.b.returnFlight.landing}</p>
            <div className="flex flex-wrap gap-x-2 max-w-[60%]">{props.b.selectedReturnSeats.map((s,i)=>{
                return <div className="text-primaryBlue font-bold" key={i}>{s}</div>
                })}</div>
        </div>
    </section>
  );
}

export default MyBookingCard;