import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useFormContext } from '../hooks';
import PropTypes  from 'prop-types';

const Form = (props) => {
    const { dispatch } = useFormContext();
    const [componentType, setComponentType] = useState("text");
    const { register, control, handleSubmit, reset } = useForm({ defaultValues: props.defaultValues });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "components",
        keyName: "id"
    });

    /**
     * 
     * @param {object} data
     * Creates new item or update item
     * @return void 
     */
    const onClickSubmit = (data) => {
        // check if new item else update item
        if (data.id === "") {
            dispatch({type: 'create', payload: data});
            setComponentType("text");
            reset();
        } else {
            dispatch({type: 'update', payload: data});
        }
    }

    const onChangeType = (e) => {
        setComponentType(e.target.value);
    }

    /**
     * reset default values when selecting item
     * 
     */
    useEffect(() => {
        reset(props.defaultValues)
    }, [reset, props.defaultValues])

    return (
        <form onSubmit={handleSubmit(onClickSubmit)}>
            <input {...register("id")} name="id" id="id" hidden />
            <label htmlFor="label">Range Label:</label>
            <input {...register("label", { required: "Please enter Label." })} name="label" id="label" type="text" />
            <label htmlFor="width">Width</label>
            <input {...register("width")} name="width" id="width" type="number" />
            <label htmlFor="height">Height</label>
            <input {...register("height")} name="height" id="height" type="number" />
            <label htmlFor="xaxis">X-Axis</label>
            <input {...register("xaxis")} name="xaxis" id="xaxis" type="number" />
            <label htmlFor="yaxis">Y-Axis</label>
            <input {...register("yaxis")} name="yaxis" id="yaxis" type="number" />
            {
                fields.map((field, index) => (
                    <div key={field.id}>
                        <input type="hidden" {...register(`components.${index}.id`)} name={`components.${index}.id`} id={`components.${index}.id`} defaultValue={index} />
                        <label htmlFor={`components.${index}.label`}>Component Label:</label>
                        <input type="text" {...register(`components.${index}.label`)} name={`components.${index}.label`} 
                            id={`components.${index}.label`} defaultValue={field.label} />
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
                        <label htmlFor={`components.${index}.width`}>Width</label>
                        <input {...register(`components.${index}.width`)} name={`components.${index}.width`} id={`components.${index}.width`} type="number" />
                        <label htmlFor={`components.${index}.height`}>Height</label>
                        <input {...register(`components.${index}.height`)} name={`components.${index}.height`} id={`components.${index}.height`} type="number" />
                        <label htmlFor={`components.${index}.xaxis`}>X-Axis</label>
                        <input {...register(`components.${index}.xaxis`)} name={`components.${index}.xaxis`} id={`components.${index}.xaxis`} type="number" />
                        <label htmlFor={`components.${index}.yaxis`}>Y-Axis</label>
                        <input {...register(`components.${index}.yaxis`)} name={`components.${index}.yaxis`} id={`components.${index}.yaxis`} type="number" />
                        <button onClick={() => remove(index)}> Remove </button>
                    </div>
                ))
            }
            <button type="button" onClick={() => append({})}>Add Component</button>
            <button type="submit"> 
                {props.defaultValues ? "Update" : "Create"}
            </button>
        </form>
    )
}

Form.propTypes = { 
    defaultValues: PropTypes.object 
}

export default Form;