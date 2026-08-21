import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { 
  TrendingUp, Home, ArrowUpRight, BarChart3, LineChart as LucideLineChart, 
  Sparkles, Calendar, Globe, Layers, Percent
} from "lucide-react";

export default function MarketInsights() {
  const [activeRegion, setActiveRegion] = useState<'National' | 'Northeast' | 'California' | 'Florida'>('National');

  const trendData = {
    National: [
      { year: "2021", avgPrice: 1250000, inventory: 4500, salesVolume: 920 },
      { year: "2022", avgPrice: 1450000, inventory: 3800, salesVolume: 850 },
      { year: "2023", avgPrice: 1620000, inventory: 3200, salesVolume: 740 },
      { year: "2024", avgPrice: 1550000, inventory: 4100, salesVolume: 790 },
      { year: "2025", avgPrice: 1780000, inventory: 3600, salesVolume: 890 },
      { year: "2026", avgPrice: 1950000, inventory: 2900, salesVolume: 980 }
    ],
    Northeast: [
      { year: "2021", avgPrice: 1100000, inventory: 1800, salesVolume: 410 },
      { year: "2022", avgPrice: 1250000, inventory: 1600, salesVolume: 390 },
      { year: "2023", avgPrice: 1390000, inventory: 1400, salesVolume: 350 },
      { year: "2024", avgPrice: 1320000, inventory: 1700, salesVolume: 370 },
      { year: "2025", avgPrice: 1490000, inventory: 1500, salesVolume: 430 },
      { year: "2026", avgPrice: 1650000, inventory: 1200, salesVolume: 480 }
    ],
    California: [
      { year: "2021", avgPrice: 2450000, inventory: 2100, salesVolume: 620 },
      { year: "2022", avgPrice: 2890000, inventory: 1900, salesVolume: 580 },
      { year: "2023", avgPrice: 3200000, inventory: 1500, salesVolume: 490 },
      { year: "2024", avgPrice: 2950000, inventory: 2200, salesVolume: 530 },
      { year: "2025", avgPrice: 3450000, inventory: 1800, salesVolume: 610 },
      { year: "2026", avgPrice: 3800000, inventory: 1400, salesVolume: 690 }
    ],
    Florida: [
      { year: "2021", avgPrice: 1150000, inventory: 1500, salesVolume: 380 },
      { year: "2022", avgPrice: 1350000, inventory: 1200, salesVolume: 350 },
      { year: "2023", avgPrice: 1550000, inventory: 1100, salesVolume: 310 },
      { year: "2024", avgPrice: 1480000, inventory: 1400, salesVolume: 340 },
      { year: "2025", avgPrice: 1720000, inventory: 1150, salesVolume: 390 },
      { year: "2026", avgPrice: 1920000, inventory: 980, salesVolume: 440 }
    ]
  };

  const selectedData = trendData[activeRegion];

  const formattedPrice = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  const microMetrics = [
    { label: "Median List Price", value: formattedPrice(selectedData[5].avgPrice), change: "+9.5% YoY", status: "up" },
    { label: "Active Houses Inventory", value: `${selectedData[5].inventory} listings`, change: "-19.4% YoY", status: "down" },
    { label: "Average Term Yield", value: `${selectedData[5].salesVolume} sales`, change: "+14.9% MoM", status: "up" },
    { label: "Avg Days on Submarket", value: "14 Days", change: "Historic Low", status: "neutral" }
  ];

  return (
    <div className="space-y-12">
      
      {/* Title block */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#C9A227]/10 border border-[#C9A227]/20 px-4 py-1.5 rounded-sm">
          <TrendingUp className="w-4 h-4 text-[#C9A227]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">Quantitative Market Research</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-medium">Housing Insights & Trends</h2>
        <p className="text-sm text-slate-400 font-sans font-light leading-relaxed">
          Sourced from live transaction indices, our database indexes luxury asset performance, historical appreciations, and listing density levels.
        </p>
      </div>

      {/* Regional filter select row */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(['National', 'Northeast', 'California', 'Florida'] as const).map((reg) => (
          <button
            key={reg}
            onClick={() => setActiveRegion(reg)}
            className={`px-5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeRegion === reg 
                ? 'bg-[#C9A227] text-slate-950 font-bold shadow-md shadow-[#C9A227]/10' 
                : 'bg-slate-900 border border-slate-850 text-slate-400 hover:text-white'
            }`}
          >
            {reg} Index
          </button>
        ))}
      </div>

      {/* Micro metrics grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {microMetrics.map((met, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800/85 p-5 rounded-sm text-left space-y-1.5 shadow-md">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">{met.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-lg sm:text-xl font-bold text-white font-mono">{met.value}</span>
              <span className={`text-[10px] font-mono font-bold ${
                met.status === 'up' ? 'text-teal-400' : met.status === 'down' ? 'text-rose-400' : 'text-slate-400'
              }`}>{met.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Chart grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        
        {/* Chart 1: Average Price Curve */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm shadow-lg space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <LucideLineChart className="w-5 h-5 text-[#C9A227]" />
            <div>
              <h3 className="font-serif text-base text-white font-medium">Value Appreciation Index</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Average listing valuation trajectory over six fiscal terms.</p>
            </div>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A227" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="year" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false}
                  tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value: any) => [formattedPrice(value), "Avg Valuation"]}
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "2px" }}
                />
                <Area type="monotone" dataKey="avgPrice" stroke="#C9A227" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Inventory vs. Sales Volume */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm shadow-lg space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-serif text-base text-white font-medium">Supply & Absorption Metrics</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Juxtaposition of active listing stock against final asset closings.</p>
            </div>
          </div>

          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="year" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "2px" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Line type="monotone" dataKey="inventory" name="Active Inventory" stroke="#14b8a6" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="salesVolume" name="Sales Closed" stroke="#C9A227" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Quick market commentary note card */}
      <div className="bg-slate-950 p-6 rounded-sm border border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
        <div className="space-y-1 md:max-w-xl">
          <span className="text-[10px] text-[#C9A227] uppercase tracking-widest font-bold block flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Advisory Market Assessment</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-sans font-light italic font-serif">
            Strong buy signals are observed in coastal luxury segments. Despite high treasury yields, equity reserves of high-net-worth buyers continue to drive immediate absorptions in Tier 1 cities. Upgraded estates reflect an average 18% return premium.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-sm flex items-center justify-center">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Average Premium rate</span>
            <span className="text-lg font-bold font-mono text-white">6.25% - 6.55%</span>
          </div>
        </div>
      </div>

    </div>
  );
}
