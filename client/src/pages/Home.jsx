import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, Truck, ArrowRight, Users, Activity, PlusCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-10">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold animate-bounce">
            <Activity size={16} /> Helping 10,000+ People monthly
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
            Your Medicine, <br />
            <span className="text-emerald-600 underline decoration-emerald-200">Someone's Life.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
            Don't let your unused medicines expire. Join Pakistan's most trusted network to donate surplus medicine and save lives today.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link to="/register" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all flex items-center gap-2">
              Start Donating <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="bg-white text-gray-700 border-2 border-gray-100 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all">
              Find Medicine
            </Link>
          </div>
        </div>

        {/* Hero Image / Illustration */}
        <div className="flex-1 relative">
          <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-emerald-200 rounded-full blur-[100px] opacity-50"></div>
          <div className="absolute -z-10 bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-[100px] opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Medical Donation" 
            className="rounded-[40px] shadow-2xl border-[12px] border-white transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 object-cover h-[500px] w-full"
          />
        </div>
      </section>

      {/* --- TRUST STATS --- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-12 rounded-[40px] shadow-sm border border-gray-50 text-center">
        <div>
          <h3 className="text-4xl font-black text-gray-800">5k+</h3>
          <p className="text-gray-500 font-medium">Donors Joined</p>
        </div>
        <div>
          <h3 className="text-4xl font-black text-emerald-600">12k+</h3>
          <p className="text-gray-500 font-medium">Meds Donated</p>
        </div>
        <div>
          <h3 className="text-4xl font-black text-gray-800">80+</h3>
          <p className="text-gray-500 font-medium">Pharmacists</p>
        </div>
        <div>
          <h3 className="text-4xl font-black text-blue-600">100%</h3>
          <p className="text-gray-500 font-medium">Verified Safety</p>
        </div>
      </section>

      {/* --- HOW IT WORKS (HCI Step Guidance) --- */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="text-gray-500 mt-2">Simple 3-step process to make an impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="group text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
              <PlusCircle size={32} />
            </div>
            <h3 className="text-xl font-bold">1. List Medicine</h3>
            <p className="text-gray-500">Upload a photo and details of your surplus medicine.</p>
          </div>

          <div className="group text-center space-y-4">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold">2. Quality Check</h3>
            <p className="text-gray-500">Our pharmacists verify the expiry and authenticity.</p>
          </div>

          <div className="group text-center space-y-4">
            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold">3. Handover</h3>
            <p className="text-gray-500">Recipient collects the medicine at a safe location.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;