import React, { useState, useEffect } from 'react';
import PropTypes  from 'prop-types';

const GroupSelectInput = ({ register, index, selectDefaultValue }) => {
    const [componentType, setComponentType] = useState("text");

    const onChangeType = (e) => {
        setComponentType(e.target.value);
    }

    useEffect(() => {
        if (selectDefaultValue && selectDefaultValue.hasOwnProperty("components")) {
            if (selectDefaultValue.components[index].type === "image") {
                setComponentType("image");
            } else {
                setComponentType("text");
            }
        }
    }, [selectDefaultValue, index])

    return (
        <>
        <select {...register(`components.${index}.type`)} onChange={(e) => onChangeType(e)}>
            <option value="text">text</option>
            <option value="image">image</option>
        </select>
        {componentType === "text" ? (
                <>
                    <label htmlFor={`components.${index}.content`}>Content:</label>
                    <input {...register(`components.${index}.content`)} name={`components.${index}.content`} id={`components.${index}.content`} type="text" />
                </>
        ): (
                <>
                    <label htmlFor={`components.${index}.url`}>URL:</label>
                    <input {...register(`components.${index}.url`)} name={`components.${index}.url`} id={`components.${index}.url`} type="text" />
                </>
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