function FlightInfo({ text, props, type, seats }) {
    return (
        <div className={`flex flex-col gap-1 ${type === 'returnFlight' ? 'items-end text-end md:items-end' : ''}`}>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">{text}</p>
            <p className="text-base font-semibold text-slate-800">{props.b[type].departure}</p>
            <p className="text-base font-medium text-slate-600">{props.b[type].destination}</p>
            <p className="text-sm text-slate-500">{props.b[type].flightDate}</p>
            <p className="text-sm text-slate-500">{props.b[type].takeOff}-{props.b[type].landing}</p>
            <div className={`mt-2 flex flex-wrap gap-2 ${type === 'returnFlight' ? 'justify-end' : ''}`}>
                {props.b[seats].map((s, i) => (
                    <span className="rounded-full border border-primaryBlue/20 bg-primaryBlue/10 px-2 py-1 text-xs font-bold text-primaryBlue" key={i}>
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default FlightInfo;