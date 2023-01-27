import dotenv from 'dotenv'
dotenv.config()
import server from './config/server'

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})