import { Router } from "express"
import { validateJWT, validateRoles} from "../../middlewares/validate.jwt.js"
import { addCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js"

const api = Router()

api.post('/addCategory', 
    [
        validateJWT, 
        validateRoles('Admin')
    ], 
addCategory)

api.get('/getCategories', 
    [
        validateJWT, 
        validateRoles('Admin')
    ], 
getCategories)

api.put('/updateCategory/:id', 
    [
        validateJWT, 
        validateRoles('Admin')
    ], 
updateCategory)

api.delete('/deleteCategory/:id',
    [
        validateJWT, 
        validateRoles('Admin')
    ], 
deleteCategory)

export default api