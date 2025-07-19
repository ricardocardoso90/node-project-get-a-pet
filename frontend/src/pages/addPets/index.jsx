import styles from "./styles.module.css";
import { PetForm } from "../../components/petForm";

export function AddPets() {
  return (
    <section className={styles["addpet-header"]}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção.</p>
      </div>

      <PetForm btnText="Cadastrar Pet" />
    </section>
  );
};