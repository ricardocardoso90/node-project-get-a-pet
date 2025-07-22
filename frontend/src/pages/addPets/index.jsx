import api from "../../utils/api";
import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";


import { PetForm } from "../../components/PetForm";
import useFlashMessage from "../../hooks/useFlashMessage";

export function AddPets() {
  const [token] = useState(localStorage.getItem('token') || '');

  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();

  async function registerPet(pet) {
    let msgType = "sucess";
    const formData = new FormData();

    await Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    const data = await api.post('pets/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'multipart/form-data',
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = 'error';
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);

    if (msgType !== 'error') {
      navigate("/pets/mypets");
    };
  };

  return (
    <section className={styles["addpet-header"]}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção.</p>
      </div>

      <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
    </section>
  );
};