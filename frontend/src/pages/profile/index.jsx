import styles from "./styles.module.css";
import stylesGlobals from "../../styles/form.module.css";

import { Input } from "../../components/input";
import { useEffect, useState } from "react";

export function Profile() {
  const [user, setUser] = useState({});

  function handleFileChange(e) {

  };

  function handleChange(e) {

  };

  useEffect(() => {

  }, []);

  return (
    <section >
      <div className={styles["profile-container"]}>
        <h1>Perfil</h1>
        <p>Preview Imagem</p>
      </div>

      <form className={stylesGlobals["form-container"]}>
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