import { Link, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';
import { registerUser } from "../services/authService";
import { useState } from "react";
import FormRow from '../components/FormRow';
import ButtonComponent from "../components/ButtonComponent";

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
        <p className="font-bold">Register</p>
        <form action="" onSubmit={handleRegister} className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
          <FormRow type={'text'} labelText="Name" value={registerState.registerName} onChangeFunction={(e)=>changeRegisterState('registerName',e.target.value)}/>
          <FormRow type={'number'} labelText="Phone" value={registerState.registerPhone} onChangeFunction={(e)=>changeRegisterState('registerPhone',e.target.value)}/>
          <FormRow type={'text'} labelText="Email" value={registerState.registerEmail} onChangeFunction={(e)=>changeRegisterState('registerEmail',e.target.value)}/>
          <FormRow type={'password'} labelText="Password" value={registerState.registerPassword} onChangeFunction={(e)=>changeRegisterState('registerPassword',e.target.value)}/>
          <p className="text-red-600">{registerState.registerError}</p>
          <ButtonComponent buttonType={'primary'} buttonText={registerState.loading?<Loader/>:'Register'}/>
          <Link to='/login' className="p-2 flex justify-center">Already have an account? Login now!</Link>
        </form>
      </article>
    );
  }
  
  export default RegisterPage;