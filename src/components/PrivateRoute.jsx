import { useContext, useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from './../context/AppContext';
import FallbackComponent from './fallbackComponent';

export default function PrivateRoute({ children, hasToBeAdmin }) {
  const timeoutRef = useRef(null);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const { state } = useContext(AppContext);
  const { userDetails } = state;

  useEffect(() => {
    if (userDetails?.[0]) {
      setIsUserDataLoaded(true);
      clearTimeout(timeoutRef.current);
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsUserDataLoaded(true);
      }, 3000);
    }
  }, [userDetails]);

  const isUserAuthenticated =
    (!hasToBeAdmin && userDetails?.[0]) ||
    (hasToBeAdmin && userDetails?.[0]?.isAdmin);


  return !isUserDataLoaded ? (
    <div className="flex justify-center items-center h-screen">
      <FallbackComponent />
    </div>
  ) : isUserAuthenticated ? (
    children
  ) : (
    <Navigate
      state={{ navigatedFromPrivateRoute: true, hasToBeAdmin }}
      to="/login"
    />
  );
}
