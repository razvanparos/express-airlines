import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, Suspense } from 'react';
import './index.css';
import './output.css';
import reportWebVitals from './reportWebVitals';
import { auth } from "./firebase-config";
import { getUserDetails } from "./services/loginService";
import FallbackComponent from "./components/fallbackComponent";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const Home = React.lazy(() => import("./pages/Home"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const Layout = React.lazy(() => import("./pages/Layout"));
const NoPage = React.lazy(() => import("./pages/NoPage"));
const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
const ExploreResults = React.lazy(() => import("./pages/ExploreResults"));
const FlightDetails = React.lazy(() => import("./pages/FlightDetails"));
const FlightSummary = React.lazy(() => import("./pages/FlightSummary"));

export default function App() {
  const [userData, setUserData]=useState('');
  const [userDetails, setUserDetails]=useState('');
  const [departureFlights, setDepartureFlights]=useState('');
  const [returnFlights, setReturnFlights]=useState('');
  const [adultsNumber, setAdultsNumber]=useState(1);
  const [departureAirport, setDepartureAirport]=useState('');
  const [destinationAirport, setDestinationAirport]=useState('');
  const [departureDate, setDepartureDate]=useState('');
  const [returnDate, setReturnDate]=useState('');

  const getUserDataFromLogin=(data,details)=>{
    setUserData(data)
    setUserDetails(details)
  }

  const removeUserData=()=>{
    setUserData('')
    setUserDetails('')
  }

  const fetchUserData=async()=>{
    auth.onAuthStateChanged(async(user)=>{
    setUserData(user)
    setUserDetails(await getUserDetails())
    })
  }
  const fetchFlights=(dep,ret,nr,depAir,destAir,start,end)=>{
     setDepartureFlights(dep)
     setReturnFlights(ret)
     setAdultsNumber(nr)
     setDepartureAirport(depAir)
     setDestinationAirport(destAir)
     setDepartureDate(start)
     setReturnDate(end)
  }
 
  useEffect(()=>{
    if(sessionStorage.getItem('currentUser')){
      fetchUserData();
    }
    if(localStorage.getItem('currentUser')){
      sessionStorage.setItem('currentUser', localStorage.getItem('currentUser'))
      fetchUserData();
    }

  },[])

  return (
      <BrowserRouter>
        <Suspense fallback={<FallbackComponent/>}>
          <Routes>
            <Route path="/" element={<Layout userData={userData} userDetails={userDetails[0]} removeUserData={removeUserData}/>}>
              <Route index element={<Home fetchFlights={fetchFlights}/>} />
              <Route path="login" element={<LoginPage getUserDataFromLogin={getUserDataFromLogin}/>} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="explore-results" element={<ExploreResults returnDate={returnDate} departureDate={departureDate} destinationAirport={destinationAirport} departureAirport={departureAirport} adultsNumber={adultsNumber} departureFlights={departureFlights} returnFlights={returnFlights}/>} />
              <Route path="user-dashboard" element={<UserDashboard removeUserData={removeUserData} fetchUserData={fetchUserData} userData={userData} userDetails={userDetails[0]}/>} />
              <Route path="flight-details" element={<FlightDetails/>} />
              <Route path="flight-summary" element={<FlightSummary fetchUserData={fetchUserData}/>} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
