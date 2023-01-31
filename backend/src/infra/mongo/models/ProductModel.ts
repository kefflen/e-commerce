import { model, Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
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
    category: {
      type: Schema.Types.ObjectId,
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
    imagesPath: [
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
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true },
)

export const ProductModel = model('Product', ProductSchema)
