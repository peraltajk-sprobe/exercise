import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useFormContext } from '../../hooks';
import GroupSelectInput from '../GroupSelectInput';
import PropTypes  from 'prop-types';

const RangeForm = (props) => {
    const { state ,dispatch } = useFormContext();
    const { activeItem } = state;
    const { register, control, handleSubmit } = useForm({ defaultValues: props.data });
    const { fields } = useFieldArray({
        control,
        name: "components",
        keyName: "id"
    });

    const onClickSubmit = (data) => {
        dispatch({type: 'update', payload: data});
        if (data.id === activeItem.id) {
            dispatch({ type: 'viewItem', payload: props.data.id })
        }
    }
    
    return (
        <div className="flex flex-row gap-x-4">
            <form onSubmit={handleSubmit(onClickSubmit)} className="flex flex-col gap-y-4">
                <div className="grid gap-x-4 gap-y-4 grid-rows-2 grid-flow-col">
                    <input {...register("id")} name="id" id="id" hidden />
                    <div className="flex flex-col justify-start">
                        <label htmlFor="label" className="text-sm">Range Label: </label>
                        <input {...register("label", { required: "Please enter Label." })} name="label" id="label" type="text" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="width" className="text-sm">Width: </label>
                        <input {...register("width", { valueAsNumber: true })} name="width" id="width" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="height" className="text-sm">Height: </label>
                        <input {...register("height", { valueAsNumber: true })} name="height" id="height" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="xaxis" className="text-sm">X-Axis: </label>
                        <input {...register("xaxis", { valueAsNumber: true })} name="xaxis" id="xaxis" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="yaxis" className="text-sm">Y-Axis: </label>
                        <input {...register("yaxis", { valueAsNumber: true })} name="yaxis" id="yaxis" type="number" />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label htmlFor="zaxis" className="text-sm">Z-Axis: </label>
                        <input {...register("zaxis", { valueAsNumber: true })} name="zaxis" id="zaxis" type="number" />
                    </div>
                </div>
                <div>
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-y-4 bg-yellow-100 p-2 border-2 border-yellow-400">
                                <div className="grid gap-x-4 gap-y-4 grid-rows-3 grid-flow-col">
                                    <input type="hidden" {...register(`components.${index}.id`)} name={`components.${index}.id`} id={`components.${index}.id`} defaultValue={index} />
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.label`} className="text-sm">Component Label: </label>
                                        <input type="text" {...register(`components.${index}.label`)} name={`components.${index}.label`} 
                                            id={`components.${index}.label`} defaultValue={field.label} />
                                    </div>
                                    <GroupSelectInput register={register} index={ index } selectDefaultValue={props.data} />
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.width`} className="text-sm">Width: </label>
                                        <input {...register(`components.${index}.width`, { valueAsNumber: true })} name={`components.${index}.width`} id={`components.${index}.width`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.height`} className="text-sm">Height: </label>
                                        <input {...register(`components.${index}.height`, { valueAsNumber: true })} name={`components.${index}.height`} id={`components.${index}.height`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.xaxis`} className="text-sm">X-Axis: </label>
                                        <input {...register(`components.${index}.xaxis`, { valueAsNumber: true })} name={`components.${index}.xaxis`} id={`components.${index}.xaxis`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.yaxis`} className="text-sm">Y-Axis: </label>
                                        <input {...register(`components.${index}.yaxis`, { valueAsNumber: true })} name={`components.${index}.yaxis`} id={`components.${index}.yaxis`} type="number" />
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <label htmlFor={`components.${index}.zaxis`} className="text-sm">Z-Axis: </label>
                                        <input {...register(`components.${index}.zaxis`, { valueAsNumber: true })} name={`components.${index}.zaxis`} id={`components.${index}.zaxis`} type="number" />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button type="button" onClick={() => dispatch({ type: 'viewItem', payload: props.data.id })}>View</button>
                <button type="submit">Update</button>
                <button type="button">Delete</button>
            </form>
        </div>
    )
}


RangeForm.propTypes = { 
    data: PropTypes.object 
}


export default RangeForm;