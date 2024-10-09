
function FlightCard(props) {
  return (
    <div className="border-2 border-red-500">
      <p>{`From: ${props.flight.from}`}</p>
      <p>{`To: ${props.flight.to}`}</p>
      <p>{`Price per seat: $${props.flight.pricePerSeat}`}</p>
    </div>
  );
}

export default FlightCard;
