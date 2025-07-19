import styles from "./styles.module.css";

export function AddPets() {
  return (
    <section className={styles["addpet-header"]}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção.</p>
      </div>

      <p>Formulário</p>
    </section>
  );
};