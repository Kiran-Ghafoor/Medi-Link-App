import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Plus, CheckCircle, Clock, Package, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  // Pehle wale useEffect mein console check karein
useEffect(() => {
  const fetchMyMeds = async () => {
    try {
      // LocalStorage se ID check karein agar context mein late ho raha ho
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const id = user?.id || user?._id || storedUser?.id;
      
      const res = await axios.get(`http://localhost:5000/api/medicine/my-donations/${id}`);
      setDonations(res.data);
    } catch (err) {
      console.error("Stats Fetch Error");
    }
  };
  fetchMyMeds();
}, [user]);

  // Real Stats Calculation
  const totalDonated = donations.length;
  const verifiedCount = donations.filter(m => m.status === 'verified').length;
  const points = verifiedCount * 50; // Har verified medicine par 50 points

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Real Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl">
          <Package className="mb-4 opacity-80" size={32} />
          <p className="text-emerald-100 uppercase text-xs font-bold tracking-widest">Total Donated</p>
          <h3 className="text-3xl font-bold">{totalDonated} Items</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <CheckCircle className="text-emerald-500 mb-4" size={32} />
          <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">Verified</p>
          <h3 className="text-3xl font-bold text-gray-800">{verifiedCount}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <Award className="text-blue-500 mb-4" size={32} />
          <p className="text-gray-400 uppercase text-xs font-bold tracking-widest">Points Earned</p>
          <h3 className="text-3xl font-bold text-gray-800">{points}</h3>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Recent Donations</h2>
        <Link to="/add-medicine" className="bg-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
          <Plus size={20}/> Donate Medicine
        </Link>
      </div>

      {/* Real Data Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Medicine</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Quantity</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {donations.map((med) => (
              <tr key={med._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-6 font-bold text-gray-700">{med.name}</td>
                <td className="p-6 text-gray-600">{med.quantity} Units</td>
                <td className="p-6">
                  {med.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase">
                      <CheckCircle size={12}/> Verified
                    </span>
                  ) : med.status === 'rejected' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase">
                       Rejected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-black uppercase">
                      <Clock size={12}/> Pending
                    </span>
                  )}
                </td>
                <td className="p-6 text-gray-400 text-sm">{new Date(med.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && <p className="text-center py-10 text-gray-400">No donations yet.</p>}
      </div>
    </div>
  );
};
export default DonorDashboard;