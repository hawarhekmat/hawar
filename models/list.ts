import { Schema, model, models } from 'mongoose'

const listSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "company name is required."],
    },
    companyLogo: {
      type: String,
      required: [true, 'company logo is required']
    },
    h: {
      type: String,
      required: [true, 'Hours is required.']
    },
    m: {
      type: String,
      required: [true, 'Minute is required.']
    },
    s: {
      type: String,
      required: [true, 'Second is required.']
    },
    products: {
      type: String,
      required: [true, "products are required."],
    },
    drivers: {
      type: [],
      required: [true, "drivers are required."],
    },
    year: {
      type: String,
      required: [true, "year is required."],
    },
    month: {
      type: String,
      required: [true, "month is required."],
    },
    dayOfMonth: {
      type: String,
      required: [true, 'dayOfMonth is required']
    },
    dayOfWeek: {
      type: String,
      required: [true, "day is required."],
    },
  },
  { timestamps: true }
);

const ProductsList = models.ProductsList || model('ProductsList', listSchema);
export default ProductsList;