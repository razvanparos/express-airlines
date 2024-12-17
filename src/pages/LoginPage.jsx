import { Link,useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
import {loginUser} from '../services/authService'
import { useState } from "react";
import {getUserDetails} from "../services/authService";
import authActions from "../context/actions/auth-actions";
import FormRow from "../components/FormRow";

function LoginPage() {
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
      let userDetails = await getUserDetails('UsersDetails');
      authActions.setUserData({
        userDetails: userDetails,
      })
      if(sessionStorage.getItem('currentBooking')){
        navigate('/flight-details')
      }else if(userDetails[0].isAdmin){
        navigate('/admin-dashboard')
      }else{
        navigate('/')
      }
      
    }catch(error){
      setLoginError(error)
    }
    setLoading(false)
  }

  return (
    <article className="flex flex-col py-4 px-2 items-center bg-white lg:py-[80px]">
      <p className="font-bold">Login</p>
      <form action="" onSubmit={handleLogin} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
        <FormRow type={'text'} labelText="Email" value={loginEmail} onChangeFunction={(e)=>{setLoginEmail(e.target.value)}}/>
        <FormRow type={'password'} labelText="Password" value={loginPassword} onChangeFunction={(e)=>{setLoginPassword(e.target.value)}}/>
        <div className="flex gap-x-2">
          <input type="checkbox" className="w-[20px]" value={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}/>
          <p>Remember me</p>
        </div>
        <p className="text-red-500">{loginError}</p>
        <button type="submit" className="bg-primaryBlue p-2 text-white rounded-xl">{loading?<Loader/>:'Login'}</button>
        <Link to='/register' className="p-2 flex justify-center">Don't have an account? Register now!</Link>
      </form>
      
    </article>
  );
}

export default LoginPage;