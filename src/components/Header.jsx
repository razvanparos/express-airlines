import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { state } = useAuth();
  const { currentUser } = state;
  return (
    <header className="bg-gray-400 h-[50px] flex items-center px-2 justify-between">
      <Link to="/"><h2 className="text-lg font-semibold">Airline Express</h2></Link>
      {currentUser===null?<Link to="/login">Login</Link>:<Link to='/user-dashboard'>Account</Link>}
    </header>
  );
}

export default Header;
