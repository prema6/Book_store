import express from 'express'
import mongoose from "mongoose";
const router = express.Router();
import { Book } from '../models/bookmodel.js';

router.get('/', async(req,res)=>{
    try{
        const book = await Book.find({})
        return res.json(book)
    }
    catch(err){
        console.log(err)
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const id = req.params
        console.log(typeof id)
        const book = await Book.find({_id: new mongoose.Types.ObjectId(req.params.id)})
        if(!book){
            return res.json({message:"Book not found"})
        }
        
        return res.json(book)

    }
    catch(err){
        console.log(err)
        res.json({message:err.message})
    
    }
})
//update route
router.put('/:id', async(req,res)=>{
    try{
        const {id} = req.params
        const book = await Book.findByIdAndUpdate(id, req.body)
        if(!book){
            return res.json({message:"Book not found"})
        }
        return res.json({message:"Book updated successfully"})
    }
    catch(err){
        res.json({message:err.message})
    }
}
)

//Deleting route
router.delete('/:id',async (req, res)=>{
    try{
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id)
        if(!book){
            return res.json({message:"Book not found"})

        }   
        return res.json({message:"Book deleted successfully"})     
    }
    catch(err){
        console.log(err)
        res.json({message:err.message})
    }
    
})

router.post('/',async(req,res)=>{console.log(req.body,'req')
    try{
        if(!req.body.Title|| !req.body.author){
            res.send({
                message:'Title and author are required'
            })
        }
        const book = {
            Title: req.body.Title,
            author: req.body.author,
            price: req.body.price
        }
        
        const newBook = await Book.create(book)
        console.log(newBook)
        // newBook.save();
        res.send(newBook)
    }
    catch(err){
        console.log(err);
    }
})

export default router
