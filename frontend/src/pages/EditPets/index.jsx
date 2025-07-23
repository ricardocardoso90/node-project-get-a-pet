import api from "../../utils/api";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useFlashMessage from "../../hooks/useFlashMessage";
import { PetForm } from "../../components/PetForm";

export function EditPets() {
  const navigate = useNavigate();

  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  async function updatePet(pet) {
    let msgType = "sucess";
    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i])
        };
      } else {
        formData.append(key, pet[key]);
      };
    });

    const data = await api.patch(`pets/${pet._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = 'error';
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);
    navigate('/pet/mypets')
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