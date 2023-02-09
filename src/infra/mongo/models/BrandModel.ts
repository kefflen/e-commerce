import { model, Schema } from 'mongoose'

const BrandSchema = new Schema(
  {
    _id: {
      type: 'string',
      required: true,
    },
    name: { type: 'string', required: true, unique: true },
  },
  { timestamps: true },
)

export const BrandModel = model('Brand', BrandSchema)
