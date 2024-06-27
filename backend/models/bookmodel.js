import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        Title:{
            type:String,
            required:true

        },
        author :{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },

    },
    {
        timestamps:true
    }
)

export const Book = mongoose.model("Book", bookSchema)