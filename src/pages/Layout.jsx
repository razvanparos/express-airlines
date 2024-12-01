import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { getUserDetails } from "../services/authService";

function Layout() {
  const { userDetails,dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const initApp = async()=>{
    if (sessionStorage.getItem("currentUser")) {
      let response = await getUserDetails("UsersDetails")
      dispatch({
          type: "SET_USER_DATA",
          payload: {
              userDetails: response,
          },});
    }
    if (localStorage.getItem("currentUser")) {
      sessionStorage.setItem("currentUser", localStorage.getItem("currentUser"));
      let response = await getUserDetails("UsersDetails")
      dispatch({
          type: "SET_USER_DATA",
          payload: {
              userDetails: response,
          },});
    }
  }

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
