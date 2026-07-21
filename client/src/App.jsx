import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import logo from './assets/Medi_Link_logo_img.png';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/DonorDashboard';
import RecipientDashboard from './pages/RecipientDashboard';
import PharmacistDashboard from './pages/PharmacistDashboard';
import AddMedicine from './pages/AddMedicine';

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            padding: '10px 14px',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: { primary: '#059669', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
          <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
        </Routes>
      </main>
      <footer className="footer-gradient-top mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Medi_Link Logo" className="h-8 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="text-[0.9rem] font-bold text-gray-800">Medi_Link</span>
              <span className="text-[9px] font-semibold text-emerald-600 tracking-widest uppercase">Saves Lives</span>
            </div>
          </div>
          <p className="text-[0.8rem] text-gray-400">Making healthcare accessible, one donation at a time.</p>
          <p className="text-[11px] text-gray-300">&copy; 2026 Medi_Link. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
