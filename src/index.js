import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './index.css';
import './output.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
