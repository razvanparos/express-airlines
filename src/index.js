import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';
import './index.css';
import './output.css';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from "./context/AppContext";
import FallbackComponent from "./components/fallbackComponent";
import AdminDashboard from "./pages/AdminDashboard";

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
  
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<FallbackComponent />}>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="explore-results" element={<ExploreResults />} />
            <Route path="user-dashboard" element={<UserDashboard />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="flight-details" element={<FlightDetails />} />
            <Route path="flight-summary" element={<FlightSummary />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </AppProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
