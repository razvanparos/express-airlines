import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import errorMessages from '../utils/errorMessages.json';
import Loader from '../components/Loader'

function RegisterPage() {
    const navigate = useNavigate();
    const [registerEmail,setRegisterEmail]=useState('')
    const [registerPassword,setRegisterPassword]=useState('')
    const [registerName,setRegisterName]=useState('')
    const [registerPhone,setRegisterPhone]=useState('')
    const [registerError,setRegisterError]=useState('')
    const [loading,setLoading]=useState(false)

    const handleRegister=async(e)=>{
      e.preventDefault();
      setLoading(true);
      if(registerEmail&&registerPassword&&registerName&&registerPhone){
        try{
          await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
          setRegisterError('');
          setRegisterEmail('');
          setRegisterPassword('');
          navigate('/login')
        }catch(error){
          setRegisterError(errorMessages[error.code])
        }
      }else{
        setRegisterError('Fields cannot be empty.')
        
      }
      setLoading(false);
    }
    
    return (
      <div className="flex flex-col py-4 px-2 items-center">
      <p className="font-bold">Register page</p>
      <form action="" onSubmit={handleRegister} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
        <label htmlFor="name">Name</label>
        <input type="text" className="border-2" value={registerName} onChange={(e)=>{setRegisterName(e.target.value)}}/>
        <label htmlFor="phone">Phone</label>
        <input type="number" className="border-2" value={registerPhone} onChange={(e)=>{setRegisterPhone(e.target.value)}}/>
        <label htmlFor="email">Email</label>
        <input type="text" className="border-2" value={registerEmail} onChange={(e)=>{setRegisterEmail(e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <input className="border-2" type="password" value={registerPassword} onChange={(e)=>{setRegisterPassword(e.target.value)}}/>
        <p className="text-red-600">{registerError}</p>
        <button className="bg-blue-500 py-3">{loading?<Loader/>:'Register'}</button>
        <Link to='/login' className="border-2 p-2 flex justify-center">Already have an account? Login now!</Link>
      </form>
      
    </div>
    );
  }
  
  export default RegisterPage;