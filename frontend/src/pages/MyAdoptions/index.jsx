import api from "../../utils/api";
import styles from "./styles.module";
import { useState, useEffect } from "react";

export function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    api.get('/pets/myadoptions', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [token]);

  return (
    <div>
      <h1>Minhas adoções</h1>
    </div>
  );
};