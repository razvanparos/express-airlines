function InfoRow(props){
    return(
        <p className="bg-gray-200 p-4 w-full flex items-center gap-x-2">{props.icon}{props.text}</p>
    );
}

export default InfoRow;