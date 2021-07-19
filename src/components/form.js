import React, { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useFormContext } from '../hooks';
import GroupSelectInput from './GroupSelectInput';
import PropTypes  from 'prop-types';

const Form = (props) => {
    const { dispatch } = useFormContext();
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
            reset();
        } else {
            dispatch({type: 'update', payload: data});
        }
    }


    /**
     * reset default values when selecting item
     * 
     */
    useEffect(() => {
        reset(props.defaultValues)
    }, [reset, props.defaultValues])

    return (
        <form onSubmit={handleSubmit(onClickSubmit)} className="flex flex-col">
            <div className={`flex ${props.defaultValues ? 'flex-col' : 'flex-row items-center'} justify-start gap-x-4`}>
                <input {...register("id")} name="id" id="id" hidden />
                <div>
                    <label htmlFor="label">Range Label: </label>
                    <input {...register("label", { required: "Please enter Label." })} name="label" id="label" type="text" />
                </div>
                <div>
                    <label htmlFor="width">Width: </label>
                    <input {...register("width")} name="width" id="width" type="number" />
                </div>
                <div>
                    <label htmlFor="height">Height: </label>
                    <input {...register("height")} name="height" id="height" type="number" />
                </div>
                <div>
                    <label htmlFor="xaxis">X-Axis: </label>
                    <input {...register("xaxis")} name="xaxis" id="xaxis" type="number" />
                </div>
                <div>
                    <label htmlFor="yaxis">Y-Axis: </label>
                    <input {...register("yaxis")} name="yaxis" id="yaxis" type="number" />
                </div>
            </div>
           
            <div>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className={`flex gap-y-4 ${props.defaultValues ? 'flex-col' : 'flex-row items-center'}`}>
                            <input type="hidden" {...register(`components.${index}.id`)} name={`components.${index}.id`} id={`components.${index}.id`} defaultValue={index} />
                            <div>
                                <label htmlFor={`components.${index}.label`}>Component Label: </label>
                                <input type="text" {...register(`components.${index}.label`)} name={`components.${index}.label`} 
                                    id={`components.${index}.label`} defaultValue={field.label} />
                            </div>
                            <GroupSelectInput register={register} index={ index } selectDefaultValue={props.defaultValues} />
                            <div>
                                <label htmlFor={`components.${index}.width`}>Width: </label>
                                <input {...register(`components.${index}.width`)} name={`components.${index}.width`} id={`components.${index}.width`} type="number" />
                            </div>
                            <div>
                                <label htmlFor={`components.${index}.height`}>Height: </label>
                                <input {...register(`components.${index}.height`)} name={`components.${index}.height`} id={`components.${index}.height`} type="number" />
                            </div>
                            <div>
                                <label htmlFor={`components.${index}.xaxis`}>X-Axis: </label>
                                <input {...register(`components.${index}.xaxis`)} name={`components.${index}.xaxis`} id={`components.${index}.xaxis`} type="number" />
                            </div>
                            <div>
                                <label htmlFor={`components.${index}.yaxis`}>Y-Axis: </label>
                                <input {...register(`components.${index}.yaxis`)} name={`components.${index}.yaxis`} id={`components.${index}.yaxis`} type="number" />
                            </div>
                            <button onClick={() => remove(index)} className="p-2 bg-red-200"> Remove </button>
                        </div>
                    ))
                }
            </div>
            
            <div className="flex flex-row">
                <button type="button" onClick={() => append({label: ""})} className="p-2">Add Component</button>
                <button type="submit" className="p-2"> 
                    {props.defaultValues ? "Update" : "Create"}
                </button>
            </div>
            
        </form>
    )
}

Form.propTypes = { 
    defaultValues: PropTypes.object 
}

export default Form;