
import { toast } from 'react-toastify'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'


const Navbar =()=> {
    const navigateToLogin=useNavigate(null)
    const logoutHanlder=()=> {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        toast.success('Logout successful!')
        navigateToLogin('/')
    }
    return (
        <div className='shadow bg-light'>
        <div className='d-flex justify-content-between align-items-center container p-2'>
            <div className='d-flex align-items-center'>
                <img src={logo} alt="logo" width="45px"/>
                <h4>Contacts</h4>
            </div>
            <div>
                <button className='btn btn-danger' onClick={logoutHanlder}>Logout</button>
            </div>
        </div>
        </div>
    )
}
export default Navbar