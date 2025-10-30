const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()



mongoose.connect(process.env.MONGO_URL) 

const Userschema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    
})

const AdminSchema = new mongoose.Schema({
    adminName : String,
    password :String,
})

const RoomsData = new mongoose.Schema({
    roomName : String,
    description : String,
    price : String,
    roomType : String,
    numberofbed : String,

})

const signupdb = mongoose.model('users' , Userschema)
const admindb = mongoose.model('Admin' ,  AdminSchema)
const roomdata = mongoose.model('Rooms' ,  RoomsData)

module.exports = {
    signupdb,
    admindb,
    roomdata
}