const mongoose = require("mongoose")

const Schema = mongoose.Schema

const recomendationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    recomendation: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Recomendation", recomendationSchema)