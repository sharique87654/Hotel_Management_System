<<<<<<< HEAD
const express = require('express');
const usersignup = require("./Auth/routes/signup.js")
const usersignin = require("./Auth/routes/signin.js")
const adminauth = require("./Admin/auth.js")
const allHotelData = require("./Admin/allHotelData.js")
const deleteRooms = require("./Admin/deleteRooms.js")
const updateRooms = require("./Admin/updateRooms.js")
const bookingRouter = require("./Users/booking.js")
const addRooms = require("./Admin/addRooms.js")  
const viewBookings = require("./Admin/viewBooking.js");

=======
const express = require("express");
const usersignup = require("./Auth/routes/signup.js");
const usersignin = require("./Auth/routes/signin.js");
const adminauth = require("./Admin/auth.js");
const allHotelData = require("./Admin/allHotelData.js");
const deleteRooms = require("./Admin/deleteRooms.js");
const updateRooms = require("./Admin/updateRooms.js");
const bookingRouter = require("./Users/booking.js");
const addRooms = require("./Admin/addRooms.js");
>>>>>>> 37329f292fc201c8ef86d8be5546e7e08c7270e9

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use('/' , usersignup);
app.use('/api' , usersignin);
app.use('/admin' , addRooms)
app.use('/admin' , adminauth)
app.use('/admin' , deleteRooms)             
app.use('/admin' , updateRooms)
app.use('/admin' , viewBookings)
app.use('/HotelApi' , allHotelData)
app.use('/booking' , bookingRouter)
=======
app.use("/", usersignup);
app.use("/api", usersignin);
app.use("/admin", addRooms);
app.use("/admin", adminauth);
app.use("/admin", deleteRooms);
app.use("/admin", updateRooms);
app.use("/HotelApi", allHotelData);
app.use("/booking", bookingRouter);
>>>>>>> 37329f292fc201c8ef86d8be5546e7e08c7270e9

app.listen(3000, function () {
  //("Everything is working fine");
});
