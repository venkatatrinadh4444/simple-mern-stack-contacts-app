const express=require('express')
const routes=express.Router()
const multerMiddleware=require('../middlewares/multerMiddleware')
const {addContact,getContacts,deleteContact,updateContact}=require('../controllers/contactControllers')
const User = require('../models/User')
const path=require('path')

routes.post('/:id/contacts/add-contact',multerMiddleware.single('image'),addContact)
routes.get('/:id/contacts/get-contacts',getContacts)
routes.delete('/:id/contacts/delete-contact/:contactId',deleteContact)
routes.put('/:id/contacts/update-contact/:contactId',multerMiddleware.single('image'),updateContact)

routes.get('/:id/images/:contactId',async(req,res)=>{
    try {
        const {id,contactId}=req.params
        const exist=await User.findOne({_id:id,'contacts._id':contactId},{'contacts.$':1})
        if(!exist) 
            return res.status(404).json({msg:'user or image does not existed'})
        const imagePath=path.join(__dirname,'..',exist.contacts[0].image)
        return res.status(200).sendFile(imagePath)
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:'server error'})
    }
})
module.exports=routes