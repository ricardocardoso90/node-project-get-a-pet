import api from "../../utils/api";
import styles from "./styles.module.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets")
      .then((response) => {
        setPets(response.data.pets);
      });
  }, []);

  return (
    <section>
      <div className={styles['pet-home-header']}>
        <h1>Adote um pet</h1>
        <p>Veja os detalhes de cada um, e conheça o tutor deles.</p>
      </div>

      <div className={styles['pet-container']}>
        {pets.length > 0 && (
          pets.map((pet) => (
            <div key={pet._id} className={styles['pet-card']}>
              <img src={
                `${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
              />
              <h3>{pet.name}</h3>
              <p><span className="bold">Peso:</span> {pet.weight}kg</p>

              {pet.available
                ? (
                  <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
                )
                : (
                  <p className={styles['adopted-text']}>Adotado</p>
                )
              }
            </div>
          ))
        )}

        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento.</p>
        )}
      </div>
    </section>
  );
};