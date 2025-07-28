import api from "../../utils/api";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useFlashMessage from "../../hooks/useFlashMessage";

export function PetDetails() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get(`/pets/${id}`)
      .then((response) => setPet(response.data.pet))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <section>
      <h1>{pet.name}</h1>
    </section>
  );
};