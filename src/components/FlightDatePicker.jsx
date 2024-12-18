import homeActions from "../context/actions/home-actions";
import DatePickerComponent from "./DatePickerComponent";

function FlightDatePicker(props) {

  return (
    <>
    {props.type=='departure'?
    <DatePickerComponent 
      placeholderText={'Departure date'} 
      minDate={new Date()}
      selected={props.startDate}
      onChange={(date) => {
        homeActions.setHomeSearch({
           homeSearch: {
              startDate:date},})}}
    />
      :
      <DatePickerComponent 
      placeholderText={'Return date'} 
      disabled={props.startDate?false:true}
      minDate={props.startDate}
      selected={props.endDate}
      onChange={(date) => {
        homeActions.setHomeSearch({
           homeSearch: {
            endDate:date},})}}
    />
    }
    </>
   
  );
}

export default FlightDatePicker;
