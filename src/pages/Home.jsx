import { useAuth } from "../hooks/useAuth";
import {logoutUser} from '../services/loginService'


function Home() {
    const { state } = useAuth();
    const { currentUser } = state;
    const { dispatch } = useAuth();

    const handleLogOut=async()=>{
      await logoutUser(dispatch);
    }

    return (
      <div className="border-2 border-blue-800 flex flex-col justify-center">
        <p>Home page</p>
        <p>{currentUser?`Welcome ${currentUser.email}`:'Please login'}</p>
        <button onClick={()=>{console.log(currentUser)}}>Log currentUser</button>
        {currentUser?<button onClick={handleLogOut}>Sign out</button>:''}
      </div>
    );
  }
  
  export default Home;