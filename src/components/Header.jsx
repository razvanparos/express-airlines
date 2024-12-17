import { Link } from "react-router-dom";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Header() {
  const {state} = useContext(AppContext)
  return (
    <header className="bg-darkBlue h-[60px] flex items-center px-4 justify-between text-white md:h-[100px] lg:px-[10%]">
      <div className="flex items-center gap-x-2 justify-center">
        <Link to="/"><h2 className="text-sm font-semibold md:text-2xl">Airline Express</h2></Link>
        <BiSolidPlaneAlt className="text-xl md:text-3xl" />
      </div>
      {/* <button onClick={()=>{console.log(state)}}>click</button> */}
      <div className="flex gap-x-2 md:gap-x-4">
        {state.userDetails[0]?<Link to='/user-dashboard'><FaUserCircle  className="text-2xl md:text-3xl"/></Link>:<Link to="/login" className=" bg-primaryBlue flex justify-center items-center rounded-xl p-2 px-2 text-sm md:text-xl md:px-4">Login</Link>}
        {state.userDetails[0]?'':<Link to="/register" className="flex justify-center items-center text-sm md:text-lg">Register</Link>}
      </div>
      
    </header>
  );
}

export default Header;
