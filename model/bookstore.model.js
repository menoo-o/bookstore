import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    ISBN:{
        type:Number,
        required: true
    }
}, 

    {
        timestamps:true
    }
);

const BookStore = mongoose.model('Books', BookSchema);

export default BookStore;