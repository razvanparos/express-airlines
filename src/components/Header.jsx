import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="bg-gray-400 h-[50px] flex items-center px-2 justify-between">
      <Link to="/"><h2 className="text-lg font-semibold">Airline Express</h2></Link>
      <Link to="/login">Login</Link>
    </header>
  );
}

export default Header;
