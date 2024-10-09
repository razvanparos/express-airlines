import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './index.css';
import './output.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import UserDashboard from "./pages/UserDashboard";
import { auth } from "./firebase-config";
import ExploreResults from "./pages/ExploreResults";


export default function App() {
  const [userData, setUserData]=useState('');
  const [exploreResults, setExploreResults]=useState('');
 
  const getUserDataFromLogin=(data)=>{
    console.log(data)
    setUserData(data)
  }

  const fetchUserData=async()=>{
    auth.onAuthStateChanged(async(user)=>{
    setUserData(user)
    })
  }
  const fetchFlights=(data)=>{
     setExploreResults(data);
  }

  useEffect(()=>{
    let storedUser=localStorage.getItem('currentUser')
    if(storedUser){
      fetchUserData();
    }
  },[])

  useEffect(()=>{
    setExploreResults(exploreResults)
    
  },[exploreResults])

  return (
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout userData={userData}/>}>
            <Route index element={<Home fetchFlights={fetchFlights}/>} />
            <Route path="login" element={<LoginPage getUserDataFromLogin={getUserDataFromLogin}/>} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="explore-results" element={<ExploreResults exploreResults={exploreResults}/>} />
            <Route path="user-dashboard" element={<UserDashboard userData={userData}/>} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
