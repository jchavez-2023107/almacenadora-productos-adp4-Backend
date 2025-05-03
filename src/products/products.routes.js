import { Router } from "express"
import { validateJWT, validateRoles } from "../../middlewares/validate.jwt.js"
import { getProduct, addProduct, updateProd, deleteProd, getInventoryReport } from "./products.controller.js"
import { validateProductStock, validateProductPrice, validateProductFK, validateProductDate, validateProductDelete } from "../../middlewares/validations.products.js"

const api = Router()

api.post('/addProduct', [validateJWT, validateRoles('Admin', 'Employee'), validateProductStock, validateProductPrice, validateProductDate],addProduct)
api.get('/getProduct', [validateJWT], getProduct)
api.put('/updateProd/:id', [validateJWT, validateRoles('Admin', 'Employee') , validateProductStock, validateProductPrice, validateProductDate ,validateProductFK], updateProd)
api.delete('/deleteProd/:id', [validateJWT, validateRoles('Admin'), validateProductDelete], deleteProd)
api.get('/inventoryReport', 
    [
        validateJWT, 
        validateRoles('Admin', 'Employee')
    ],
getInventoryReport)

export default api
