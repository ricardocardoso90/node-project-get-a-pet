import api from "../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) { api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}` };
    setAuthenticated(true);
  }, []);

  //REGISTRAR NOVOS USUÁRIOS.
  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "sucess";

    try {
      const response = await api.post('/users/register', user);
      const data = response.data;

      await authUser(data);
      console.log(`Usuário registrado com sucesso: ${data}`);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    };

    setFlashMessage(msgText, msgType);
  };

  //AUTHENTICAR USUÁRIOS.
  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem('token', JSON.stringify(data.token));
    navigate('/');
  };

  //FUNÇÃO PARA DESLOGAR USUÁRIOS.
  async function logout() {
    const msgText = 'Logout realizado com sucesso!!';
    const msgType = 'sucess';

    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    navigate('/');

    setFlashMessage(msgText, msgType);
  };

  return { register, authenticated, logout };
};