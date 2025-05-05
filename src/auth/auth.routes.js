import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller.js";
import { validateJWT } from "../../middlewares/validate.jwt.js";
import { getEmployees } from "../users/user.default.js";

const api = Router();

/**
 * 📌 Rutas de autenticación
 */
api.post("/register", registerUser); // Registro de usuario (CLIENT_ROLE por defecto)
api.post("/login", loginUser); // Inicio de sesión y generación de token
api.get("/test", validateJWT, (req, res) => {
  res.json({ message: "Token válido" });
});
api.get("/Employees/:Employee", getEmployees)

export default api;
