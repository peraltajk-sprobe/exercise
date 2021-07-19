import { createContext, useContext } from 'react';

const FormContext = createContext(null);

export const useFormContext = () => useContext(FormContext);
export const FormContextProvider = FormContext.Provider;