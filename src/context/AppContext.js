import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { getUserDetails } from "../services/loginService";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [departureFlights, setDepartureFlights] = useState('');
  const [returnFlights, setReturnFlights] = useState('');
  const [adultsNumber, setAdultsNumber] = useState(1);
  const [departureAirport, setDepartureAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const getUserDataFromLogin = (data, details) => {
    setUserData(data);
    setUserDetails(details);
  };

  const removeUserData = () => {
    setUserData('');
    setUserDetails('');
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      setUserData(user);
      setUserDetails(await getUserDetails());
    });
  };

  const fetchFlights = (dep, ret, nr, depAir, destAir, start, end) => {
    setDepartureFlights(dep);
    setReturnFlights(ret);
    setAdultsNumber(nr);
    setDepartureAirport(depAir);
    setDestinationAirport(destAir);
    setDepartureDate(start);
    setReturnDate(end);
  };

  useEffect(() => {
    if (sessionStorage.getItem("currentUser")) {
      fetchUserData();
    }
    if (localStorage.getItem("currentUser")) {
      sessionStorage.setItem("currentUser", localStorage.getItem("currentUser"));
      fetchUserData();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        userData,
        userDetails,
        departureFlights,
        returnFlights,
        adultsNumber,
        departureAirport,
        destinationAirport,
        departureDate,
        returnDate,
        getUserDataFromLogin,
        removeUserData,
        fetchUserData,
        fetchFlights,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
