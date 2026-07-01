import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Search, Pill, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const RecipientDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search State
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchVerified = async () => {
      const res = await axios.get('http://localhost:5000/api/medicine/verified');
      setMedicines(res.data);
    };
    fetchVerified();
  }, []);

  // HCI Rule: Recognition over Recall (Filtering data)
  const filteredMeds = medicines.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequest = async (medId) => {
    try {
      // HCI Rule: Feedback (User ko foran batana ke request chali gayi)
      toast.success("Request sent to Donor!");
      // Yahan aap backend par /api/requests/create ki API call kar sakte hain baad mein
    } catch (err) {
      toast.error("Request failed");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="bg-emerald-600 p-10 rounded-[40px] text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Search Medicine</h2>
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-4 text-emerald-600" />
          <input 
            type="text" 
            placeholder="Search medicine name..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-black outline-none shadow-inner"
            onChange={(e) => setSearchTerm(e.target.value)} // Search filter
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredMeds.map(med => (
          <div key={med._id} className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm hover:scale-[1.02] transition-all">
            <div className="flex justify-between mb-4">
              <Pill className="text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Verified</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 capitalize">{med.name}</h3>
            <p className="text-sm text-gray-400">Qty: {med.quantity} | Exp: {new Date(med.expiry).toLocaleDateString()}</p>
            
            <button 
              onClick={() => handleRequest(med._id)}
              className="w-full mt-6 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
            >
              Request Medicine
            </button>
          </div>
        ))}
      </div>
      {filteredMeds.length === 0 && <p className="text-center text-gray-400">No matching medicines found.</p>}
    </div>
  );
};
export default RecipientDashboard;