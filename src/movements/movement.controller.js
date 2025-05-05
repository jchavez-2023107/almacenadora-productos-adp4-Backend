import Movement from '../movements/movement.model.js'
import Product from '../products/products.model.js'

export const addMovement = async (req, res) => {
    try {
        const { product: productId, type, quantity } = req.body

        const product = await Product.findById(productId)
        if (!product) return res.status(404).send(
            { 
                message: 'Product not found' 
            }
        )

        if (type === 'entrada') {
            product.stock += quantity
        } else if (type === 'salida') {
            if (product.stock < quantity) {
                return res.status(400).send(
                    { 
                        message: 'Insufficient stock'
                    }
                )
            }
            product.stock -= quantity
        } else {
            return res.status(400).send(
                { 
                    message: 'Invalid movement type' 
                }
            )
        }

        await product.save()

        const movement = new Movement(req.body)
        await movement.save()

        return res.send(
            { 
                message: 'Movement saved successfully' 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                message: 'Error adding movement' 
            }
        )
    }
}

export const getMovements = async (req, res) => {
    try {
        const { limit = 20, skip = 0, type, product, employee } = req.query
        let filter = {}

        if (type) filter.type = type
        if (product) filter.product = product
        if (employee) filter.employee = employee

        const movements = await Movement.find(filter)
            .skip(skip)
            .limit(limit)
            .populate('product', 'name')

        if (movements.length === 0) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Movements not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Movements found',
                movements
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(404).send(
            {
                message: 'General Error getMovements'
            }
        )
    }
}

export const getInventoryMovementsReport = async (req, res) => {
    try {
        const { from, to } = req.query

        if (!from || !to) {
            return res.status(400).send(
                {
                    message: 'Please provide from and to dates'
                }
            )
        }

        const startDate = new Date(from)
        const endDate = new Date(to)

        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).send(
                {
                    message: 'Invalid date format'
                }
            )
        }

        endDate.setHours(23, 59, 59, 999)

        const movements = await Movement.find(
            {
                date: { $gte: startDate, $lte: endDate }
            }
        ).populate('product', 'name')

        const report = movements.map(m => (
            {
                product: m.product.name,
                type: m.type,
                quantity: m.quantity,
                date: m.date,
                employee: m.employee,
                reason: m.reason || null
            }
        )
        )

        return res.send(
            {
                success: true,
                message: 'Inventory movements report generated',
                count: report.length,
                data: report
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'Error generating movement report'
            }
        )
    }
}

export const getMovementById = async (req, res) => {
    try {
        const { id } = req.params

        const movement = await Movement.findById(id).populate('product', 'name')

        if (!movement) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Movement not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Movement found',
                movement
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'Error getting movement by ID'
            }
        )
    }
}

export const updateMovement = async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body

        const existing = await Movement.findById(id)
        if (!existing) {
            return res.status(404).send({ success: false, message: 'Movement not found' })
        }

        const product = await Product.findById(existing.product)
        if (!product) {
            return res.status(404).send({ message: 'Product not found for this movement' })
        }


        if (existing.type === 'entrada') {
            product.stock -= existing.quantity
        } else if (existing.type === 'salida') {
            product.stock += existing.quantity
        }

        if (newData.type === 'entrada') {
            product.stock += newData.quantity
        } else if (newData.type === 'salida') {
            if (product.stock < newData.quantity) {
                return res.status(400).send({ message: 'Insufficient stock for updated movement' })
            }
            product.stock -= newData.quantity
        }

        await product.save()
        const updated = await Movement.findByIdAndUpdate(id, newData, { new: true })

        return res.send({ success: true, message: 'Movement updated', movement: updated })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating movement' })
    }
}

export const deleteMovement = async (req, res) => {
    try {
        const { id } = req.params
        const movement = await Movement.findById(id)

        if (!movement) {
            return res.status(404).send({ message: 'Movement not found' })
        }

        const product = await Product.findById(movement.product)
        if (!product) {
            return res.status(404).send({ message: 'Product not found for this movement' })
        }

        if (movement.type === 'entrada') {
            if (product.stock < movement.quantity) {
                return res.status(400).send({ message: 'Cannot delete movement, stock would go negative' })
            }
            product.stock -= movement.quantity
        } else if (movement.type === 'salida') {
            product.stock += movement.quantity
        }

        await product.save()
        await Movement.findByIdAndDelete(id)

        return res.send({ message: 'Movement deleted and stock updated' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting movement' })
    }
}
