import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ImageKit from "@imagekit/nodejs";
import { getHome, getHealth } from './controllers/health.js'
import connectDB from './db.js'
import { getQuestions, postQuestion } from './controllers/question.js'
import { postSupport } from './controllers/support.js'

dotenv.config()

const app = express()
app.use(express.json());
app.use(cors())

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const PORT = process.env.PORT || 8030

app.get('/', getHome)
app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});


app.get('/health', getHealth)

app.get('/questions', getQuestions)
app.post('/questions', postQuestion)

app.post('/support', postSupport)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

    connectDB();
})