const { Schema, default: mongoose } = require('mongoose');

const itemSchema = new Schema({

    quantity: {
        type: Number, required: true
    },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    size: {
        type: String, required: true
    },
    color: {
        type: String, required: true
    },

}, { timestamps: true })
const Cart = mongoose.model("item", itemSchema)
module.exports = Cart