import express from 'express';
const app = express();
import { PORT, mongoDBURL} from './configure.js';
import mongoose from 'mongoose';
import BookStore from './model/bookstore.model.js';

//middleware
app.use(express.json());


//GET REQUEST// DISPLAY ALL THE BOOKS
app.get('/api/books', async (req, res) =>{
    try{
        const books = await BookStore.find({}, {name:1, author:1});
        res.status(200).json(books);

    } catch (err){
        console.log("error:", err.message);
        res.status(500).json({message:err.message})
    }
} )

//Get books by ID
app.get('/api/books/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const books = await BookStore.findById(id);
        res.status(200).json(books)
    } 
    catch(err){
        req.status(500).json({message: err.message})
    }

})


//POST REQUEST// INSERT BOOKS
app.post('/api/books', async (req,res)=>{
    try{
        const books = await BookStore.create(req.body);
        res.status(200).json(books);

    } catch (err){
        console.log('post request failed! Error: ', err.message);
        res.status(500).json({message:err.message})
    }
})

//Patch REQUEST // Update Books
app.patch('/api/books/:id', async (req, res)=>{
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
})


// DELETE REQUEST
app.delete('/api/books/:id', async (req, res) => {
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
});



//A simple route
app.get('/', (req, res)=>{
    res.status(200).send("hello from the api")
})



mongoose
    .connect(mongoDBURL)
    .then(()=>{
         console.log("DB Connection Successful");
         //checking server connection
         app.listen(PORT, ()=>{
         console.log(`Server is listening on ${PORT}`);
    })
})
.catch(()=>{
    console.log("DB connection error");
})