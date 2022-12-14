require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const recomendationRoutes = require("./routes/recomendations")
const booksRoutes = require("./routes/books")
const userRoutes = require("./routes/user")
const resetRoutes = require("./routes/reset")

// express app 
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes 
app.use("/api/recomendations", recomendationRoutes)
app.use("/api/books", booksRoutes)
app.use("/api/user", userRoutes)
app.use("/api/reset", resetRoutes)



// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listening on port
        app.listen(process.env.PORT, () => {
            console.log("Connected to mongoDB")
            console.log("Listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })



