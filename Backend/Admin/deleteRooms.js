const express = require('express')
const { roomdata } = require("../db");


const router = express.Router()

router.delete('/roomDelete' , async function(req , res){
    const {roomName} = req.body  

    await roomdata.deleteOne({
        roomName : roomName   // we can write only roomName
    })

    return res.status(200).json({
        msg : "Room deleted"
    })
})

module.exports = router