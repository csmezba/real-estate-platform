import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, DollarSign, BedDouble, Building, Award, Users, Trophy, ChevronRight } from "lucide-react";

interface HeroProps {
  onSearch: (filters: {
    status: 'Buy' | 'Rent' | 'Sold';
    cityOrZip: string;
    propertyType: string;
    maxPrice: number;
    beds: string;
  }) => void;
  onViewChange: (view: 'listings' | 'valuation' | 'insights' | 'agents' | 'blog' | 'about' | 'contact') => void;
}

export default function Hero({ onSearch, onViewChange }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'Buy' | 'Rent' | 'Sold'>("Buy");
  const [cityOrZip, setCityOrZip] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(15000000);
  const [beds, setBeds] = useState("Any");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      status: activeTab,
      cityOrZip,
      propertyType,
      maxPrice,
      beds,
    });
  };

  const statItems = [
    { value: "$2.8B+", label: "Portfolio Volume", icon: Trophy },
    { value: "98.4%", label: "Client Retention", icon: Users },
    { value: "Top 100", label: "US Elite Brokerage", icon: Award }
  ];

  return (
    <section id="hero-section" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A] pt-28 pb-16 md:py-32">
      
      {/* Cinematic Background Backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Mansion Exterior" 
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform transition-transform duration-10000"
        />
        
        {/* Floating subtle ambient gold orb */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C9A227]/5 rounded-full blur-[140px] mix-blend-screen pointer-events-none animate-pulse-glow" />
      </div>

      {/* Background Large Editorial Initial */}
      <span className="absolute -bottom-20 -right-20 text-[26rem] font-serif text-slate-900 select-none -z-0 opacity-20 pointer-events-none">E</span>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Slogan & Headings */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A227] font-sans">Legacy Real Estate</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white tracking-tight leading-[1.05]"
            >
              Curating <br />
              <span className="font-serif italic font-normal text-[#C9A227]">the World's</span> <br />
              Finest Homes.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans font-light"
            >
              Experience a paradigm shift in luxury acquisitions. We combine deep architectural intelligence with white-glove brokerage for the global elite.
            </motion.p>

            {/* Quick Links / Navigation CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => onViewChange('valuation')}
                className="group flex items-center space-x-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-4 rounded-sm transition-all cursor-pointer"
              >
                <span>AI Property Appraisal</span>
                <ChevronRight className="w-4 h-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onViewChange('insights')}
                className="text-slate-300 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-4 flex items-center space-x-2 cursor-pointer transition-colors"
              >
                <span>View Housing Indexes</span>
              </button>
            </motion.div>

            {/* Micro Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800"
            >
              {statItems.map((stat, i) => {
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl font-serif text-[#C9A227]">{stat.value}</span>
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Luxury Search Engine Grid Form */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-slate-950/90 border border-slate-800/80 p-6 rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl relative"
            >
              
              {/* Category Search Tabs */}
              <div className="flex justify-between border-b border-slate-850 pb-4 mb-5">
                {(["Buy", "Rent", "Sold"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-center py-2 text-[10px] uppercase tracking-widest font-bold transition-all relative cursor-pointer ${
                      activeTab === tab 
                        ? "text-[#C9A227]" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>{tab} Property</span>
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeSearchTab" 
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A227]" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                
                {/* Location Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-450 block">Select Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Malibu, NY, Sausalito, Miami..."
                      value={cityOrZip}
                      onChange={(e) => setCityOrZip(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-sm py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A227]/80 focus:ring-1 focus:ring-[#C9A227]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Grid fields */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Property Type */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-450 block">Property Type</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-sm py-2.5 pl-10 pr-4 text-[10px] uppercase tracking-wider text-white appearance-none focus:outline-none focus:border-[#C9A227]"
                      >
                        <option value="All">All Formats</option>
                        <option value="Luxury Estate">Luxury Estates</option>
                        <option value="Penthouse">Penthouses</option>
                        <option value="Single Family">Single Family</option>
                        <option value="Villa">Villas</option>
                        <option value="Apartment">Apartments</option>
                      </select>
                    </div>
                  </div>

                  {/* Bedroom config */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-slate-450 block">Minimum Beds</label>
                    <div className="relative">
                      <BedDouble className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                      <select
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-sm py-2.5 pl-10 pr-4 text-[10px] uppercase tracking-wider text-white appearance-none focus:outline-none focus:border-[#C9A227]"
                      >
                        <option value="Any">Any Config</option>
                        <option value="2">2+ Bedrooms</option>
                        <option value="3">3+ Bedrooms</option>
                        <option value="4">4+ Bedrooms</option>
                        <option value="5">5+ Bedrooms</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Price Limit Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-450">
                    <span>Upper Price Limit</span>
                    <span className="text-[#C9A227] font-mono font-bold text-xs">${(maxPrice / 1000000).toFixed(1)}M</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="20000000"
                    step="250000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-sm appearance-none cursor-pointer accent-[#C9A227] focus:outline-none"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>$10K</span>
                    <span>$10M</span>
                    <span>$20M+</span>
                  </div>
                </div>

                {/* Submission Search CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 font-bold uppercase tracking-[0.2em] text-[10px] rounded-sm shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Search className="w-4 h-4 stroke-[2.5px]" />
                  <span>Search Collection</span>
                </button>
              </form>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
