function FormRow({onChangeFunction,value,labelText,type}){
    return(
        <>
         <label htmlFor="name">{labelText}</label>
         <input type={type} className="border-2 rounded-lg p-2" value={value} onChange={onChangeFunction}/>
        </>
    );
}
export default FormRow;