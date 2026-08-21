import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, Phone, Mail, Award, CheckCircle, Star, 
  MapPin, ShieldAlert, Calendar, ArrowRight, Check 
} from "lucide-react";
import { agents } from "../data";
import { Agent } from "../types";

interface AgentsListProps {
  onScheduleConsultation: (agentName: string) => void;
}

export default function AgentsList({ onScheduleConsultation }: AgentsListProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Messaging/Direct mail state
  const [msgName, setMsgName] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgText, setMsgText] = useState("");
  const [msgSent, setMsgSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName || !msgEmail || !msgText) return;
    
    // Simulate sending success
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setMsgName("");
      setMsgEmail("");
      setMsgText("");
      setSelectedAgent(null);
    }, 3000);
  };

  return (
    <div className="space-y-12">
      
      {/* Title Block */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#C9A227]/10 border border-[#C9A227]/20 px-4 py-1.5 rounded-sm">
          <Trophy className="w-4 h-4 text-[#C9A227]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">Industry Leadership</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium">Meet the Elite Advisory Group</h2>
        <p className="text-sm text-slate-400 font-sans font-light leading-relaxed">
          Our private brokers rank within the top 0.1% of national performers. Driven by rigorous structural research, confidentiality, and unparalleled customer success.
        </p>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            id={`agent-card-${agent.id}`}
            whileHover={{ y: -6 }}
            className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden flex flex-col justify-between shadow-lg hover:border-slate-700/60 transition-all text-left"
          >
            {/* Header Portrait */}
            <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden">
              <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Award Badges */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#C9A227] text-slate-950 text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm flex items-center space-x-1 shadow-md">
                  <Trophy className="w-3 h-3 fill-slate-950" />
                  <span>Chairman's Circle</span>
                </span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] text-[#C9A227] font-semibold tracking-widest uppercase block">{agent.role}</span>
                <h3 className="font-serif text-lg sm:text-xl text-white font-medium mt-0.5">{agent.name}</h3>
              </div>
            </div>

            {/* Roster Information details */}
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Stats list */}
                <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-3 rounded-sm border border-slate-850 text-center font-sans">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Volume Sold</span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5 block">{agent.soldVolume}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Experience</span>
                    <span className="text-sm font-bold text-white font-mono mt-0.5 block">{agent.experienceYears} Yrs</span>
                  </div>
                </div>

                {/* Specialties block */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Portfolio Specializations</span>
                  <div className="flex flex-wrap gap-1">
                    {agent.specialties.map((spec, i) => (
                      <span key={i} className="bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-sm text-[10px] text-slate-300 font-light font-sans block">{spec}</span>
                    ))}
                  </div>
                </div>

                {/* Awards block */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Key Accolades</span>
                  <div className="space-y-1 text-[10px] text-slate-400 font-sans font-light">
                    {agent.awards.map((aw, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>{aw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Roster actions */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/60 font-sans">
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="py-2.5 bg-slate-950 hover:bg-slate-950/80 border border-slate-850 text-slate-300 text-[10px] uppercase tracking-wider font-semibold rounded-sm text-center transition-all cursor-pointer"
                >
                  Direct Inquiry
                </button>
                <button
                  onClick={() => onScheduleConsultation(agent.name)}
                  className="py-2.5 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 text-[10px] uppercase tracking-wider font-bold rounded-sm text-center shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Schedule Tour
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct Contact Message Modal Overlay */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-sm overflow-hidden shadow-2xl p-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-sm overflow-hidden border border-slate-800">
                    <img src={selectedAgent.photo} alt={selectedAgent.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm text-white font-bold">Inquire with {selectedAgent.name}</h4>
                    <span className="text-[10px] text-[#C9A227] uppercase tracking-widest block">{selectedAgent.role}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="p-1.5 bg-slate-950/50 rounded-sm hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {msgSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-sm bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2.5px]" />
                  </div>
                  <h5 className="font-semibold text-white">Message Transmitted</h5>
                  <p className="text-xs text-slate-400">Your direct inquiry is securely routed. {selectedAgent.name} will respond immediately.</p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3 text-xs font-sans">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Full Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={msgName}
                      onChange={(e) => setMsgName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={msgEmail}
                      onChange={(e) => setMsgEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-450">Direct Message / Inquiry</label>
                    <textarea
                      required
                      rows={4}
                      placeholder={`Hello ${selectedAgent.name}, I am interested in exploring your luxury portfolio...`}
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 p-2.5 rounded-sm text-white focus:outline-none focus:border-[#C9A227] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C9A227] hover:bg-[#b08e20] text-slate-950 font-bold uppercase tracking-widest text-[10px] rounded-sm shadow-md hover:shadow-lg flex items-center justify-center space-x-1 cursor-pointer mt-2"
                  >
                    <span>Transmit Message</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// X component definition
function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
