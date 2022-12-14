const mongoose = require("mongoose")
const Book = require("../models/bookModel")

// get all books
const getBooks = async (req, res) => {
    const user_id = req.user._id
    const books = await Book.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(books)
}

// get a single book
const getBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such book" })
    }

    const book = await Book.findById(id)

    if (!book) {
        return res.status(404).json({ error: "No such book" })
    }

    res.status(200).json(book)

}

// create a new book 
const createBook = async (req, res) => {
    const { title, author, description } = req.body

    // I need better error messages

    // add doc to db
    try {
        const user_id = req.user._id
        const book = await Book.create({ title, author, description, user_id })
        res.status(200).json(book)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}


// delete a book 
const deleteBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such book" })
    }

    const book = await Book.findByIdAndDelete({ _id: id })

    if (!book) {
        return res.status(404).json({ error: "No such book" })
    }

    res.status(200).json(book)
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook
}