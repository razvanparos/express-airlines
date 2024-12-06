import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { getUserDetails } from "../services/authService";
import authActions from "../context/actions/auth-actions";

function Layout() {
  const { userDetails } = useContext(AppContext);
  const navigate = useNavigate();

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

  useEffect(() => {initApp()}, []);

  useEffect(() => {
    if (userDetails?.isAdmin && sessionStorage.getItem("currentUser")) {
      navigate("/admin-dashboard");
    }
  }, [userDetails, navigate]);

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
