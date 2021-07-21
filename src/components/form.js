import React, { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useFormContext } from '../hooks';
import GroupSelectInput from './GroupSelectInput';
import PropTypes  from 'prop-types';
import 'twin.macro'

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
        <div className="flex flex-0 flex-col z-10 overflow-auto items-center">
            <form onSubmit={handleSubmit(onClickSubmit)} className="flex flex-col gap-y-4">
                <div className={`flex flex-col justify-start gap-x-4 gap-y-4`}>
                    <input {...register("id")} name="id" id="id" hidden />
                    <div className="md:flex md:items-center">
                        <label htmlFor="label" className="md:w-3/5">Range Label: </label>
                        <input {...register("label", { required: "Please enter Label." })} name="label" id="label" type="text" />
                    </div>
                    <div className="md:flex md:items-center">
                        <label htmlFor="width" className="md:w-3/5">Width: </label>
                        <input {...register("width", { valueAsNumber: true })} name="width" id="width" type="number" />
                    </div>
                    <div className="md:flex md:items-center">
                        <label htmlFor="height" className="md:w-3/5">Height: </label>
                        <input {...register("height", { valueAsNumber: true })} name="height" id="height" type="number" />
                    </div>
                    <div className="md:flex md:items-center">
                        <label htmlFor="xaxis" className="md:w-3/5">X-Axis: </label>
                        <input {...register("xaxis", { valueAsNumber: true })} name="xaxis" id="xaxis" type="number" />
                    </div>
                    <div className="md:flex md:items-center">
                        <label htmlFor="yaxis" className="md:w-3/5">Y-Axis: </label>
                        <input {...register("yaxis", { valueAsNumber: true })} name="yaxis" id="yaxis" type="number" />
                    </div>
                    <div className="md:flex md:items-center">
                        <label htmlFor="zaxis" className="md:w-3/5">Z-Axis: </label>
                        <input {...register("zaxis", { valueAsNumber: true })} name="zaxis" id="zaxis" type="number" />
                    </div>
                </div>
            
                <div className="flex flex-col gap-y-4">
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="flex gap-y-4 flex-col justify-center">
                                <input type="hidden" {...register(`components.${index}.id`)} name={`components.${index}.id`} id={`components.${index}.id`} defaultValue={index} />
                                <div className="md:flex md:items-center">
                                    <label htmlFor={`components.${index}.label`} className="md:w-3/5">Component Label: </label>
                                    <input type="text" {...register(`components.${index}.label`)} name={`components.${index}.label`} 
                                        id={`components.${index}.label`} defaultValue={field.label} />
                                </div>
                                <GroupSelectInput register={register} index={ index } selectDefaultValue={props.defaultValues} />
                                <div className="md:flex md:items-center">
                                    <label htmlFor={`components.${index}.width`} className="md:w-3/5">Width: </label>
                                    <input {...register(`components.${index}.width`, { valueAsNumber: true })} name={`components.${index}.width`} id={`components.${index}.width`} type="number" />
                                </div>
                                <div className="md:flex md:items-center">
                                    <label htmlFor={`components.${index}.height`} className="md:w-3/5">Height: </label>
                                    <input {...register(`components.${index}.height`, { valueAsNumber: true })} name={`components.${index}.height`} id={`components.${index}.height`} type="number" />
                                </div>
                                <div className="md:flex md:items-center">
                                    <label htmlFor={`components.${index}.xaxis`} className="md:w-3/5">X-Axis: </label>
                                    <input {...register(`components.${index}.xaxis`, { valueAsNumber: true })} name={`components.${index}.xaxis`} id={`components.${index}.xaxis`} type="number" />
                                </div>
                                <div className="md:flex md:items-center">
                                    <label htmlFor={`components.${index}.yaxis`} className="md:w-3/5">Y-Axis: </label>
                                    <input {...register(`components.${index}.yaxis`, { valueAsNumber: true })} name={`components.${index}.yaxis`} id={`components.${index}.yaxis`} type="number" />
                                </div>
                                <div className="md:flex md:items-center">
                                    <label htmlFor={`components.${index}.zaxis`} className="md:w-3/5">Z-Axis: </label>
                                    <input {...register(`components.${index}.zaxis`, { valueAsNumber: true })} name={`components.${index}.zaxis`} id={`components.${index}.zaxis`} type="number" />
                                </div>
                                <button onClick={() => remove(index)} className="p-2 bg-red-200"> Remove </button>
                            </div>
                        ))
                    }
                </div>
                
                <div className="flex flex-row m-3 gap-x-2">
                    <button type="button" onClick={() => append({label: ""})} className="p-2">Add Component</button>
                    <button type="submit" className="p-2"> 
                        {props.defaultValues ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    )
}

Form.propTypes = { 
    defaultValues: PropTypes.object 
}

export default Form;