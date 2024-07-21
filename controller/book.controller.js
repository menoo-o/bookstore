import express from "express";

import {BookStore} from '../model/book.model.js';

export const getBooks = async (req,res) =>{

            try{
            const books = await BookStore.find({}, {name:1, author:1});
            res.status(200).json(books);
    
            } catch (err) {
            console.log("error:", err.message);
            res.status(500).json({message:err.message})
        
            }
}

export const getBookById = async (req, res) =>{

    try{
        const { id } = req.params;
        const books = await BookStore.findById(id);
        res.status(200).json(books)
    } 
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const postBooks = async (req, res) =>{
    try {
        // Extracting ISBN from request body
        const { ISBN } = req.body;

        // Check if a book with the same ISBN already exists
        const existingBook = await BookStore.findOne({ ISBN });

        // If book exists, return 404 error
        if (existingBook) {
            return res.status(404).json({ message: "Book with the same ISBN already exists" });
        }

        // If book does not exist, create a new book
        const book = await BookStore.create(req.body);

        // Return the newly created book
        res.status(200).json(book);

    } catch (err) {
        console.log('Post request failed! Error: ', err.message);
        res.status(500).json({ message: err.message });
    }
    
}

//delete books from database
export const delBooks = async (req, res) =>{
    try {
        const { id } = req.params;  // Extract the id from the request parameters
        const delBook = await BookStore.findByIdAndDelete(id);  // Find and delete the book

        // Check if the book was not found
        if (!delBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Return the deleted book or a success message
        res.status(200).json({ message: "Book deleted successfully", deletedBook: delBook });
    } catch (err) {
        console.log('Error deleting the book:', err.message);
        res.status(500).json({ message: "Error deleting the book, try again" });
    }
}


export const updateBooks = async (req, res)=>{
    try{
        const { id } = req.params; //extract id from the request
        const newData = req.body; //extract the new data from the request
        const updatedBook = await BookStore.findByIdAndUpdate(id, newData, {new:true}) //find and update the book's data

        
        if(!updatedBook){ //if the book is not found
            return res.status(404).json({message : 'Book Not Found'})
        }

        res.status(200).json(updatedBook); //return the updated books
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
}