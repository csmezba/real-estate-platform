import { useState } from "react";
import { SlidersHorizontal, Search, RotateCcw, X, Check } from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  availableCities: string[];
}

export default function SearchFilters({
  onFilterChange,
  onReset,
  availableCities
}: SearchFiltersProps) {
  const [city, setCity] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [status, setStatus] = useState("All");
  const [beds, setBeds] = useState("All");
  const [baths, setBaths] = useState("All");
  const [isLuxuryOnly, setIsLuxuryOnly] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const amenitiesList = [
    "Infinity Pool", "Wellness Spa", "Home Cinema", "Smart Automation", "Wine Cellar", "Private Beach Access", "Solar Array"
  ];

  const handleAmenityToggle = (amenity: string) => {
    let updated: string[];
    if (selectedAmenities.includes(amenity)) {
      updated = selectedAmenities.filter(a => a !== amenity);
    } else {
      updated = [...selectedAmenities, amenity];
    }
    setSelectedAmenities(updated);
    triggerChange({ amenities: updated });
  };

  const triggerChange = (updatedFields: any) => {
    const current = {
      city,
      propertyType,
      status,
      beds,
      baths,
      isLuxuryOnly,
      amenities: selectedAmenities,
      ...updatedFields
    };
    onFilterChange(current);
  };

  const handleResetAll = () => {
    setCity("All");
    setPropertyType("All");
    setStatus("All");
    setBeds("All");
    setBaths("All");
    setIsLuxuryOnly(false);
    setSelectedAmenities([]);
    onReset();
  };

  return (
    <div id="advanced-filter-panel" className="bg-slate-900 border border-slate-800/80 rounded-sm p-6 shadow-xl space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-[#C9A227]" />
          <h2 className="font-serif text-lg text-white font-medium">Refine Portfolio</h2>
        </div>
        <button
          onClick={handleResetAll}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white font-semibold uppercase tracking-wider cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* City Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Metropolitan Area</label>
          <select
            value={city}
            onChange={(e) => { setCity(e.target.value); triggerChange({ city: e.target.value }); }}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-sm p-2.5 focus:outline-none focus:border-[#C9A227] transition-colors"
          >
            <option value="All">All Cities</option>
            {availableCities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Structure Format</label>
          <select
            value={propertyType}
            onChange={(e) => { setPropertyType(e.target.value); triggerChange({ propertyType: e.target.value }); }}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-sm p-2.5 focus:outline-none focus:border-[#C9A227] transition-colors"
          >
            <option value="All">All Property Types</option>
            <option value="Luxury Estate">Luxury Estate</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Single Family">Single Family</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>

        {/* Listing Status Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Market Status</label>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); triggerChange({ status: e.target.value }); }}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-sm p-2.5 focus:outline-none focus:border-[#C9A227] transition-colors"
          >
            <option value="All">Buy, Rent, or Sold</option>
            <option value="Buy">For Sale</option>
            <option value="Rent">For Rent</option>
            <option value="Sold">Sold Portfolio</option>
          </select>
        </div>

        {/* Beds Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Min Bedrooms</label>
          <select
            value={beds}
            onChange={(e) => { setBeds(e.target.value); triggerChange({ beds: e.target.value }); }}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-sm p-2.5 focus:outline-none focus:border-[#C9A227] transition-colors"
          >
            <option value="All">Any Beds</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
            <option value="5">5+ Beds</option>
          </select>
        </div>

        {/* Baths Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Min Bathrooms</label>
          <select
            value={baths}
            onChange={(e) => { setBaths(e.target.value); triggerChange({ baths: e.target.value }); }}
            className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-sm p-2.5 focus:outline-none focus:border-[#C9A227] transition-colors"
          >
            <option value="All">Any Baths</option>
            <option value="2">2+ Baths</option>
            <option value="3">3+ Baths</option>
            <option value="4">4+ Baths</option>
          </select>
        </div>
      </div>

      {/* Luxury Tier Switch and Custom Amenities */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4 border-t border-slate-800/60">
        {/* Toggle switch for luxury category */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => { setIsLuxuryOnly(!isLuxuryOnly); triggerChange({ isLuxuryOnly: !isLuxuryOnly }); }}
            className={`w-10 h-6 flex items-center rounded-sm p-1 cursor-pointer transition-colors ${isLuxuryOnly ? 'bg-[#C9A227]' : 'bg-slate-850 border border-slate-800'}`}
          >
            <div className={`bg-slate-950 w-4 h-4 rounded-sm shadow-md transform duration-300 ${isLuxuryOnly ? 'translate-x-4' : ''}`} />
          </button>
          <div>
            <span className="text-xs font-semibold text-white block">Exclusive Luxury Tier Only</span>
            <span className="text-[10px] text-slate-400 italic font-serif">Show only properties in the highest tier of visual craftsmanship.</span>
          </div>
        </div>

        {/* Custom luxury amenities selector */}
        <div className="flex-1 lg:max-w-xl text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-450 block mb-2">Architectural Enhancements</span>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity) => {
              const active = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-medium transition-all flex items-center space-x-1 cursor-pointer ${
                    active 
                      ? 'bg-[#C9A227]/10 border border-[#C9A227] text-[#C9A227] shadow-sm' 
                      : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                  }`}
                >
                  {active && <Check className="w-3 h-3" />}
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
