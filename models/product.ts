import { Schema, models, model } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
}, {
    timestamps: true,
});

const Product = models.Product || model('Product', productSchema);

export default Product;