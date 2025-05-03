export const validateProductStock = (req, res, next) =>{
    const {body} = req

    try{
        if(body.stock !== undefined){
            if(isNaN(body.stock)) return res.send(
                {
                    success: false,
                    message: 'El stock solo puede contener numeros'
                }
            )
            else if(body.stock < 0) return res.send(
                {
                    success: false,
                    message: 'El stock no puede ser negativo'
                }
            )
            else if(!Number.isInteger(Number(body.stock))) return res.send(
                {
                    success: false,
                    message: 'El stock no puede ser decimal'
                }
            )
        }
        next()
    }catch(e){
        console.error(e)
    }
}

export const validateProductPrice = (req, res, next) =>{
    const {body} = req

    try{
        if(body.price !== undefined){
            if(isNaN(body.price)) return res.send(
                {
                    success: false,
                    message: 'El precio no puede contener letras'
                }
            )
            else if(body.price <= 0) return res.send(
                {
                    success: false,
                    message: 'El precio debe ser mayor a cero'
                }
            )
            else if(!/^\d+(\.\d{1,2})?$/.test(body.price)) return res.send(
                {
                    success: false,
                    message: 'El precio solo puede contener dos decimales'
                }
            )
        }
        next()
    }catch(e){
        console.error(e)
    }
}

export const validateProductDate = (req, res, next) =>{
    const {body} = req

    try{
        if(body.dateDelivery){
            const deliveryDate = new Date(body.dateDelivery)
            const today = new Date()

            today.setHours(0,0,0,0)
            deliveryDate.setHours(0,0,0,0)

            if(deliveryDate > today) return res.send(
                {
                    success: false,
                    message: 'Fecha no valida. No se permiten fechas futuras'
                }
            )
            if(isNaN(deliveryDate.getTime())) return res.send(
                {
                    success: false,
                    message: 'Fecha no valida'
                }
            )
        }
        next()
    }catch(e){
        console.error(e)
    }
}

export const validateProductDelete = (req, res, next) =>{
    const {confirm} = req.body

    try{
        if(confirm !== '123456') return res.status(400).send(
            {
                success: false,
                message: 'Se codigo palabra de confirmacion'
            }
        )
        next()
    }catch(e){
        console.error(e)
    }
}

export const validateProductFK = (req, res, next) =>{
    const {body} = req

    try{
        if(data.category || data.supplier) return res.status(400).send(
            {
                success: false,
                message: 'No se puede editar los campos de categoria'
            }
        )
        next()
    }catch(e){
        console.error(e)
    }
}

