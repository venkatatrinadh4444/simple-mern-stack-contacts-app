require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')
const privateRoutes=require('./routes/privateRoutes')
const contactRoutes=require('./routes/contactRoutes')
const cors=require('cors')

const PORT=process.env.PORT || 5000


const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use('/auth',authRoutes)
app.use('/verification',privateRoutes)
app.use('/user',contactRoutes)
app.use(express.static('uploads'))

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MONGO DB connected successfully!")).catch(err=>console.log(err))


app.listen(PORT,()=> {
    console.log(`Server started and running at ${PORT}`)
}) 