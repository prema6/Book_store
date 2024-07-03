import express from 'express'
import mongoose from 'mongoose'
import { Mongo } from './config.js'
import { Book } from './models/bookmodel.js'
import booksroute from './routes/booksroute.js'
const cors = require('cors');
// import cors from 'cors'
const app = express()
app.use(express.json());
// app.use(cors({
//     // origin: 'https://book-store-frontend-red.vercel.app',
//     // origin: ['http://localhost:3001'],
//     origin: '*',
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     // credentials: true
// }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://book-store-frontend-red.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

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
app.listen(process.env.PORT||3000)
