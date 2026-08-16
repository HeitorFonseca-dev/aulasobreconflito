const express = require("express");

const app = express();
const PORT = 3000;

// Permite que o Express leia JSON no corpo (body) das requisicoes
app.use(express.json());

// "Banco de dados" em memoria: some quando o servidor reinicia
let usuarios = [
  { id: 1, nome: "Carlos", email: "carlos@email.com" },
//   { id: 2, nome: "Bruno", email: "bruno@email.com" },
];

let proximoId = 3;

// READ - lista todos os usuarios
app.get("/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

// CREATE - cadastra um novo usuario
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "nome e email sao obrigatorios" });
  }

  const novoUsuario = { id: proximoId++, nome, email };
  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

// UPDATE - atualiza um usuario existente
app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: "usuario nao encontrado" });
  }

  const { nome, email } = req.body;

  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  res.status(200).json(usuario);
});

// DELETE - remove um usuario
app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "usuario nao encontrado" });
  }

  usuarios.splice(indice, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
