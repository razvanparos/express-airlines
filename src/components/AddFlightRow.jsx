function AddFlightRow({text,min,type,placeholder,onChange}){
    return(
        <>
         <p className="2xl:hidden">{text}</p>
         <input onChange={onChange} placeholder={placeholder} type={type} className=" cursor-pointer border-2 border-primaryBlue py-3 px-4 mb-[1px] 2xl:mb-[0px] w-full text-md 2xl:h-[80px]"  min={min} />
        </>
    );
}
export default AddFlightRow;