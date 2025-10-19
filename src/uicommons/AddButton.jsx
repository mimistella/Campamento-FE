const AddButton = ({onClick, text}) =>{

    return(
        <button
        onClick={onClick}
        className="flex font-bold text-xl text-amber-800 m-4 shadow-md p-2 rounded hover:bg--100 transtion"
        >
            <svg className="mr-2 size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            {text}

        </button>
        
    );

};
     
export default AddButton;