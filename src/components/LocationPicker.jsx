import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import homeActions from "../context/actions/home-actions";

function LocationPicker(props) {
    const {state}=useContext(AppContext);
    const {homeSearch}=state;
    const {departure,destination}=homeSearch;

    const handleDepartureListItemClick=(item)=>{
      homeActions.setHomeSearch({
        homeSearch: {
          departure:item.name,
        }
      })
      if(props.changeHomeStateField){
        props.changeHomeStateField('departureAirport',item)
      }
    }

      const handleDestinationListItemClick=(item)=>{
        homeActions.setHomeSearch({
          homeSearch: {
            destination:item.name,
          }
        })
        if(props.changeHomeStateField){
          props.changeHomeStateField('destinationAirport',item)
        }
      }

      useEffect(()=>{
        homeActions.setHomeSearch({
          homeSearch: {
            departure:'',
            destination:'',
            adultsNumber:1,
            startDate:'',
            endDate:''
          }
        })
      },[])

      const onDepartureChange=(e)=>{
        homeActions.setHomeSearch({
          homeSearch: {
          departure:e.target.value,
        }})}
      const onDestinationChange=(e)=>{
        homeActions.setHomeSearch({
          homeSearch: {
          destination:e.target.value,
        }})}
      
  return (
  <>
  {props.type=='departure'?
   <div className={`${props.style==='admin' ? '2xl:col-span-1':'2xl:col-span-2'} relative mb-[1px] 2xl:mb-[0px]`}>
        <input placeholder="Choose departure airport" type="text"
            className={`rounded-t-xl py-3 px-4 text-xl w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px] ${props.style==='admin'?'border-2 border-primaryBlue':'2xl:border-r-2'}`}
            value={departure} onChange={(e)=>{onDepartureChange(e)}}
        />
        <div className={`bg-white duration-200 overflow-hidden 
            p-2 2xl:p-3 2xl:shadow-2xl 2xl:mt-2 2xl:rounded-xl 
            ${props.departuresList.length > 4 ? 'h-[0px] hidden' : 'h-fit'} 
            2xl:absolute 2xl:top-[100%] ${departure.length<4?'hidden':''}
            ${departure.localeCompare(props.departuresList[0]?.name)===0?'hidden':''}`}
        >
          {props.departuresList.length > 0 ? (
            props.departuresList.map((item, index) => (
              <p
                className="mb-2 cursor-pointer text-lg"
                key={index}
                onClick={() => handleDepartureListItemClick(item)}
              >
                {`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}
              </p>
            ))
          ) : <div className={`${departure.length<4?'hidden':''}`}>
                <p className="w-full">{props.departuresList.length==0?'No results':''}</p>
              </div>  
          }
        </div>
    </div>
    :
    <div className={`relative mb-[1px] 2xl:mb-[0px] ${props.style==='admin'? '2xl:col-span-1 ':'2xl:col-span-2'}`}>
        <input placeholder="Choose destination airport" type="text" 
        className={`h-full py-3 px-4 text-xl w-full ${props.style==='admin'?'border-2 border-primaryBlue':'2xl:border-r-2'}`}
        value={destination} onChange={(e)=>{onDestinationChange(e)}}
        />
         <div className={`bg-white duration-200 overflow-hidden 
            p-2 2xl:p-3 2xl:shadow-2xl 2xl:mt-2 2xl:rounded-xl 
            ${props.destinationsList.length > 4 ? 'h-[0px] hidden' : 'h-fit'} 
            2xl:absolute 2xl:top-[100%] ${destination.length<4?'hidden':''}
            ${destination.localeCompare(props.destinationsList[0]?.name)===0?'hidden':''}`}
        >
          {props.destinationsList.length > 0 ? (
            props.destinationsList.map((item, index) => (
              <p
                className="mb-2 cursor-pointer text-lg"
                key={index}
                onClick={() => handleDestinationListItemClick(item)}
              >
                {`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}
              </p>
            ))
          ) : <div className={`${destination.length<4?'hidden':''}`}>
                <p className="w-full">{props.destinationsList.length==0?'No results':''}</p>
              </div>  
          }
        </div>
    </div>
    }
</>
);}
export default LocationPicker;



