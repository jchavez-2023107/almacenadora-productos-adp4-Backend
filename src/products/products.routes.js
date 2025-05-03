import { Router } from "express"
import { validateJWT, isAdmin, isEmployee } from "../../middlewares/validate.jwt.js"
import { getProduct, addProduct, updateProd, deleteProd, updateStock, getProductMovements } from "./products.controller.js"

const api = Router()

api.post('/addProduct', [validateJWT, isAdmin],addProduct)
api.get('/getProduct', [validateJWT, isAdmin], getProduct)
api.put('/updateProd/:id', [validateJWT, isEmployee], updateProd)
api.put('/updateStock/:id', [validateJWT, isEmployee], updateStock)
api.delete('/deleteProd/:id', [validateJWT, isAdmin], deleteProd)
api.get('/products/:id/movements', [validateJWT, isAdmin], getProductMovements)

export default api
