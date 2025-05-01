import Product from '../products/products.model.js'

export const addProduct = async(req, res) =>{
    try{
        let data = req.body
        let product = new Product(data)

        await product.save()
        return res.send({message: 'Product save'})

    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error AddPro'})
    }
}

export const getProduct = async(req, res) =>{
    try{
        const {limit = 20, skip = 0, name, category, dateDelivery} = req.query

        let filter = {}

        if(name){
            filter.name = name
        }
        if(category){
            filter.category = category
        }
        if(dateDelivery){
            filter.dateDelivery = dateDelivery
        }

        const product = await Product.find(filter)
            .skip(skip)
            .limit(limit)

        if(product.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Product found',
                product
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error GetPro'})
    }
}

export const updateProd = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const updateProd = await Product.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!updateProd) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Product found',
                product: updateProd
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error UpdateProd'})
    }
}

export const deleteProd = async(req, res) => {
    try{
        let {id} = req.params

        const product = await Product.findById(id)
        if(!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )

        await Product.deleteOne(product)
        return res.send({message: 'Product deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error deletProd'})
    }
}