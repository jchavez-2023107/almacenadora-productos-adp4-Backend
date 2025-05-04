import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            require: [true, "El nombre es obligatorio"],
        },
        email:{
            type: String, 
            require: [true, "El email es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Debe ser un email válido"],
        },
        company:{
            type: String, 
            require: true
        },
        product:{
            type: String,
            require: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    {timestamps: true,versionKey:false}
);

export default mongoose.model("Clients",clientSchema);