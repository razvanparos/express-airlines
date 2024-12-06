import { useContext } from "react";
import DatePicker from "react-datepicker";
import { AppContext } from "../context/AppContext";
import homeActions from "../context/actions/home-actions";

function FlightDatePicker(props) {
const {dispatch}=useContext(AppContext)

  return (
    <>
    {props.type=='departure'?
     <DatePicker className="2xl:border-r-2 py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl 2xl:h-[80px]" minDate={new Date()} 
        placeholderText="Departure date" 
        selected={props.startDate} 
        onChange={(date) => {
          homeActions.setHomeSearch({
             homeSearch: {
                startDate:date
                },
          })
      }}/>
      :
      <DatePicker className="2xl:border-r-2 py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl bg-white 2xl:h-[80px]" minDate={props.startDate} 
        disabled={props.startDate?false:true} 
        placeholderText="Return date" 
        selected={props.endDate} 
        onChange={(date) => {
          homeActions.setHomeSearch({
             homeSearch: {
                endDate:date
                },
          })}} 
        />
      }
    </>
   
  );
}

export default FlightDatePicker;
