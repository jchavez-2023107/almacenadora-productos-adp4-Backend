import { Router } from "express"
import { addSupplier, getSuppliers,updateSupp,deleteSuppliers } from "./suppliers.controller.js"

import { validateJWT,validateRoles} from "../../middlewares/validate.jwt.js"



const api = Router()

api.post('/', addSupplier)

api.get('/',[validateJWT,validateRoles ('Admin') ],getSuppliers )
api.put('/:id',[validateJWT,validateRoles ('Admin') ], updateSupp)
api.delete('/:id',[validateJWT,validateRoles ('Admin') ],deleteSuppliers )
api.get('/',[validateJWT,validateRoles ('Admin') ],getSuppliers )
api.put('/:id',[validateJWT,validateRoles ('Admin') ], updateSupp)
api.delete('/:id',[validateJWT,validateRoles ('Admin') ],deleteSuppliers )


export default api