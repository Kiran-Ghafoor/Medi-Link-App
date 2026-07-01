import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, UserCircle, ChevronDown } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'donor' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // --- Validation Logic ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    // Password Limit: 6 to 20 characters
    if (formData.password.length < 4) {
      return toast.error("Password is too short! (Min 6 characters)");
    }
    if (formData.password.length > 20) {
      return toast.error("Password is too long! (Max 20 characters)");
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success("Account Created! Now Login.");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <UserPlus size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-800">Join MedRelief</h2>
        <p className="text-gray-500 mt-2">Start your journey of saving lives</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <div className="relative">
          <UserCircle className="absolute left-4 top-4 text-gray-400" size={20} />
          <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-emerald-500 transition-all" required 
            onChange={(e)=>setFormData({...formData, name: e.target.value})} />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
          <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-emerald-500 transition-all" required 
            onChange={(e)=>setFormData({...formData, email: e.target.value})} />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
          <input type="password" placeholder="Password (4-20 chars)" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-emerald-500 transition-all" required 
            onChange={(e)=>setFormData({...formData, password: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 ml-1">Register as:</label>
          <div className="relative">
            <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-emerald-500 font-medium text-gray-700 appearance-none cursor-pointer" 
              onChange={(e)=>setFormData({...formData, role: e.target.value})}>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
            {/* Dropdown Arrow Icon */}
            <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        <button className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all pt-4">
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-gray-500 text-sm">
        Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;