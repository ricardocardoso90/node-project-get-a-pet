import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

import Logo from "../../assets/img/logo.png";
import { Context } from "../../context/userContext";

export function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-logo']}>
        <img src={Logo} alt="Get A Pet" />
        <h2>Get A Pet</h2>
      </div>

      <ul>
        <li><Link to="/">Adotar</Link></li>

        {authenticated
          ?
          <>
            <li onClick={logout}>Sair</li>
          </>
          :
          <>
            <li><Link to="/login">Entrar</Link></li>
            <li><Link to="/register">Cadastrar</Link></li>
          </>
        }
      </ul >
    </nav >
  );
};