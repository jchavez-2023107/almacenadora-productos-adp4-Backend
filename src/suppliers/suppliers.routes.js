import { Router } from "express"
import { addSupplier, getSuppliers,updateSupp,deleteSuppliers } from "./suppliers.controller.js"

const api = Router()

api.post('/', addSupplier)
api.get('/',getSuppliers )
api.put('/:id', updateSupp)
api.delete('/:id',deleteSuppliers )

export default api