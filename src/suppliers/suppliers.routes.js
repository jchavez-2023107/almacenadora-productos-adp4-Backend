import { Router } from "express"
import { isAdmin, validateJWT } from "../../middlewares/validate.jwt.js"
import { addSupplier, updateSupp } from "./suppliers.controller.js"

const api = Router()

api.post('/addSupplier', [validateJWT, isAdmin], addSupplier)
api.put('/updateSupp/:id', [validateJWT, isAdmin], updateSupp)

export default api