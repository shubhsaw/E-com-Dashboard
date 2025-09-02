const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/signupDB");

const userSchema=mongoose.Schema({
    email:String,
    password:String,
    firstname:String,
    lastname:String
})

module.exports=mongoose.model("userData",userSchema)