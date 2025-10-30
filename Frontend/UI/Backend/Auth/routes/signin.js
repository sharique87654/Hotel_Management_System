const express = require("express")
const router = express.Router();
const zod = require("zod");
const jwt = require('jsonwebtoken');
const { signupdb } = require("../../db");
const dotenv = require("dotenv")
dotenv.config()


const signinAuth = zod.object({
    email : zod.string().email().min("Invaild email"),
    password : zod.string().min(1 , "Please enter password")
})
router.post('/signin' , async function(req , res){
    const signinBody = req.body
    const inAuth = signinAuth.safeParse(signinBody)

    if (!inAuth.success){
        return res.status(411).json({
            msg : "Wrong input"
        })
    }

    const foundUser = await signupdb.findOne({
        email : req.body.email,
        password : req.body.password
    })

    if (!foundUser){
    return res.status(401).json({
            msg : "Unauthorized user Please go to signup page"
        })
    }

    userId = foundUser._id

    const token = jwt.sign({
        userId
    }, process.env.jwtCode)

    return res.status(200).json({
        message : "You have Succesfully logged in",
        token : token
    })

})

module.exports = router;