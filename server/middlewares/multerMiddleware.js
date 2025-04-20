const multer=require('multer')

const storage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,cd)=>{
        cd(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload=multer({storage})

module.exports=upload