import {Router} from "express";

import{
    createClient,
    getClient,
    updateClient,
    deleteClient,
}from "./client.contoller.js";

const api = Router();

api.post("/", createClient)
api.get ("/", getClient)
api.put("/:id", updateClient)
api.delete("/:id",deleteClient)

export default api;