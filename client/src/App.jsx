import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
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
      <Toaster position="top-center" />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/recipient-dashboard" element={<RecipientDashboard />} />
          <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;