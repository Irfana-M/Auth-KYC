import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <h1 className="text-3xl font-bold text-blue-600">AuthKYC</h1>
          <div className="flex gap-8 text-sm font-medium text-gray-700">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate('/kyc')} 
              className="hover:text-blue-600 transition-colors"
            >
              KYC Verification
            </button>
          </div>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;