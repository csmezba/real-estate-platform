import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Heart, Share2, Calculator, MapPin, Calendar, 
  ChevronLeft, ChevronRight, Check, Compass, School, 
  ShieldCheck, ArrowRight, Download, Printer, Landmark, Sparkles
} from "lucide-react";
import { Listing, Agent } from "../types";
import { agents } from "../data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

interface PropertyModalProps {
  listing: Listing | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onBookConsultation: (details: any) => void;
}

export default function PropertyModal({
  listing,
  onClose,
  isFavorite,
  onToggleFavorite,
  onBookConsultation
}: PropertyModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'calculator' | 'floorplans' | 'neighborhood'>('details');

  // Calculator states
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30); // 15 or 30 years
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1); // Annual percentage
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState(3600);
  
  // Tour booking states
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("10:00");
  const [bookSuccess, setBookSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    if (listing) {
      setPurchasePrice(listing.price);
      setActivePhotoIndex(0);
      setBookSuccess(false);
      setBookingDetails(null);
    }
  }, [listing]);

  if (!listing) return null;

  // Find listing agent
  const agent = agents.find(a => a.id === listing.agentId) || agents[0];

  const nextPhoto = () => {
    setActivePhotoIndex((activePhotoIndex + 1) % listing.photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((activePhotoIndex - 1 + listing.photos.length) % listing.photos.length);
  };

  // Perform Mortgage Calculations
  const downPaymentAmount = Math.round(purchasePrice * (downPaymentPercent / 100));
  const loanAmount = purchasePrice - downPaymentAmount;
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = loanTerm * 12;

  let monthlyPAndI = 0;
  if (monthlyRate > 0) {
    monthlyPAndI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                   (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPAndI = loanAmount / totalMonths;
  }

  const monthlyPropertyTax = Math.round((purchasePrice * (propertyTaxRate / 100)) / 12);
  const monthlyInsurance = Math.round(homeInsuranceAnnual / 12);
  const monthlyHOA = listing.hoa;
  const totalMonthlyPayment = Math.round(monthlyPAndI + monthlyPropertyTax + monthlyInsurance + monthlyHOA);

  const chartData = [
    { name: "Principal & Interest", value: Math.round(monthlyPAndI), color: "#C9A227" },
    { name: "Property Taxes", value: monthlyPropertyTax, color: "#14b8a6" },
    { name: "Insurance", value: monthlyInsurance, color: "#a1a1aa" },
    { name: "HOA Fees", value: monthlyHOA, color: "#475569" }
  ].filter(item => item.value > 0);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookEmail || !bookPhone) return;

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookName,
          email: bookEmail,
          phone: bookPhone,
          agentName: agent.name,
          propertyAddress: listing.address,
          date: bookDate,
          time: bookTime
        })
      });
      const data = await res.json();
      if (data.success) {
        setBookSuccess(true);
        setBookingDetails(data.details);
        onBookConsultation(data.details);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formattedValue = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        id="property-detail-modal"
        className="bg-slate-900 border border-slate-800 w-full max-w-6xl rounded-sm overflow-hidden shadow-2xl relative flex flex-col my-8 max-h-[90vh]"
      >
        
        {/* Header Action bar */}
        <div className="flex items-center justify-between p-5 bg-slate-900 border-b border-slate-800/60 z-10">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl text-white font-medium line-clamp-1">{listing.title}</h2>
            <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="font-light tracking-wide">{listing.address}, {listing.city}, {listing.state} {listing.zip}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => onToggleFavorite(listing.id, e)}
              className="p-2 bg-slate-950/50 border border-slate-800 rounded-sm hover:bg-slate-900 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
              title="Save to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-slate-950/50 border border-slate-800 rounded-sm hover:bg-slate-900 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Visual Media & Tabs */}
            <div className="lg:col-span-7 p-6 border-r border-slate-800/50 space-y-6">
              
              {/* Grand Gallery Stage */}
              <div className="relative aspect-video bg-slate-950 rounded-sm overflow-hidden group shadow-lg">
                <img
                  src={listing.photos[activePhotoIndex]}
                  alt={`${listing.title} Photo`}
                  className="w-full h-full object-cover object-center"
                />
                
                {listing.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-slate-950/70 border border-slate-800/40 text-white hover:bg-slate-900 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-slate-950/70 border border-slate-800/40 text-white hover:bg-slate-900 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Index Indicator */}
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-slate-950/75 rounded-sm text-[10px] font-bold tracking-widest text-slate-300 border border-slate-800/50">
                      {activePhotoIndex + 1} / {listing.photos.length}
                    </div>
                  </>
                )}
              </div>

              {/* Small Carousel Thumbnails */}
              <div className="flex space-x-2.5 overflow-x-auto pb-1">
                {listing.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIndex(i)}
                    className={`relative w-24 aspect-video rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                      activePhotoIndex === i ? 'border-[#C9A227] scale-95' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Property Tabs */}
              <div className="flex border-b border-slate-800 pb-px">
                {([
                  { id: 'details', label: 'Property Details' },
                  { id: 'floorplans', label: 'Luxury Blueprint' },
                  { id: 'calculator', label: 'Payment Modeling' },
                  { id: 'neighborhood', label: 'Neighborhood Metrics' }
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 text-center py-3 text-xs uppercase tracking-widest font-bold transition-all relative cursor-pointer ${
                      activeTab === tab.id 
                        ? 'text-[#C9A227] font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="modalTabUnderline" 
                        className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C9A227]" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="pt-2 text-left space-y-6">
                
                {/* 1. Property Details Tab */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-serif text-xl text-white font-medium flex items-center space-x-2">
                        <span>Elite Architectural Statement</span>
                        {listing.isLuxury && <Sparkles className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-sans font-light italic font-serif">
                        {listing.description}
                      </p>
                    </div>

                    {/* Specifications grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/40 p-4 rounded-sm border border-slate-850">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Format Type</span>
                        <span className="text-sm font-semibold text-white">{listing.propertyType}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Total SqFt</span>
                        <span className="text-sm font-semibold text-white font-mono">{listing.sqft.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Annual Taxes</span>
                        <span className="text-sm font-semibold text-white font-mono">{formattedValue(listing.taxes)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Monthly HOA</span>
                        <span className="text-sm font-semibold text-white font-mono">{formattedValue(listing.hoa)}</span>
                      </div>
                    </div>

                    {/* Premium Amenities list */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Property Amenities & Fittings</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {listing.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center space-x-2.5 text-xs text-slate-300">
                            <div className="p-1 rounded-sm bg-teal-500/10 text-teal-400">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-light">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Historic Pricing index */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Listing Value History</span>
                      <div className="space-y-2">
                        {listing.priceHistory.map((history, i) => (
                          <div key={i} className="flex justify-between items-center bg-slate-950/20 px-4 py-3 rounded-sm border border-slate-850 text-xs">
                            <div className="flex items-center space-x-3">
                              <span className="text-slate-400 font-mono font-semibold">{history.year}</span>
                              <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase ${
                                history.event === 'Sold' ? 'bg-teal-500/10 text-teal-400' : 'bg-blue-500/10 text-blue-400'
                              }`}>{history.event}</span>
                            </div>
                            <span className="font-semibold font-mono text-white">{formattedValue(history.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* 2. Floorplans Tab */}
                {activeTab === 'floorplans' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-serif text-lg text-white font-medium">Residence Architectural Layout</h4>
                        <p className="text-xs text-slate-400 mt-1">Interactive layout mapping optimized square footage performance.</p>
                      </div>
                    </div>

                    {/* Custom Vector Floor Plan */}
                    <div className="bg-slate-950 rounded-sm p-6 border border-slate-850 flex items-center justify-center">
                      <svg viewBox="0 0 800 500" className="w-full max-w-lg text-slate-400 h-auto font-sans">
                        <rect x="20" y="20" width="760" height="460" rx="2" fill="none" stroke="#334155" strokeWidth="3" />
                        
                        {/* Master Suite */}
                        <rect x="50" y="50" width="300" height="180" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
                        <text x="70" y="80" fill="#f8fafc" fontSize="14" fontWeight="600" fontFamily="serif">Master Retreat Suite</text>
                        <text x="70" y="105" fill="#94a3b8" fontSize="11">24' x 16' | Ensuite & Terrace</text>
                        
                        {/* Great Room / Living room */}
                        <rect x="380" y="50" width="370" height="230" fill="none" stroke="#475569" strokeWidth="2" />
                        <text x="400" y="80" fill="#f8fafc" fontSize="14" fontWeight="600" fontFamily="serif">Great Room Lounge</text>
                        <text x="400" y="105" fill="#94a3b8" fontSize="11">32' x 20' | Hearth & Pocket Doors</text>

                        {/* Chef Kitchen */}
                        <rect x="380" y="300" width="370" height="150" fill="none" stroke="#475569" strokeWidth="2" />
                        <text x="400" y="330" fill="#f8fafc" fontSize="14" fontWeight="600" fontFamily="serif">Gourmet Chef's Kitchen</text>
                        <text x="400" y="355" fill="#94a3b8" fontSize="11">22' x 14' | Slab Island & Butler's Pantry</text>

                        {/* Foyer & Study */}
                        <rect x="50" y="250" width="300" height="200" fill="none" stroke="#475569" strokeWidth="2" />
                        <text x="70" y="280" fill="#f8fafc" fontSize="14" fontWeight="600" fontFamily="serif">Office Suite / Study</text>
                        <text x="70" y="305" fill="#94a3b8" fontSize="11">18' x 14' | Custom Cabinetry</text>

                        {/* Dimension labels and icons */}
                        <line x1="380" y1="280" x2="380" y2="300" stroke="#C9A227" strokeWidth="2" />
                        <text x="315" y="440" fill="#C9A227" fontSize="10" fontWeight="bold" letterSpacing="1">PLAN VIEW v2.0</text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* 3. Calculator Tab */}
                {activeTab === 'calculator' && (
                  <div className="space-y-6">
                    <h4 className="font-serif text-lg text-white font-medium">Mortgage Financial Simulator</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      
                      {/* Left: Interactive parameters */}
                      <div className="md:col-span-7 space-y-4 font-sans">
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Adjust Down Payment</span>
                            <span className="text-[#C9A227] font-bold font-mono">{downPaymentPercent}% ({formattedValue(downPaymentAmount)})</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="80"
                            step="5"
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full h-1 bg-slate-800 rounded-sm appearance-none cursor-pointer accent-[#C9A227]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Interest Rate Range</span>
                            <span className="text-[#C9A227] font-bold font-mono">{interestRate}%</span>
                          </div>
                          <input
                            type="range"
                            min="3"
                            max="10"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full h-1 bg-slate-800 rounded-sm appearance-none cursor-pointer accent-[#C9A227]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Loan Term Duration</label>
                            <select
                              value={loanTerm}
                              onChange={(e) => setLoanTerm(Number(e.target.value))}
                              className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-xs text-white"
                            >
                              <option value={30}>30-Year Fixed</option>
                              <option value={15}>15-Year Fixed</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Property Tax (Annual)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={propertyTaxRate}
                              onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                              className="w-full bg-slate-950 border border-slate-850 p-2 text-xs text-white rounded-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">Monthly Homeowner Association Dues</label>
                          <input
                            type="text"
                            disabled
                            value={formattedValue(listing.hoa)}
                            className="w-full bg-slate-950/60 border border-slate-850 p-2 text-xs text-slate-500 rounded-sm cursor-not-allowed"
                          />
                        </div>
                      </div>

                      {/* Right: Pie Breakdown and Total */}
                      <div className="md:col-span-5 bg-slate-950/50 p-5 rounded-sm border border-slate-850 text-center flex flex-col items-center">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Estimated Total Monthly Cost</span>
                        <h4 className="text-3xl sm:text-4xl font-sans font-bold text-white mt-1 mb-4 font-mono">
                          {formattedValue(totalMonthlyPayment)}<span className="text-sm font-light text-slate-400">/mo</span>
                        </h4>

                        {/* Recharts Pie component */}
                        <div className="w-full h-40 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={65}
                                paddingAngle={3}
                                dataKey="value"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value: any) => [`$${value.toLocaleString()}`, "Payment"]}
                                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "2px" }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Chart Legend */}
                        <div className="w-full space-y-1.5 text-xs text-left pt-2">
                          {chartData.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[11px]">
                              <div className="flex items-center space-x-1.5">
                                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                                <span className="text-slate-400">{item.name}</span>
                              </div>
                              <span className="text-white font-mono font-semibold">{formattedValue(item.value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. Neighborhood Metrics Tab */}
                {activeTab === 'neighborhood' && (
                  <div className="space-y-6">
                    <h4 className="font-serif text-lg text-white font-medium">Local Submarket Profile</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Walk score card */}
                      <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <Compass className="w-5 h-5 text-teal-400" />
                          <span className="text-2xl font-mono font-bold text-white">{listing.walkScore}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-200">Walkability Index</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">Most daily errands can be fully accomplished on foot.</p>
                        </div>
                      </div>

                      {/* Transit Score */}
                      <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <Landmark className="w-5 h-5 text-blue-400" />
                          <span className="text-2xl font-mono font-bold text-white">{listing.transitScore}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-200">Transit Access Index</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">Immediate access to top-performing public transit lines.</p>
                        </div>
                      </div>

                      {/* Schools index */}
                      <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <School className="w-5 h-5 text-[#C9A227]" />
                          <span className="text-2xl font-mono font-bold text-white">{listing.neighborhood.schoolRating}/10</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-200">Consolidated School Rating</span>
                          <p className="text-[10px] text-slate-400 mt-0.5">Zoned within top-performing public educational districts.</p>
                        </div>
                      </div>

                    </div>

                    {/* School List */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">Zoned Educational Facilities</span>
                      <div className="space-y-2">
                        {listing.schools.map((sch, i) => (
                          <div key={i} className="flex justify-between items-center bg-slate-950/20 px-4 py-3.5 rounded-sm border border-slate-850 text-xs">
                            <div className="flex items-center space-x-3">
                              <div className="w-7 h-7 bg-[#C9A227]/10 text-[#C9A227] rounded-sm flex items-center justify-center font-bold text-xs">{sch.rating}</div>
                              <div>
                                <span className="font-semibold text-white block">{sch.name}</span>
                                <span className="text-[10px] text-slate-400">Distance: {sch.distance}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-400 uppercase tracking-widest px-2.5 py-1 rounded-sm">Public District</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Right Column: Assigned Agent & Advisory Tour Scheduling */}
            <div className="lg:col-span-5 p-6 bg-slate-950/15 flex flex-col justify-between space-y-6">
              
              {/* Agent Profile Header */}
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Assigned Advisory Broker</span>
                
                <div className="flex items-center space-x-4 bg-slate-900 border border-slate-800/80 p-4 rounded-sm shadow-sm">
                  <div className="w-16 h-16 rounded-sm overflow-hidden border border-slate-700/50 flex-shrink-0">
                    <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-serif text-base text-white font-semibold">{agent.name}</h5>
                    <p className="text-[11px] text-[#C9A227] font-sans tracking-widest uppercase font-bold mt-0.5">{agent.role}</p>
                    <div className="flex items-center space-x-2 mt-1.5 text-xs text-slate-400">
                      <span className="font-bold text-white font-mono">{agent.rating} ★</span>
                      <span>•</span>
                      <span>{agent.reviewsCount} verified reviews</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs bg-slate-900/40 p-3 rounded-sm border border-slate-850">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Advisory Experience:</span>
                    <span className="text-white font-semibold font-mono">{agent.experienceYears} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Confirmed Resale Dues:</span>
                    <span className="text-white font-semibold font-mono">{agent.soldVolume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Direct Contact:</span>
                    <span className="text-white font-semibold font-mono text-[10px]">{agent.phone}</span>
                  </div>
                </div>
              </div>

              {/* Consultation Scheduling Form */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm shadow-lg text-left">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
                  <Calendar className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">Schedule Private Consultation</span>
                </div>

                {bookSuccess && bookingDetails ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-teal-500/10 border border-teal-500/50 rounded-sm space-y-3"
                  >
                    <div className="flex items-center space-x-2 text-teal-400">
                      <ShieldCheck className="w-5 h-5 stroke-[2.5px]" />
                      <span className="text-sm font-semibold">Consultation Requested</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-serif italic">
                      Thank you. Your advisory session on <b>{bookingDetails.scheduledTime}</b> has been successfully requested. Our coordinator will contact you immediately.
                    </p>
                    <div className="bg-slate-950/60 p-2.5 rounded-sm border border-slate-850/60 text-[10px] text-slate-400 font-mono flex justify-between items-center">
                      <span>Broker Code: {bookingDetails.id}</span>
                      <span>Status: Confirmed</span>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3 font-sans text-xs">
                    
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Full Client Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-sm p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Client Email</label>
                        <input
                          type="email"
                          required
                          placeholder="client@example.com"
                          value={bookEmail}
                          onChange={(e) => setBookEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#C9A227]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Phone Connection</label>
                        <input
                          type="tel"
                          required
                          placeholder="(555) 012-3456"
                          value={bookPhone}
                          onChange={(e) => setBookPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-[#C9A227]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Consultation Date</label>
                        <input
                          type="date"
                          required
                          value={bookDate}
                          onChange={(e) => setBookDate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm p-2 text-white focus:outline-none focus:border-[#C9A227]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Target Time Slot</label>
                        <select
                          value={bookTime}
                          onChange={(e) => setBookTime(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-sm p-2 text-white focus:outline-none focus:border-[#C9A227]"
                        >
                          <option value="09:00">09:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="17:00">05:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 font-bold uppercase tracking-widest text-[10px] rounded-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer mt-2"
                    >
                      <span>Book Private Showing Session</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                    </button>
                  </form>
                )}
              </div>

              {/* Legal MLS Disclaimer */}
              <p className="text-[9px] text-slate-500 uppercase tracking-widest text-left leading-normal pt-2 font-light">
                Listing data courtesy of American Luxury Multiple Listing Service (MLS). Equal Housing Opportunity Broker. All computations represent statistical approximations.
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
