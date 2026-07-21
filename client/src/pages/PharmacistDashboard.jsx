import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Eye, AlertTriangle, Package, Clock, User } from 'lucide-react';
import toast from 'react-hot-toast';

const PharmacistDashboard = () => {
  const [pendingMeds, setPendingMeds] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await axios.get('/api/medicine/pending');
      setPendingMeds(res.data);
    } catch (err) {
      console.error('Fetch Error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, status) => {
    setActionLoading(id);
    try {
      await axios.put(`/api/medicine/${id}/verify`, { status });
      toast.success(`Medicine ${status === 'verified' ? 'Approved' : 'Rejected'}!`);
      fetchPending();
    } catch (err) {
      toast.error('Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-[1.5rem] font-black text-gray-900 tracking-tight">Pending Verifications</h1>
          <p className="text-gray-500 text-[0.9rem] mt-0.5">Review and verify donated medicines</p>
        </div>
        {pendingMeds.length > 0 && (
          <span className="inline-flex items-center gap-1.5 bg-orange-50/80 text-orange-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-orange-100/80">
            <AlertTriangle size={14} />
            {pendingMeds.length} pending
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-6 h-6 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        </div>
      ) : pendingMeds.map((med) => (
        <div
          key={med._id}
          className="bg-white/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-soft border border-gray-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-hover group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-start gap-4 flex-1">
            <div
              className="relative shrink-0 cursor-pointer group/img"
              onClick={() => setSelectedImg(med.imageUrl)}
            >
              <img
                src={med.imageUrl}
                alt="medicine-proof"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-100/80 shadow-soft group-hover/img:shadow-glow transition-shadow duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23f1f5f9" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="14">No Img</text></svg>';
                }}
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                <Eye size={16} className="text-white" />
              </div>
            </div>

            <div className="space-y-1.5 min-w-0">
              <h3 className="font-black text-lg text-gray-800 capitalize">{med.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <User size={12} className="text-gray-400" />
                <span>by <span className="font-bold text-emerald-600">{med.donor?.name || 'Unknown'}</span></span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-red-50/80 text-red-500 px-2 py-0.5 rounded-md uppercase">
                  <Clock size={8} /> Exp: {new Date(med.expiry).toLocaleDateString()}
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-blue-50/80 text-blue-500 px-2 py-0.5 rounded-md uppercase">
                  <Package size={8} /> Qty: {med.quantity}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => handleVerify(med._id, 'verified')}
              disabled={actionLoading === med._id}
              className="w-10 h-10 bg-emerald-50/80 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:shadow-glow transition-all duration-300 shadow-sm disabled:opacity-50 active:scale-95"
              title="Approve"
            >
              {actionLoading === med._id ? (
                <div className="w-3.5 h-3.5 border-2 border-emerald-300 border-t-emerald-600 rounded-full animate-spin" />
              ) : (
                <Check size={18} strokeWidth={3} />
              )}
            </button>
            <button
              onClick={() => handleVerify(med._id, 'rejected')}
              disabled={actionLoading === med._id}
              className="w-10 h-10 bg-red-50/80 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white hover:shadow-lg transition-all duration-300 shadow-sm disabled:opacity-50 active:scale-95"
              title="Reject"
            >
              {actionLoading === med._id ? (
                <div className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
              ) : (
                <X size={18} strokeWidth={3} />
              )}
            </button>
          </div>
        </div>
      ))}

      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={20} />
          </button>
          <img
            src={selectedImg}
            className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl animate-scale-in border border-white/10"
            alt="Full Preview"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-5 text-white/50 font-medium text-xs">Click anywhere to close</p>
        </div>
      )}

      {!loading && pendingMeds.length === 0 && (
        <div className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/80">
          <div className="w-12 h-12 bg-emerald-50/80 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Check size={20} className="text-emerald-500" />
          </div>
          <p className="text-gray-600 font-bold text-[0.9rem]">All caught up!</p>
          <p className="text-gray-400 text-xs mt-0.5">No pending verification requests</p>
        </div>
      )}
    </div>
  );
};

export default PharmacistDashboard;
