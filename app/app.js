import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/usersService.js";

const app = express();

// Middleware para leer JSON en las peticiones
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "Hola Microservicio 3" });
});

//CRUD de usuarios
//Listar
app.get("/users", (_req, res) => {
  const users = getUsers();
  res.json(users);
});

//Crear
app.post("/users", (req, res) => {
  const { nombre, apellido, celular } = req.body;
  if (!nombre || !apellido || !celular) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  const user = createUser({ nombre, apellido, celular });
  res.status(201).json(user);
});

//Actualizar
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updated = updateUser(id, req.body);
  if (!updated) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json(updated);
});

//Eliminar
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const deleted = deleteUser(id);
  if (!deleted) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json({ message: "Usuario eliminado correctamente" });
});

export default app;