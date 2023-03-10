import { model, Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
      lowercase: true,
      unique: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    categoryId: {
      type: String,
      ref: 'Category',
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    imagesFilename: [
      {
        type: String,
      },
    ],
    color: {
      type: String,
      enum: ['Black', 'Green', 'Red'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        stars: Number,
        postedBy: {
          type: String,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true },
)

export const ProductModel = model('Product', ProductSchema)
