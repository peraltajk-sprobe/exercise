import React, { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useFormContext } from '../hooks';
import GroupSelectInput from './GroupSelectInput';
import { Form, Input } from './SmartForm';
import PropTypes  from 'prop-types';
import 'twin.macro'

const CreateForm = (props) => {
    const { dispatch } = useFormContext();
    const formMethods = useForm({ defaultValues: props.defaultValues });
    const { control, reset, register } = formMethods;
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
        dispatch({type: 'create', payload: data});
        reset();
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
            <Form onSubmit={onClickSubmit} formMethods={formMethods} className="flex flex-col gap-y-4">
                <div className="grid gap-x-4 gap-y-4 grid-rows-3 grid-flow-col">
                    <Input name="id" id="id" hidden type="hidden" register={register} />
                    <Input name="label" label="Range Label" type="text" id="label" register={register}/>
                    <Input name="width" label="Width" type="number" id="width" register={register}/>
                    <Input name="height" label="Height" type="number" id="height" register={register}/>
                    <Input name="xaxis" label="X-Axis" type="number" id="xaxis" register={register}/>
                    <Input name="yaxis" label="Y-Axis" type="number" id="yaxis" register={register}/>
                    <Input name="zaxis" label="Z-Axis" type="number" id="zaxis" register={register}/>
                </div>
            
                <div className="flex flex-col gap-y-4">
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-y-4">
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
                
                <div className="flex flex-row m-3 gap-x-2">
                    <button type="button" onClick={() => append({label: ""})} className="p-2">Add Component</button>
                    <button type="submit" className="p-2"> 
                        {props.defaultValues ? "Update" : "Create"}
                    </button>
                </div>
            </Form>
        </div>
    )
}

CreateForm.propTypes = { 
    defaultValues: PropTypes.object 
}

export default CreateForm;