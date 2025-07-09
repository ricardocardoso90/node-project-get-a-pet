import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const Context = createContext();

export function UserProvider({ children }) {
  const { register } = useAuth();

  return (
    <Context.Provider value={{register}}>
      {children}
    </Context.Provider>
  );
};