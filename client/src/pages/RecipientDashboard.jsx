import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Pill, Package, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const RecipientDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerified = async () => {
      try {
        const res = await axios.get('/api/medicine/verified');
        setMedicines(res.data);
      } catch (err) {
        console.error('Failed to fetch medicines');
      } finally {
        setLoading(false);
      }
    };
    fetchVerified();
  }, []);

  const filteredMeds = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequest = (med) => {
    toast.success(`Request sent for "${med.name}"!`);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Search Header */}
      <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-6 rounded-2xl text-white shadow-glow overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[50px] orb-1" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300/20 rounded-full blur-[40px] orb-2" />
        <div className="relative">
          <div className="flex items-center gap-1.5 mb-1">
            <Package size={16} className="text-emerald-100" />
            <span className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest">Available Medicines</span>
          </div>
          <h2 className="text-[1.5rem] font-black mb-4">Find Verified Medicine</h2>
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by medicine name..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 outline-none bg-white/95 backdrop-blur-sm shadow-soft text-sm focus:ring-2 focus:ring-white/30 transition-all duration-300"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>
          <p className="text-emerald-100/80 text-xs mt-2">
            {filteredMeds.length} medicine{filteredMeds.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        </div>
      ) : filteredMeds.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeds.map((med) => (
            <div key={med._id} className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-100/80 card-hover group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500 to-transparent rounded-full opacity-[0.03] group-hover:opacity-[0.06] -translate-y-1/2 translate-x-1/2 transition-opacity" />
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-50/80 rounded-xl flex items-center justify-center group-hover:bg-emerald-100/80 group-hover:scale-110 transition-all duration-300">
                  <Pill size={18} className="text-emerald-600" />
                </div>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50/80 text-emerald-700 text-[9px] font-bold uppercase">
                  <CheckCircle size={8} /> Verified
                </span>
              </div>
              <h3 className="text-[1.05rem] font-bold text-gray-800 capitalize mb-1.5">{med.name}</h3>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-4">
                <span className="flex items-center gap-1 bg-gray-50/80 px-2 py-1 rounded-md">
                  <Package size={10} /> Qty: {med.quantity}
                </span>
                <span className="flex items-center gap-1 bg-gray-50/80 px-2 py-1 rounded-md">
                  <Clock size={10} /> Exp: {new Date(med.expiry).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleRequest(med)}
                className="w-full bg-gray-900 text-white py-2.5 rounded-xl font-bold text-[0.8rem] hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 shadow-soft hover:shadow-glow"
              >
                Request Medicine
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/80">
          <div className="w-12 h-12 bg-gray-100/80 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Search size={20} className="text-gray-300" />
          </div>
          <p className="text-gray-400 font-semibold text-sm">
            {searchTerm ? 'No medicines match your search' : 'No verified medicines available yet'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipientDashboard;
