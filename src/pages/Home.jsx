import { useAuth } from "../hooks/useAuth";


function Home() {
    const { state, dispatch} = useAuth();
    const { currentUser } = state;

    return (
      <div className="border-2 border-blue-800 flex flex-col justify-center">
        <p>Home page</p>
        <p>{currentUser?`Welcome ${currentUser.email}`:'Please login'}</p>
        <button onClick={()=>{console.log(currentUser)}}>Log currentUser</button>
      </div>
    );
  }
  
  export default Home;