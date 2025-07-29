import api from "../../utils/api";
import { useState, useEffect } from "react";
import stylesGlobals from "../../styles/dashboard.module.css";

import { ImageProfile } from "../../components/ImageProfile";

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
    <section>
      <div className={stylesGlobals['petlist-header']}>
        <h1>Minhas adoções</h1>
      </div>

      <div className={stylesGlobals['petlist-container']}>
        {pets.length > 0 && (
          pets.map((pet) => (
            <div className={stylesGlobals["petlist-row"]} key={pet._id}>
              <ImageProfile
                width="px75"
                alt={pet.name}
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
              />
              <span className="bold">{pet.name}</span>

              <div className={stylesGlobals['contacts']}>
                <p><span className="bold">Ligue para: </span> {pet.user.phone}</p>
                <p><span className="bold">Fale com: </span> {pet.user.name}</p>
              </div>

              <div className={stylesGlobals.actions}>
                {pet.available
                  ? (<p>Adoção em processo</p>)
                  : (<p>Parabéns por concluir a adoção</p>)}
              </div>
            </div>
          ))
        )}

        {pets.length === 0 && <p>Ainda não há adoções de Pets</p>}
      </div>
    </section>
  );
};