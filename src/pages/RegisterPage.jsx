import { Link, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
import { useRegisterForm } from "../hooks/useRegisterForm";
import { registerUser } from "../services/registerService";


function RegisterPage() {
    const navigate = useNavigate();
    const { state, setField, setError, setLoading, resetFields } = useRegisterForm();
    const { registerEmail, registerPassword, registerName, registerPhone, registerError, loading } = state;

    const handleRegister = async (e) => {
      e.preventDefault();
      await registerUser(registerEmail, registerPassword, registerName, registerPhone, setError, resetFields, navigate, setLoading);
    };
    
    return (
      <div className="flex flex-col py-4 px-2 items-center">
      <p className="font-bold">Register page</p>
      <form action="" onSubmit={handleRegister} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
        <label htmlFor="name">Name</label>
        <input type="text" className="border-2" value={registerName} onChange={(e)=>setField('registerName',e.target.value)}/>
        <label htmlFor="phone">Phone</label>
        <input type="number" className="border-2" value={registerPhone} onChange={(e)=>setField('registerPhone', e.target.value)}/>
        <label htmlFor="email">Email</label>
        <input type="text" className="border-2" value={registerEmail} onChange={(e)=>setField('registerEmail', e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input className="border-2" type="password" value={registerPassword} onChange={(e)=>setField('registerPassword', e.target.value)}/>
        <p className="text-red-600">{registerError}</p>
        <button type="submit" className="bg-blue-500 py-3">{loading?<Loader/>:'Register'}</button>
        <Link to='/login' className="border-2 p-2 flex justify-center">Already have an account? Login now!</Link>
      </form>
      
    </div>
    );
  }
  
  export default RegisterPage;