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
        <div className="flex flex-col justify-start">
            <label className="text-sm">Select Type: </label>
            <select {...register(`components.${index}.type`)} onChange={(e) => onChangeType(e)} className="w-full">
                <option value="text">text</option>
                <option value="image">image</option>
            </select>
        </div>
        
        {componentType === "text" ? (
                <div className="flex flex-col justify-start">
                    <label htmlFor={`components.${index}.content`} className="text-sm">Content:</label>
                    <input {...register(`components.${index}.content`)} name={`components.${index}.content`} id={`components.${index}.content`} type="text" />
                </div>
        ): (
                <div className="flex flex-col justify-start">
                    <label htmlFor={`components.${index}.url`} className="text-sm">URL:</label>
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