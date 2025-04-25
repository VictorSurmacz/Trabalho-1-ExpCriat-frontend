import { useState, useEffect } from "react";

const Edit = ({ user, onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [idade, setIdade] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("");
  

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setIdade(user.idade || "");
      setCpf(user.cpf || "");
      setEmail(user.email || "");
      setGenero(user.genero || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !idade || !cpf || email || genero ) {
      alert("Preencha todos os campos!");
      return;
    }

    onSubmit({ firstName, idade, cpf, email, genero });
  };

  return (
    <div  className="container edit-layout">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default Edit;
