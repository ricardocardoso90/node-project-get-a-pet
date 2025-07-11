import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const Context = createContext();

export function UserProvider({ children }) {
  const { login, register, authenticated, logout } = useAuth();

  return (
    <Context.Provider value={{ login, register, authenticated, logout }}>
      {children}
    </Context.Provider>
  );
};