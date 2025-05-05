import {Router} from "express";

import{
    createClient,
    getClient,
    updateClient,
    deleteClient,
}from "./client.contoller.js";
import { validateJWT, validateRoles} from "../../middlewares/validate.jwt.js";


const api = Router();

api.post("/", [validateJWT,validateRoles('Admin', 'Employee') ], createClient)
api.get ("/", [validateJWT,validateRoles('Admin', 'Employee') ],getClient)
api.put("/:id", [validateJWT,validateRoles('Admin', 'Employee') ],updateClient)
api.delete("/:id",[validateJWT,validateRoles('Admin', 'Employee') ],deleteClient)

export default api;