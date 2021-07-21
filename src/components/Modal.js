import React from 'react';
import PropTypes  from 'prop-types';
import { useFormContext } from '../hooks';

const Modal = (props) => {
    const { dispatch } = useFormContext();

    return (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover transition duration-700 ease-in-out" id="modal-id">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="flex flex-col w-1/2 h-3/4 p-8 bg-white z-10 rounded overflow-auto shadow-md">
                <div className="flex flex-row justify-end mb-8">
                    <button type="button" className="bg-gray-400 p-2 border-gray-500" onClick={() => dispatch({ type: 'setModal', payload: false })}>Close</button>
                </div>
                {props.children}
            </div>
        </div>
    )
}

Modal.propTypes = { 
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.array
}

export default Modal;