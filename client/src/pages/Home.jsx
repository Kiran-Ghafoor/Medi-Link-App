import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Users, PlusCircle, Clock, BadgeCheck, Sparkles, Heart, Pill, Stethoscope, Activity, Star } from 'lucide-react';

const useCountUp = (end, duration = 2000, startOnMount = false) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const ref = useRef(null);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { count, ref };
};

const stats = [
  { value: 5000, suffix: 'k+', label: 'Donors', color: 'text-gray-900', gradient: 'from-emerald-500 to-teal-400' },
  { value: 12000, suffix: 'k+', label: 'Meds Donated', color: 'text-emerald-600', gradient: 'from-emerald-600 to-green-500' },
  { value: 80, suffix: '+', label: 'Pharmacists', color: 'text-gray-900', gradient: 'from-blue-500 to-cyan-400' },
  { value: 100, suffix: '%', label: 'Verified', color: 'text-blue-600', gradient: 'from-blue-600 to-indigo-500' },
];

const StatCard = ({ stat, index }) => {
  const { count, ref } = useCountUp(stat.value, 2000);
  const displayVal = stat.value >= 1000
    ? `${Math.floor(count / 1000)}k`
    : count;
  return (
    <div ref={ref} className={`stagger-${index + 1} group relative bg-white p-6 rounded-2xl shadow-soft border border-gray-100/80 text-center overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-1 hover:border-emerald-100`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
      <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-full opacity-[0.06] group-hover:opacity-[0.1] group-hover:scale-125 transition-all duration-500`} />
      <div className="relative">
        <h3 className={`text-3xl font-black ${stat.color} tracking-tight`}>
          {displayVal}{stat.suffix}
        </h3>
        <p className="text-gray-400 font-semibold text-[0.8rem] mt-1 uppercase tracking-wider">{stat.label}</p>
      </div>
    </div>
  );
};

const steps = [
  { num: '01', title: 'List Medicine', desc: 'Upload a photo and details of your surplus medicine.', icon: <PlusCircle size={22} />, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-100' },
  { num: '02', title: 'Quality Check', desc: 'Our pharmacists verify the expiry and authenticity.', icon: <ShieldCheck size={22} />, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-100' },
  { num: '03', title: 'Handover', desc: 'Recipient collects the medicine at a safe location.', icon: <Users size={22} />, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', ring: 'ring-orange-100' },
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pb-10">
      {/* ===== HERO ===== */}
      <section className="relative -w-[100vw] -mx-[calc(50vw-50%)] pt-8 lg:pt-12 pb-4 overflow-hidden">
        {/* Mesh Background */}
        <div className="absolute inset-0 hero-mesh -z-20" />

        {/* Animated Gradient Orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/20 to-transparent rounded-full blur-[100px] orb-1 -z-10" />
        <div className="absolute top-20 -right-40 w-[400px] h-[400px] bg-gradient-to-br from-emerald-200/15 to-transparent rounded-full blur-[100px] orb-2 -z-10" />
        <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] bg-gradient-to-br from-teal-200/15 to-transparent rounded-full blur-[80px] orb-3 -z-10" />

        {/* Dot Grid Pattern */}
        <div className="absolute inset-0 dot-grid -z-10" />

        {/* Floating Decorative Icons */}
        <div className="absolute top-8 right-12 text-emerald-200/50 floating-icon-1 hidden lg:block">
          <Pill size={28} strokeWidth={1.5} />
        </div>
        <div className="absolute top-32 right-48 text-emerald-200/40 floating-icon-2 hidden lg:block">
          <Heart size={20} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-20 left-16 text-emerald-200/40 floating-icon-3 hidden lg:block">
          <Stethoscope size={24} strokeWidth={1.5} />
        </div>
        <div className="absolute top-48 left-8 text-teal-200/40 floating-icon-4 hidden lg:block">
          <Activity size={18} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-32 right-32 text-emerald-200/30 floating-icon-5 hidden lg:block">
          <Star size={16} strokeWidth={1.5} />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-1 sm:px-4 lg:px-6">
          {/* Left Content */}
          <div className="flex-1 space-y-6 text-left">
            {/* Badge */}
            <div className="stagger-1 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-emerald-700 px-4 py-2 rounded-full text-[0.8rem] font-bold border border-emerald-100/80 shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Helping 10,000+ People monthly
              <Sparkles size={14} className="text-emerald-500" />
            </div>

            {/* Heading */}
            <h1 className="stagger-2 text-[2rem] sm:text-[2.6rem] lg:text-[3.75rem] font-black text-gray-900 leading-[1.1] tracking-tight">
              Your Medicine,{' '}
              <span className="relative inline-block">
                <span className="text-emerald-600">Someone's Life.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="stagger-3 text-[1.05rem] sm:text-[1.15rem] text-gray-500 max-w-lg leading-relaxed">
              Don't let your unused medicines expire. Join Pakistan's most trusted network to donate surplus medicine and save lives.
            </p>

            {/* CTA Buttons */}
            <div className="stagger-4 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-7 py-3.5 rounded-xl text-[0.9rem] font-bold shadow-lg shadow-emerald-200/50 hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Start Donating
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                to="/login"
                className="bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-300/90 px-7 py-3.5 rounded-xl text-[0.9rem] font-bold hover:border-emerald-300 hover:shadow-glow hover:bg-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Find Medicine
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="stagger-5 flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2.5 text-[0.8rem] text-gray-500 group/badge">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center group-hover/badge:bg-emerald-100 transition-colors">
                  <BadgeCheck size={13} className="text-emerald-500" />
                </div>
                <span className="font-semibold">100% Verified</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2.5 text-[0.8rem] text-gray-500 group/badge">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center group-hover/badge:bg-emerald-100 transition-colors">
                  <ShieldCheck size={13} className="text-emerald-500" />
                </div>
                <span className="font-semibold">Safe & Secure</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2.5 text-[0.8rem] text-gray-500 group/badge">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center group-hover/badge:bg-emerald-100 transition-colors">
                  <Clock size={13} className="text-emerald-500" />
                </div>
                <span className="font-semibold">Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="stagger-3 flex-1 flex justify-end w-full">
            <div className="relative w-full max-w-md">
              {/* Glow effects behind image */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
                <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-300/30 rounded-full blur-[60px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-200/25 rounded-full blur-[60px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-teal-200/20 rounded-full blur-[50px] pulse-ring" />
              </div>

              {/* Image with gradient border */}
              <div className="hero-image-wrapper relative">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Medical Donation"
                  className="rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] border-[3px] border-white object-cover h-[300px] lg:h-[400px] w-full relative z-10 transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.16),0_6px_16px_rgba(0,0,0,0.08)]"
                />
                {/* Floating info card */}
                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-xl rounded-xl px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] border border-white/50 z-20 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Heart size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">Lives Saved</p>
                      <p className="text-sm font-black text-gray-900">12,000+</p>
                    </div>
                  </div>
                </div>
                {/* Top right badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-emerald-500 to-teal-400 text-white rounded-xl px-3 py-1.5 shadow-[0_4px_14px_rgba(5,150,105,0.25)] z-20 badge-pulse">
                  <div className="flex items-center gap-1">
                    <Sparkles size={12} />
                    <span className="text-[10px] font-black">Trusted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} />
        ))}
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <div className="stagger-1 inline-flex items-center gap-2 bg-emerald-50/80 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100/50">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Simple Process
          </div>
          <h2 className="stagger-2 text-[1.85rem] sm:text-[2.2rem] font-black text-gray-900 tracking-tight">How It Works</h2>
          <p className="stagger-3 text-gray-500 text-sm max-w-md mx-auto">Simple 3-step process to make a real impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((step, i) => (
            <div key={i} className={`stagger-${i + 2} group relative bg-white p-7 rounded-2xl border border-gray-100/80 text-center space-y-5 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 hover:border-emerald-100 overflow-hidden`}>
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Step number */}
              <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-black w-7 h-7 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                {step.num}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 ${step.bg} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ring-4 ${step.ring} group-hover:ring-emerald-100`}>
                <div className={`bg-gradient-to-br ${step.color} text-white p-2.5 rounded-xl shadow-lg`}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-[1.05rem] font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{step.title}</h3>
                <p className="text-gray-400 mt-1.5 text-sm leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative rounded-3xl overflow-hidden cta-glow">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.1),transparent_50%)]" />

        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] orb-1" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300/20 rounded-full blur-[60px] orb-2" />

        {/* Floating stars */}
        <div className="absolute top-6 left-[15%] text-white/20 floating-icon-1"><Star size={16} /></div>
        <div className="absolute bottom-8 right-[20%] text-white/15 floating-icon-2"><Star size={12} /></div>
        <div className="absolute top-10 right-[30%] text-white/10 floating-icon-3"><Sparkles size={14} /></div>

        {/* Content */}
        <div className="relative px-6 py-12 sm:py-14 text-center text-white">
          <div className="stagger-1 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-white/10">
            <Heart size={12} className="text-emerald-200" />
            Join the Movement
          </div>
          <h2 className="stagger-2 text-[1.5rem] sm:text-[1.85rem] lg:text-[2.2rem] font-black tracking-tight">Ready to Make a Difference?</h2>
          <p className="stagger-3 text-emerald-100/90 text-sm max-w-lg mx-auto mt-3 leading-relaxed">
            Join thousands of donors and pharmacists working together to provide medicines to those in need.
          </p>
          <div className="stagger-4 mt-6">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-3.5 rounded-xl text-[0.9rem] font-black shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 hover:bg-emerald-50"
            >
              Get Started Free <ArrowRight size={16} className="group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="stagger-5 mt-4 text-emerald-200/60 text-xs">No credit card required. Free forever.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
