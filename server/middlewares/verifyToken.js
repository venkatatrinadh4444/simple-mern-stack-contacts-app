const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=> {
    try {
        const authHead=req.headers.authorization
        if(!authHead)
            return res.status(404).json({msg:'token not found'})
        const token=authHead.split(' ')[1]
        if(!token) 
            return res.status(404).json({msg:'token not found'})
        jwt.verify(token,process.env.MYSECRETKEY,(err,decoded)=>{
            if(err)
                return res.status(401).json({msg:'Invalid or expired token'})
            req.user=decoded
            next();
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:'server error'})
    }
}

module.exports=verifyToken