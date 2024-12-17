import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserDetails } from "../services/authService";
import authActions from "../context/actions/auth-actions";

function Layout() {
  const initApp = async()=>{
    if (sessionStorage.getItem("currentUser")) {
      let response = await getUserDetails("UsersDetails")
      authActions.setUserData({
        userDetails: response,
      })
    }

    if (localStorage.getItem("currentUser")) {
      sessionStorage.setItem("currentUser", localStorage.getItem("currentUser"));
      let response = await getUserDetails("UsersDetails")
      authActions.setUserData({
         userDetails: response
      })}}

  useEffect(() => {
    initApp()
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
