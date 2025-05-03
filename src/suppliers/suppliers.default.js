import Supplier from './suppliers.model.js'

const defaultSupplier = [
    {
        name: "Foremost",
        adress: "San Miguel Petapa, Zona 10, Guatemala",
        email: "foremostcompany@gmail.com",
        phone: "32515665"
    }
];

export const createDefaultSupplier = async () => {
    try {
        const existingSupplier = await Supplier.countDocuments();
        
        if (existingSupplier === 0) {
            await Supplier.insertMany(defaultSupplier); // ← CAMBIO AQUÍ
            console.log('Default Supplier added successfully');
        }
    } catch (e) {
        console.error('General error with add default supplier', e); // ← CAMBIO AQUÍ
    }
};
