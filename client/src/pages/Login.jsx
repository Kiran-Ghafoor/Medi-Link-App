import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.user);
      toast.success('Welcome back!');
      const role = res.data.user.role;
      if (role === 'donor') navigate('/donor-dashboard');
      else if (role === 'recipient') navigate('/recipient-dashboard');
      else if (role === 'pharmacist') navigate('/pharmacist-dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login Failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 hero-mesh -z-10 rounded-3xl" />
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white shadow-glow">
              <LogIn size={26} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse-slow" />
          </div>
          <h2 className="text-[1.5rem] font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 text-[0.9rem] mt-1">Log in to manage your donations</p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-soft-lg border border-gray-100/80">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-glow hover:shadow-glow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-[0.9rem] active:scale-[0.98]"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-100/80 text-center">
            <p className="text-[0.8rem] text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
