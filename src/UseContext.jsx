/* import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  return (
    <FormContext.Provider value={{ isActive, setIsActive, user, setUser }}>
      {children}
    </FormContext.Provider>
  );
};
export const useForm = () => useContext(FormContext);
 */
