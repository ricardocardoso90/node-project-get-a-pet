import api from "../../utils/api";
import styles from "./styles.module.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { ImageProfile } from "../../components/ImageProfile";
import useFlashMessage from "../../hooks/useFlashMessage";

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
        console.log(response.data.pets)
      })
  }, [token]);

  return (
    <section>
      <div>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>

      <div>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id}>
              <ImageProfile
                width="75px"
                alt={pet.name}
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
              />
              <span className="bold">{pet.name}</span>
            </div>
          ))
        };
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </div>
    </section>
  );
};