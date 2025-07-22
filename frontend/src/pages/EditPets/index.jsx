import api from "../../utils/api";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useFlashMessage from "../../hooks/useFlashMessage";
import { PetForm } from "../../components/PetForm";

export function EditPets() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  async function updatePet(pet) {

  };

  useEffect(() => {
    api.get(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  return (
    <section>
      <div className={styles["addpet-header"]}>
        <h1>Editando o pet: {pet.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>

      {pet.name && (
        <PetForm
          petData={pet}
          btnText="Atualizar"
          handleSubmit={updatePet}
        />
      )};
    </section>
  );
};