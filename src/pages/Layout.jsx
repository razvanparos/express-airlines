import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";

function Layout() {
  const { userDetails } = useContext(AppContext);
  const navigate = useNavigate();

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
