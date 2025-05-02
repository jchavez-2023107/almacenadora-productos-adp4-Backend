import { Router } from "express"
import { validateJWT, isAdmin, isEmployee } from "../../middlewares/validate.jwt.js"
import { getProduct, addProduct, updateProd, deleteProd } from "./products.controller.js"

const api = Router()

api.post('/addProduct', [validateJWT, isAdmin],addProduct)
api.get('/getProduct', [validateJWT, isAdmin], getProduct)
api.put('/updateProd/:id', [validateJWT, isAdmin], updateProd)
api.delete('/deleteProd/:id', [validateJWT, isAdmin], deleteProd)

export default api
