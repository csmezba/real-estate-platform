import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, Calculator, Sparkles, Building, ChevronRight, 
  RefreshCw, TrendingUp, AlertCircle, Compass, List, DollarSign 
} from "lucide-react";
import { ValuationResult } from "../types";

export default function ValuationCenter() {
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [propertyType, setPropertyType] = useState("Luxury Estate");
  const [beds, setBeds] = useState(4);
  const [baths, setBaths] = useState(3.5);
  const [sqft, setSqft] = useState(3800);
  const [condition, setCondition] = useState("Good");
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upgradeOptions = [
    "Chef Kitchen Suite", "Private Infinity Pool", "Integrated Home Automation", 
    "Professional Sound Theater", "Custom Climate Wine Cellar", "Tesla Solar Roof", "Wellness Steam Sauna"
  ];

  const handleUpgradeToggle = (upgrade: string) => {
    if (selectedUpgrades.includes(upgrade)) {
      setSelectedUpgrades(selectedUpgrades.filter(u => u !== upgrade));
    } else {
      setSelectedUpgrades([...selectedUpgrades, upgrade]);
    }
  };

  const handleEvaluate = async (e: React.FormEvent | null) => {
    if (e) e.preventDefault();
    if (!address || !zip || !sqft) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          zip,
          propertyType,
          beds,
          baths,
          sqft,
          condition,
          upgrades: selectedUpgrades
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        setError(data.message || data.error || "A secure server connection could not establish the appraisal model.");
      } else {
        setResult(data);
      }
    } catch (err: any) {
      console.error("Valuation calculation failed:", err);
      setError("We encountered an unexpected connection latency. Please verify your parameter inputs and submit again.");
    } finally {
      setLoading(false);
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
    <div className="space-y-12">
      
      {/* Title & Introduction Slogan */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#C9A227]/10 border border-[#C9A227]/20 px-4 py-1.5 rounded-sm">
          <Sparkles className="w-4 h-4 text-[#C9A227]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">Intelligent Appraisals</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium">Instant AI Home Valuation</h2>
        <p className="text-sm text-slate-400 font-sans font-light leading-relaxed">
          Unlock a comprehensive, Sotheby's-grade evaluation powered by Gemini AI. Input your residence parameters and custom fittings to assess real-time market viability and asset positioning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Parameters input */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800/80 p-6 rounded-sm shadow-xl text-left">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3.5 mb-5">
            <Calculator className="w-5 h-5 text-[#C9A227]" />
            <h3 className="font-serif text-base text-white font-medium">Asset Characteristics</h3>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-4 text-xs font-sans">
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Street Address</label>
              <input
                type="text"
                required
                placeholder="1600 Amphitheatre Pkwy"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-sm text-white placeholder-slate-650 focus:outline-none focus:border-[#C9A227]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">ZIP Code</label>
                <input
                  type="text"
                  required
                  placeholder="94043"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-sm text-white placeholder-slate-650 focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Structure Format</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="Luxury Estate">Luxury Estate</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Single Family">Single Family</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Bedrooms</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-white rounded-sm focus:outline-none focus:border-[#C9A227]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Bathrooms</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  step="0.5"
                  value={baths}
                  onChange={(e) => setBaths(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-white rounded-sm focus:outline-none focus:border-[#C9A227]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Sq Footage</label>
                <input
                  type="number"
                  min="300"
                  max="50000"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 p-2 text-white rounded-sm focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450 block">General Building Condition</label>
              <div className="grid grid-cols-3 gap-2.5">
                {["Excellent", "Good", "Fair"].map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setCondition(cond)}
                    className={`py-2 text-center rounded-sm border text-[11px] font-medium transition-all cursor-pointer ${
                      condition === cond 
                        ? 'bg-[#C9A227]/10 border-[#C9A227] text-[#C9A227] font-semibold' 
                        : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom high-end upgrades list */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450 block">Custom Luxury Upgrades</label>
              <div className="flex flex-wrap gap-1.5">
                {upgradeOptions.map((upgrade) => {
                  const active = selectedUpgrades.includes(upgrade);
                  return (
                    <button
                      key={upgrade}
                      type="button"
                      onClick={() => handleUpgradeToggle(upgrade)}
                      className={`px-3 py-1.5 rounded-sm text-[10px] font-medium transition-all cursor-pointer ${
                        active 
                          ? 'bg-[#C9A227] border border-[#b08e20] text-slate-950 font-bold' 
                          : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-white'
                      }`}
                    >
                      {upgrade}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 font-bold uppercase tracking-widest text-xs rounded-sm shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer pt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Synthesizing Appraisal...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Execute AI Valuation</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Output: Report display / Skeleton loading placeholder */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-900 border border-slate-800 p-8 rounded-sm shadow-xl space-y-6 text-left h-full flex flex-col justify-center min-h-[500px]"
              >
                {/* Modern luxury layout skeleton */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-800 animate-pulse rounded-sm" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-800 animate-pulse rounded-sm w-1/3" />
                    <div className="h-3 bg-slate-800 animate-pulse rounded-sm w-1/2" />
                  </div>
                </div>
                
                <div className="h-10 bg-slate-950 rounded-sm animate-pulse" />
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="h-3 bg-slate-800 animate-pulse rounded-sm w-full" />
                  <div className="h-3 bg-slate-800 animate-pulse rounded-sm w-full" />
                  <div className="h-3 bg-slate-800 animate-pulse rounded-sm w-4/5" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="h-14 bg-slate-950 rounded-sm animate-pulse" />
                  <div className="h-14 bg-slate-950 rounded-sm animate-pulse" />
                  <div className="h-14 bg-slate-950 rounded-sm animate-pulse" />
                </div>
                
                <p className="text-center text-[10px] text-[#C9A227] uppercase tracking-widest pt-4 font-mono font-bold">
                  Evaluating comparable properties & submarket yields using Gemini AI...
                </p>
              </motion.div>
            )}

            {!loading && !result && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-900 border border-slate-850 p-8 rounded-sm shadow-xl text-center flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="w-16 h-16 rounded-sm bg-slate-950 flex items-center justify-center border border-slate-850 mb-6">
                  <ShieldCheck className="w-8 h-8 text-[#C9A227]/80" />
                </div>
                <h4 className="font-serif text-xl text-white font-medium mb-2">Awaiting Appraisal Modeling</h4>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans font-light">
                  Input your property details and custom fittings on the left, then trigger the appraisal engine to synthesize a valuation report.
                </p>
              </motion.div>
            )}

            {!loading && error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-900 border border-red-950/40 p-8 rounded-sm shadow-xl text-center flex flex-col items-center justify-center min-h-[500px] space-y-6"
              >
                <div className="w-16 h-16 rounded-sm bg-red-500/10 flex items-center justify-center border border-red-500/20">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-xl text-white font-medium">Service Access Interruption</h4>
                  <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans font-light mx-auto">
                    The core Gemini appraisal service is currently experiencing extremely high demand. To maintain our strict standards of analytical precision, please retry the execution or use our manual advisory hotline.
                  </p>
                  {error && (
                    <p className="text-[10px] text-red-400 font-mono bg-red-950/20 border border-red-950/50 p-2.5 rounded-sm max-w-sm mx-auto mt-2 select-all leading-normal">
                      Diagnostics: {error}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleEvaluate(null)}
                  className="px-4 py-2 border border-slate-850 hover:border-slate-800 bg-slate-950 hover:bg-slate-905 text-slate-300 hover:text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Retry Evaluation
                </button>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-900 border border-slate-800/80 p-8 rounded-sm shadow-2xl space-y-6 text-left"
              >
                {/* Valuation Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block">Sotheby's Estimated Valuation</span>
                    <h3 className="text-3xl sm:text-4xl font-sans font-bold text-white mt-1 font-mono">{formattedValue(result.estimatedValue)}</h3>
                  </div>
                  
                  <div className="bg-slate-950/80 border border-slate-850 px-4 py-2 rounded-sm text-center sm:text-right">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">Appraisal Confidence</span>
                    <span className="text-xs font-semibold text-[#C9A227] font-mono mt-0.5 block">{result.confidence}</span>
                  </div>
                </div>

                {/* Sub-Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-sans">
                  <div className="bg-slate-950/40 p-3 rounded-sm border border-slate-850">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Estimated Range</span>
                    <span className="text-xs font-semibold text-white font-mono mt-0.5 block">
                      ${(result.priceRange.min / 1000000).toFixed(1)}M - ${(result.priceRange.max / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-sm border border-slate-850">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Price / SqFt</span>
                    <span className="text-xs font-semibold text-white font-mono mt-0.5 block">${result.sqftValue}</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-sm border border-slate-850">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block">School Grade</span>
                    <span className="text-xs font-semibold text-teal-400 font-mono mt-0.5 block">{result.marketInsights.schoolsGrade}</span>
                  </div>
                  <div className="bg-slate-950/40 p-3 rounded-sm border border-slate-850">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Investment Score</span>
                    <span className="text-xs font-semibold text-blue-400 font-mono mt-0.5 block">{result.marketInsights.investmentScore}/100</span>
                  </div>
                </div>

                {/* Appraisal Narrative */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-350">Executive Narrative Commentary</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                    {result.appraisalText}
                  </p>
                </div>

                {/* Custom Upgrades Impact */}
                <div className="bg-[#C9A227]/5 border border-[#C9A227]/20 p-4 rounded-sm space-y-1.5">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#C9A227] flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Selected Luxury Upgrades Impact</span>
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-light italic font-serif">
                    {result.customUpgradesValuation}
                  </p>
                </div>

                {/* Comparables Table */}
                <div className="space-y-3.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-350">Local Verified Comparable Sales</h4>
                  <div className="space-y-2">
                    {result.comparables.map((comp, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-950/30 px-4 py-3 rounded-sm border border-slate-850 text-xs">
                        <div>
                          <span className="font-semibold text-white block">{comp.address}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{comp.beds} Bds | {comp.baths} Bas | {comp.sqft.toLocaleString()} SqFt • {comp.distance} away</span>
                        </div>
                        <span className="font-bold text-white font-mono">{formattedValue(comp.salePrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
