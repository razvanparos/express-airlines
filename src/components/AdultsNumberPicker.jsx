import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import homeActions from "../context/actions/home-actions";

function AdultsNumberPicker() {
    const {state}=useContext(AppContext)
    const {homeSearch}=state
    const {adultsNumber}=homeSearch
    useEffect(()=>{
        if(adultsNumber<1){
          homeActions.setHomeSearch({
              homeSearch: {
                adultsNumber:1
              },
          })
        }
        if(adultsNumber>8){
          homeActions.setHomeSearch({
              homeSearch: {
                adultsNumber:8
              },
          })
        }
      },[adultsNumber])

      const onAdultsNumberIncrease=()=>{
        homeActions.setHomeSearch({
          homeSearch: {
            adultsNumber:adultsNumber+1
          }
        })
      }
      const onAdultsNumberDecrease=()=>{
        homeActions.setHomeSearch({
          homeSearch: {
            adultsNumber:adultsNumber-1
          }
        })
      }

  return (
    <>
       <div className={`rounded-b-xl 2xl:rounded-none py-3 px-4 bg-white flex items-center gap-x-3 w-full`}>
            <p className='text-xl'>{`${adultsNumber} ${adultsNumber>1?'Adults':'Adult'}`}</p>
            <button type="button" onClick={onAdultsNumberDecrease} 
              className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">-</button>
            <button type="button" onClick={onAdultsNumberIncrease} className="text-white bg-primaryBlue rounded-md h-[28px] w-[28px] flex items-center justify-center font-bold">+</button>
          </div>
    </>
  );
}

export default AdultsNumberPicker;
