import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
  _id: {
    type: 'string',
    required: true,
  },
  name: { type: 'string', required: true, unique: true },
}, { timestamps: true })


export const CategoryModel = model('Category', CategorySchema)