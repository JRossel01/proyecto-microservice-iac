import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "users.json");

// Función auxiliar para leer el archivo
function readData() {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data || "[]");
}

// Función auxiliar para escribir el archivo
function writeData(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

// Obtener todos los usuarios
export function getUsers() {
  return readData();
}

// Crear nuevo usuario
export function createUser(user) {
  const users = readData();
  const newUser = { id: Date.now(), ...user };
  users.push(newUser);
  writeData(users);
  return newUser;
}

// Actualizar usuario por ID
export function updateUser(id, updatedData) {
  const users = readData();
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) return null;
  users[index] = { ...users[index], ...updatedData };
  writeData(users);
  return users[index];
}

// Eliminar usuario por ID
export function deleteUser(id) {
  const users = readData();
  const filtered = users.filter((u) => u.id !== Number(id));
  if (filtered.length === users.length) return false;
  writeData(filtered);
  return true;
}
