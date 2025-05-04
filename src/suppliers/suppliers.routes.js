import { Router } from "express"
import { addSupplier, getSuppliers,updateSupp,deleteSuppliers } from "./suppliers.controller.js"
<<<<<<< HEAD
import { validateJWT,validateRoles} from "../../middlewares/validate.jwt.js"
=======
import { validateJWT,isAdmin} from "../../middlewares/validate.jwt.js"
>>>>>>> 19cadc48880808501b7f4bed7bb33a93e19fc076

const api = Router()

api.post('/', addSupplier)
<<<<<<< HEAD
api.get('/',[validateJWT,validateRoles ('Admin') ],getSuppliers )
api.put('/:id',[validateJWT,validateRoles ('Admin') ], updateSupp)
api.delete('/:id',[validateJWT,validateRoles ('Admin') ],deleteSuppliers )
=======
api.get('/',[validateJWT,isAdmin ],getSuppliers )
api.put('/:id',[validateJWT,isAdmin ], updateSupp)
api.delete('/:id',[validateJWT,isAdmin ],deleteSuppliers )
>>>>>>> 19cadc48880808501b7f4bed7bb33a93e19fc076

export default api