const express = require("express");
const router = express.Router();
const zod = require('zod');
const { roomdata } = require("../db");


const hotelInput = zod.object({
    roomName : zod.string().min(1),
    description : zod.string().min(1),
    price : zod.string().min(1),
    roomType : zod.string().min(1),
    numberofbed : zod.string().min(1)

})
router.use('/hotelroom' , async function(req , res){
        const hoteldata = req.body
        const finalInput = hotelInput.safeParse(hoteldata)

        if (!finalInput.success){
            return res.status(411).json({
                msg : "Wrong input"
            })
        }

        await roomdata.create({
            roomName : req.body.roomName,
            description : req.body.description,
            price : req.body.price,
            roomType : req.body.roomType,
            numberofbed : req.body.numberofbed
        })

        return res.status(200).json({
            message: "Room created succesfully"
        })

})



module.exports = router