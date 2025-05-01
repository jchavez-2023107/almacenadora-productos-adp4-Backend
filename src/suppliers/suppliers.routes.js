import { Router } from "express"
import { validateJWT } from "../../middlewares/validate.jwt.js"
import { addSupplier, updateSupp } from "./suppliers.controller.js"

const api = Router()

api.post('/addSupplier', addSupplier)
api.put('/updateSupp/:id', updateSupp)

export default api