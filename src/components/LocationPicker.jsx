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
   <div className={`${props.style==='admin'? 'relative 2xl:col-span-1 mb-[1px] 2xl:mb-[0px]':'relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]'}`}>
        <input placeholder="Choose departure airport" type="text"
            className={`${props.style==='admin'?'border-2 border-primaryBlue rounded-t-xl py-3 px-4 text-xl w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px]':'2xl:border-r-2 rounded-t-xl py-3 px-4 text-xl w-full 2xl:rounded-bl-lg 2xl:rounded-tr-none 2xl:h-[80px]'}`}
            value={departure} onChange={(e)=>{onDepartureChange(e)}}/>
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
    <div className={`${props.style==='admin'? 'relative 2xl:col-span-1 mb-[1px] 2xl:mb-[0px]':'relative 2xl:col-span-2 mb-[1px] 2xl:mb-[0px]'}`}>
        <input placeholder="Choose destination airport" type="text" 
        className={`${props.style==='admin'?'border-2 border-primaryBlue h-full py-3 px-4 text-xl w-full':'2xl:border-r-2 h-full py-3 px-4 text-xl w-full'}`}
        value={destination} onChange={(e)=>{onDestinationChange(e)}}/>
        <div className={`${props.showDestinationAirportsList?'h-fit p-2 2xl:hidden':'h-[0px] 2xl:hidden overflow-hidden'} duration-200 bg-white`}>
        {props.destinationsList?.length>0 ? props.destinationsList?.map((item,index)=>{
            return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
        }):<p>No airports found</p>}
        </div>
        <div className={`${props.showDestinationAirportsListDesktop?'h-[120px] hidden 2xl:block w-full shadow-2xl p-3 mt-2 rounded-xl visible':'h-[0px] hidden'} duration-200 bg-white absolute top-[100%] h-fit`}>
        {props.destinationsList?.length>0 ? props.destinationsList?.map((item,index)=>{
            return <p className="mb-2 cursor-pointer text-lg" key={index} onClick={()=>{handleDestinationListItemClick(item)}}>{`${item.name} (${item.iata_code}), ${item.city}, ${item.country}`}</p>
        }):<p>No airports found</p>}
        </div>
    </div>
    }
</>
);}
export default LocationPicker;



