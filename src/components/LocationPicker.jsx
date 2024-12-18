import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import homeActions from "../context/actions/home-actions";
import SearchAirport from "./SearchAirport";

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
    <SearchAirport 
      placeholderText={'Choose departure airport'} 
      value={departure} 
      onChange={(e)=>{onDepartureChange(e)}} 
      style={props.style}
      list={props.departuresList}
      onClick={handleDepartureListItemClick}
      departure={departure}
      type='departure'
    />
    :
    <SearchAirport 
      placeholderText={'Choose destination airport'} 
      value={destination} 
      onChange={(e)=>{onDestinationChange(e)}} 
      style={props.style}
      list={props.destinationsList}
      onClick={handleDestinationListItemClick}
      departure={destination}
    />
  }
</>
);}
export default LocationPicker;



