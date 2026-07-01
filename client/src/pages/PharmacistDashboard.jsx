import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Pill, Eye, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const PharmacistDashboard = () => {
  const [pendingMeds, setPendingMeds] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null); // Bari photo dikhane ke liye state

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      // Backend route se match karein
      const res = await axios.get('http://localhost:5000/api/medicine/pending');
      setPendingMeds(res.data);
    } catch (err) {
      console.error("Fetch Error");
    }
  };

  const handleVerify = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/medicine/${id}/verify`, { status });
      toast.success(`Medicine ${status === 'verified' ? 'Approved' : 'Rejected'}!`);
      fetchPending(); 
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <h2 className="text-4xl font-black text-gray-800 mb-10 tracking-tight">Pending Verifications </h2>
      
      {pendingMeds.map(med => (
        <div key={med._id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-xl transition-all group">
          
          <div className="flex items-center gap-8">
            {/* Clickable Image Thumbnail */}
            {/* PharmacistDashboard.jsx mein image wala part */}
<div className="relative group" onClick={() => setSelectedImg(med.imageUrl)}>
    <img 
      src={med.imageUrl} 
      alt="medicine-proof" 
      className="w-24 h-24 rounded-[24px] object-cover border-4 border-white shadow-md"
      onError={(e) => { 
        // Agar image load na ho to ye icon dikhaye
        e.target.onerror = null; 
        e.target.src = "https://cdn-icons-png.flaticon.com/512/883/883356.png"; 
      }} 
    />
</div>

            <div>
              <h3 className="font-black text-2xl text-gray-800 capitalize leading-none mb-2">{med.name}</h3>
              <p className="text-sm text-gray-400 font-bold mb-4 italic">
                Donor: <span className="text-emerald-600 uppercase tracking-tighter">{med.donor?.name || "Unknown"}</span>
              </p>
              
              <div className="flex gap-4">
                <span className="text-[10px] font-black bg-red-50 text-red-500 px-3 py-1 rounded-full uppercase">
                   Exp: {new Date(med.expiry).toLocaleDateString()}
                </span>
                <span className="text-[10px] font-black bg-blue-50 text-blue-500 px-3 py-1 rounded-full uppercase">
                   Qty: {med.quantity}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Approve */}
            <button onClick={() => handleVerify(med._id, 'verified')} className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
              <Check size={28}/>
            </button>
            {/* Reject */}
            <button onClick={() => handleVerify(med._id, 'rejected')} className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
              <X size={28}/>
            </button>
          </div>
        </div>
      ))}

      {/* --- IMAGE MODAL (Bari photo ka popup) --- */}
      {selectedImg && (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300"
            onClick={() => setSelectedImg(null)} // Kahin bhi click karo toh band ho jaye
        >
            <button className="absolute top-10 right-10 text-white hover:text-red-500 transition-colors">
                <XCircle size={48}/>
            </button>
            <img 
                src={selectedImg} 
                className="max-w-full max-h-[85vh] rounded-[40px] shadow-2xl border-8 border-white animate-in zoom-in duration-300" 
                alt="Full Preview" 
            />
            <p className="absolute bottom-10 text-white/60 font-bold uppercase tracking-widest text-sm italic">Click anywhere to close</p>
        </div>
      )}

      {pendingMeds.length === 0 && (
        <div className="text-center py-24 bg-white/50 rounded-[50px] border-4 border-dashed border-white">
          <Pill className="mx-auto mb-4 text-gray-200" size={64}/>
          <p className="text-gray-400 font-black text-xl uppercase tracking-widest italic opacity-50">No Pending Verification Requests</p>
        </div>
      )}
    </div>
  );
};

export default PharmacistDashboard;