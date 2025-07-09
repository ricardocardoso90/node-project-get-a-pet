import bus from "../../utils/bus";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export function Message() {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);

  return (
    visibility && (
      <div className={`${styles.message} ${styles[type]}`}>
        <span>{message}</span>
      </div>
    )
  );
};