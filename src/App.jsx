import "./App.css";
import { useState, useEffect } from "react";
import DataList from "./componentes/DataList";
import Create from "./componentes/Create";
import Edit from "./componentes/Edit";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8800/usuarios")
      .then((res) => res.json())
      .then((dados) => setData(dados));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8800/usuarios/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Erro ao deletar");
  
      setData(data.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erro ao deletar usuário:", err.message);
      alert("Erro ao deletar usuário.");
    }
  };

  const handleCreate = (user) => {
    fetch("http://localhost:8800/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((novo) => {
        setData([...data, novo]);
        setPage("list");
      });
  };

  const handleUpdate = (user) => {
    fetch(`http://localhost:8800/usuarios/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        setData(data.map((u) => (u.id === selectedUser.id ? { ...u, ...user } : u)));
        setPage("list");
        setSelectedUser(null);
      });
  };

  return (
    <div className="App">
      {page === "list" && (
        <DataList
          data={data}
          onEdit={(user) => {
            setSelectedUser(user);
            setPage("edit");
          }}
          onDelete={handleDelete}
          onCreate={() => setPage("create")}
        />
      )}

      {page === "create" && (
        <Create
          onSubmit={handleCreate}
          onCancel={() => setPage("list")}
        />
      )}

      {page === "edit" && selectedUser && (
        <Edit
          user={selectedUser}
          onSubmit={handleUpdate}
          onCancel={() => {
            setPage("list");
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
