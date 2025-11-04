const express = require('express')
const { roomdata } = require("../db");


const router = express.Router()

router.delete('/roomDelete' , async function(req , res){
    const {roomName} = req.body  // const roomName = req.body.roomName are the same.
    //The { roomName } = req.body syntax is called destructuring assignment in JavaScript, and {} is used to destructure objects. Destructuring allows you to directly extract specific properties from an object and assign them to variables,

    await roomdata.deleteOne({
        roomName : roomName   // we can write only roomName
    })

    return res.status(200).json({
        msg : "Room deleted"
    })
})

module.exports = router