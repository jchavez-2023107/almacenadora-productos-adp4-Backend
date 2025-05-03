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
            required: true
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