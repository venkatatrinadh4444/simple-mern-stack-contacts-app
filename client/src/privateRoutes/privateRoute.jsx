import axios from "axios"
import { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute=({children})=> {
    const [verified,setVerified]=useState({isLoading:true,isError:false})

    const token=localStorage.getItem('token')
    const tokenVerification=()=> {
        axios.get(`https://simple-mern-stack-contacts-app.onrender.com/verification/verifytoken`,{headers:{Authorization:`Bearer ${token}`}}).then(res=>setVerified({isLoading:false,isError:false})).catch(err=>setVerified({isLoading:false,isError:true}))
    }
    useEffect(()=> {
        tokenVerification()
    },[])

    if(verified.isLoading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
    if(verified.isError) {
        return <Navigate to="/"/>
    }

    return children
}
export default PrivateRoute