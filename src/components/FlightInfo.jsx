function FlightInfo({text,props,type,seats}) {
    return (
        <div className={`flex flex-col ${type=='returnFlight'?'text-end items-end':''}`}>
            <p className="font-bold">{text}</p>
            <p>{props.b[type].departure}</p>
            <p>{props.b[type].destination}</p>
            <p>{props.b[type].flightDate}</p>
            <p>{props.b[type].takeOff}-{props.b[type].landing}</p>
            <div className="flex flex-wrap gap-x-2 max-w-[60%]">{props.b[seats].map((s,i)=>{
                return <div className="text-primaryBlue font-bold" key={i}>{s}</div>
                })}</div>
        </div>
    );
  }
  
  export default FlightInfo;