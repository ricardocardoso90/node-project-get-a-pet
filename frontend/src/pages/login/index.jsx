import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import styles from "../../styles/form.module.css";

import { Input } from "../../components/input";
import { Context } from "../../context/userContext";

export function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  };

  return (
    <section className={styles["form-container"]}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu email"
          handleOnChange={handleChange}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />

        <input type="submit" value="Entrar" />
      </form>

      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  );
};