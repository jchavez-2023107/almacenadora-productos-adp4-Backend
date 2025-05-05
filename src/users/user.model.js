import { Schema, model } from "mongoose"

const ROLES = ["Admin", "Employee", "CLIENT"];

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
  },
  surname: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "El username es obligatorio"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Debe ser un correo válido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    select: false,
  },
  phone: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ROLES,
    default: "CLIENT",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// **Eliminamos** el hook pre('save') para no re-hashear aquí.
// Porque el hashing ya lo hacemos en utils/encrypt.js antes de construir el User.
export default model ('User', userSchema)