import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    isBLocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: 'USER',
    },
    wishlist: [
      {
        type: String,
        ref: 'Product',
      },
    ],
    cart: [
      {
        type: String,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true },
)

export const UserModel = model('User', UserSchema)
