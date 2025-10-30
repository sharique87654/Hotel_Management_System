const express = require('express');
const router = express.Router();
const zod = require('zod');
const { admindb } = require('../db');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()


const authValid = zod.object({
    adminName : zod.string().min(1),
    password : zod.string().min(1)
})
router.use('/auth' , async function(req , res){
    const authbody = req.body
    const validation = authValid.safeParse(authbody)

    if (!validation.success){
        return res.status(411).json({
            msg : "Wrong input"
        })
    }

    const foundUser = await admindb.findOne({
        adminName : req.body.adminName,
        password : req.body.password
    })

    if (!foundUser){
        return res.status(401).json({
            msg : "unauthorized user"
        })
    }
    const userId = foundUser._id
    const token = jwt.sign({
        userId
    },process.env.jwtCode)

    return res.status(200).json({
        msg : "Admin succesfully logged in",
        token : token
    })

})

module.exports = router
