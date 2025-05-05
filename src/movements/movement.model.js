import { Schema, model } from "mongoose"

const movementSchema = Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        type: {
            type: String,
            enum: ['entrada', 'salida'],
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'La cantidad mínima debe ser 1']
        },
        date: {
            type: Date,
            required: true
        },
        employee: {
            type: String,
            required: true
        },
        reason: {
            type: String
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Movement', movementSchema)
