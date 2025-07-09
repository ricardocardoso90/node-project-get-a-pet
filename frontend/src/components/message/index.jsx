import { useState } from "react";
import styles from "./styles.module.css";

export function Message() {
  const [type, setType] = useState("error");

  return (
    <div className={`${styles.message} ${styles[type]}`}>
      <span>Minha mensagem</span>
    </div>
  );
};