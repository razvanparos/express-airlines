import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function AdultsNumberPicker() {
    const {state,dispatch}=useContext(AppContext)
    const {homeSearch}=state
    const {adultsNumber}=homeSearch
    useEffect(()=>{
        if(adultsNumber<1){
          dispatch({
            type: "SET_HOMESEARCH",
            payload: {
              homeSearch: {
                adultsNumber:1
              },
            },
          });
        }
        if(adultsNumber>8){
          dispatch({
            type: "SET_HOMESEARCH",
            payload: {
              homeSearch: {
                adultsNumber:8
              },
            },
          });
        }
      },[adultsNumber])

  return (
    <>
       <div className={`rounded-b-xl 2xl:rounded-none py-3 px-4 bg-white flex items-center gap-x-3 w-full`}>
            <p className='text-xl'>{`${adultsNumber} ${adultsNumber>1?'Adults':'Adult'}`}</p>
            <button type="button" onClick={()=>{
              dispatch({
                type: "SET_HOMESEARCH",
                payload: {
                  homeSearch: {
                    adultsNumber:adultsNumber-1
                  },
                },});}} 
              className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">-</button>
            <button type="button" onClick={()=>{
               dispatch({
                type: "SET_HOMESEARCH",
                payload: {
                  homeSearch: {
                    adultsNumber:adultsNumber+1
                  },
                },});} 
            } className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">+</button>
          </div>
    </>
  );
}

export default AdultsNumberPicker;
