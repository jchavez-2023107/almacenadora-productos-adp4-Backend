import { Router } from "express"
import { validateJWT, isAdmin } from "../../middlewares/validate.jwt.js"
import { addCategory, deleteCat, getCategorys, updateCat } from "./category.controller.js"

const api = Router()

api.post('/addCategory', [validateJWT, isAdmin], addCategory)
api.get('/getCategorys', [validateJWT, isAdmin], getCategorys)
api.put('/updateCat/:id', [validateJWT, isAdmin], updateCat)
api.delete('/deleteCat/:id', [validateJWT, isAdmin], deleteCat)

export default api