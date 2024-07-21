import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ISBN: {
        type: Number,
        required: true
    }
}, 
{
    timestamps: true
});

export const BookStore = mongoose.model('Books', BookSchema);
