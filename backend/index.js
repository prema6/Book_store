import express from 'express'
import mongoose from 'mongoose'
import { Mongo } from './config.js'
import { Book } from './models/bookmodel.js'
import booksroute from './routes/booksroute.js'
import cors from 'cors'
const app = express()
app.use(express.json());
app.use(cors())


app.use('/books', booksroute)


mongoose.connect(Mongo).then(
    ()=>{
        console.log('Connected to MongoDB')
    }
).catch(
    (err)=>{
        console.log('Error connecting to MongoDB')
        console.log(err)
    }
)
app.listen(3000)