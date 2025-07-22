import { useState } from "react";
import styles from "./styles.module.css";
import stylesGlobals from "../../styles/form.module.css";

import { Input } from "../input/index";
import { Select } from "../select";

export function PetForm({ petData, btnText, handleSubmit }) {
  const [preview, setPreview] = useState([]);
  const [pet, setPet] = useState(petData || {});

  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  };

  function handleChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  function handleColor(e) {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  };

  function submit(e) {
    e.preventDefault();
    handleSubmit(pet);
  };

  return (
    <form onSubmit={submit} className={stylesGlobals["form-container"]}>
      <div className={stylesGlobals["preview-pet-images"]}>
        {preview.length > 0
          ? preview.map((image, index) => (
            <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name}+${index}`} />
          ))
          : pet.images &&
          pet.images.map((image, index) => (
            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name} key={`${pet.name}+${index}`} />
          ))
        }
      </div>

      <Input
        type="file"
        name="images"
        text="Imagens do Pet"
        handleOnChange={onFileChange}
        multiple={true}
      />

      <Input
        type="text"
        name="name"
        text="Nome do Pet"
        placeholder="Digite o nome"
        value={pet.name || ""}
        handleOnChange={handleChange}
        multiple={true}
      />

      <Input
        type="text"
        name="age"
        text="Idade do Pet"
        placeholder="Digite a idade"
        value={pet.age || ""}
        handleOnChange={handleChange}
        multiple={true}
      />

      <Input
        type="number"
        name="weight"
        text="Peso do Pet"
        placeholder="Digite o peso"
        value={pet.weight || ""}
        handleOnChange={handleChange}
        multiple={true}
      />

      <Select
        name="color"
        text="Selecione a cor"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  )
};