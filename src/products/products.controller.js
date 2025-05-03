import Product from '../products/products.model.js'
import User from '../users/user.model.js'
import { checkPassword } from '../../utils/encrypt.js'
import mongoose from 'mongoose'

export const addProduct = async(req, res) =>{
    try{
        let data = req.body
        let product = new Product(data)

        await product.save()
        const newProduct = await Product.findById(product._id)
            .populate('category')
            .populate('supplier')

        return res.send(
            {
                message: 'Product save',
                product: newProduct
            }
        )

    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error AddPro'})
    }
}

export const getProduct = async(req, res) =>{
    try{
        const {limit = 20, skip = 0, name, category, dateDelivery, sort} = req.query

        let filter = {}

        if(name) 
            filter.name = {$regex: name, $options: 'i'}

        if(category){
            if(!mongoose.Types.ObjectId.isValid(category)) return res.status(400).send(
                {
                    success: false,
                    message: 'Categoria no valida'
                }
            )
            filter.category = category
        }

        if(dateDelivery){
            if(isNaN(Date.parse(dateDelivery))) return res.status(400).send(
                {
                    success: false,
                    message: 'Formato o fecha no valida. (use YYYY-MM-DD)'
                }
            )
            filter.dateDelivery = new Date(dateDelivery)
        }

        let sortOption = {}

        if(sort === 'asc')sortOption.name = 1
        else if (sort === 'desc') sortOption.name = -1


        const product = await Product.find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sortOption)
            .populate('category')
            .populate('supplier')

        if(product.length === 0){
           const hasFilters = Object.keys(filter).length > 0

           return res.status(404).send(
            {
                success: false,
                message: hasFilters ? 'No se han encontrado productos con los filtros proporcionados'
                    : 'o filtros ha implementado mal los filtros',
                suggestions: hasFilters ? [
                    'Intente con filtros de búsqueda diferentes',
                    'o Consulte el catálogo completo sin filtros'
                ] : []
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
            {
                name: data.name,
                price: data.price,
                description: data.description,
                stock: data.stock,
                dateDelivery: data.dateDelivery
            },
            {new: true}
        )
        .populate('category')
        .populate('supplier')
        
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


export const getInventoryReport = async (req, res) => {
    try {
        const products = await Product.find().populate('supplier category', 'name')

        if (products.length === 0) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Product not found' 
                }
            )
        }

        let totalStock = 0;
        let totalValue = 0;

        const productReport = products.map(product => {
            const stock = Number(product.stock)
            const price = Number(product.price)
            const value = stock * price

            totalStock += stock
            totalValue += value

            return {
                name: product.name,
                category: product.category?.name,
                supplier: product.supplier?.name,
                stock,
                price,
                totalValue: value
            }
        }
        )

        return res.send(
            {
                success: true,
                message: 'Inventory report generated',
                data: {
                    products: productReport,
                    totalStock,
                    totalInventoryValue: totalValue
                }
            }
        )
        
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            { 
                message: 'General Error in Inventory Report' 
            }
        )
    }
}