import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function LocationPicker(props) {
    const {state,dispatch}=useContext(AppContext);
    const {homeSearch}=state;
    const {departure,destination}=homeSearch;

    const handleDepartureListItemClick=(item)=>{
        dispatch({
          type: "SET_HOMESEARCH",
          payload: {
            homeSearch: {
              departure:item.name,
            },
          },
        });
        props.setDepartureAirport(item);
      }

      const handleDestinationListItemClick=(item)=>{
        dispatch({
          type: "SET_HOMESEARCH",
          payload: {
            homeSearch: {
              destination:item.name
            },
          },
        });
        props.setDestinationAirport(item)
      }

  return (
  <>
  {props.type=='departure'?
   <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
        <input placeholder="Choose departure airport" type="text"
            className="2xl:border-r-2 rounded-t-xl py-3 px-4 text-xl w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px]"
            value={departure} onChange={(e)=>{dispatch({
                type: "SET_HOMESEARCH",
                payload: {
                homeSearch: {
                departure:e.target.value,
        }}})}}/>
        <div className={`${props.showDepartureAirportsList?'h-fit p-2 2xl:hidden':'h-[0px] 2xl:w-0 2xl:hidden overflow-hidden'} duration-200 bg-white`}>
            {props.departuresList.length>0 ? props.departuresList?.map((item,index)=>{
                return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>
                    {handleDepartureListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}
                </p>
            }):<p>No airports found</p>}
        </div>
        <div className={`${props.showDepartureAirportsListDesktop?'h-[120px] hidden 2xl:block shadow-2xl p-3 mt-2 rounded-xl':'h-[0px] hidden'} duration-200 bg-white absolute top-[100%] h-fit`}>
            {props.departuresList.length>0 ? props.departuresList?.map((item,index)=>{
            return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>
                {handleDepartureListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}
            </p>
            }):<p>No airports found</p>}
        </div>
    </div>
    :
    <div className="relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]">
        <input placeholder="Choose destination airport" type="text" className="2xl:border-r-2 h-full py-3 px-4 text-xl w-full" value={destination} onChange={(e)=>{
        dispatch({
            type: "SET_HOMESEARCH",
            payload: {
            homeSearch: {
                destination:e.target.value
            },
            },
        });
        }}/>
        <div className={`${props.showDestinationAirportsList?'h-fit p-2 2xl:hidden':'h-[0px] 2xl:hidden overflow-hidden'} duration-200 bg-white`}>
        {props.destinationsList.length>0 ? props.destinationsList?.map((item,index)=>{
            return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
        }):<p>No airports found</p>}
        </div>
        <div className={`${props.showDestinationAirportsListDesktop?'h-[120px] hidden 2xl:block w-full shadow-2xl p-3 mt-2 rounded-xl visible':'h-[0px] hidden'} duration-200 bg-white absolute top-[100%] h-fit`}>
        {props.destinationsList.length>0 ? props.destinationsList?.map((item,index)=>{
            return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
        }):<p>No airports found</p>}
        </div>
    </div>
    }
</>
);}

export default LocationPicker;



