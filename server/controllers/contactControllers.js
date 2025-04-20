const User=require('../models/User')

const addContact=async(req,res)=> {
    try {
        const {id}=req.params
        const {name,phone}=req.body
        const imagePath=req.file?`/uploads/${req.file.filename}`:`/uploads/defaultProfile.jpg`
        const updateUser=await User.findByIdAndUpdate(id,
            {
                $push:{
                    contacts:{
                        image:imagePath,
                        name,
                        phone
                    }
                }
            },
            {new:true}
        )
        if(!updateUser) 
            return res.status(404).json({msg:'user not found'})
        return res.status(200).json({msg:'contact added successfully!',updatedContacts:updateUser.contacts})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:'server error'})
    }
}


const getContacts=async(req,res)=> {
    try {
        const {id}=req.params
        const exist=await User.findById(id).select('contacts')
        if(!exist)
            return res.status(404).json({msg:'user not found'})
        return res.status(200).json(exist.contacts)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({msg:'server error'})
    }
}

const deleteContact=async(req,res)=> {
    try {
        const {id,contactId}=req.params
        const exist=await User.findByIdAndUpdate({_id:id},{$pull:{contacts:{_id:contactId}}},{new:true})

        if(!exist)
            return res.status(404).json({msg:'user or post does not exist'})
        return res.status(200).json({msg:'contact deleted successfully!',updatedContacts:exist.contacts})
    }
    catch(err) {
        console.log(err)
        return res.status({msg:'server error'})
    }
}

const updateContact=async(req,res)=> {
    try {
        const {id,contactId}=req.params
        const {name,phone}=req.body
        const imagePath=req.file?`/uploads/${req.file.filename}`:`/uploads/defaultProfile.jpg`
        // if(!imagePath || !name || !phone)
        //     return res.status(400).json({msg:'atleast one field must be provided to update'})
        const exist=await User.findOneAndUpdate({_id:id,'contacts._id':contactId},{$set:{
            'contacts.$.image':imagePath,
            'contacts.$.name':name,
            'contact.$.phone':phone
        }},{new:true})
        if(!exist) 
            return res.status(400).json({msg:'user or contact does not exist'})
        
        return res.status(200).json({msg:'contact updated successfully!',updatedContacts:exist.contacts})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({msg:'server error'})
    }
}


module.exports={addContact,getContacts,deleteContact,updateContact}