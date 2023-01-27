import mongoose from 'mongoose'

const MONGO_DB_URI =
  process.env.MONGO_DB_URI || 'mongodb://root:root@localhost:27017/ecommerce?authSource=admin'
mongoose.set('strictQuery', false)

export const dbConnect = async () => {
  await mongoose.connect(MONGO_DB_URI)
}
