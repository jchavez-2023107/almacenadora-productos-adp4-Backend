import Category from './category.model.js'

const defaultCategories = [
    {
        name: "Electrónicos",
        description: "Dispositivos electrónicos como smartphones, laptops y tablets"
    },
    {
        name: "Informática",
        description: "Componentes y accesorios para computadoras"
    },
    {
        name: "Audio y Video",
        description: "Equipos de sonido, televisores y accesorios multimedia"
    },
    {
        name: "Hogar",
        description: "Electrodomésticos y artículos para el hogar"
    },
    {
        name: "Gaming",
        description: "Productos relacionados con videojuegos y esports"
    }
]

export const createDefaultCategories = async () => {
    try {
        // Verificar si ya existen categorías
        const existingCategories = await Category.countDocuments();
        
        if (existingCategories === 0) {
            await Category.insertMany(defaultCategories);
            console.log('Categorías por defecto creadas exitosamente');
        }
    } catch (error) {
        console.error('Error General defCat', error);
    }
}