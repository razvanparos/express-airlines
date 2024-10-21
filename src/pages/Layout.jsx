import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDashboard from "./AdminDashboard";

function Layout(props) {
    return (
      <div className="">
        <Header userData={props.userData}/>
        {props.userDetails?.isAdmin&&sessionStorage.getItem('currentUser')
        ?
        <AdminDashboard removeUserData={props.removeUserData}/>
        :
        <main>
          <Outlet/>
        </main>}
        <Footer/>
      </div>
    );
  }
  
  export default Layout;