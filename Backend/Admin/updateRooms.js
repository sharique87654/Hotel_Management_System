const express = require('express')
const zod = require('zod')
const { roomdata } = require('../db')

const router = express.Router()

const hotelInput = zod.object({
    roomName : zod.string().min(1),
    description : zod.string().min(1),
    price : zod.string().min(1),
    roomType : zod.string().min(1),
    numberofbed : zod.string().min(1)

})
router.put('/roomUpdate/:id' , async function(req , res){
    const data = req.body
    const validUpdate = hotelInput.safeParse(data)

    if (!validUpdate.success){
        return res.status(411).json({
            error : "Invalid input"
        })
    }
    
    try {
        await roomdata.updateOne(
        {_id : req.params.id} , 
        data
    )
} catch (error) {
    return res.status(500).json({
        message : "Server error"
    })
}

    return res.status(200).json({
        message : "Update successful"
    })
})

module.exports = router