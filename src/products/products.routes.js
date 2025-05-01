import { Router } from "express"
import { validateJWT, isAdmin, isEmployee } from "../../middlewares/validate.jwt.js"
import { getProduct, addProduct, updateProd, deleteProd } from "./products.controller.js"

const api = Router()

api.post('/addProduct', addProduct)
api.get('/getProduct', getProduct)
api.put('/updateProd/:id', updateProd)
api.delete('/deleteProd/:id', deleteProd)

export default api
