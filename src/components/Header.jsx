import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const { state } = useAuth();
  const { currentUser } = state;
  return (
    <header className="bg-blue-300 h-[50px] flex items-center px-2 justify-between">
      <div className="flex items-center gap-x-2">
        <Link to="/"><h2 className="text-lg font-semibold">Airline Express</h2></Link>
        <BiSolidPlaneAlt className="text-xl" />
      </div>
      
      {currentUser===null?<Link to="/login" className="bg-yellow-300 p-1">Login</Link>:<Link to='/user-dashboard'><FaUserCircle  className="text-3xl text-yellow-300"/></Link>}
    </header>
  );
}

export default Header;
