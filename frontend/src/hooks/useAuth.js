import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAuth() {
  async function register(user) {
    try {
      // const data = api.post('/users/register', user).then((response) => {
      //   return response.data;
      // });

      const response = await api.post('/users/register', user);
      const data = response.data;

      console.log(`Usuário registrado com sucesso: ${data}`);
    } catch (error) {
      console.log(error);
    };
  };

  return { register };
};