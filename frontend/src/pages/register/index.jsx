import { Input } from "../../components/input";

export function Register() {
  function handleChange(e) {
    console.log(e.target.value);
  };

  return (
    <section>
      <h1>Registrar</h1>

      <form>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />

        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
        />

        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu E-mail"
          handleOnChange={handleChange}
        />

        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua Senha"
          handleOnChange={handleChange}
        />

        <Input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua Senha"
          handleOnChange={handleChange}
        />

        <input type="submit" value="Cadastrar" />
      </form>
    </section>
  );
};