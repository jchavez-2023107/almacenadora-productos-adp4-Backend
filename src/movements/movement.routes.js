import { Router } from "express"
import { addMovement, getMovements, deleteMovement, getInventoryMovementsReport, updateMovement} from "./movement.controller.js"
import { validateAddMovement } from "../../middlewares/validators.js"
import { validateRoles, validateJWT } from "../../middlewares/validate.jwt.js"

const api = Router()

//Rutas

api.post('/addMovement',
    [
        validateJWT,
        validateAddMovement,
        validateRoles('Admin', 'Employee')
    ],
addMovement)
api.get('/getMovements', 
    [
        validateJWT,
        validateRoles('Admin', 'Employee')
    ],
getMovements)
api.get('/getInventoryMovementsReport', 
    [
        validateJWT,
        validateRoles('Admin', 'Employee')
    ],
getInventoryMovementsReport)
api.put('/updateMovement/:id', 
    [
        validateJWT,
        validateRoles('Admin', 'Employee')
    ],
updateMovement)
api.delete('/deleteMovement/:id', 
    [
        validateJWT,
        validateRoles('Admin')
    ],
deleteMovement)

export default api
