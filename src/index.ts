import dotenv from 'dotenv'
dotenv.config()
import { dbConnect } from './config/dbConnect'
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
