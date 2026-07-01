import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Upload, Calendar, Hash, Pill } from 'lucide-react';

const AddMedicine = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file.size > 5000000) { // 5MB limit check
        return toast.error("Image too large! Please select a smaller photo.");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => { setImage(reader.result); };
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // HCI: Error Prevention - Check if image is selected
  if (!image) {
    return toast.error("Please upload a photo of the medicine first!");
  }

  try {
    const payload = {
      name,
      expiry,
      quantity: Number(quantity),
      donorId: user.id || user._id,
      imageUrl: image // <--- YAHAN "image" (jo state hai) likhna hai. 
      // Khaber-daar! Yahan koi link (https://...) nahi likhna!
    };

    console.log("Submitting real image data..."); 
    const res = await axios.post('http://localhost:5000/api/medicine/add', payload);
    toast.success("Medicine added with real photo!");
    navigate('/donor-dashboard');
  } catch (err) {
    console.error("Upload Error:", err.response?.data);
    toast.error("Failed to add: Image might be too large.");
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-50">
      <h2 className="text-2xl font-black text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
        <Pill className="text-emerald-600"/> Donate Medicine
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 ml-2 uppercase">Medicine Name</label>
          <input type="text" placeholder="e.g. Panadol" className="w-full mt-1 p-4 bg-gray-50 rounded-2xl outline-emerald-500 border-none" required 
            onChange={(e)=>setName(e.target.value)} />
        </div>
        
        <div className="flex gap-4">
            <div className="flex-1">
                <label className="text-xs font-bold text-gray-400 ml-2 uppercase flex items-center gap-1">
                    <Calendar size={12}/> Expiry Date
                </label>
                <input type="date" className="w-full mt-1 p-4 bg-gray-50 rounded-2xl outline-emerald-500 border-none text-sm" required 
                    onChange={(e)=>setExpiry(e.target.value)} />
            </div>
            <div className="w-28">
                <label className="text-xs font-bold text-gray-400 ml-2 uppercase flex items-center gap-1">
                    <Hash size={12}/> Qty
                </label>
                <input type="number" min="1" placeholder="1" className="w-full mt-1 p-4 bg-gray-50 rounded-2xl outline-emerald-500 border-none" required 
                    onChange={(e)=>setQuantity(e.target.value)} />
            </div>
        </div>

        <div>
            <label className="text-xs font-bold text-gray-400 ml-2 uppercase flex items-center gap-1">
                <Upload size={12}/> Upload Proof (Clear Photo)
            </label>
            <div className="mt-1 relative border-2 border-dashed border-gray-100 rounded-2xl p-4 text-center hover:bg-gray-50 transition-all cursor-pointer">
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" required onChange={handleImage} />
                {image ? (
                    <img src={image} alt="preview" className="w-20 h-20 rounded-xl mx-auto object-cover" />
                ) : (
                    <p className="text-gray-400 text-sm">Click to select photo</p>
                )}
            </div>
        </div>

        <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-700 transition-all">
          Submit to Pharmacist
        </button>
      </form>
    </div>
  );
};
export default AddMedicine;