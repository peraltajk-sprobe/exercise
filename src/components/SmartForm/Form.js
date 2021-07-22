import React from "react";

const Form = ({ formMethods, children, onSubmit, ...rest }) => {
  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)} {...rest}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: formMethods.register,
                    key: child.props.name
                  }
                })
              : child;
          })
        : children}
    </form>
  );
}

export default Form;
