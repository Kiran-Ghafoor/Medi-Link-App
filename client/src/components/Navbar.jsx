import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, PlusCircle, Home, Menu, X } from 'lucide-react';
import logo from '../assets/Medi_Link_logo_img.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 border-b ${
      scrolled
        ? 'nav-glass-scrolled border-gray-200/50 shadow-soft'
        : 'bg-white/95 backdrop-blur-sm border-gray-100/80 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-14 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img src={logo} alt="Medi_Link Logo" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[1.15rem] font-black text-gray-900 tracking-tight">Medi_Link</span>
              <span className="text-[10px] font-semibold text-emerald-600 tracking-widest uppercase">Saves Lives</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>

            {user ? (
              <>
                {user.role === 'donor' && (
                  <NavLink to="/add-medicine" active={isActive('/add-medicine')}>Donate</NavLink>
                )}
                <NavLink to={`/${user.role}-dashboard`} active={isActive(`/${user.role}-dashboard`)}>
                  Dashboard
                </NavLink>
                <div className="w-px h-5 bg-gray-200/80 mx-2" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-50/80 px-2.5 py-[3px] rounded-full capitalize border border-emerald-100/80 shadow-sm">
                    {user.role}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-[0.75rem] font-bold text-gray-400 hover:text-red-500 hover:bg-red-50/80 px-2.5 py-[3px] rounded-full transition-all duration-200"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1.5 ml-2">
                <Link
                  to="/login"
                  className="text-[0.8rem] font-semibold text-gray-500 hover:text-emerald-600 px-3 py-1.5 rounded-lg hover:bg-emerald-50/80 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-[0.8rem] font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 rounded-lg shadow-sm hover:shadow-glow hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100/80 transition-colors duration-200"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-soft-lg animate-slide-down">
          <div className="px-3 py-3 space-y-1">
            <MobileNavLink to="/" active={isActive('/')}>Home</MobileNavLink>
            {user ? (
              <>
                {user.role === 'donor' && (
                  <MobileNavLink to="/add-medicine" active={isActive('/add-medicine')}>Donate Medicine</MobileNavLink>
                )}
                <MobileNavLink to={`/${user.role}-dashboard`} active={isActive(`/${user.role}-dashboard`)}>Dashboard</MobileNavLink>
                <div className="pt-2 border-t border-gray-100/80">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-red-500 font-semibold px-3 py-2 rounded-lg hover:bg-red-50/80 transition-colors duration-200 text-sm"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t border-gray-100/80 space-y-1">
                <MobileNavLink to="/login" active={isActive('/login')}>Login</MobileNavLink>
                <Link
                  to="/register"
                  className="block text-center text-white bg-gradient-to-r from-emerald-500 to-emerald-600 font-bold px-3 py-2 rounded-lg text-sm shadow-sm"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`text-[0.8rem] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-[1.03] ${
      active
        ? 'text-emerald-600 bg-emerald-50/80 shadow-sm shadow-emerald-100/50'
        : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50/80 hover:shadow-sm'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`block px-3 py-2 rounded-lg font-semibold transition-colors duration-200 text-[0.9rem] ${
      active ? 'text-emerald-600 bg-emerald-50/80' : 'text-gray-600 hover:bg-gray-50/80'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;
