import { Schema, model } from "mongoose"

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
    }
)

export default model('Category', categorySchema)