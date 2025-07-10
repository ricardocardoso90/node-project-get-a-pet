import { useState } from "react";
import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";

// import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "sucess";

    try {
      const response = await api.post('/users/register', user);
      const data = response.data;

      console.log(`Usuário registrado com sucesso: ${data}`);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    };

    setFlashMessage(msgText, msgType);
  };

  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem('token', JSON.stringify(data.token));
    history.push('/');
  };

  return { register, authUser };
};