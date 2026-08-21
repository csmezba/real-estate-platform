import React, { useState } from "react";
import { Mail, ArrowRight, ShieldCheck, HelpCircle, Info, Landmark, Compass, Award } from "lucide-react";

interface FooterProps {
  onViewChange: (view: 'listings' | 'valuation' | 'insights' | 'agents' | 'blog' | 'about' | 'contact') => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsEmail("");
    }, 4000);
  };

  const cities = ["Malibu, CA", "New York, NY", "Sausalito, CA", "Miami, FL", "Los Angeles, CA", "San Francisco, CA"];
  const popularSearches = ["Beachfront Mansions", "Penthouse Lofts", "Modern Glass Villas", "Mid-Century Ranches", "Sotheby's Co-ops", "Architectural Landmarks"];

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-left text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top block: Branding and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-10">
          
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#C9A227] flex items-center justify-center rounded-sm">
                <span className="font-serif font-bold text-white text-base">L</span>
              </div>
              <span className="font-serif text-lg tracking-widest text-white uppercase">
                Luxe <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-slate-500">Estates</span>
              </span>
            </div>
            <p className="text-xs text-slate-450 max-w-sm font-light leading-relaxed">
              Serving the luxury real estate market with architectural precision, structural integrity, and elite quantitative advisory. Registered Sotheby's & Compass MLS affiliate.
            </p>
          </div>

          {/* Luxury Newsletter */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-900 p-5 rounded-sm w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="text-xs font-bold text-white uppercase tracking-widest block">The Luxe Journal</span>
              <p className="text-[11px] text-slate-400 font-light italic font-serif">Subscribe to receive exclusive off-market listings, macro trends, and architectural features.</p>
            </div>

            {subscribed ? (
              <div className="p-3 bg-[#C9A227]/10 border border-[#C9A227]/20 text-[#C9A227] text-[11px] font-bold uppercase tracking-wider rounded-sm">
                Subscription Confirmed. Welcome.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center space-x-2 flex-1 sm:max-w-xs">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="advisor@luxeestates.com"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-sm py-2.5 pl-10 pr-4 placeholder-slate-600 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <button
                  type="submit"
                  className="p-3 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 rounded-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle block: Site map columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-2">
          
          {/* Column 1: Metropolitan Cities */}
          <div className="space-y-3">
            <h5 className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Elite Submarkets</h5>
            <ul className="space-y-2 text-[11px] font-light">
              {cities.map(c => (
                <li key={c}>
                  <button onClick={() => onViewChange('listings')} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">{c} Properties</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Popular Searches */}
          <div className="space-y-3">
            <h5 className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Aesthetic Classes</h5>
            <ul className="space-y-2 text-[11px] font-light">
              {popularSearches.map(ps => (
                <li key={ps}>
                  <button onClick={() => onViewChange('listings')} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">{ps}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Resources */}
          <div className="space-y-3">
            <h5 className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Company Advisory</h5>
            <ul className="space-y-2 text-[11px] font-light">
              <li><button onClick={() => onViewChange('about')} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">Our Mission & Timeline</button></li>
              <li><button onClick={() => onViewChange('valuation')} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">AI Valuation Appraiser</button></li>
              <li><button onClick={() => onViewChange('insights')} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">Housing Indexes</button></li>
              <li><button onClick={() => onViewChange('agents')} className="hover:text-[#C9A227] transition-colors cursor-pointer text-left">Elite Broker Directory</button></li>
            </ul>
          </div>

          {/* Column 4: Regulatory Accolades */}
          <div className="space-y-3.5 text-left">
            <h5 className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Accredited Member</h5>
            <div className="space-y-2 text-[11px] font-light text-slate-400">
              <div className="flex items-center space-x-2">
                <Landmark className="w-4 h-4 text-[#C9A227]" />
                <span>MLS Regional Realtor</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Equal Housing Opportunity</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Sotheby's Global Top Producer</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom block: Legal disclosures and regulatory symbols */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 uppercase tracking-widest">
          <p>© 2026 LUXE ESTATES ADVISORY GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => onViewChange('about')} className="hover:text-white transition-colors cursor-pointer">PRIVACY CHARTER</button>
            <span>•</span>
            <button onClick={() => onViewChange('about')} className="hover:text-white transition-colors cursor-pointer">TERMS OF USE</button>
            <span>•</span>
            <button onClick={() => onViewChange('contact')} className="hover:text-white transition-colors cursor-pointer">OFFICE INDEX</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
