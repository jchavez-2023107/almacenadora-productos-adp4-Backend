import { Router } from "express"
import { validateRoles, validateJWT } from "../../middlewares/validate.jwt.js"
import { addSupplier, updateSupp } from "./suppliers.controller.js"

const api = Router()

api.post('/addSupplier', [validateJWT, validateRoles('Admin')], addSupplier)
api.put('/updateSupp/:id', [validateJWT, validateRoles('Admin')], updateSupp)

export default api