import {Schema, model} from "mongoose"

const productSchema = Schema(
    {
        name: {
            type: String,
            maxLength: 50,
            unique: true,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            maxLength: 150,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        dateDelivery: {
            type: Date,
            required: false
        },
        expirationDate: {
            type: Date,
            required: false
        },
        note: { //Para dejar una nota del motivo del porque se quiere agregar o quitar un producto
            type: String,
            maxLength: 250,
            required: false
        },
        supplier: {
            type: Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: false 
    }
)

export default model ('Products', productSchema)