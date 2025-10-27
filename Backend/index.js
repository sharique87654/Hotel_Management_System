const express = require('express');
const usersignup = require("./Auth/routes/signup.js")
const usersignin = require("./Auth/routes/signin.js")
const adminauth = require("./Admin/auth.js")
const hotelroom = require("./Admin/hotelroom.js")
const allHotelData = require("./Admin/allHotelData.js")
const deleteRooms = require("./Admin/deleteRooms.js")
const updateRooms = require("./Admin/updateRooms.js")
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json());


app.use('/' , usersignup);
app.use('/' , usersignin);
app.use('/admin' , adminauth)
app.use('/admin' , hotelroom)
app.use('/admin' , deleteRooms)             
app.use('/admin' , updateRooms)
app.use('/HotelApi' , allHotelData)

app.listen(3000 , function(){
    console.log("Everything is working fine");
    
})