import { Link, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
import { registerUser } from "../services/authService";
import { useState } from "react";

function RegisterPage() {
    const navigate = useNavigate();
    const initialRegisterState={
      registerName:'',
      registerPhone:'',
      registerEmail:'',
      registerPassword:'',
      registerError:'',
      loading:false
    }
    const [registerState,setRegisterState]=useState(initialRegisterState)
    
    const changeRegisterState = (fieldname,value)=>{
      setRegisterState((prevState)=>({
        ...prevState,
        [fieldname]:value
      }))
    } 

    const handleRegister = async (e) => {
      e.preventDefault();
      changeRegisterState('loading',true)
      try{
        await registerUser(registerState.registerName,registerState.registerPhone, registerState.registerEmail, registerState.registerPassword);
        navigate('/login')
      }catch(error){
        changeRegisterState('registerError',error)
        changeRegisterState('loading',true)
      }
      
      changeRegisterState('loading',false)
    };
    
    return (
      <article className="flex flex-col py-4 px-2 items-center bg-white">
        <p className="font-bold">Register page</p>
        <form action="" onSubmit={handleRegister} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
          <label htmlFor="name">Name</label>
          <input type="text" className="border-2 rounded-lg p-2" value={registerState.registerName} onChange={(e)=>changeRegisterState('registerName',e.target.value)}/>
          <label htmlFor="phone">Phone</label>
          <input type="number" className="border-2 rounded-lg p-2" value={registerState.registerPhone} onChange={(e)=>changeRegisterState('registerPhone',e.target.value)}/>
          <label htmlFor="email">Email</label>
          <input type="text" className="border-2 rounded-lg p-2" value={registerState.registerEmail} onChange={(e)=>changeRegisterState('registerEmail',e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input className="border-2 rounded-lg p-2" type="password" value={registerState.registerPassword} onChange={(e)=>changeRegisterState('registerPassword',e.target.value)}/>
          <p className="text-red-600">{registerState.registerError}</p>
          <button type="submit" className="bg-primaryBlue rounded-xl text-white py-3">{registerState.loading?<Loader/>:'Register'}</button>
          <Link to='/login' className="p-2 flex justify-center">Already have an account? Login now!</Link>
        </form>
      </article>
    );
  }
  
  export default RegisterPage;