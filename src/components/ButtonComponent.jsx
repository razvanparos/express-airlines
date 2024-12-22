function ButtonComponent({buttonFunction,buttonType,buttonText}){
    return(
        <button 
            onClick={buttonFunction} 
            className={`
                ${buttonType==='primary'?'bg-primaryBlue px-3 py-2 rounded-lg text-white':''} 
                ${buttonType==='primary-small'?'bg-primaryBlue px-3 py-2 rounded-lg text-white w-fit text-sm':''} 
                ${buttonType==='back'?'bg-gray-400 rounded-lg p-2 px-4 text-white':''}
                ${buttonType==='danger'?'text-white bg-red-500 rounded-lg text-sm px-2':''}
                ${buttonType==''? 'text-darkBlue p-2 px-4 text-md font-bold':''}`}
                >
                    {buttonText}
             </button>
    );
}   
export default ButtonComponent;