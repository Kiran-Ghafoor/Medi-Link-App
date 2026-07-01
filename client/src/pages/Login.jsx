import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Attempt with:", { email, password }); // Console mein check karne ke liye

    try {
      // 1. Backend ko request bhejna
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      console.log("Server Response:", res.data);

      // 2. Context aur LocalStorage update karna
      login(res.data.user); 
      
      toast.success("Welcome back! Login Successful.");

      // 3. Role ke mutabiq sahi dashboard par bhejna
      const role = res.data.user.role;
      if (role === 'donor') navigate('/donor-dashboard');
      else if (role === 'recipient') navigate('/recipient-dashboard');
      else if (role === 'pharmacist') navigate('/pharmacist-dashboard');

    } catch (err) {
      console.error("Login Error Details:", err.response?.data);
      // Agar password galat ho ya user na mile to backend wala error dikhana
      toast.error(err.response?.data?.message || "Login Failed! Please check credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50">
      <div className="text-center mb-8">
        <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <LogIn size={32} />
        </div>
        <h2 className="text-3xl font-black text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mt-2">Log in to manage your donations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-emerald-500 transition-all" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-emerald-500 transition-all" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit" className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:scale-[1.02] transition-all">
          Sign In
        </button>
      </form>

      <p className="mt-8 text-center text-gray-500">
        Don't have an account? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login;