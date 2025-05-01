import { Router } from "express"
import { validateJWT } from "../../middlewares/validate.jwt.js"
import { addCategory, deleteCat, getCategorys, updateCat } from "./category.controller.js"

const api = Router()

api.post('/addCategory',  addCategory)
api.get('/getCategorys', getCategorys)
api.put('/updateCat/:id',  updateCat)
api.delete('/deleteCat/:id', deleteCat)

export default api