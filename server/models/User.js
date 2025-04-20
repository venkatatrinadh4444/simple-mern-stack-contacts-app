const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        require:true
    },
    contacts:[
        {
            image:String,
            name:String,
            phone:Number
        }
    ]


},{timestamps:true,versionKey:false})

module.exports=mongoose.model("User",userSchema)