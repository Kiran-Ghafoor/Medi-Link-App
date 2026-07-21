import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Plus, CheckCircle, Clock, Package, Award, ArrowUpRight, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyMeds = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const id = user?.id || user?._id || storedUser?.id;
        const res = await axios.get(`/api/medicine/my-donations/${id}`);
        setDonations(res.data);
      } catch (err) {
        console.error('Stats Fetch Error');
      } finally {
        setLoading(false);
      }
    };
    fetchMyMeds();
  }, [user]);

  const totalDonated = donations.length;
  const verifiedCount = donations.filter((m) => m.status === 'verified').length;
  const pendingCount = donations.filter((m) => m.status === 'pending').length;
  const points = verifiedCount * 50;

  const statCards = [
    { label: 'Total Donated', value: totalDonated, suffix: 'Items', icon: <Package size={20} />, gradient: 'from-emerald-500 to-emerald-600', textColor: 'text-white', subColor: 'text-emerald-100' },
    { label: 'Verified', value: verifiedCount, icon: <CheckCircle size={20} />, textColor: 'text-gray-800', subColor: 'text-gray-400', iconColor: 'text-emerald-500', border: true },
    { label: 'Pending', value: pendingCount, icon: <Clock size={20} />, textColor: 'text-gray-800', subColor: 'text-gray-400', iconColor: 'text-orange-500', border: true },
    { label: 'Points', value: points, icon: <Award size={20} />, textColor: 'text-gray-800', subColor: 'text-gray-400', iconColor: 'text-blue-500', border: true },
  ];

  const statusConfig = {
    verified: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Verified' },
    rejected: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500', label: 'Rejected' },
    pending: { bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500', label: 'Pending' },
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-[1.5rem] font-black text-gray-900 tracking-tight">My Donations</h1>
          <p className="text-gray-500 text-[0.9rem] mt-0.5">Track and manage your donations</p>
        </div>
        <Link
          to="/add-medicine"
          className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold shadow-glow hover:shadow-glow-lg hover:from-emerald-600 hover:to-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-[0.9rem]"
        >
          <Plus size={16} /> Donate
          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`${card.border ? 'bg-white/90 backdrop-blur-sm border border-gray-100/80 shadow-soft' : `bg-gradient-to-br ${card.gradient} shadow-glow`} p-4 rounded-2xl card-hover group relative overflow-hidden`}
          >
            {card.border && <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${card.gradient?.replace('from-', 'from-').replace('to-', 'to-')} rounded-full opacity-[0.06] group-hover:opacity-[0.1] -translate-y-1/2 translate-x-1/2 transition-opacity`} />}
            <div className={`${card.textColor} opacity-70 mb-2`}>{card.icon}</div>
            <p className={`${card.subColor} text-[9px] font-bold uppercase tracking-widest`}>{card.label}</p>
            <h3 className={`text-xl font-black ${card.textColor} mt-0.5`}>
              {card.value}
              {card.suffix && <span className="text-[10px] font-semibold ml-1 opacity-70">{card.suffix}</span>}
            </h3>
          </div>
        ))}
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100/80 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100/80 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-[0.9rem]">Recent Donations</h3>
          <span className="text-[10px] font-semibold text-gray-400 bg-gray-100/80 px-2 py-0.5 rounded-full">{totalDonated} total</span>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          </div>
        ) : donations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-5 py-2.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Medicine</th>
                  <th className="px-5 py-2.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Qty</th>
                  <th className="px-5 py-2.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-5 py-2.5 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/80">
                {donations.map((med) => {
                  const s = statusConfig[med.status] || statusConfig.pending;
                  return (
                    <tr key={med._id} className="hover:bg-gray-50/50 transition-colors duration-200">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-emerald-50/80 rounded-lg flex items-center justify-center">
                            <Pill size={14} className="text-emerald-600" />
                          </div>
                          <span className="font-bold text-gray-800 text-sm capitalize">{med.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-600 text-sm">{med.quantity}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${s.bg} ${s.text}`}>
                          <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-400 text-xs">
                        {new Date(med.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-100/80 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Package size={20} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-semibold text-[0.9rem]">No donations yet</p>
            <Link to="/add-medicine" className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-700">
              <Plus size={14} /> Donate Medicine
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
