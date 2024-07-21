import express from 'express';
const app = express();
import { PORT, mongoDBURL} from './configure.js';
import mongoose from 'mongoose'; //mongo lib
import {BookStore} from './model/book.model.js'; 

import {bookRoute} from './routes/bookRoute.js' //router file


//middleware
app.use(express.json());

//routes
app.use("/api/books", bookRoute);



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