import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import KYC from './pages/KYC';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
          <Route path={ROUTES.USER.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.KYC.UPLOAD} element={<KYC />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
}

export default App;