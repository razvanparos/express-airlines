import { Link,useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
import {loginUser} from '../services/loginService'
import { useLoginForm } from "../hooks/useLoginForm";
import { useAuth } from '../hooks/useAuth';


function LoginPage() {
  const navigate = useNavigate();
  const { state, setField, setError, setLoading, resetFields, setRememberMe } = useLoginForm();
  const { loginEmail, loginPassword, loginError, loading, rememberMe } = state;
  const { dispatch } = useAuth();

  const handleLogin = (e)=>{
    e.preventDefault();
     loginUser(loginEmail, loginPassword, setError, resetFields, navigate, setLoading, rememberMe, dispatch);
  }

  return (
    <div className="flex flex-col py-4 px-2 items-center min-h-[565px]">
      <p className="font-bold">Login page</p>
      <form action="" onSubmit={handleLogin} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
        <label htmlFor="email">Email</label>
        <input type="text" className="border-2" value={loginEmail} onChange={(e)=>{setField('loginEmail',e.target.value)}}/>
        <label htmlFor="password">Password</label>
        <input className="border-2" type="password" value={loginPassword} onChange={(e)=>{setField('loginPassword',e.target.value)}}/>
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