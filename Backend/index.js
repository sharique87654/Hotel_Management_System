const express = require('express');
const usersignup = require("./Auth/routes/signup.js")
const usersignin = require("./Auth/routes/signin.js")
const adminauth = require("./Admin/auth.js")
const allHotelData = require("./Admin/allHotelData.js")
const deleteRooms = require("./Admin/deleteRooms.js")
const updateRooms = require("./Admin/updateRooms.js")
const bookingRouter = require("./Users/booking.js")
const addRooms = require("./Admin/addRooms.js")  
const adminViewBookings = require("./Admin/viewBooking.js");
const adminCancelBooking = require("./Admin/cancelBooking.js")


const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json());

app.use('/' , usersignup);
app.use('/api' , usersignin);
app.use('/admin' , addRooms)
app.use('/admin' , adminauth)
app.use('/admin' , deleteRooms)             
app.use('/admin' , updateRooms)
app.use('/admin' , adminViewBookings)
app.use('/HotelApi' , allHotelData)
app.use('/booking' , bookingRouter)
app.use("/admin" , adminCancelBooking)

app.listen(3000 , function(){
    console.log("Everything is working fine");
    
})