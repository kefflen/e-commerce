import dotenv from 'dotenv'
import { dbConnect } from './config/dbConnect'
dotenv.config()
import server from './config/server'

const PORT = process.env.PORT || 8080
dbConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(() => {
    console.log('DB connection failed')
  })
