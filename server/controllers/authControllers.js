const User=require('../models/User')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=> {
    try {
        const {username,email,password,phone}=req.body;
        const exist=await User.findOne({email})
        if(exist)
            return res.status(409).json({msg:'user already existed'})
        const newUser=new User({
            username,
            email,
            password,
            phone
        })
        await newUser.save()
        return res.status(200).json({msg:'user registered successfully!'})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:'server error'})
    }
}

const loginUser=async(req,res)=> {
    try {
        const {username,email,password,phone}=req.body;
        const exist=await User.findOne({email})
        if(!exist) 
            return res.status(404).json({msg:'user not found'})
        if(exist.password!==password)
            return res.status(401).json({msg:'Invalid credentials'})
        const token=jwt.sign({id:exist.id},process.env.MYSECRETKEY,{expiresIn:'1h'})
        return res.status(200).json({msg:'login successful',token,id:exist.id})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:'server error'})
    }
}

module.exports={registerUser,loginUser}