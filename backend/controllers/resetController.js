const nodemailer = require("nodemailer")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")
// const validator = require("validator")


// reset password

const resetPassword = async (req, res) => {

    const { email } = req.body
    // if email is not valid, reset link will not be sent
    try {

        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ mssg: "This email does not exist." })
        } else {

            const user = await User.findOne({ email })
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "300s" })
            const setUserToken = await User.findOneAndUpdate({ _id: user._id }, { verifytoken: token }, { new: true })
            // console.log("setUserToken", setUserToken)
            

            // SMTP transport
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "your email here", // user
                    pass: process.env.PASSWORD, // ethereal password
                },
            })

            // send mail with defined transport object
            if (setUserToken) {
                transporter.sendMail({
                    from: '"Public Library 👻" <your email here>', // sender address
                    to: email, // list of receivers
                    subject: "Reset Link ✔", // Subject line
                    html: `
                    <div>
                    <h2>Hello, Dear Custumer!</h2>           
                    <p>Here is the link to reset your password.</p>
                    <p>This link is valid for 5 minutes.</p>
                
                    
                    <h2>http://localhost:3000/forgotpassword/${user._id}/${setUserToken.verifytoken}</h2>
                    
                    </div > "

                    `, // html body
                })


                res.status(200).json({ mssg: "Email successfuly sent! " })
            }

        }

    } catch (error) {
        res.status(400).json({ mssg: error })

    }
}

const forgotPassword = async (req, res) => {


    const { id, token } = req.params

    try {
        const user = await User.findOne({ _id: id, verifytoken: token })

        const verifyToken = jwt.verify(token, process.env.SECRET)

        // console.log(verifyToken)
        if (user && verifyToken._id) {
            res.status(200).json({ status: 200, user })
        }
        if (!user && !verifyToken._id) {
            res.status(401).json({ status: 401, mssg: "User do not exist" })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }

}

const postPassword = async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    if (validator.isStrongPassword(password)) {

        try {
            const user = await User.findOne({ _id: id, verifytoken: token });

            const verifyToken = jwt.verify(token, process.env.SECRET);

            if (user && verifyToken._id) {
                const hash = await bcrypt.hash(password, 10);

                const newPassword = await User.findByIdAndUpdate({ _id: id }, { password: hash });

                newPassword.save();
                res.status(201).json({ status: 201, newPassword })

            } else {
                res.status(401).json({ status: 401, message: "user not exist" })
            }
        } catch (error) {
            res.status(401).json({ status: 401, error })
        }
    } else {
        console.log("Password not strong enough")
    }



}

module.exports = {
    resetPassword,
    forgotPassword,
    postPassword
}
