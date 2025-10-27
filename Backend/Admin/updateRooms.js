const express = require('express')
const zod = require('zod')
const { roomdata } = require('../db')

const router = express.Router()


const hotelInput = zod.object({
    roomName : zod.string().min(1)

})
router.put('/roomUpdate/:id' , async function(req , res){
    const data = req.body
    const validUpdate = hotelInput.safeParse(data)

    if (!validUpdate.success){
        return res.status(411).json({
            error : "SomeThing went wrong"
        })
    }
    
    await roomdata.updateOne(
        {_id : req.params.id} , 
        data
    )

    return res.status(200).json({
        message : "Update successful"
    })
})



module.exports = router