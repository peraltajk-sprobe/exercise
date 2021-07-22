const Input = ({ register, name, type, label, id ,...rest }) => {
    return (
      <div className={`flex flex-col justify-start ${type === "hidden" ? "hidden": "block"} `}>
          {label && (
              <label htmlFor={id} className="text-sm"> { label } </label>
          )}
          <input name={name} id={id} type={type} {...register(name, { valueAsNumber: type === "number" ? true : false })} {...rest} />
      </div>
    );
}

export default Input;