// src/products/productHistory.model.js
import { Schema, model } from 'mongoose';

const productMovementsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    changedFields: {
        type: Object,
        required: true
    },
    changedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        default: 'system' // o puedes usar req.user?.username si hay auth
    }
}, {
    versionKey: false
});

export default model('ProductMovements', productMovementsSchema)
