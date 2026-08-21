import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Compass, Building, Tag, DollarSign, Sparkles } from "lucide-react";
import { Listing } from "../types";

interface InteractiveMapProps {
  listings: Listing[];
  onSelectProperty: (listing: Listing) => void;
}

export default function InteractiveMap({ listings, onSelectProperty }: InteractiveMapProps) {
  const [hoveredProp, setHoveredProp] = useState<Listing | null>(null);

  // Map coordinate projections for our luxury listings (Malibu, NY, Miami, etc.)
  // Projected onto a luxury stylised grid map
  const coordinates: Record<string, { x: number; y: number }> = {
    "prop-1": { x: 120, y: 150 }, // Malibu (Left)
    "prop-2": { x: 550, y: 100 }, // New York (Right Top)
    "prop-3": { x: 100, y: 90 },  // Sausalito (Left Top)
    "prop-4": { x: 590, y: 350 }, // Miami (Right Bottom)
    "prop-5": { x: 140, y: 180 }, // LA Bird Streets
    "prop-6": { x: 110, y: 110 }  // SF Pacific Heights
  };

  const formattedPrice = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="interactive-property-map" className="bg-slate-950 border border-slate-800 rounded-sm p-6 relative h-[500px] overflow-hidden flex flex-col justify-end text-left shadow-2xl">
      
      {/* Background Stylised Map Grid lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1"/>
            </pattern>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#020617" stopOpacity={1} />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Stylised Contour lines representing topography */}
          <path d="M-50,200 Q200,50 400,300 T900,100" fill="none" stroke="#C9A227" strokeWidth="1" strokeOpacity={0.3} strokeDasharray="3 3" />
          <path d="M-50,300 Q150,150 450,400 T950,200" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="5 5" />
          <path d="M-50,400 Q250,250 500,450 T1000,300" fill="none" stroke="#C9A227" strokeWidth="1" strokeOpacity={0.2} strokeDasharray="2 4" />
        </svg>
      </div>

      {/* Floating Radar Pin Canvas */}
      <div className="absolute inset-0 z-10">
        {listings.map((prop) => {
          const coord = coordinates[prop.id] || { x: 300, y: 250 };
          const active = hoveredProp?.id === prop.id;
          
          return (
            <div
              key={prop.id}
              className="absolute cursor-pointer group transition-all"
              style={{ left: `${coord.x}px`, top: `${coord.y}px` }}
              onMouseEnter={() => setHoveredProp(prop)}
              onMouseLeave={() => setHoveredProp(null)}
              onClick={() => onSelectProperty(prop)}
            >
              {/* Animated ping effect */}
              <div className="absolute -left-4 -top-4 w-10 h-10 bg-[#C9A227]/10 rounded-sm animate-ping pointer-events-none scale-75" />
              
              <div className={`p-2 rounded-sm border flex items-center space-x-1.5 shadow-md relative transition-all ${
                active 
                  ? "bg-[#C9A227] border-[#b08e20] text-slate-950 scale-110 z-20" 
                  : "bg-slate-900 border-slate-800 text-white hover:border-[#C9A227]"
              }`}>
                <MapPin className={`w-3.5 h-3.5 ${active ? "text-slate-950 fill-slate-950" : "text-[#C9A227]"}`} />
                <span className="text-[10px] font-bold font-mono">
                  ${(prop.price / 1000000).toFixed(1)}M
                </span>
                
                {prop.isLuxury && (
                  <Sparkles className={`w-3 h-3 ${active ? "text-slate-950 fill-slate-950" : "text-[#C9A227]"}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Compass HUD */}
      <div className="absolute top-6 right-6 bg-slate-900/80 border border-slate-800 p-3.5 rounded-sm backdrop-blur-md z-20 flex items-center space-x-3 pointer-events-none">
        <Compass className="w-5 h-5 text-[#C9A227] animate-slow-spin" />
        <div>
          <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">HUD Coordinate Map</span>
          <span className="text-[10px] font-bold font-mono text-white">NORTH AMER INDEX v1.2</span>
        </div>
      </div>

      {/* Dynamic Popover Property Preview */}
      <div className="relative z-20 max-w-sm pointer-events-none">
        <AnimatePresence>
          {hoveredProp && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="bg-slate-900/95 border border-slate-800/80 p-4 rounded-sm shadow-2xl backdrop-blur-md space-y-3 pointer-events-auto cursor-pointer"
              onClick={() => onSelectProperty(hoveredProp)}
            >
              <div className="aspect-video rounded-sm overflow-hidden relative">
                <img src={hoveredProp.photos[0]} alt={hoveredProp.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-[#C9A227] text-slate-950 text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                  {hoveredProp.propertyType}
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-sm text-white font-semibold line-clamp-1">{hoveredProp.title}</h4>
                <p className="text-[10px] text-slate-400 font-mono">{hoveredProp.city}, {hoveredProp.state} • {hoveredProp.beds} Bds • {hoveredProp.baths} Bas</p>
                <p className="text-sm font-bold text-[#C9A227] font-mono pt-1">{formattedPrice(hoveredProp.price)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
