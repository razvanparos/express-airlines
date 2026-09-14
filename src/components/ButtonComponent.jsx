function ButtonComponent({
    buttonFunction,
    buttonType,
    buttonText,
    buttonSize,
  }) {
    buttonType = buttonType || 'default';

    const buttonTypeClasses = {
      primary: 'bg-primaryBlue px-4 py-2.5 rounded-xl text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700',
      danger: 'text-white bg-red-500 rounded-xl text-sm px-3 py-2 transition-all duration-200 hover:bg-red-600',
      default: 'text-darkBlue p-2 px-4 text-md font-bold transition-all duration-200 hover:bg-slate-100 rounded-xl',
    };

    const buttonSizeClasses = buttonSize === 'sm' ? 'w-fit text-sm' : '';

    return (
      <button
        onClick={buttonFunction}
        className={`
                  ${buttonTypeClasses[buttonType]}
                  ${buttonSizeClasses}
                  flex items-center justify-center font-semibold
              `}
      >
        {buttonText}
      </button>
    );
  }
  export default ButtonComponent;
  