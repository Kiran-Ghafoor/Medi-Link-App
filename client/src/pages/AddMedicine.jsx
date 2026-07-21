import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Upload, Calendar, Hash, Pill, FileImage, X, ChevronDown } from 'lucide-react';

const medicineList = [
  'Panadol', 'Augmentin', 'Brufen', 'Disprin', 'Calpol',
  'Flagyl', 'Amoxil', 'Zincovit', 'Ciprolen', 'Nexium',
  'Crocin', 'Dolo 650', 'Benadryl', 'Digene', 'Electral',
  'Aspirin', 'Metformin', 'Amlodipine', 'Atorvastatin', 'Omeprazole',
  'Pantoprazole', 'Losartan', 'Metoprolol', 'Atenolol', 'Ciprofloxacin',
  'Azithromycin', 'Doxycycline', 'Paracetamol', 'Ibuprofen', 'Naproxen',
  'Diclofenac', 'Prednisolone', 'Betamethasone', 'Cetirizine', 'Loratadine',
  'Ranitidine', 'Famotidine', 'Domperidone', 'Loperamide', 'ORS Sachet',
  'Vitamin C', 'Vitamin D', 'Iron Supplement', 'Folic Acid', 'Calcium Tablet',
  'Insulin', 'Levothyroxine', 'Warfarin', 'Clopidogrel', 'Other',
];

const AddMedicine = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [customName, setCustomName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const selectedName = name === 'Other' ? customName : name;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000000) return toast.error('Image too large! Max 5MB.');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5000000) return toast.error('Image too large! Max 5MB.');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImage(reader.result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedName.trim()) return toast.error('Please select or enter a medicine name!');
    if (!image) return toast.error('Please upload a photo of the medicine!');

    setLoading(true);
    try {
      await axios.post('/api/medicine/add', {
        name: selectedName.trim(),
        expiry,
        quantity: Number(quantity),
        donorId: user.id || user._id,
        imageUrl: image,
      });
      toast.success('Medicine added successfully!');
      navigate('/donor-dashboard');
    } catch (err) {
      toast.error('Failed to add medicine.');
    } finally {
      setLoading(false);
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setImage('');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 hero-mesh -z-10 rounded-3xl" />
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white shadow-glow">
              <Pill size={26} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse-slow" />
          </div>
          <h2 className="text-[1.5rem] font-black text-gray-900 tracking-tight">Donate Medicine</h2>
          <p className="text-gray-500 text-[0.9rem] mt-1">Fill in the details to donate</p>
        </div>

        <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-soft-lg border border-gray-100/80">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Medicine Select */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Medicine Name</label>
              <div className="relative mt-1">
                <Pill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select
                  className="w-full pl-10 pr-10 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm appearance-none cursor-pointer hover:bg-gray-50"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <option value="">Select a medicine...</option>
                  {medicineList.map((med) => (
                    <option key={med} value={med}>{med}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Custom Name Input */}
            {name === 'Other' && (
              <div className="animate-slide-down">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Custom Medicine Name</label>
                <div className="relative mt-1">
                  <Pill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Enter medicine name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Expiry & Quantity */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Expiry Date</label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                    required
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Qty</label>
                <div className="relative mt-1">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 outline-none transition-all duration-300 text-sm hover:bg-gray-50"
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1 block mb-1">Upload Photo</label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 cursor-pointer ${
                  dragOver ? 'border-emerald-500 bg-emerald-50/80 shadow-glow' : image ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200/80 hover:border-emerald-300 hover:bg-gray-50/50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required={!image}
                  onChange={handleImage}
                />
                {image ? (
                  <div className="relative inline-block">
                    <img src={image} alt="preview" className="w-16 h-16 rounded-xl mx-auto object-cover shadow-md border-2 border-white" />
                    <button
                      onClick={clearImage}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                    >
                      <X size={10} />
                    </button>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1.5">Image selected</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-emerald-50 transition-colors">
                      <FileImage size={18} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Drop image or click to browse</p>
                    <p className="text-[10px] text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-bold shadow-glow hover:shadow-glow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 text-[0.9rem] active:scale-[0.98]"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Upload size={16} /> Submit to Pharmacist</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
