import DatePicker from "react-datepicker";
function DatePickerComponent({placeholderText,selected,onChange,minDate,disabled}){
    return(
        <DatePicker className="2xl:border-r-2 py-3 bg-white px-4 mb-[1px] 2xl:mb-[0px] w-full text-xl 2xl:h-[80px]" minDate={minDate} 
            placeholderText={placeholderText}
            selected={selected} 
            onChange={onChange}
            disabled={disabled}
        />
    );
}   
export default DatePickerComponent;