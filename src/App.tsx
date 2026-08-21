import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, Compass, Layers, Globe, ShieldCheck, Heart, Sparkles, 
  MapPin, Phone, Mail, Clock, MessageSquare, Landmark, HelpCircle, 
  ChevronRight, Calendar, Info, Search, X, Check, Users, Trophy, Star
} from "lucide-react";
import { listings, agents, blogPosts } from "./data";
import { Listing } from "./types";

// Component imports
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchFilters from "./components/SearchFilters";
import PropertyCard from "./components/PropertyCard";
import PropertyModal from "./components/PropertyModal";
import ValuationCenter from "./components/ValuationCenter";
import MarketInsights from "./components/MarketInsights";
import AgentsList from "./components/AgentsList";
import InteractiveMap from "./components/InteractiveMap";
import Footer from "./components/Footer";

export default function App() {
  const [currentView, setCurrentView] = useState<'listings' | 'valuation' | 'insights' | 'agents' | 'blog' | 'about' | 'contact'>('listings');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  
  // Advanced filtered states
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [layoutMode, setLayoutMode] = useState<'grid' | 'map'>('grid');

  // Contact / consultation scheduling modal
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationAgent, setConsultationAgent] = useState<string>("");
  const [consultSuccess, setConsultSuccess] = useState(false);
  const [consultId, setConsultId] = useState("");

  // Search overlay state
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load favorites from local storage on load
  useEffect(() => {
    const saved = localStorage.getItem("luxe_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync favorites
  const toggleFavorite = (id: string, e: any) => {
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(fId => fId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("luxe_favorites", JSON.stringify(updated));
  };

  // Perform dynamic client-side filtering
  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    let result = [...listings];

    if (filters.city && filters.city !== "All") {
      result = result.filter(item => item.city === filters.city);
    }
    if (filters.propertyType && filters.propertyType !== "All") {
      result = result.filter(item => item.propertyType === filters.propertyType);
    }
    if (filters.status && filters.status !== "All") {
      result = result.filter(item => item.status === filters.status);
    }
    if (filters.beds && filters.beds !== "All") {
      result = result.filter(item => item.beds >= Number(filters.beds));
    }
    if (filters.baths && filters.baths !== "All") {
      result = result.filter(item => item.baths >= Number(filters.baths));
    }
    if (filters.isLuxuryOnly) {
      result = result.filter(item => item.isLuxury === true);
    }
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter(item => 
        filters.amenities.every((amenity: string) => item.amenities.includes(amenity))
      );
    }

    setFilteredListings(result);
  };

  // Execute Search from Hero Submit
  const handleHeroSearch = (searchParams: any) => {
    setCurrentView('listings');
    let result = [...listings];

    if (searchParams.cityOrZip) {
      const q = searchParams.cityOrZip.toLowerCase();
      result = result.filter(item => 
        item.city.toLowerCase().includes(q) || 
        item.zip.includes(q) || 
        item.state.toLowerCase().includes(q)
      );
    }
    if (searchParams.propertyType && searchParams.propertyType !== "All") {
      result = result.filter(item => item.propertyType === searchParams.propertyType);
    }
    if (searchParams.beds && searchParams.beds !== "Any") {
      result = result.filter(item => item.beds >= Number(searchParams.beds));
    }
    if (searchParams.maxPrice) {
      result = result.filter(item => item.price <= searchParams.maxPrice);
    }
    result = result.filter(item => item.status === searchParams.status);

    setFilteredListings(result);

    // Scroll to search results smoothly
    setTimeout(() => {
      document.getElementById("listings-stage-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Global Search Overlay trigger
  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setCurrentView('listings');
    setSearchOverlayOpen(false);

    const q = searchQuery.toLowerCase();
    const result = listings.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.zip.includes(q) ||
      item.address.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );

    setFilteredListings(result);
    setSearchQuery("");

    setTimeout(() => {
      document.getElementById("listings-stage-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Advisory Booking submission from global floating CTA
  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("cName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("cEmail") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("cPhone") as HTMLInputElement).value;
    const notes = (form.elements.namedItem("cNotes") as HTMLTextAreaElement).value;

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, notes, agentName: consultationAgent })
      });
      const data = await response.json();
      if (data.success) {
        setConsultId(data.details.id);
        setConsultSuccess(true);
        setTimeout(() => {
          setConsultationModalOpen(false);
          setConsultSuccess(false);
          setConsultationAgent("");
        }, 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeRosterListings = showFavoritesOnly 
    ? filteredListings.filter(item => favorites.includes(item.id))
    : filteredListings;

  const availableCities = Array.from(new Set(listings.map(l => l.city)));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-[#C9A227] selection:text-slate-950 font-sans antialiased overflow-x-hidden flex flex-col justify-between">
      
      {/* 1. Header component */}
      <Header
        onSearchClick={() => setSearchOverlayOpen(true)}
        favoritesCount={favorites.length}
        onFavoritesClick={() => {
          setCurrentView('listings');
          setShowFavoritesOnly(!showFavoritesOnly);
          setTimeout(() => {
            document.getElementById("listings-stage-anchor")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        onConsultationClick={(agentName) => {
          setConsultationAgent(agentName || "Elite Advisory Group");
          setConsultationModalOpen(true);
        }}
        onViewChange={(view) => {
          setCurrentView(view);
          setShowFavoritesOnly(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        currentView={currentView}
      />

      {/* 2. Hero Section (Only shown on Listings view) */}
      {currentView === 'listings' && (
        <Hero
          onSearch={handleHeroSearch}
          onViewChange={(view) => {
            setCurrentView(view as any);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* Main Page Canvas container */}
      <main className="flex-1 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ====================================
              VIEW A: LISTINGS / PORTFOLIO
             ==================================== */}
          {currentView === 'listings' && (
            <motion.div
              key="listingsView"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Anchor element for smooth scroll focus */}
              <div id="listings-stage-anchor" className="scroll-mt-24 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Asset Catalogue</span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mt-1">
                    {showFavoritesOnly ? "Your Curated Showcase" : "Premier Portfolio Indexes"}
                  </h2>
                </div>

                {/* Grid vs Map & Favorites Toggle actions */}
                <div className="flex items-center space-x-3 self-start sm:self-center">
                  <button
                    onClick={() => setLayoutMode(layoutMode === 'grid' ? 'map' : 'grid')}
                    className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-sm text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>{layoutMode === 'grid' ? 'Tactile Map View' : 'Tactile Grid View'}</span>
                  </button>

                  <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`px-4 py-2 border rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
                      showFavoritesOnly 
                        ? 'bg-rose-500/10 border-rose-500 text-rose-500 font-bold' 
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-500' : ''}`} />
                    <span> Curated ({favorites.length})</span>
                  </button>
                </div>
              </div>

              {/* Advanced search filter parameters bar */}
              <SearchFilters
                onFilterChange={handleFilterChange}
                onReset={() => setFilteredListings(listings)}
                availableCities={availableCities}
              />

              {/* Layout view conditional rendering */}
              {layoutMode === 'map' ? (
                <InteractiveMap 
                  listings={activeRosterListings} 
                  onSelectProperty={(listing) => setSelectedListing(listing)} 
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeRosterListings.length > 0 ? (
                    activeRosterListings.map((prop) => (
                      <PropertyCard
                        key={prop.id}
                        listing={prop}
                        isFavorite={favorites.includes(prop.id)}
                        onToggleFavorite={toggleFavorite}
                        onQuickView={(p) => setSelectedListing(p)}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center space-y-4 bg-slate-900/40 rounded-sm border border-slate-900">
                      <div className="w-12 h-12 rounded-sm bg-slate-950 flex items-center justify-center mx-auto border border-slate-850">
                        <Info className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg text-white font-semibold">Zero Assets Located</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                          Your active parameters do not match our current off-market portfolio. Please refine filters or request a custom acquisition study.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Beautiful luxury reviews as asymmetrical showcase under the portfolio */}
              <section className="pt-16 border-t border-slate-900 text-left space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Verified Client Sentiment</span>
                  <h3 className="font-serif text-3xl text-white font-medium">Acquisitions Confirmed with Absolute Discretion</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  
                  {/* Testimonial 1 */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4 shadow-sm">
                    <div className="flex items-center space-x-1 text-[#C9A227]">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C9A227] stroke-[#C9A227]" />)}
                    </div>
                    <blockquote className="text-sm text-slate-300 font-sans font-light leading-relaxed">
                      "Aura Estates has completely redefined our real estate acquisitions process. Alistair's understanding of off-market Manhattan coop board metrics and his absolute discretion was unparalleled. It's real estate at a private banking level."
                    </blockquote>
                    <div className="flex items-center space-x-3.5 pt-2 border-t border-slate-800/60">
                      <div className="w-10 h-10 rounded-sm bg-slate-800 flex items-center justify-center text-xs font-bold text-[#C9A227] border border-slate-750">HR</div>
                      <div>
                        <span className="font-serif text-sm text-white font-bold block">Hamilton Ross</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Acquired Glass Pavilion, Malibu</span>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4 shadow-sm md:translate-y-4">
                    <div className="flex items-center space-x-1 text-[#C9A227]">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C9A227] stroke-[#C9A227]" />)}
                    </div>
                    <blockquote className="text-sm text-slate-300 font-sans font-light leading-relaxed">
                      "Using their AI Home Valuation was mind-blowing. It generated a Sotheby's level narrative assessment detailing pricing and upgrades with impeccable analytical precision. We scheduled a showing and closed within 21 days."
                    </blockquote>
                    <div className="flex items-center space-x-3.5 pt-2 border-t border-slate-800/60">
                      <div className="w-10 h-10 rounded-sm bg-slate-800 flex items-center justify-center text-xs font-bold text-[#C9A227] border border-slate-750">VK</div>
                      <div>
                        <span className="font-serif text-sm text-white font-bold block">Valerie Kincaid</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Acquired Skyline Penthouse, NY</span>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4 shadow-sm">
                    <div className="flex items-center space-x-1 text-[#C9A227]">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C9A227] stroke-[#C9A227]" />)}
                    </div>
                    <blockquote className="text-sm text-slate-300 font-sans font-light leading-relaxed">
                      "Discretion, accuracy, and sheer aesthetic pleasure. The team's structural approach to real estate matching is unmatched. Christian Thorne knew exactly what we were looking for before we did."
                    </blockquote>
                    <div className="flex items-center space-x-3.5 pt-2 border-t border-slate-800/60">
                      <div className="w-10 h-10 rounded-sm bg-slate-800 flex items-center justify-center text-xs font-bold text-[#C9A227] border border-slate-750">DM</div>
                      <div>
                        <span className="font-serif text-sm text-white font-bold block">Duchess Marcus</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Acquired Floating Pavilion, Sausalito</span>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </motion.div>
          )}

          {/* ====================================
              VIEW B: AI VALUATION CENTER
             ==================================== */}
          {currentView === 'valuation' && (
            <motion.div
              key="valuationView"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ValuationCenter />
            </motion.div>
          )}

          {/* ====================================
              VIEW C: MARKET INSIGHTS INDEX
             ==================================== */}
          {currentView === 'insights' && (
            <motion.div
              key="insightsView"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MarketInsights />
            </motion.div>
          )}

          {/* ====================================
              VIEW D: ELITE BROKER ROSTER
             ==================================== */}
          {currentView === 'agents' && (
            <motion.div
              key="agentsView"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AgentsList
                onScheduleConsultation={(agentName) => {
                  setConsultationAgent(agentName);
                  setConsultationModalOpen(true);
                }}
              />
            </motion.div>
          )}

          {/* ====================================
              VIEW E: EDITORIAL MAGAZINE (BLOG)
              ==================================== */}
          {currentView === 'blog' && (
            <motion.div
              key="blogView"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12 text-left"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">The Luxe Gazette</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium">Architectural & Market Journal</h2>
                <p className="text-sm text-slate-400 font-sans font-light leading-relaxed">
                  Carefully curated editorial coverage detailing high-end design, construction engineering boundaries, and private banking indices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden group shadow-lg flex flex-col justify-between">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-slate-950 border border-slate-800 text-[9px] text-[#C9A227] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-500 font-semibold font-mono">{post.date} • {post.readTime}</span>
                        <h4 className="font-serif text-base text-white font-bold group-hover:text-[#C9A227] transition-colors line-clamp-2">{post.title}</h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-850 flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 font-medium">By {post.author}</span>
                        <span className="text-[#C9A227] font-bold uppercase tracking-wider flex items-center space-x-1 hover:text-[#C9A227] transition-colors cursor-pointer">
                          <span>Examine Study</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

          {/* ====================================
              VIEW F: CORPORATE HERITAGE (ABOUT)
              ==================================== */}
          {currentView === 'about' && (
            <motion.div
              key="aboutView"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16 text-left"
            >
              {/* Grand vision segment */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Corporate Heritage & Vision</span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium leading-tight">Establishing High-Performance Real Estate Standards</h2>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                    Founded in 1998, Luxe Estates operates as a bespoke real estate advisory firm catering to private family offices, institutional investors, and discerning individuals seeking architectural masterpieces.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans font-light">
                    Our team merges elite structural analysis with private wealth advisory. Every property we represent undergoes exhaustive structural, zoning, and qualitative reviews to guarantee absolute yield security.
                  </p>
                </div>
                <div className="lg:col-span-6 aspect-video bg-slate-900 border border-slate-800 rounded-sm overflow-hidden shadow-2xl relative">
                  <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200" alt="Architectural Heritage representation" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/20" />
                </div>
              </div>

              {/* Core Corporate Timeline */}
              <div className="space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Historical Development</span>
                  <h3 className="font-serif text-2xl text-white font-medium">Bespoke Timeline</h3>
                </div>

                <div className="relative max-w-4xl mx-auto border-l border-slate-800 pl-6 space-y-8 text-xs">
                  <div className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-sm bg-[#C9A227] border-4 border-slate-950" />
                    <span className="text-[#C9A227] font-bold font-mono text-sm block">1998</span>
                    <h5 className="font-semibold text-white text-sm">Advisory Firm Inception</h5>
                    <p className="text-slate-400 font-light leading-relaxed max-w-2xl">Luxe Estates is established in Greenwich, Connecticut, providing bespoke residential matching to family offices.</p>
                  </div>

                  <div className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-sm bg-blue-500 border-4 border-slate-950" />
                    <span className="text-blue-500 font-bold font-mono text-sm block">2008</span>
                    <h5 className="font-semibold text-white text-sm">Coastal Market Expansion</h5>
                    <p className="text-slate-400 font-light leading-relaxed max-w-2xl">Inaugurates regional flagship offices in Beverly Hills (CA) and Park Avenue (NY) to support coastal luxury transactions.</p>
                  </div>

                  <div className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-sm bg-teal-500 border-4 border-slate-950" />
                    <span className="text-teal-500 font-bold font-mono text-sm block">2018</span>
                    <h5 className="font-semibold text-white text-sm">Sotheby's and Compass Interlock</h5>
                    <p className="text-slate-400 font-light leading-relaxed max-w-2xl">Aggregates regional broker syndications, registering over $20B in life-time acquisition volume.</p>
                  </div>

                  <div className="relative space-y-2">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-sm bg-[#C9A227] border-4 border-slate-950" />
                    <span className="text-[#C9A227] font-bold font-mono text-sm block">2026</span>
                    <h5 className="font-semibold text-white text-sm">AI quantitative appraisal system launches</h5>
                    <p className="text-slate-400 font-light leading-relaxed max-w-2xl">Pioneering the first fully integrated Generative AI home valuation engine modeled on Sotheby's appraisal parameters.</p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* ====================================
              VIEW G: CONTACT SHOWROOMS (CONTACT)
              ==================================== */}
          {currentView === 'contact' && (
            <motion.div
              key="contactView"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12 text-left"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">Contact & Support</span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium">Luxury Showroom Index</h2>
                <p className="text-sm text-slate-400 font-sans font-light leading-relaxed">
                  Coordinate a physical viewing or access our coordinators directly via secure private banking channels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Office 1: Manhattan */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-sm bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">NY</div>
                    <h4 className="font-serif text-lg text-white font-bold">Manhattan Showroom</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      721 Park Avenue, Duplex Lobby <br />
                      New York, NY 10021
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-850 space-y-1 text-xs text-slate-400">
                    <p className="flex justify-between"><span>Secured Tel:</span> <span className="font-mono text-white">(212) 555-0100</span></p>
                    <p className="flex justify-between"><span>Advisory Hours:</span> <span className="font-mono text-white">09 AM - 06 PM</span></p>
                  </div>
                </div>

                {/* Office 2: Beverly Hills */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-sm bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center font-bold">BH</div>
                    <h4 className="font-serif text-lg text-white font-bold">Beverly Hills Flagroom</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      9440 Wilshire Blvd, Suite 120 <br />
                      Beverly Hills, CA 90212
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-850 space-y-1 text-xs text-slate-400">
                    <p className="flex justify-between"><span>Secured Tel:</span> <span className="font-mono text-white">(310) 555-0200</span></p>
                    <p className="flex justify-between"><span>Advisory Hours:</span> <span className="font-mono text-white">09 AM - 06 PM</span></p>
                  </div>
                </div>

                {/* Office 3: Miami */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-sm bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">MIA</div>
                    <h4 className="font-serif text-lg text-white font-bold">Miami Biscayne Office</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      420 Biscayne Blvd, Unit 105 <br />
                      Miami, FL 33132
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-850 space-y-1 text-xs text-slate-400">
                    <p className="flex justify-between"><span>Secured Tel:</span> <span className="font-mono text-white">(305) 555-0300</span></p>
                    <p className="flex justify-between"><span>Advisory Hours:</span> <span className="font-mono text-white">09 AM - 06 PM</span></p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <Footer onViewChange={(view) => {
        setCurrentView(view);
        setShowFavoritesOnly(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} />

      {/* 4. Sticky Floating advisor consultation button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setConsultationAgent("Elite Advisory Group");
            setConsultationModalOpen(true);
          }}
          className="p-4 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 rounded-sm shadow-2xl hover:shadow-[#C9A227]/20 hover:scale-105 transition-all flex items-center justify-center cursor-pointer group relative"
          title="Direct Consultation"
        >
          <MessageSquare className="w-5.5 h-5.5 stroke-[2.5px]" />
          <span className="absolute right-full mr-3 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
            Direct Consultation
          </span>
        </button>
      </div>

      {/* 5. Search Overlay Overlay */}
      <AnimatePresence>
        {searchOverlayOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl text-left space-y-4"
            >
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">Universal Portfolio Query</span>
                <button 
                  onClick={() => setSearchOverlayOpen(false)}
                  className="p-1.5 rounded-sm bg-slate-900 border border-slate-800 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleGlobalSearchSubmit} className="relative">
                <Search className="absolute left-4 top-4.5 w-6 h-6 text-slate-500" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Query Malibu, Sausalito, Penthouse, Pool, Glass..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-slate-800 rounded-sm py-4.5 pl-14 pr-4 text-lg text-white focus:outline-none focus:border-[#C9A227] transition-all font-sans font-light"
                />
              </form>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Press Enter to trigger Universal Index analysis.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Consultation request modal */}
      <AnimatePresence>
        {consultationModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-sm p-6 text-left shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#C9A227]" />
                  <h4 className="font-serif text-base text-white font-semibold">Consult advisory advisor</h4>
                </div>
                <button onClick={() => setConsultationModalOpen(false)} className="p-1.5 bg-slate-950/50 rounded-sm hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {consultSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-sm bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7 stroke-[2.5px]" />
                  </div>
                  <h5 className="font-semibold text-white">Advisory Request Registered</h5>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                    Thank you. Your consultation with our luxury Advisory Group has been scheduled. Refer code: <b>{consultId}</b>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConsultationSubmit} className="space-y-3 text-xs font-sans">
                  
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-slate-400">Broker Assignment</label>
                    <input
                      type="text"
                      disabled
                      value={consultationAgent}
                      className="w-full bg-slate-950/50 border border-slate-850 p-2.5 text-slate-400 rounded-sm cursor-not-allowed font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Full Client Name</label>
                    <input
                      type="text"
                      required
                      name="cName"
                      placeholder="John Doe"
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Email Connection</label>
                      <input
                        type="email"
                        required
                        name="cEmail"
                        placeholder="john@example.com"
                        className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Phone Connection</label>
                      <input
                        type="tel"
                        required
                        name="cPhone"
                        placeholder="(310) 555-0100"
                        className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Acquisitions / Portfolio Notes</label>
                    <textarea
                      name="cNotes"
                      rows={3}
                      placeholder="Detail any specific zip codes, budget goals, or layout configurations..."
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 font-bold uppercase tracking-widest text-[10px] rounded-sm shadow-md hover:shadow-lg flex items-center justify-center space-x-1 cursor-pointer mt-2"
                  >
                    <span>Transmit Advisory Request</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Full detail property sheet modal */}
      <PropertyModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        isFavorite={selectedListing ? favorites.includes(selectedListing.id) : false}
        onToggleFavorite={toggleFavorite}
        onBookConsultation={(details) => {
          // Booking already handled inside modal state, we can log success or sync if needed
        }}
      />

    </div>
  );
}
