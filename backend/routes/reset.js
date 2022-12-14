const express = require("express")

// Controller functions

const {
    resetPassword,
    forgotPassword,
    postPassword } = require("../controllers/resetController")



const router = express.Router()

// resetPassword route

router.post("/sendpasswordlink", resetPassword)
router.get("/forgotpassword/:id/:token", forgotPassword)
router.post("/:id/:token", postPassword)

module.exports = router 