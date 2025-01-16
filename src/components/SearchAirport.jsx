function SearchAirport({
    placeholderText,
    value,
    onChange,
    variant,
    list,
    onClick,
    departure,
    type,
  }) {
    return (
      <div
        className={`
          relative mb-[1px] 2xl:mb-[0px]
          ${variant === 'admin' ? '2xl:col-span-1' : '2xl:col-span-2'}
        `}
      >
        <input
          placeholder={placeholderText}
          type="text"
          className={`
            py-3
            px-4
            text-xl
            w-full
            2xl:h-[80px]
            ${
              type === 'departure'
                ? 'rounded-t-xl 2xl:rounded-bl-lg 2xl:rounded-tr-none'
                : ''
            }
            ${
              variant === 'admin' ? 'border-2 border-primaryBlue' : '2xl:border-r-2'
            }
          `}
          value={value}
          onChange={onChange}
        />
        <div
          className={`
            z-10
            bg-white
            duration-200
            overflow-hidden 
            p-2
            2xl:p-3
            2xl:shadow-2xl
            2xl:mt-2
            2xl:rounded-xl
            2xl:absolute 2xl:top-[100%]
            ${list.length > 4 ? 'h-[0px] hidden' : 'h-fit'} 
            ${departure.length < 4 ? 'hidden' : ''}
            ${departure.localeCompare(list[0]?.name) === 0 ? 'hidden' : ''}
          `}
        >
          {list.length > 0 ? (
            list.map((item, index) => (
              <p
                className="mb-2 cursor-pointer text-lg"
                key={index}
                onClick={() => {
                  onClick(item);
                }}
              >
                {`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}
              </p>
            ))
          ) : (
            <div className={`${departure.length < 4 ? 'hidden' : ''}`}>
              <p className="w-full">{list.length === 0 ? 'No results' : ''}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default SearchAirport;
  