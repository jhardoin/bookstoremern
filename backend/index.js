import express from 'express'
// import { mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 8080
const mongoDBURL = process.env.MONGO_URL

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS policy
app.use(cors())


app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('MERN BOOKSTORE');
});

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('App connected')
        app.listen(PORT, () => console.log(`App is listening to port: ${PORT}`))
    })
    .catch((error) => {
        console.log('Error connecting to database:', error)
    })