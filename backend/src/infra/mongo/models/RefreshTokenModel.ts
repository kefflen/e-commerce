import { model, Schema } from 'mongoose'

const RefreshTokenSchema = new Schema({
  _id: {
    type: 'string',
    required: true,
  },
  refreshToken: {
    type: 'string',
    unique: true,
    required: true,
  },
  userId: {
    type: 'string',
    ref: 'User',
    unique: true,
    required: true,
  },
})

export const RefreshTokenModel = model('RefreshToken', RefreshTokenSchema)
