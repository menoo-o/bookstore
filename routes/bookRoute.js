import express from "express"; 
import BookStore from "../model/book.model";
 export const bookRoute = express.Router();

import {getBooks, getBookById, postBooks, delBooks, updateBooks} from '../controller/book.controller'


//display all the books
bookRoute.get('/', getBooks)

//display books with a specific id
bookRoute.get('/:id', getBookById)

//post - upload your data
bookRoute.post('/', postBooks)

//delete - delete books by id
bookRoute.delete('/:id', delBooks)

//patch req- update data
bookRoute.patch('/:id', updateBooks)


