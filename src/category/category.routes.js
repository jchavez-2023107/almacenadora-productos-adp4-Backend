import { Router } from "express"
import { validateJWT, validateRoles} from "../../middlewares/validate.jwt.js"
import { addCategory, deleteCat, getCategorys, updateCat } from "./category.controller.js"

const api = Router()

api.post('/addCategory', [validateJWT, validateRoles('Admin')], addCategory)
api.get('/getCategorys', [validateJWT, validateRoles('Admin')], getCategorys)
api.put('/updateCat/:id', [validateJWT, validateRoles('Admin')], updateCat)
api.delete('/deleteCat/:id', [validateJWT, validateRoles('Admin')], deleteCat)

export default api