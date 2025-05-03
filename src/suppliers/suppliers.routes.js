import { Router } from "express"
import { addSupplier, getSuppliers,updateSupp,deleteSuppliers } from "./suppliers.controller.js"
import { validateJWT,isAdmin} from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/', addSupplier)
api.get('/',[validateJWT,isAdmin ],getSuppliers )
api.put('/:id',[validateJWT,isAdmin ], updateSupp)
api.delete('/:id',[validateJWT,isAdmin ],deleteSuppliers )

export default api