import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout(props) {
    return (
      <div className="">
        <Header userData={props.userData}/>
        <Outlet/>
        <Footer/>
      </div>
    );
  }
  
  export default Layout;