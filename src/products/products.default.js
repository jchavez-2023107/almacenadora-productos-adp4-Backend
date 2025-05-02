import mongoose from 'mongoose';
import Product from './products.model.js'

const defaultProducts = [
    {
        name: "Laptop HP Pavilion",
        price: "899.99",
        description: "Laptop con procesador Intel Core i5, 8GB RAM, 256GB SSD",
        stock: "15",
        dateDelivery: new Date('2023-12-15'),
        supplier: new mongoose.Types.ObjectId(), 
        category: new mongoose.Types.ObjectId()   
    },
    {
        name: "Smartphone Samsung Galaxy S21",
        price: "699.99",
        description: "Teléfono inteligente con pantalla AMOLED de 6.2 pulgadas, 128GB almacenamiento",
        stock: "25",
        dateDelivery: new Date('2023-12-10'),
        supplier: new mongoose.Types.ObjectId(), 
        category: new mongoose.Types.ObjectId()   
    },
    {
        name: "Auriculares Sony WH-1000XM4",
        price: "349.99",
        description: "Auriculares inalámbricos con cancelación de ruido",
        stock: "30",
        dateDelivery: new Date('2023-12-05'),
        supplier: new mongoose.Types.ObjectId(),
        category: new mongoose.Types.ObjectId()  
    },
    {
        name: "Monitor Dell 27 Pulgadas",
        price: "249.99",
        description: "Monitor Full HD con tasa de refresco de 75Hz",
        stock: "12",
        dateDelivery: new Date('2023-12-20'),
        supplier: new mongoose.Types.ObjectId(), 
        category: new mongoose.Types.ObjectId()   
    },
    {
        name: "Teclado Mecánico Logitech",
        price: "89.99",
        description: "Teclado mecánico para gaming con switches Romer-G",
        stock: "40",
        dateDelivery: new Date('2023-12-08'),
        supplier: new mongoose.Types.ObjectId(), 
        category: new mongoose.Types.ObjectId()  
    }
]

export const createDefaultProducts = async () => {
    try {
        const existingProducts = await Product.countDocuments();
        
        if (existingProducts === 0) {
            await Product.insertMany(defaultProducts);
            console.log('Productos por defecto creados exitosamente');
        }
    } catch (e) {
        console.e('General Error prodDef', e);
    }
}