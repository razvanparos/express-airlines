import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {loginUser} from '../services/authService';
import {getUserDetails} from "../services/authService";
import FormRow from "../components/FormRow";
import ButtonComponent from "../components/ButtonComponent";
import Loader from '../components/Loader';
import authActions from "../context/actions/auth-actions";
import notificationActions from '../context/actions/notification-actions';
import errorMessages from "./../mock-data/errorMessages.json";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginEmail, setLoginEmail]=useState('');
  const [loginPassword, setLoginPassword]=useState('');
  const [rememberMe, setRememberMe]=useState(false);
  const [loading, setLoading]=useState(false);
  const [loginError, setLoginError]=useState('');

  useEffect(() => {
    const { state } = location;
    
    // Show error message in case the user was redirected from a page he wasn't authorized to visit
    if (state && state.navigatedFromPrivateRoute) {
      if (state.hasToBeAdmin) {
        notificationActions.showNotification("error", errorMessages["auth/admin-restricted-page"]);
      } else {
        notificationActions.showNotification("error", errorMessages["auth/login-restricted-page"]);
      }

      /*
        Clear the history state so that the error message
        does not reappear when the user refreshes the page.
      */
      window.history.replaceState({}, '');
    }
  }, []);

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
      <h1 className="font-bold">Login</h1>
      <form action="" onSubmit={handleLogin} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
        <FormRow type={'text'} labelText="Email" value={loginEmail} onChangeFunction={(e)=>{setLoginEmail(e.target.value)}}/>
        <FormRow type={'password'} labelText="Password" value={loginPassword} onChangeFunction={(e)=>{setLoginPassword(e.target.value)}}/>
        <div className="flex gap-x-2">
          <input type="checkbox" className="w-[20px]" value={rememberMe} onChange={()=>{setRememberMe(!rememberMe)}}/>
          <p>Remember me</p>
        </div>
        <p className="text-red-500">{loginError}</p>
        <ButtonComponent buttonText={loading?<Loader/>:'Login'} buttonType={'primary'}/>
        <Link to='/register' className="p-2 flex justify-center">Don't have an account? Register now!</Link>
      </form>
      
    </article>
  );
}

export default LoginPage;