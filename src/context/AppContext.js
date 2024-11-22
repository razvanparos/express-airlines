import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { getUserDetails } from "../services/authService";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState('');
  const [departureFlights, setDepartureFlights] = useState('');
  const [returnFlights, setReturnFlights] = useState('');
  const [adultsNumber, setAdultsNumber] = useState(1);
  const [departureAirport, setDepartureAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const getUserDataFromLogin = (details) => {
    setUserDetails(details);
  };

  const removeUserData = () => {
    setUserDetails('');
  };

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let response = await getUserDetails("UsersDetails")
        console.log(response)
        setUserDetails(await getUserDetails("UsersDetails"));
      } else {
        removeUserData();
      }
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
