import Supplier from '../suppliers/suppliers.model.js'

const defaultSupplier = [
    {
        name: "Foremost",
        adress: "San Miguel Petapa, Zona 10, Guatemala",
        email: "foremostcompany@gmail.com",
        phone: "32515665"
    }
]

export const createDefaultSupplier = async () => {
    try {
        const existingSupplier = await Supplier.countDocuments()
        
        if(existingSupplier === 0) {
            await Supplier.insertMany(defaultSupplier)
            console.log('Default Supplier added successfully')
        }
    } catch (e) {
        console.e('General with add default supplier', e);        
    }
}