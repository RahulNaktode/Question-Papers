import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getHome, getHealth } from './controllers/health.js'
import connectDB from './db.js'

dotenv.config()

const app = express()
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8030

app.get('/', getHome)
app.get('/health', getHealth)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

    connectDB();
})