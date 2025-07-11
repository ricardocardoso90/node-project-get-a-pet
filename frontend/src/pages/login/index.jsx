import { Link } from "react-router-dom";
import styles from "../../styles/form.module.css";

import { Input } from "../../components/input";

export function Login() {
  function handleChange(e) {

  };

  return (
    <section className={styles["form-container"]}>
      <h1>Login</h1>

      <Input
        text="E-mail"
        type="email"
        name="email"
        placeholder="Digite o seu email"
        handleChange={handleChange}
      />

      <Input
        text="Senha"
        type="password"
        name="password"
        placeholder="Digite a sua senha"
        handleChange={handleChange}
      />

      <input type="submit" value="Entrar" />

      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  );
};