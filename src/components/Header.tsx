import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Search, Heart, Sliders, Calendar, Phone, 
  ChevronDown, MapPin, Building, ShieldCheck, DollarSign 
} from "lucide-react";

interface HeaderProps {
  onSearchClick: () => void;
  favoritesCount: number;
  onFavoritesClick: () => void;
  onConsultationClick: (agentName?: string) => void;
  onViewChange: (view: 'listings' | 'valuation' | 'insights' | 'agents' | 'blog' | 'about' | 'contact') => void;
  currentView: string;
}

export default function Header({
  onSearchClick,
  favoritesCount,
  onFavoritesClick,
  onConsultationClick,
  onViewChange,
  currentView
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Portfolio", view: "listings", icon: Building },
    { label: "AI Valuation", view: "valuation", icon: ShieldCheck },
    { label: "Market Insights", view: "insights", icon: Sliders },
    { label: "Elite Agents", view: "agents", icon: Calendar },
    { label: "Magazine", view: "blog", icon: Phone },
  ];

  const toggleMegaMenu = (menu: string) => {
    setActiveMegaMenu(activeMegaMenu === menu ? null : menu);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-slate-950/90 border-b border-slate-800/60 backdrop-blur-md py-3 shadow-lg" 
          : "bg-gradient-to-b from-slate-950/80 to-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => onViewChange('listings')} 
            className="flex items-center cursor-pointer space-x-3 group"
          >
            <div className="w-10 h-10 bg-[#C9A227] flex items-center justify-center rounded-sm">
              <span className="text-white font-serif font-bold text-2xl">L</span>
            </div>
            <div>
              <span className="font-serif text-xl tracking-widest text-white uppercase group-hover:text-[#C9A227] transition-colors">
                Luxe <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-slate-400">Estates</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    onViewChange(item.view as any);
                    setActiveMegaMenu(null);
                  }}
                  className={`flex items-center space-x-1.5 font-sans text-xs uppercase tracking-widest font-semibold transition-all relative py-2 cursor-pointer ${
                    isActive 
                      ? "text-[#C9A227] font-bold" 
                      : "text-slate-300 hover:text-[#C9A227]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-75" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeHeaderUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A227]" 
                    />
                  )}
                </button>
              );
            })}

            {/* Mega menu custom triggers */}
            <div className="relative">
              <button 
                onClick={() => toggleMegaMenu("about")}
                className="flex items-center space-x-1 font-sans text-xs uppercase tracking-widest font-semibold text-slate-300 hover:text-[#C9A227] cursor-pointer"
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMegaMenu === 'about' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeMegaMenu === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-80 rounded-sm bg-slate-900 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="space-y-4">
                      <div className="border-b border-slate-800 pb-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A227]">About Luxe Estates</p>
                        <p className="text-xs text-slate-400 mt-1 italic font-serif">Sustaining modern luxury and absolute trust since 1998.</p>
                      </div>
                      <div className="space-y-2">
                        <button onClick={() => { onViewChange('about'); setActiveMegaMenu(null); }} className="w-full text-left text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-[#C9A227] hover:translate-x-1 transition-transform block">Our Mission & Team</button>
                        <button onClick={() => { onViewChange('contact'); setActiveMegaMenu(null); }} className="w-full text-left text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-[#C9A227] hover:translate-x-1 transition-transform block">Contact Luxury Office</button>
                        <button onClick={() => { onViewChange('valuation'); setActiveMegaMenu(null); }} className="w-full text-left text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-[#C9A227] hover:translate-x-1 transition-transform block">Home Value Appraisal</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Toolbar Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={onSearchClick}
              className="p-2 text-slate-400 hover:text-[#C9A227] hover:bg-slate-900 rounded-sm transition-colors cursor-pointer"
              title="Search Portfolio"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              onClick={onFavoritesClick}
              className="p-2 text-slate-400 hover:text-[#C9A227] hover:bg-slate-900 rounded-sm transition-colors relative cursor-pointer"
              title="Saved Properties"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onConsultationClick()}
              className="px-6 py-3 border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all rounded-sm cursor-pointer"
            >
              Consult Advisory Group
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <button 
              onClick={onFavoritesClick}
              className="p-2 text-slate-400 hover:text-white rounded-full relative cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950 border-b border-slate-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onViewChange(item.view as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors ${
                      isActive 
                        ? "bg-slate-900 text-[#C9A227]" 
                        : "text-slate-300 hover:bg-slate-900/60 hover:text-[#C9A227]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              <div className="h-[1px] bg-slate-900 my-2" />
              
              <div className="grid grid-cols-2 gap-3 px-3">
                <button
                  onClick={() => { onViewChange('about'); setMobileMenuOpen(false); }}
                  className="text-center py-2.5 text-[10px] uppercase tracking-widest text-slate-400 hover:text-white bg-slate-900/40 rounded-sm"
                >
                  About Team
                </button>
                <button
                  onClick={() => { onViewChange('contact'); setMobileMenuOpen(false); }}
                  className="text-center py-2.5 text-[10px] uppercase tracking-widest text-slate-400 hover:text-white bg-slate-900/40 rounded-sm"
                >
                  Office Map
                </button>
              </div>

              <div className="px-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onConsultationClick();
                  }}
                  className="w-full py-3 bg-[#C9A227] text-slate-950 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm text-center shadow-md cursor-pointer"
                >
                  Schedule Advisory Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
