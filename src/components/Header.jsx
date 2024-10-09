import { Link } from "react-router-dom";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

function Header(props) {
  return (
    <header className="bg-darkBlue h-[60px] flex items-center px-4 justify-between text-white">
      <div className="flex items-center gap-x-2">
        <Link to="/"><h2 className="text-lg font-semibold">Airline Express</h2></Link>
        <BiSolidPlaneAlt className="text-xl" />
      </div>
      {/* <button onClick={()=>{console.log(props.userData)}}>click</button> */}
      {props.userData?<Link to='/user-dashboard'><FaUserCircle  className="text-2xl"/></Link>:<Link to="/login" className="p-1 ">Login</Link>}
    </header>
  );
}

export default Header;
