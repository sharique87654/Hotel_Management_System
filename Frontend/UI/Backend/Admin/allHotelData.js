const express = require("express");
const { roomdata } = require("../db");

const router = express.Router();

router.get('/rooms' , async function(req , res){
    const data = await roomdata.find({})
    return res.status(200).json(data)
})

module.exports = router