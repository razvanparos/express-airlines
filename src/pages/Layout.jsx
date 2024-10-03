import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
    return (
      <div className="">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    );
  }
  
  export default Layout;