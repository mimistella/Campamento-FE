const Modal = ({children, onClose}) =>{
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
            
                {/* Botón cerrar (esquina) */}
                <button
                    onClick={() => onClose()}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    >
                    ✖
                </button>

                {children}

                {/* {content({onClose})} */}
            
            </div>

        </div>
    )
}

export default Modal;