import { useState } from "react";

const DataList = ({ data, onEdit, onDelete, onCreate }) => {
  return (
    <div className="container datalist-layout">
      <h1>Lista de Usuários</h1>
      <button onClick={onCreate}>Cadastrar Usuario</button>
      <ul className="list">
        {data.map((user) => (
          <li key={user.id} className="li-list">
            <strong>{user.firstName}</strong>
            <div className="user-details">
              <p>Idade: {user.idade}</p>
              <p>CPF: {user.cpf}</p>
              <p>Email: {user.email}</p>
              <p>Genero: {user.genero}</p>
              <button onClick={() => onEdit(user)}>Atualizar</button>
              <button onClick={() => onDelete(user.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
