import { Schema, models, model } from 'mongoose'

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    logo: {
        type: String,
        required: [true, 'logo url is required'],
    }
}, {
    timestamps: true,
});

const Company = models.Company || model('Company', companySchema);
export default Company;