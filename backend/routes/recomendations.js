const express = require("express")
const {
    getRecomendations,
    createRecomendation } = require("../controllers/recomendationsController")

const router = express.Router()

// routes

// get all recomendation
router.get("/", getRecomendations)

// create a new recomendation
router.post("/", createRecomendation)

module.exports = router