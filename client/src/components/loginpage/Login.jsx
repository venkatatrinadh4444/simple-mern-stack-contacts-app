import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { useState } from 'react';
import show from '../../assets/show.png'
import hide from '../../assets/hide.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormFloatingBasicExample() {
    const navigateToDashboard=useNavigate(null)
    const [isRegister,setIsRegister]=useState(false)
    const [isHide,setIsHide]=useState(true)
    const [userData,setUserData]=useState({
      username:'',
      email:'',
      password:'',
      phone:''
    })

  const changeHandler=e=>{
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const registerFuntion=()=> {
    axios.post('https://simple-mern-stack-contacts-app.onrender.com/auth/register-user',userData).then((res)=>toast.info(res.data.msg+"!")).catch(err=>console.log(err))
    setUserData({username:'',
      email:'',
      password:'',
      phone:''})
  }
  
  const loginFuntion=()=> {
    const {email,password}=userData
    axios.post('https://simple-mern-stack-contacts-app.onrender.com/auth/login-user',{email,password}).then(res=>{
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('id',res.data.id)
      toast.success(res.data.msg+"!")
    }).catch(err=>toast.error(res.data.msg))
    setUserData({username:'',
      email:'',
      password:'',
      phone:null})
      setTimeout(()=>{
        navigateToDashboard('/dashboard')
      },1000)
    
  }

    const {username,email,password,phone}=userData

  return (
    <div className='loginContainer d-flex justify-content-center align-items-center'>
    <Form className='inputBox p-5 rounded-2 shadow' onClick={(e)=>e.preventDefault()}>
   {isRegister &&  <FloatingLabel
        controlId="floatingInput"
        label="Enter Username"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Enter username" name="username" value={username} onChange={changeHandler}/>
      </FloatingLabel>}
      <FloatingLabel
        controlId="floatingEmailname"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" name="email" value={email} onChange={changeHandler}/>
      </FloatingLabel>

      <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3 position-relative'>
        <Form.Control type={isHide?'password':'text'} placeholder="Password" name="password" value={password} onChange={changeHandler}/>
        <img src={isHide?hide:show} alt="show" width="20px" className='position-absolute' style={{top:'35%',right:'10%',cursor:'pointer'}} onClick={()=>setIsHide(!isHide)}/>
      </FloatingLabel>

     {isRegister &&  <FloatingLabel
        controlId="floatingPhoneInput"
        label="Enter phone number"
        className="mb-3"
      >
        <Form.Control type="number" placeholder="name@example.com" name="phone" value={phone} onChange={changeHandler}/>
      </FloatingLabel>}

      <div className='text-center mb-1'>
        {isRegister?<button className='btn btn-primary' onClick={registerFuntion}>
            Register
        </button>:<button className='btn btn-success' onClick={loginFuntion}>
            Login
        </button>}
      </div>
      <p className='text-light'>Already have an account ? <span className='text-light clickBtn' onClick={()=>setIsRegister(!isRegister)}> Click Here</span></p>
    </Form>
    </div>
  );
}

export default FormFloatingBasicExample;