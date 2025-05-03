import { Schema, model } from 'mongoose';

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      unique: true,
      required: true
    },
    adress: {
      type: String,
      maxLength: 150,
      required: true
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Debe ser un correo válido"]
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: false
  }
);

export default model('Supplier', supplierSchema);