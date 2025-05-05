import Product from '../products/products.model.js'
import User from '../users/user.model.js'
import { checkPassword } from '../../utils/encrypt.js'
import productHistory from '../reports/productHistory.js'
import mongoose from 'mongoose'

const saveProductHistory = async (productId, changedFields, updatedBy = 'system') => {
    try {
        await productHistory.create({
            productId,
            changedFields,
            updatedBy
        });
    } catch (e) {
        console.error('❌ Error al guardar historial del producto:', e);
    }   
}

export const addProduct = async(req, res) =>{
    try{
        let data = req.body
        let product = new Product(data)

        await product.save()
        const newProduct = await Product.findById(product._id)
            .populate('category')
            .populate('supplier')

        checkLowStock(newProduct)
        checkExpirationAlert(newProduct)          

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

const checkLowStock = (product) => {
    if (parseInt(product.stock) <= 5) {
        console.warn(`⚠️ Stock bajo para el producto "${product.name}": solo quedan ${product.stock} unidades`);
    }
}

const checkExpirationAlert = (product) => {
    if (!product.expirationDate) return; // No hay fecha de vencimiento

    const today = new Date();
    const expiration = new Date(product.expirationDate);

    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Diferencia en días

    if (diffDays <= 5 && diffDays >= 0) {
        console.warn(`⏰ El producto "${product.name}" vencerá en ${diffDays} día(s) (fecha de vencimiento: ${expiration.toISOString().split('T')[0]})`);
    }
}

export const getProducts = async(req, res) =>{
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

export const updateProduct = async(req, res) =>{
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
                dateDelivery: data.dateDelivery,
                expirationDate: data.expirationDate,
                note: data.note                
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

        checkLowStock(updateStock)
        checkExpirationAlert(updateProd)    

        await saveProductHistory(id, {
            name: data.name,
            price: data.price,
            description: data.description,
            stock: data.stock,
            dateDelivery: data.dateDelivery,
            expirationDate: data.expirationDate,
            note: data.note
        })        

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

export const updateStock = async(req, res) => {
    try {
        const {id} = req.params
        const data = req.body  
        const updateStock = await Product.findByIdAndUpdate(
            id,
            {
                stock: data.stock,
                dateDelivery: data.dateDelivery,
                note: data.note
            }
            ,
            {new: true}             
        )

        if(!updateStock) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )

        checkLowStock(updateStock)
        checkExpirationAlert(updateStock)

        await saveProductHistory(id, {
            stock: data.stock,
            dateDelivery: data.dateDelivery,
            note: data.note
        })

        return res.send(
            {
                success: true,
                message: 'Product stock has been updated',
                product: updateStock
            }
        )        
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error with update stock'})        
    }
}

export const deleteProduct = async(req, res) => {
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

export const getProductHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await productHistory.find({ productId: id }).sort({ changedAt: -1 });

        if (history.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No hay historial para este producto'
            });
        }

        return res.send({
            success: true,
            message: 'Historial del producto',
            history
        });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error al obtener historial del producto' });
    }
}