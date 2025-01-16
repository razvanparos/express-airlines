import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/AppContext';
import AdminDashboard from './pages/AdminDashboard';
import FallbackComponent from './components/fallbackComponent';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import './output.css';
import Notification from './components/Notification';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const Home = React.lazy(() => import('./pages/Home'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const Layout = React.lazy(() => import('./pages/Layout'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const UserDashboard = React.lazy(() => import('./pages/UserDashboard'));
const ExploreResults = React.lazy(() => import('./pages/ExploreResults'));
const FlightDetails = React.lazy(() => import('./pages/FlightDetails'));
const FlightSummary = React.lazy(() => import('./pages/FlightSummary'));

export default function App() {
  return (
    <AppProvider>
      <Notification />
      <BrowserRouter>
        <Suspense fallback={<FallbackComponent />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="explore-results" element={<ExploreResults />} />
              <Route
                path="user-dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="admin-dashboard"
                element={
                  <PrivateRoute hasToBeAdmin={true}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="flight-details" element={<FlightDetails />} />
              <Route path="flight-summary" element={<FlightSummary />} />
              <Route path="*" element={<NotFoundPage />} />
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
