import { Router } from "express"
import {
    addMovement,
    getMovements,
    getMovementById,
    updateMovement,
    deleteMovement,
    getInventoryMovementsReport
} from "./movement.controller.js"

import {
    validateMovementType,
    validateQuantity,
    validateProductExists,
    validateStockForOutput,
    validateMovementDate
} from "../../middlewares/validations.movement.js"

import { 
    validateJWT, 
    validateRoles 
} from "../../middlewares/validate.jwt.js"

const  api = Router()

api.post("/addMovement",
  [
    validateJWT,
    validateRoles("Admin", "Empleado"), 
    validateMovementType,
    validateQuantity,
    validateProductExists,
    validateStockForOutput,
    validateMovementDate
  ],
  addMovement
)

api.get("/getMovements",
  [
    validateJWT
  ],
  getMovements
)

api.get('/getInventoryMovementsReport', 
    [
        validateJWT,
        validateRoles('Admin', 'Employee')
    ],
getInventoryMovementsReport)

api.get("/getMovement/:id",
  [
    validateJWT
  ],
  getMovementById
)

api.put("/updateMovement/:id",
  [
    validateJWT,
    validateRoles("Admin"),
    validateMovementType,
    validateQuantity,
    validateProductExists,
    validateStockForOutput,
    validateMovementDate
  ],
  updateMovement
)

api.delete("/deleteMovement/:id",
    [
        validateJWT,
        validateRoles("Admin")
    ],
    deleteMovement
)

export default api
