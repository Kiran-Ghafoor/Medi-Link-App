import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, UserCircle, Eye, EyeOff } from 'lucide-react';

const roles = [
  { value: 'donor', label: 'Donor', desc: 'Donate unused medicines' },
  { value: 'recipient', label: 'Recipient', desc: 'Find needed medicines' },
  { value: 'pharmacist', label: 'Pharmacist', desc: 'Verify medicine quality' },
];

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'donor' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error('Please enter a valid email');
    if (formData.password.length < 6) return toast.error('Password min 6 characters');
    if (formData.password.length > 20) return toast.error('Password max 20 characters');

    setLoading(true);
    try {
      await axios.post('/api/auth/register', formData);
      toast.success('Account Created! Now Login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration Failed');
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
              <UserPlus size={26} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse-slow" />
          </div>
          <h2 className="text-[1.5rem] font-black text-gray-900 tracking-tight">Join Medi_Link</h2>
          <p className="text-gray-500 text-[0.9rem] mt-1">Start your journey of saving lives</p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-soft-lg border border-gray-100/80">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative mt-1">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Ahsan Arif"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                  required
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                  required
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1 block mb-1.5">Register as</label>
              <div className="grid grid-cols-3 gap-1.5">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role.value })}
                    className={`p-2 rounded-xl border-2 text-center transition-all duration-200 ${
                      formData.role === role.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/50'
                        : 'border-gray-200/80 hover:border-gray-300 text-gray-600 hover:bg-gray-50/50'
                    }`}
                  >
                    <p className="text-[10px] font-bold">{role.label}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{role.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-glow hover:shadow-glow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-[0.9rem] mt-1 active:scale-[0.98]"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-100/80 text-center">
            <p className="text-[0.8rem] text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
