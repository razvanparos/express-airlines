import { Link,useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
import {loginUser} from '../services/loginService'
import { useState } from "react";
import { auth } from "../firebase-config";

function LoginPage(props) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail]=useState('');
  const [loginPassword, setLoginPassword]=useState('');
  const [rememberMe, setRememberMe]=useState(false);
  const [loading, setLoading]=useState(false);
  const [loginError, setLoginError]=useState('');

  const handleLogin = async(e)=>{
    e.preventDefault();
    setLoading(true)
    try{
      await loginUser(loginEmail, loginPassword, rememberMe);
      props.getUserDataFromLogin(auth.currentUser)
      navigate('/')
    }catch(error){
      setLoginError(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col py-4 px-2 items-center min-h-[565px]">
      <p className="font-bold">Login page</p>
      <form action="" onSubmit={handleLogin} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
        <label htmlFor="email">Email</label>
        <input type="text" className="border-2" value={loginEmail} onChange={(e)=>{setLoginEmail(e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <input className="border-2" type="password" value={loginPassword} onChange={(e)=>{setLoginPassword(e.target.value)}}/>
        <div className="flex gap-x-2">
          <input type="checkbox" className="w-[20px]" value={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}/>
          <p>Remember me</p>
        </div>
        <p className="text-red-500">{loginError}</p>
        <button type="submit" className="bg-blue-300 py-3">{loading?<Loader/>:'Login'}</button>
        <Link to='/register' className="border-2 p-2 flex justify-center">Don't have an account? Register now!</Link>
      </form>
      
    </div>
  );
}

export default LoginPage;