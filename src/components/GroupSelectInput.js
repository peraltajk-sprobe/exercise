import React, { useState } from 'react';
import PropTypes  from 'prop-types';
import { Input, Select } from './SmartForm';

const GroupSelectInput = ({register ,index }) => {
    const [componentType, setComponentType] = useState("text");

    const onChangeType = (e) => {
        setComponentType(e.target.value);
    }

    return (
        <>
            <Select  name={`components.${index}.type`} id={`components.${index}.type`} label="Select Type" options={["text", "image"]} onChange={(e) => onChangeType(e)} register={register}/>
            {componentType === "text" ? (
                <Input name={`components.${index}.content`} id={`components.${index}.content`} label="Content" type="text" register={register}/>
            ): (
                <Input name={`components.${index}.url`} id={`components.${index}.url`} label="URL" type="text" register={register}/>
            )}
        </>
    )
}

GroupSelectInput.propTypes = { 
    index: PropTypes.number.isRequired,
}

export default GroupSelectInput;