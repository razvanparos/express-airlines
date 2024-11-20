import { Link } from "react-router-dom";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


function Header() {
  const {userData} = useContext(AppContext)
  return (
    <header className="bg-darkBlue h-[60px] flex items-center px-4 justify-between text-white md:h-[100px] lg:px-[10%]">
      <div className="flex items-center gap-x-2">
        <Link to="/"><h2 className="text-lg font-semibold md:text-2xl">Airline Express</h2></Link>
        <BiSolidPlaneAlt className="text-xl md:text-3xl" />
      </div>
      {userData?<Link to='/user-dashboard'><FaUserCircle  className="text-2xl md:text-3xl"/></Link>:<Link to="/login" className=" bg-primaryBlue rounded-xl p-2 px-4 md:text-xl">Login</Link>}
    </header>
  );
}

export default Header;
