const mongoose=require('mongoose')
const schema=mongoose.Schema

const userschema= new schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true    
    },
    phone:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
})

userModel= mongoose.model('user_registration',userschema)
module.exports=userModel