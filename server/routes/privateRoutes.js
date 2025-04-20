const express=require('express')
const routes=express.Router()
const User=require('../models/User')
const verifyToken=require('../middlewares/verifyToken')

routes.get('/verifytoken',verifyToken,async(req,res)=> {
    try {
        const {id}=req.user
        const exist=await User.findById(id)
        if(!exist)
            return res.status(404).json({msg:'user not found'})
        return res.status(200).json({msg:'token is verified'})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:'server error'})
    }

})

module.exports=routes