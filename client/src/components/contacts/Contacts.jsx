
import Card from "react-bootstrap/Card";
import addImage from '../../assets/addImage.jpg'
import './Contacts.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import axios from "axios";
import { toast } from "react-toastify";

const Contacts = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false)
      setIsEditing({...isEditing,contactId:'',isEdit:false})
      setFormData({
        image:'',
      name:'',
      phone:''
      })
    };
    const handleShow = () => setShow(true);
    const [contactsData,setContactsData]=useState([])
    const [isEditing,setIsEditing]=useState({contactId:'',isEdit:false})

    const [formData,setFormData]=useState({
      image:'',
      name:'',
      phone:''
    })

  useEffect(()=> {
    const id=localStorage.getItem('id')
    axios.get(`https://simple-mern-stack-contacts-app.onrender.com/user/${id}/contacts/get-contacts`).then(res=>setContactsData(res.data)).catch(err=>console.log(err))
  },[])

  const changeHandler=e=> {
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const fileChangeHandler=e=>{
    setFormData({...formData,image:e.target.files[0]})
  }

  const addContact=()=> {
    const id=localStorage.getItem('id')
    const {image,name,phone}=formData
    const data=new FormData()
    data.append('image',image)
    data.append('name',name)
    data.append('phone',phone)
    axios.post(`https://simple-mern-stack-contacts-app.onrender.com/user/${id}/contacts/add-contact`,data,{headers:{'Content-Type':'multipart/form-data'}}).then(res=>{
      setContactsData(res.data.updatedContacts)
      toast.success(res.data.msg+"!")
    }).catch(err=>toast.error(res.data.msg))
    setFormData({image:'',
      name:'',
      phone:''})
      handleClose()
  }

  const editBtn=(contact)=> {
    handleShow()
    setTimeout(()=> {
      const {image,name,phone}=contact
      setFormData({...formData,name,phone})
    },1000)
    setIsEditing({...isEditing,contactId:contact._id,isEdit:true})
  }

  const editHandler=()=> {
    const id=localStorage.getItem('id')
    const {contactId}=isEditing
    const {image,name,phone}=formData
    const data=new FormData()
    data.append('image',image)
    data.append('name',name)
    data.append('phone',phone)
    axios.put(`https://simple-mern-stack-contacts-app.onrender.com/user/${id}/contacts/update-contact/${contactId}`,data,{headers:{'Content-Type':'multipart/form-data'}}).then(res=>{
      setContactsData(res.data.updatedContacts)
      toast.success(res.data.msg+"!")
    }).catch(err=>toast.error(res.data.msg))
    setFormData({image:'',
      name:'',
      phone:''})
      handleClose()
      setIsEditing({contactId:'',isEdit:false})
  }

  const delteHandler=(contactId)=> {
    const id=localStorage.getItem('id')
    axios.delete(`https://simple-mern-stack-contacts-app.onrender.com/user/${id}/contacts/delete-contact/${contactId}`).then(res=>{
      setContactsData(res.data.updatedContacts)
      toast.success(res.data.msg+"!")
    }).catch(err=>console.log(err))
  }

  const {image,name,phone}=formData
  return (
    <div>
      <h2 className="text-center mt-3 mb-3">My Contacts</h2>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>e.preventDefault()}>
         <FloatingLabel
        controlId="floatingFileInput"
        label="Choose a profile image"
        className="mb-3"
      >
        <Form.Control type="file" placeholder="name@example.com" onChange={fileChangeHandler}/>
      </FloatingLabel>

      <FloatingLabel controlId="floatingNameInput" label="Enter name" className="mb-3">
        <Form.Control type="text" placeholder="Password" name="name" value={name} onChange={changeHandler}/>
      </FloatingLabel>

      <FloatingLabel controlId="floatingPhoneInput" label="Enter phone number">
        <Form.Control type="number" placeholder="Password" name="phone" value={phone} onChange={changeHandler}/>
      </FloatingLabel>
      </Form>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         {isEditing.isEdit? <Button variant="primary" onClick={editHandler}>
            Edit
          </Button>: <Button variant="primary" onClick={addContact}>
            Add
          </Button>}
        </Modal.Footer>
      </Modal>

      <div className="d-flex gap-3 cardContainer container justify-content-around mb-5">
      {contactsData.length>0 && (
        contactsData.map(eachContact=>{
          const id=localStorage.getItem('id')
          return <Card style={{ width: "12rem" }} className="shadow eachCard" key={eachContact._id}>
          <Card.Img variant="top" src={`https://simple-mern-stack-contacts-app.onrender.com/user/${id}/images/${eachContact._id}?t=${new Date().getTime()}`} className="cardImage"/>
          <Card.Body className="px-2 pb-3 pt-1">
            <Card.Title className="title">Name: <br/>
            {eachContact.name}
            </Card.Title>
            <Card.Text>
             Phone No: {eachContact.phone}
            </Card.Text>
            <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-secondary" onClick={()=>editBtn(eachContact)}>Edit</button>
            <button className="btn btn-danger" onClick={()=>delteHandler(eachContact._id)}>Delete</button>
            </div>
          </Card.Body>
        </Card>
        })
        
      )}


      <Card style={{ width: "12rem",cursor:'pointer'}} onClick={handleShow} className="shadow eachCard">
        <Card.Img variant="top" src={addImage} width="100%" className="cardImage"/>
        <Card.Body>
          <Card.Title className="title">Add Contact</Card.Title>
        </Card.Body>
      </Card>
      </div>
    </div>
  );
};
export default Contacts;

;