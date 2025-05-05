import Product from "../src/products/products.model.js"

export const validateMovementType = (req, res, next) => {
    const { type } = req.body
    const validTypes = ['entrada', 'salida']

    if (!type || !validTypes.includes(type)) {
        return res.status(400).send(
            {
                message: "El tipo de movimiento debe ser 'entrada' o 'salida'"
            }
        )
    }

    next()
}

export const validateQuantity = (req, res, next) => {
    const { quantity } = req.body

    if (quantity === undefined || isNaN(quantity) || quantity <= 0) {
        return res.status(400).send(
            {
                message: "La cantidad debe ser un número mayor a 0"
            }
        )
    }

    next()
}

export const validateDescription = (req, res, next) => {
    const { description } = req.body

    if (!description || description.trim().length === 0) {
        return res.status(400).send(
            {
                message: "La descripción del movimiento es obligatoria"
            }
        )
    }

    next()
}

export const validateProductExists = async (req, res, next) => {
    const { product } = req.body

    try {
        const productExists = await Product.findById(product)
        if (!productExists) {
            return res.status(404).send(
                {
                    message: "Producto no encontrado"
                }
            )
        }

        next()
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: "Error al verificar el producto",
                error: err.message
            }
        )
    }
}

export const validateStockForOutput = async (req, res, next) => {
    const { product, quantity, type } = req.body

    if (type === "salida") {
        try {
            const productFound = await Product.findById(product)
            if (!productFound) {
                return res.status(404).send(
                    {
                        message: "Producto no encontrado"
                    }
                )
            }

            if (productFound.stock < quantity) {
                return res.status(400).send(
                    {
                        message: "No hay suficiente stock disponible"
                    }
                )
            }
        } catch (err) {
            console.error(err)
            return res.status(500).send(
                {
                    message: "Error al verificar el stock",
                    error: err.message
                }
            )
        }
    }

    next()
}

export const validateMovementDate = (req, res, next) => {
    const { date } = req.body

    if (date && isNaN(Date.parse(date))) {
        return res.status(400).send(
            {
                message: "La fecha del movimiento no es válida"
            }
        )
    }

    next()
}
