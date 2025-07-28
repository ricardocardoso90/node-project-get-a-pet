import api from "../../utils/api";
import styles from "./styles.module.css";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useFlashMessage from "../../hooks/useFlashMessage";

export function PetDetails() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');

  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();

  async function schedule() {
    let msgType = "sucess";

    const data = await api.patch(`pets/schedule/${pet._id}`, {
      Authorization: `Bearer ${JSON.parse(token)}`,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  useEffect(() => {
    api.get(`/pets/${id}`)
      .then((response) => setPet(response.data.pet))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      {pet.name && (
        <section className={styles['pet-details-container']}>
          <div className={styles['pet-details-header']}>
            <h1>Conhecendo o pet: {pet.name}</h1>
            <p>Se tiver interesse, marca uma visita para conhecê-lo</p>
          </div>

          <div className={styles['pet-images']}>
            {pet.images.map((image, index) => (
              <img
                key={index}
                alt={pet.name}
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
              />
            ))}
          </div>

          <p><span className="bold">Peso: </span> {pet.weight}kg</p>
          <p><span className="bold">Idade: </span> {pet.age} anos</p>

          {token
            ? (<button onClick={schedule}>Solicitar uma visita</button>)
            : (<p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita</p>)
          }
        </section>
      )}
    </>
  );
};