import {Router} from "express";

import{
    createClient,
    getClient,
    updateClient,
    deleteClient,
}from "./client.contoller.js";
import { validateJWT,isCLIENT } from "../../middlewares/validate.jwt.js";


const api = Router();

api.post("/", [validateJWT,isCLIENT ], createClient)
api.get ("/", [validateJWT,isCLIENT ],getClient)
api.put("/:id", [validateJWT,isCLIENT ],updateClient)
api.delete("/:id",[validateJWT,isCLIENT ],deleteClient)

export default api;