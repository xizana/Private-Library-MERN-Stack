const express = require("express")
const requireAuth = require("../middleware/requireAuth")

//Controller functions
const {
    getBooks,
    getBook,
    createBook,
    deleteBook } = require("../controllers/booksControllers")

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


// get all books

router.get("/", getBooks)

// get a single book

router.get("/:id", getBook)

// create a new book 

router.post("/", createBook)

// delete a book 

router.delete("/:id", deleteBook)



module.exports = router