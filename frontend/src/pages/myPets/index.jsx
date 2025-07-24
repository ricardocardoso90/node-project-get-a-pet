import api from "../../utils/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import useFlashMessage from "../../hooks/useFlashMessage";
import styleGlobals from "../../styles/dashboard.module.css";

import { ImageProfile } from "../../components/ImageProfile";

export function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');

  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    })
      .then((response) => {
        setPets(response.data.pets);
      })
  }, [token]);

  async function removePet(id) {
    let msgType = "sucess";

    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    })
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);

        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        return error.resonse.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <section>
      <div className={styleGlobals["petlist-header"]}>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>

      <div className={styleGlobals["petlist-container"]}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styleGlobals["petlist-row"]} key={pet._id}>
              <ImageProfile
                width="px75"
                alt={pet.name}
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
              />
              <span className="bold">{pet.name}</span>
              <div className={styleGlobals.actions}>
                {pet.available
                  ? (
                    <>
                      {pet.adopter && (
                        <button className={styleGlobals["conclude-btn"]}>Concluir adoção</button>
                      )}
                      <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                      <button onClick={() => removePet(pet._id)}>Excluir</button>
                    </>
                  )
                  : (<p>Pet já adotado</p>)}
              </div>
            </div>
          ))
        }
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </div>
    </section>
  );
};