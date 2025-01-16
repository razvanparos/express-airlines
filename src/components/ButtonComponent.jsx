function ButtonComponent({
    buttonFunction,
    buttonType,
    buttonText,
    buttonSize,
  }) {
    buttonType = buttonType || 'default';
  
    const buttonTypeClasses = {
      primary: 'bg-primaryBlue px-3 py-2 rounded-lg text-white',
      danger: 'text-white bg-red-500 rounded-lg text-sm px-2',
      default: 'text-darkBlue p-2 px-4 text-md font-bold',
    };
  
    const buttonSizeClasses = buttonSize === 'sm' ? 'w-fit text-sm' : '';
  
    return (
      <button
        onClick={buttonFunction}
        className={`
                  ${buttonTypeClasses[buttonType]} 
                  ${buttonSizeClasses}
              `}
      >
        {buttonText}
      </button>
    );
  }
  export default ButtonComponent;
  