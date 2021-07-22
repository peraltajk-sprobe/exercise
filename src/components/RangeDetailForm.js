import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useFormContext } from '../hooks';
import GroupSelectInput from '../components/GroupSelectInput';
import { Form, Input } from './SmartForm';
import PropTypes  from 'prop-types';

const RangeDetailForm = (props) => {
    const { state ,dispatch } = useFormContext();
    const { activeItem } = state;
    const formMethods = useForm({ defaultValues: props.data });
    const { register, control, handleSubmit } = formMethods;
    const { fields, remove } = useFieldArray({
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

    const onClickDelete = (id) => {
        dispatch({type: 'delete', payload: id});
        if (id === activeItem.id) {
            dispatch({ type: 'viewItem', payload: id })
        }
    }
    
    return (
        <div className="flex flex-row gap-x-4">
            <Form onSubmit={handleSubmit(onClickSubmit)} formMethods={formMethods} className="flex flex-1 flex-col gap-y-4">
                <div className="grid gap-x-4 gap-y-4 grid-rows-2 grid-flow-col">
                    <Input name="id" id="id" hidden type="hidden" register={register} />
                    <Input name="label" label="Range Label" type="text" id="label" register={register}/>
                    <Input name="width" label="Width" type="number" id="width" register={register}/>
                    <Input name="height" label="Height" type="number" id="height" register={register}/>
                    <Input name="xaxis" label="X-Axis" type="number" id="xaxis" register={register}/>
                    <Input name="yaxis" label="Y-Axis" type="number" id="yaxis" register={register}/>
                    <Input name="zaxis" label="Z-Axis" type="number" id="zaxis" register={register}/>
                </div>
                <div>
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-y-4 bg-yellow-100 p-2 border-2 border-yellow-400">
                                <div className="grid gap-x-4 gap-y-4 grid-rows-3 grid-flow-col">
                                    <Input name={`components.${index}.id`} defaultValue={index} id={`components.${index}.id`} register={register} type="hidden" />
                                    <Input name={`components.${index}.label`} label="Component Label" id={`components.${index}.label`} type="text" register={register}/>
                                    <GroupSelectInput index={ index } register={register}/>
                                    <Input name={`components.${index}.width`} id={`components.${index}.width`} label="Width" type="number" register={register}/>
                                    <Input name={`components.${index}.height`} id={`components.${index}.height`} label="Height" type="number" register={register}/>
                                    <Input name={`components.${index}.xaxis`} id={`components.${index}.xaxis`} label="X-Axis" type="number" register={register}/>
                                    <Input name={`components.${index}.yaxis`} id={`components.${index}.yaxis`} label="Y-Axis" type="number" register={register}/>
                                    <Input name={`components.${index}.zaxis`} id={`components.${index}.zaxis`} label="Z-Axis" type="number" register={register}/>
                                </div>
                                <button onClick={() => remove(index)} className="p-2 bg-red-200"> Remove </button>
                            </div>
                        ))
                    }
                </div>
                <button type="button" onClick={() => dispatch({ type: 'viewItem', payload: props.data.id })}>View</button>
                <button type="submit">Update</button>
                <button type="button" onClick={() => onClickDelete(props.data.id)}>Delete</button>
            </Form>
        </div>
    )
}


RangeDetailForm.propTypes = { 
    data: PropTypes.object 
}


export default RangeDetailForm;