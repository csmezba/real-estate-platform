import React from "react";
import { motion } from "motion/react";
import { Heart, Maximize2, Compass, School, Sparkles, AlertCircle } from "lucide-react";
import { Listing } from "../types";

interface PropertyCardProps {
  key?: string | number;
  listing: Listing;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: any) => void;
  onQuickView: (listing: Listing) => void;
}

export default function PropertyCard({
  listing,
  isFavorite,
  onToggleFavorite,
  onQuickView
}: PropertyCardProps) {
  
  // Format price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(listing.price);

  // Approximate mortgage estimate (70% LTV, 6.5% rate, 30yr)
  const estimatedMonthlyMortgage = Math.round((listing.price * 0.8 * 0.00632) + (listing.hoa) + (listing.taxes / 12));

  return (
    <motion.div
      id={`property-card-${listing.id}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-slate-900 border border-slate-800/80 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl hover:border-slate-700/60 flex flex-col h-full group"
    >
      {/* Property Image & Status Badges */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={listing.photos[0]}
          alt={listing.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />

        {/* Status indicator badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {listing.isLuxury && (
            <span className="bg-[#C9A227] text-slate-950 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm flex items-center space-x-1 shadow-md">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              <span>Luxury Residence</span>
            </span>
          )}
          {listing.isOpenHouse && (
            <span className="bg-teal-500 text-slate-950 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md">
              Open House
            </span>
          )}
        </div>

        {/* Favorite toggle button */}
        <button
          onClick={(e) => onToggleFavorite(listing.id, e)}
          className="absolute top-4 right-4 p-2.5 rounded-sm bg-slate-950/70 backdrop-blur-md border border-slate-800/50 hover:bg-slate-900 text-slate-400 hover:text-rose-500 transition-all shadow-md z-10 cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "text-rose-500 fill-rose-500" : ""}`} />
        </button>

        {/* Price on image corner */}
        <div className="absolute bottom-4 left-4">
          <p className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-tight">
            {formattedPrice}
            {listing.status === "Rent" && <span className="text-sm font-sans font-light text-slate-300"> /mo</span>}
          </p>
        </div>
      </div>

      {/* Property Information & Specs */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2 text-left">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span className="text-[#C9A227]">{listing.propertyType}</span>
            <span className="font-mono text-[10px]">{listing.city}, {listing.state}</span>
          </div>
          
          <h3 className="font-serif text-lg text-white font-medium group-hover:text-[#C9A227] transition-colors line-clamp-1">
            {listing.title}
          </h3>
          
          <p className="text-xs text-slate-400 font-sans font-light line-clamp-2">
            {listing.description}
          </p>
        </div>

        {/* Standard Real Estate Metrics */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-850 text-center font-sans text-xs">
          <div className="text-left">
            <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Bedrooms</span>
            <span className="font-bold text-white font-mono">{listing.beds} <span className="text-[10px] font-normal text-slate-500">Bds</span></span>
          </div>
          <div className="text-center">
            <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Bathrooms</span>
            <span className="font-bold text-white font-mono">{listing.baths} <span className="text-[10px] font-normal text-slate-500">Bas</span></span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Living Area</span>
            <span className="font-bold text-white font-mono">{listing.sqft.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">SqFt</span></span>
          </div>
        </div>

        {/* Micro Neighborhood Scores */}
        <div className="flex justify-between items-center text-[9px] text-slate-450 bg-slate-950/50 p-2.5 rounded-sm border border-slate-850 font-medium">
          <div className="flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-teal-500 opacity-80" />
            <span>Walk: <b className="text-white font-mono">{listing.walkScore}</b></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <School className="w-3.5 h-3.5 text-blue-450 opacity-80" />
            <span>Schools: <b className="text-white font-mono">{listing.neighborhood.schoolRating}/10</b></span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#C9A227] opacity-85" />
            <span>Energy: <b className="text-white font-mono">{listing.energyScore}/100</b></span>
          </div>
        </div>

        {/* Mortgage Estimator Quick Read & CTA */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-left">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Est. Mortgage</span>
            <span className="text-xs font-semibold text-slate-300 font-mono">${estimatedMonthlyMortgage.toLocaleString()}/mo</span>
          </div>

          <button
            onClick={() => onQuickView(listing)}
            className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-[#C9A227] hover:text-[#b08e20] group-hover:translate-x-0.5 transition-all cursor-pointer bg-transparent"
          >
            <span>Examine Details</span>
            <Maximize2 className="w-3 h-3 stroke-[2.5px]" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}
