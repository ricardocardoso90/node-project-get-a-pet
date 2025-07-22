import api from "../../utils/api";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

import stylesGlobals from "../../styles/form.module.css";
import useFlashMessage from "../../hooks/useFlashMessage";

import { Input } from "../../components/Input";
import { ImageProfile } from "../../components/ImageProfile";

export function Profile() {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem('token') || '');

  const { setFlashMessage } = useFlashMessage();

  function handleFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    let msgType = "sucess";

    const formData = new FormData();
    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    const data = await api.patch(`/users/edit/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = "error"
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  // async function getUser() {
  //   try {
  //     const response = await api.get("/users/checkuser", {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(token)}`
  //       },
  //     });

  //     const data = response.data;
  //     setUser(data);
  //   } catch (error) {
  //     console.log(error);
  //   };
  // };

  useEffect(() => {
    // getUser();
    try {
      api.get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      })
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        });

    } catch (error) {
      console.log(error);
    };
  }, [token]);

  return (
    <section >
      <div className={styles["profile-container"]}>
        <h1>Perfil</h1>

        {(user.image || preview) && (
          <ImageProfile
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}/images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className={stylesGlobals["form-container"]}
      >
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={handleFileChange}
        />

        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
          value={user.email || ""}
        />

        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={user.name || ""}
        />

        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ""}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite o sua senha"
          handleOnChange={handleChange}
        />

        <Input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />

        <input type="submit" value="Editar" />
      </form>
    </section>
  );
};