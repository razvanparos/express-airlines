import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
function LoginPage() {
  return (
    <div className="flex flex-col py-4 px-2 items-center">
      <p className="font-bold">Login page</p>
      <form action="" className="flex flex-col py-4 gap-y-2 w-full max-w-[500px]">
        <label htmlFor="">Email</label>
        <input type="text" className="border-2"/>
        <label htmlFor="">Password</label>
        <input className="border-2" type="password" />
        <button className="py-3 bg-blue-500">Login</button>
        <Link to='/register' className="border-2 p-2 flex justify-center">Don't have an account? Register now!</Link>
      </form>
      
    </div>
  );
}

export default LoginPage;