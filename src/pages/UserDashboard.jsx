import { useNavigate } from "react-router-dom";
import { logoutUser } from '../services/authService'
import { useContext, useEffect } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail, MdLogout } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import authActions from "../context/actions/auth-actions";
import InfoRow from "../components/InfoRow";
import ButtonComponent from "./../components/ButtonComponent";
import UserDashboardPaymentMethodsSection from './../components/UserDashboardPaymentMethodsSection';
import UserDashboardBookingsSection from '../components/UserDashboardBookingsSection';

function UserDashboard() {
    const navigate = useNavigate();
    const { state } = useContext(AppContext)
    const { userDetails } = state;

    useEffect(() => {
      if (!sessionStorage.getItem('currentUser')) {
          navigate('/');
      }
    }, [navigate]);

    const handleLogOut = async () => {
      await logoutUser(navigate);
      authActions.setUserData({
        userDetails: {}
      })
    }

    const profileName = userDetails[0]?.fullName || 'Welcome back';

    return (
      <article className="min-h-screen bg-slate-100 text-slate-800 select-none">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
          <header className="mb-6 overflow-hidden rounded-[28px] bg-gradient-to-r from-primaryBlue to-sky-600 text-white shadow-xl shadow-blue-200/60">
            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-2xl shadow-inner shadow-white/20">
                  <FaUser />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-blue-100">
                    User dashboard
                  </p>
                  <h1 className="mt-1 text-2xl font-bold md:text-3xl">{profileName}</h1>
                </div>
              </div>

              <ButtonComponent
                buttonFunction={handleLogOut}
                buttonText={
                  <span className="flex items-center gap-2">
                    <MdLogout />
                    Sign out
                  </span>
                }
                buttonType={'primary'}
                buttonSize={'sm'}
              />
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1fr_2.1fr]">
            <aside className="rounded-[28px] bg-white p-5 shadow-md shadow-slate-200/70 ring-1 ring-slate-200 h-fit">
              <h2 className="mb-4 text-lg font-semibold text-slate-800">Profile details</h2>
              <div className="space-y-3">
                <InfoRow text={userDetails[0]?.fullName} icon={<FaUser />} />
                <InfoRow text={userDetails[0]?.email} icon={<MdEmail />} />
                <InfoRow text={userDetails[0]?.phone} icon={<FaPhone />} />
              </div>
            </aside>

            <div className="space-y-6">
              <UserDashboardBookingsSection userDetails={userDetails} />
              <UserDashboardPaymentMethodsSection userDetails={userDetails} />
            </div>
          </div>
        </div>
      </article>
    );
}

export default UserDashboard;
