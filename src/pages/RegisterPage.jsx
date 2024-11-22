import { Link, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
import { registerUser } from "../services/authService";
import { useState } from "react";


function RegisterPage() {
    const navigate = useNavigate();
    const [registerName, setRegisterName]=useState('');
    const [registerPhone, setRegisterPhone]=useState('');
    const [registerEmail, setRegisterEmail]=useState('');
    const [registerPassword, setRegisterPassword]=useState('');
    const [registerError, setRegisterError]=useState('');
    const [loading, setLoading]=useState(false);


    const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      try{
        await registerUser(registerName,registerPhone, registerEmail, registerPassword);
        navigate('/login')
      }catch(error){
        setRegisterError(error)
      }
      
      setLoading(false);
    };
    
    return (
      <article className="flex flex-col py-4 px-2 items-center bg-white">
        <p className="font-bold">Register page</p>
        <form action="" onSubmit={handleRegister} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
          <label htmlFor="name">Name</label>
          <input type="text" className="border-2 rounded-lg p-2" value={registerName} onChange={(e)=>setRegisterName(e.target.value)}/>
          <label htmlFor="phone">Phone</label>
          <input type="number" className="border-2 rounded-lg p-2" value={registerPhone} onChange={(e)=>setRegisterPhone(e.target.value)}/>
          <label htmlFor="email">Email</label>
          <input type="text" className="border-2 rounded-lg p-2" value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input className="border-2 rounded-lg p-2" type="password" value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)}/>
          <p className="text-red-600">{registerError}</p>
          <button type="submit" className="bg-primaryBlue rounded-xl text-white py-3">{loading?<Loader/>:'Register'}</button>
          <Link to='/login' className="p-2 flex justify-center">Already have an account? Login now!</Link>
        </form>
      </article>
    );
  }
  
  export default RegisterPage;