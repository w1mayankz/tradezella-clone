​"use client"

import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar as CalendarIcon, Briefcase, BookOpen, Flag, Target, 
  PlayCircle, TrendingUp, Layers, ChevronLeft, ChevronRight, ChevronDown, Filter, 
  Database, Sparkles, Rocket, Plus, Moon, Gift, Bell, Settings,
  Info, Menu, X, CheckSquare, FileText, Camera
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// --- DUMMY DATA FOR CHARTS & CALENDAR ---

const areaChartData = [
  { date: '03/19/23', value: 0 },
  { date: '04/10/23', value: 2100 },
  { date: '05/01/23', value: 3200 },
  { date: '06/11/24', value: 4600 }, // Matching image labels roughly
  { date: '05/20/24', value: 3100 },
  { date: '06/18/24', value: 5800 },
  { date: '06/20/24', value: 6500 },
  { date: '06/24/24', value: 7183.75 },
];

const radarData = [
  { subject: 'Win %', A: 85, fullMark: 100 },
  { subject: 'Profit factor', A: 75, fullMark: 100 },
  { subject: 'Avg win/loss', A: 60, fullMark: 100 },
  { subject: 'Recovery factor', A: 80, fullMark: 100 },
  { subject: 'Max drawdown', A: 65, fullMark: 100 },
  { subject: 'Consistency', A: 90, fullMark: 100 },
];

// Exact calendar mapping from the image
const calendarDays = [
  // Row 1
  { day: 26, isCurrentMonth: false, data: null }, { day: 27, isCurrentMonth: false, data: null }, { day: 28, isCurrentMonth: false, data: null }, { day: 29, isCurrentMonth: false, data: null }, { day: 30, isCurrentMonth: false, data: null }, { day: 31, isCurrentMonth: false, data: null }, { day: 1, isCurrentMonth: true, data: null },
  // Row 2
  { day: 2, isCurrentMonth: true, data: null }, { day: 3, isCurrentMonth: true, data: null }, { day: 4, isCurrentMonth: true, data: null }, 
  { day: 5, isCurrentMonth: true, data: { pnl: '$1.05K', trades: 1, win: '100.0%', type: 'win-bright', icon: false } },
  { day: 6, isCurrentMonth: true, data: null }, { day: 7, isCurrentMonth: true, data: null }, { day: 8, isCurrentMonth: true, data: null },
  // Row 3
  { day: 9, isCurrentMonth: true, data: null },
  { day: 10, isCurrentMonth: true, data: { pnl: '$600', trades: 1, win: '100.0%', type: 'win-dark', icon: false } },
  { day: 11, isCurrentMonth: true, data: { pnl: '$1.09K', trades: 2, win: '100.0%', type: 'win-dark', icon: false } },
  { day: 12, isCurrentMonth: true, data: null },
  { day: 13, isCurrentMonth: true, data: { pnl: '-$638', trades: 2, win: '0.0%', type: 'loss', icon: false } },
  { day: 14, isCurrentMonth: true, data: { pnl: '$556', trades: 3, win: '33.33%', type: 'win-dark', icon: true } },
  { day: 15, isCurrentMonth: true, data: null },
  // Row 4
  { day: 16, isCurrentMonth: true, data: null },
  { day: 17, isCurrentMonth: true, data: { pnl: '-$788', trades: 3, win: '0.0%', type: 'loss', icon: true } },
  { day: 18, isCurrentMonth: true, data: { pnl: '$875', trades: 2, win: '100.0%', type: 'win-dark', icon: true } },
  { day: 19, isCurrentMonth: true, data: { pnl: '$608', trades: 1, win: '100.0%', type: 'win-dark', icon: true } },
  { day: 20, isCurrentMonth: true, data: { pnl: '$1.18K', trades: 5, win: '40.0%', type: 'win-dark', icon: false } },
  { day: 21, isCurrentMonth: true, data: { pnl: '$113', trades: 3, win: '50.0%', type: 'neutral', icon: true } },
  { day: 22, isCurrentMonth: true, data: null },
  // Row 5
  { day: 23, isCurrentMonth: true, data: null },
  { day: 24, isCurrentMonth: true, data: { pnl: '$225', trades: 3, win: '33.33%', type: 'win-dark', icon: true } },
  { day: 25, isCurrentMonth: true, data: { pnl: '$300', trades: 3, win: '33.33%', type: 'win-dark', icon: true } },
  { day: 26, isCurrentMonth: true, data: { pnl: '-$37.5', trades: 1, win: '0.0%', type: 'neutral', icon: true } },
  { day: 27, isCurrentMonth: true, data: null }, { day: 28, isCurrentMonth: true, data: null }, { day: 29, isCurrentMonth: true, data: null },
  // Row 6
  { day: 30, isCurrentMonth: true, data: null }
];

