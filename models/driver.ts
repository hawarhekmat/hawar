import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    city: {
        type: String,
        required: [true, 'city is required']
    },
    carNumber: {
        type: String,
        required: [true, 'car number is required'],
    },
    company: {
        type: String,
        required: [true, 'company is required'],
    }
}, {
    timestamps: true,
});

const User = models.User || model('User', userSchema);
export default User;