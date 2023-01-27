import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
export const dbConnect = async () => {
  await mongoose.connect('mongodb://localhost:27017/ecommerce')
}
