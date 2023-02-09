import { model, Schema } from 'mongoose'

const RefreshTokenSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    unique: true,
    required: true,
  },
})

export const RefreshTokenModel = model('RefreshToken', RefreshTokenSchema)
