const Select = ({ register, options, name, label, id , ...rest }) => {
    return (
      <div className="flex flex-col justify-start">
          {label && (
              <label htmlFor={id} className="text-sm"> { label } </label>
          )}
          <select {...register(name)} name={name} id={id} {...rest}>
              {options.map((value) => (
                  <option value={value} key={value}>{value}</option>
              ))}
          </select>
      </div>
      
    );
}

export default Select;
  