
function FlightCard(props) {
  return (
    <div className=" p-2">
      <p>{`From: ${props.flight.departure}`}</p>
      <p>{`To: ${props.flight.destination}`}</p>
      <p>{`Price per seat: $${props.flight.pricePerSeat}`}</p>
    </div>
  );
}

export default FlightCard;
