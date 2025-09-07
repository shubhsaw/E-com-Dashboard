const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/signupDB')

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    company:String,
    desc:String,
    rating:Number
})
module.exports=mongoose.model("products",productSchema)