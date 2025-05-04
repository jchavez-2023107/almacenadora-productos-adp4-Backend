import { Router } from "express"
import { validateRoles, validateJWT } from "../../middlewares/validate.jwt.js"
import { addSupplier, updateSupplier } from "./suppliers.controller.js"

const api = Router()

api.post('/addSupplier', 
    [
        validateJWT, 
        validateRoles('Admin')
    ], 
addSupplier)

api.put('/updateSupplier/:id', 
    [
        validateJWT, 
        validateRoles('Admin')
    ], 
updateSupplier)

export default api