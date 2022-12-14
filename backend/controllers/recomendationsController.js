const Recomendation = require("../models/recomendationModel")

// get recomendations
const getRecomendations = async (req, res) => {
    const recomendations = await Recomendation.find({}).sort({ createdAt: -1 })
    res.status(200).json(recomendations)
}

// create a new recomendation 
const createRecomendation = async (req, res) => {
    const { title, author, user, recomendation } = req.body

    // I need better error messages

    // add doc to db
    try {
        const recomend = await Recomendation.create({ title, author, user, recomendation })
        res.status(200).json(recomend)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}


module.exports = {
    getRecomendations,
    createRecomendation
}