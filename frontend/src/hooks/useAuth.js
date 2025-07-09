import api from "../utils/api";
import useFlashMessage from "./useFlashMessage";

// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();

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

  return { register };
};