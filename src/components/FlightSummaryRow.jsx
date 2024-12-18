function FlightSummaryRow({finalBooking,flightType}){
    return(
        <div className="flex flex-col lg:items-end gap-y-1 p-2 bg-gray-200">
            <p className="font-bold text-lg">{`${finalBooking[flightType]?.departure} - ${finalBooking[flightType]?.destination}`}</p>
            <p className="text-gray-500">{`${finalBooking[flightType]?.flightDate}  (${finalBooking[flightType]?.takeOff} - ${finalBooking[flightType]?.landing})`}</p>
            <p>Selected seats:</p>
            <div className="flex gap-x-2">
                {finalBooking.selectedDepartureSeats?.map((seat,i)=>{
                    return <p key={i} className="border-2 border-primaryBlue w-[30px] h-[30px] flex items-center justify-center">{seat}</p>
            })}
            </div>   
        </div>
    );
}   
export default FlightSummaryRow;