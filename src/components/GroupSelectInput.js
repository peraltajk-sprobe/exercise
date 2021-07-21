import React, { useState, useEffect } from 'react';
import PropTypes  from 'prop-types';

const GroupSelectInput = ({ register, index, selectDefaultValue }) => {
    const [componentType, setComponentType] = useState("text");

    const onChangeType = (e) => {
        setComponentType(e.target.value);
    }

    useEffect(() => {
		
        if (selectDefaultValue && selectDefaultValue.hasOwnProperty("components")) {
            if (selectDefaultValue.components[index] && selectDefaultValue.components[index].type === "image") {
                setComponentType("image");
            } else {
                setComponentType("text");
            }
        }
    }, [selectDefaultValue, index])

    return (
        <>
        <div className="md:flex md:items-center gap-x-2">
            <label className="md:w-3/5">Select Type: </label>
            <select {...register(`components.${index}.type`)} onChange={(e) => onChangeType(e)} className="w-full">
                <option value="text">text</option>
                <option value="image">image</option>
            </select>
        </div>
        
        {componentType === "text" ? (
                <div className="md:flex md:items-center gap-x-2">
                    <label htmlFor={`components.${index}.content`} className="md:w-3/5">Content:</label>
                    <input {...register(`components.${index}.content`)} name={`components.${index}.content`} id={`components.${index}.content`} type="text" />
                </div>
        ): (
                <div className="md:flex md:items-center gap-x-2">
                    <label htmlFor={`components.${index}.url`} className="md:w-3/5">URL:</label>
                    <input {...register(`components.${index}.url`)} name={`components.${index}.url`} id={`components.${index}.url`} type="text" />
                </div>
        )}
        </>
    )
}

GroupSelectInput.propTypes = { 
    register: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    selectDefaultValue: PropTypes.object
}

export default GroupSelectInput;