const weeklyStats = [
  { week: 'Week 1', pnl: '$0', days: '0 days' },
  { week: 'Week 2', pnl: '$1.05K', days: '1 day' },
  { week: 'Week 3', pnl: '$1.61K', days: '4 days' },
  { week: 'Week 4', pnl: '$1.98K', days: '5 days' },
  { week: 'Week 5', pnl: '$488', days: '3 days' },
  { week: 'Week 6', pnl: '$0', days: '0 days' },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Global Font Injection & Custom Scrollbar Hiding */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
        * { font-family: 'Roboto Condensed', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="flex h-screen w-full bg-[#0b0b0f] text-white overflow-hidden">
        
        {/* MOBILE OVERLAY */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/80 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* 1. SIDEBAR */}
        <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0 h-screen">
          
          {/* 2. TOP HEADER */}
          <Header setMobileMenuOpen={setMobileMenuOpen} />

          {/* 3. DASHBOARD CONTENT */}
          <div className="flex-1 overflow-auto p-4 md:p-6 hide-scrollbar">
            <div className="max-w-[1920px] mx-auto space-y-4 md:space-y-6">
              
              {/* TOP METRICS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                
                {/* Card 1: Net P&L */}
                <MetricCard title="Net P&L" pill="35">
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-2xl md:text-3xl font-semibold text-[#21ce99] tracking-tight">$7,183.75</span>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#1a1a24] flex items-center justify-center border border-[#22222a]">
                      <div className="w-4 h-4 text-[#8369ff]">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>
                      </div>
                    </div>
                  </div>
                </MetricCard>

                {/* Card 2: Trade win % */}
                <MetricCard title="Trade win %">
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-100">45.16%</span>
                    <div className="relative flex flex-col items-center">
                      <svg viewBox="0 0 100 50" className="w-[60px] h-[30px] md:w-[80px] md:h-[40px] overflow-visible">
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#22222a" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 10 50 A 40 40 0 0 1 45 15" fill="none" stroke="#21ce99" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 45 15 A 40 40 0 0 1 65 15" fill="none" stroke="#2e44ff" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 65 15 A 40 40 0 0 1 90 50" fill="none" stroke="#ff4b4b" strokeWidth="8" strokeLinecap="round" />
                      </svg>
                      <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-[10px] font-medium mt-1">
                        <span className="text-[#21ce99]">14</span>
                        <span className="text-[#2e44ff]">4</span>
                        <span className="text-[#ff4b4b]">17</span>
                      </div>
                    </div>
                  </div>
                </MetricCard>

                {/* Card 3: Avg win/loss trade */}
                <MetricCard title="Avg win/loss trade">
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-100">2.70</span>
                    <div className="flex flex-col items-end w-[80px] md:w-[110px]">
                      <div className="flex w-full h-1.5 rounded-full overflow-hidden bg-[#22222a] mb-1.5">
                        <div className="bg-[#21ce99] w-[70%] h-full rounded-r-full"></div>
                        <div className="bg-[#ff4b4b] w-[30%] h-full rounded-l-full ml-1"></div>
                      </div>
                      <div className="flex justify-between w-full text-[10px] md:text-[11px] font-medium">
                        <span className="text-[#21ce99]">$951</span>
                        <span className="text-[#ff4b4b]">-$352</span>
                      </div>
                    </div>
                  </div>
                </MetricCard>

                {/* Card 4: Profit factor */}
                <MetricCard title="Profit factor">
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-100">2.22</span>
                    <div className="relative">
                      <svg viewBox="0 0 36 36" className="w-[35px] h-[35px] md:w-[45px] md:h-[45px]">
                        <path className="text-[#22222a]" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-[#21ce99]" strokeWidth="4" strokeDasharray="70, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                    </div>
                  </div>
                </MetricCard>

                {/* Card 5: Current streak */}
                <MetricCard title="Current streak" className="col-span-2 md:col-span-1 xl:col-span-1">
                  <div className="flex items-center justify-between md:justify-start md:gap-6 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-medium tracking-wider mb-1">DAYS</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#21ce99] bg-[rgba(33,206,153,0.1)] flex items-center justify-center">
                          <span className="text-[#21ce99] font-medium text-sm">1</span>
                        </div>
                        <div className="flex flex-col text-[10px] md:text-[11px] font-medium">
                          <span className="text-[#ff4b4b]">1 day</span>
                          <span className="text-[#21ce99]">4 days</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-medium tracking-wider mb-1">TRADES</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#21ce99] bg-[rgba(33,206,153,0.1)] flex items-center justify-center">
                          <span className="text-[#21ce99] font-medium text-sm">1</span>
                        </div>
                        <div className="flex flex-col text-[10px] md:text-[11px] font-medium">
                          <span className="text-[#ff4b4b]">4 trades</span>
                          <span className="text-[#21ce99]">3 trades</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MetricCard>
              </div>

              {/* MAIN GRIDS: CHARTS (Left) & CALENDAR (Right) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6">
                
                {/* LEFT COLUMN: CHARTS */}
                <div className="xl:col-span-4 flex flex-col gap-4 md:gap-6">
                  
                  {/* Daily Net Cumulative P&L */}
                  <div className="bg-[#13131a] rounded-xl border border-[#22222a] p-4 flex flex-col h-[300px] md:h-[350px]">
                    <div className="flex items-center text-gray-200 gap-1.5 mb-4">
                      <span className="text-sm font-semibold">Daily net cumulative P&L</span>
                      <Info size={14} className="text-gray-500" />
                    </div>
                    <div className="flex-1 w-full relative -ml-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#21ce99" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#21ce99" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#22222a" />
                          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} tickFormatter={(value) => `$${value}`} />
                          <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #2c2c35', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#21ce99' }} />
                          <Area type="monotone" dataKey="value" stroke="#21ce99" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Zella Score */}
                  <div className="bg-[#13131a] rounded-xl border border-[#22222a] p-4 flex flex-col h-[300px] md:h-[350px]">
                    <div className="flex items-center text-gray-200 gap-1.5">
                      <span className="text-sm font-semibold">Zella score</span>
                      <Info size={14} className="text-gray-500" />
                    </div>
                    <div className="flex-1 w-full relative flex items-center justify-center">
                       <ResponsiveContainer width="100%" height="90%">
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                          <PolarGrid stroke="#2c2c35" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                          <Radar name="Score" dataKey="A" stroke="#8369ff" fill="#8369ff" fillOpacity={0.2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-auto border-t border-[#22222a] pt-3 flex flex-col gap-1">
                      <span className="text-xs text-gray-300">Your Zella Score</span>
                      <div className="flex items-center gap-3">
                         <span className="text-2xl font-bold">83.01</span>
                         <div className="flex-1 h-1.5 rounded-full overflow-hidden flex bg-gradient-to-r from-[#ff4b4b] via-[#eab308] to-[#21ce99]">
                            <div className="w-[17%] bg-[#13131a] ml-auto h-full rounded-l-full"></div>
                         </div>
                         <span className="text-[10px] text-gray-500">100</span>
                      </div>
                      <div className="flex justify-between px-10 text-[9px] text-gray-500 -mt-1">
                         <span>0</span><span>20</span><span>40</span><span>60</span><span>80</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: CALENDAR HEATMAP */}
                <div className="xl:col-span-8 flex flex-col">
                  <div className="bg-[#13131a] rounded-xl border border-[#22222a] p-4 flex flex-col h-full">
                    
                    {/* Calendar Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3">
                        <button className="p-1 hover:bg-[#22222a] rounded transition-colors"><ChevronLeft size={16} className="text-gray-400"/></button>
                        <span className="text-sm font-semibold text-white px-2">June 2024</span>
                        <button className="p-1 hover:bg-[#22222a] rounded transition-colors"><ChevronRight size={16} className="text-gray-400"/></button>
                        <button className="bg-[#1a1a24] border border-[#2c2c35] px-3 py-1 text-xs text-gray-300 rounded-md ml-2 hover:bg-[#22222a] transition-colors">This month</button>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-400">Monthly stats:</span>
                        <span className="bg-[#21ce99] text-[#0b0b0f] font-bold px-2 py-0.5 rounded-full">$5.13K</span>
                        <span className="bg-[#2e44ff] text-white font-bold px-2 py-0.5 rounded-full">13 days</span>
                        <div className="flex items-center gap-2 text-gray-500 ml-2">
                           <Settings size={14} className="hover:text-gray-300 cursor-pointer" />
                           <Camera size={14} className="hover:text-gray-300 cursor-pointer" />
                           <Info size={14} className="hover:text-gray-300 cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    {/* Calendar Grid Container */}
                    <div className="flex flex-1 gap-2 overflow-x-auto hide-scrollbar">
                      {/* Main 7-Day Grid */}
                      <div className="flex-1 min-w-[600px]">
                        {/* Days of Week */}
                        <div className="grid grid-cols-7 mb-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-[11px] font-medium text-gray-400 border border-transparent pb-1">{day}</div>
                          ))}
                        </div>
                        {/* Calendar Cells */}
                        <div className="grid grid-cols-7 gap-px bg-[#22222a] border border-[#22222a] rounded-lg overflow-hidden">
                          {calendarDays.map((dayObj, i) => (
                             <CalendarCell key={i} data={dayObj} />
                          ))}
                        </div>
                      </div>

                      {/* Weekly Summary Column */}
                      <div className="w-[80px] min-w-[80px] flex flex-col mt-6 gap-px">
                        {weeklyStats.map((stat, i) => (
                           <div key={i} className="flex-1 min-h-[90px] flex flex-col justify-center px-3 border-b border-[#22222a] last:border-b-0">
                              <span className="text-[10px] text-gray-400 mb-1">{stat.week}</span>
                              <span className="text-[13px] font-semibold text-white">{stat.pnl}</span>
                              <span className="text-[10px] text-[#8369ff] bg-[rgba(131,105,255,0.1)] w-fit px-1.5 py-0.5 rounded mt-1">{stat.days}</span>
                           </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}

/* ==========================================================================
   REUSABLE COMPONENTS
   ========================================================================== */

function CalendarCell({ data }) {
  const { day, isCurrentMonth, data: cellData } = data;
  
  // Base styling depending on the cell type
  let bgClass = 'bg-[#1a1a24] hover:bg-[#1f1f2b]'; // Default empty
  if (!isCurrentMonth) bgClass = 'bg-[#13131a] opacity-50';
  
  if (cellData) {
    switch(cellData.type) {
      case 'win-bright': bgClass = 'bg-[#1b4532] border border-[#21ce99] hover:bg-[#143a2b]'; break;
      case 'win-dark': bgClass = 'bg-[#143a2b] border border-[#1b4532] hover:bg-[#1b4532]'; break;
      case 'loss': bgClass = 'bg-[#451c1c] border border-[#5c2424] hover:bg-[#5c2424]'; break;
      case 'neutral': bgClass = 'bg-[#1e253c] border border-[#2a3454] hover:bg-[#2a3454]'; break;
      default: break;
    }
  }

  return (
    <div className={`relative flex flex-col justify-between p-2 min-h-[90px] transition-colors cursor-pointer ${bgClass}`}>
      <div className="flex justify-between items-start w-full">
        <div className="text-gray-400">
           {cellData?.icon && <FileText size={12} />}
        </div>
        <span className={`text-[11px] ${isCurrentMonth ? 'text-gray-400' : 'text-gray-600'}`}>{day}</span>
      </div>
      
      {cellData && (
        <div className="flex flex-col items-center text-center mt-1">
          <span className="text-sm font-bold text-white">{cellData.pnl}</span>
          <span className="text-[9px] text-gray-300 mt-0.5">{cellData.trades} trade{cellData.trades > 1 ? 's' : ''}</span>
          <span className="text-[9px] text-gray-300">{cellData.win}</span>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, pill, children, className = "" }) {
  return (
    <div className={`bg-[#13131a] rounded-xl border border-[#22222a] p-4 flex flex-col justify-between shadow-sm ${className}`}>
      <div className="flex items-center text-gray-400 gap-1.5">
        <span className="text-xs md:text-[13px] font-medium whitespace-nowrap">{title}</span>
        <Info size={13} className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
        {pill && (
          <span className="ml-1 bg-[#22222a] text-gray-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            {pill}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out
      w-[260px] h-full bg-[#13131a] border-r border-[#22222a] flex flex-col justify-between flex-shrink-0
    `}>
      <div>
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#22222a]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#8369ff]">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10ZM16 16.5C16 17.33 15.33 18 14.5 18H9.5C8.67 18 8 17.33 8 16.5V15.5C8 14.17 10.67 13.5 12 13.5C13.33 13.5 16 14.17 16 15.5V16.5Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-wide uppercase text-gray-200">Tradezella</span>
          </div>
          <button className="lg:hidden text-gray-500 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
          <button className="hidden lg:block text-gray-500 hover:text-white transition-colors">
            <ChevronLeft size={18} />
          </button>
        </div>

        <div className="px-4 py-4 flex flex-col gap-3">
          <button className="w-full bg-[#8369ff] hover:bg-[#7055ed] transition-colors text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(131,105,255,0.3)]">
            <Plus size={18} /> Add Trade
          </button>
          <div className="flex items-center gap-2 text-gray-400 px-2 mt-1">
             <button className="p-1.5 hover:bg-[#22222a] rounded-md transition-colors"><div className="w-4 h-4 bg-blue-500 rounded-sm"></div></button>
             <button className="p-1.5 hover:bg-[#22222a] rounded-md transition-colors"><Moon size={16} /></button>
          </div>
        </div>

        <nav className="px-3 space-y-1 mt-2">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<CalendarIcon size={18} />} label="Day View" />
          <NavItem icon={<Briefcase size={18} />} label="Trade View" />
          <NavItem icon={<BookOpen size={18} />} label="Notebook" />
          <NavItem icon={<Flag size={18} />} label="Reports" />
          <NavItem icon={<Target size={18} />} label="Strategies" />
          <NavItem icon={<PlayCircle size={18} />} label="Trade Replay" badge="NEW" badgeColor="bg-[#2e44ff]" />
          <NavItem icon={<TrendingUp size={18} />} label="Progress Tracker" />
          <NavItem icon={<Layers size={18} />} label="Resources" />
        </nav>
      </div>

      <div className="p-4 space-y-2 border-t border-[#22222a]">
        <NavItem icon={<Gift size={18} />} tight />
        <NavItem icon={<Bell size={18} />} tight />
        <NavItem icon={<Settings size={18} />} tight />
      </div>
    </aside>
  );
}

function Header({ setMobileMenuOpen }) {
  return (
    <header className="flex flex-col border-b border-[#22222a] bg-[#0b0b0f] flex-shrink-0">
      <div className="flex-1 flex items-center justify-between px-4 md:px-6 py-3 md:py-0 md:h-[60px] border-b border-[#22222a]">
        <div className="flex items-center gap-3">
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="text-lg md:text-xl font-semibold text-white">Dashboard</h1>
        </div>
        
        <div className="hidden md:flex items-center gap-3 text-sm overflow-x-auto hide-scrollbar">
          <HeaderFilterBtn icon={null} label={<><span className="text-gray-400 mr-1">$</span><ChevronDown size={14} className="text-gray-400" /></>} />
          <HeaderFilterBtn icon={<Filter size={14} className="text-gray-400" />} label="Filters" dropdown />
          <HeaderFilterBtn icon={<CalendarIcon size={14} className="text-gray-400" />} label="Date range" dropdown />
          <HeaderFilterBtn icon={<Database size={14} className="text-gray-400" />} label="Demo Data" dropdown />
          <button className="flex items-center gap-2 bg-transparent border border-[#8369ff] text-[#8369ff] hover:bg-[rgba(131,105,255,0.1)] px-4 py-1.5 rounded-md transition-colors font-medium whitespace-nowrap">
            <Sparkles size={14} /> Ask Zella AI
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-3 md:py-0 md:h-[60px] gap-3 md:gap-0">
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <span className="text-gray-400">Last import: <span className="text-gray-200">Nov 19, 2024 09:01 AM</span></span>
          <button className="text-[#8369ff] hover:text-[#7055ed] flex items-center gap-1 font-medium transition-colors">
            <u>Resync</u>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none justify-center bg-[#2e44ff] hover:bg-[#2538e6] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors shadow-[0_0_15px_rgba(46,68,255,0.3)]">
            <Rocket size={16} /> Start my day
          </button>
          <button className="p-2 text-gray-400 hover:text-white bg-[#1a1a24] border border-[#2c2c35] rounded-md transition-colors">
            <LayoutDashboard size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

function HeaderFilterBtn({ icon, label, dropdown }) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1a24] border border-[#2c2c35] px-3 py-1.5 rounded-md cursor-pointer hover:border-gray-500 transition-colors whitespace-nowrap">
      {icon}
      {typeof label === 'string' ? <span>{label}</span> : label}
      {dropdown && <ChevronDown size={14} className="text-gray-400 ml-1" />}
    </div>
  );
}

function NavItem({ icon, label, active = false, badge, badgeColor, tight = false }) {
  return (
    <a href="#" className={`
      flex items-center justify-between px-3 py-2 rounded-md transition-colors group
      ${active ? 'bg-[#22222a] text-white' : 'text-gray-400 hover:bg-[#1a1a24] hover:text-gray-200'}
      ${tight ? 'w-fit mb-1' : 'w-full'}
    `}>
      <div className="flex items-center gap-3">
        <div className={`${active ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-300'}`}>{icon}</div>
        {label && <span className="text-sm font-medium">{label}</span>}
      </div>
      {badge && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded text-white ${badgeColor}`}>{badge}</span>}
    </a>
  );
}
