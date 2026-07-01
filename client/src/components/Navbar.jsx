import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, PlusCircle, Pill, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? "text-emerald-600 font-bold" : "text-gray-600";

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 p-4 border-b border-emerald-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-emerald-600 flex items-center gap-2 tracking-tight">
          <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg shadow-emerald-200">
            <Pill size={24} />
          </div>
          MedRelief
        </Link>
        
        <div className="flex gap-8 items-center font-medium">
          <Link to="/" className={`flex items-center gap-1 hover:text-emerald-600 transition ${isActive('/')}`}>
            <Home size={18}/> Home
          </Link>

          {user ? (
            <>
              {user.role === 'donor' && (
                <Link to="/add-medicine" className={`flex items-center gap-1 hover:text-emerald-600 transition ${isActive('/add-medicine')}`}>
                  <PlusCircle size={18}/> Donate
                </Link>
              )}
              <Link to={`/${user.role}-dashboard`} className={`flex items-center gap-1 hover:text-emerald-600 transition ${isActive(`/${user.role}-dashboard`)}`}>
                <LayoutDashboard size={18}/> Dashboard
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition">
                <LogOut size={18}/> Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-emerald-600">Login</Link>
              <Link to="/register" className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;