import express from 'express'
import { Book } from '../models/bookModel.js'

const Router = express.Router()

// Create new book
Router.post('/', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body
        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        
        const newBook = { title, author, publishYear }
        const book = await Book.create(newBook)
        
        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// Get all books
Router.get('/', async (request, response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// Get one book by ID
Router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id)
        if (!book) {
            return response.status(404).send({ message: 'Book not found' })
        }
        return response.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
});

// Update book
Router.put('/:id', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body
        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body, { new: true })

        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }

        return response.status(200).send({ message: 'Book updated successfully', data: result })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

// Delete book
Router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
        }

        return response.status(204).send(); // No Content
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message })
    }
})

export default Router