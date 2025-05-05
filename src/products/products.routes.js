import { Router } from "express"
import { validateJWT, validateRoles } from "../../middlewares/validate.jwt.js"
import { addProduct, getInventoryReport, updateStock, getProductHistory, getProducts, deleteProduct, updateProduct } from "./products.controller.js"
import { validateProductStock, validateProductPrice, validateProductFK, validateProductDate, validateProductDelete } from "../../middlewares/validations.products.js"

const api = Router()

api.post('/addProduct', 
    [   
        validateJWT, 
        validateRoles('Admin', 'Employee'),
        validateProductStock, 
        validateProductPrice, 
        validateProductDate
    ],
addProduct)

api.get('/getProducts', [validateJWT], getProducts)

api.put('/updateProduct/:id', 
    [
        validateJWT, 
        validateRoles('Admin', 'Employee'), 
        validateProductStock, 
        validateProductPrice, 
        validateProductDate,
        validateProductFK
    ], 
updateProduct)

api.delete('/deleteProduct/:id', 
    [
        validateJWT, 
        validateRoles('Admin'), 
        validateProductDelete
    ], 
deleteProduct)

api.get('/inventoryReport', 
    [
        validateJWT, 
        validateRoles('Admin', 'Employee')
    ],
getInventoryReport)

api.put('/updateStock/:id',
    [
        validateJWT, 
        validateRoles('Admin', 'Employee')
    ],    
updateStock)

api.get('/products/:id/history', 
    [
        validateJWT, 
        validateRoles('Admin', 'Employee')
    ],     
getProductHistory)

export default api
