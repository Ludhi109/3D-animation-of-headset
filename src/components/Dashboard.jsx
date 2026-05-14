import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Settings, 
  Music, 
  Battery, 
  Cpu, 
  Bluetooth, 
  Activity,
  Layers,
  Zap,
  Volume2,
  Mic2,
  Share2
} from "lucide-react";
import { Experience } from "./Experience";
import { Visualizer } from "./Visualizer";

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1, x: 5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 ${
      active 
        ? "bg-neon-blue/20 text-neon-blue shadow-[0_0_20px_rgba(0,242,255,0.2)] border border-neon-blue/30" 
        : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
    }`}
  >
    <Icon size={24} />
    <span className="text-xs font-bold tracking-widest uppercase">{label}</span>
  </motion.button>
);

const GlassCard = ({ children, title, icon: Icon, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`glass rounded-[2.5rem] p-8 relative overflow-hidden group ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-neon-blue" size={20} />}
        <h3 className="text-[10px] tracking-[0.3em] font-bold uppercase text-gray-400">{title}</h3>
      </div>
      <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
    </div>
    {children}
  </motion.div>
);

const StatWidget = ({ label, value, unit, progress }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{label}</span>
      <div className="text-right">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-xs text-neon-blue ml-1">{unit}</span>
      </div>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="h-full bg-neon-blue shadow-[0_0_10px_#00f2ff]" 
      />
    </div>
  </div>
);

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 bg-transparent overflow-hidden flex font-inter">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Floating Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="relative z-50 w-80 h-full p-8 flex flex-col gap-12 backdrop-blur-md"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-neon-blue flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.4)]">
            <Layers className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter italic">SONY</h1>
            <p className="text-[8px] tracking-[0.4em] text-neon-blue font-bold uppercase">Product OS v2.0</p>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Overview" 
            active={activeTab === "dashboard"} 
            onClick={() => setActiveTab("dashboard")} 
          />
          <SidebarItem 
            icon={Cpu} 
            label="Components" 
            active={activeTab === "components"} 
            onClick={() => setActiveTab("components")} 
          />
          <SidebarItem 
            icon={Activity} 
            label="Analytics" 
            active={activeTab === "analytics"} 
            onClick={() => setActiveTab("analytics")} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Hardware" 
            active={activeTab === "settings"} 
            onClick={() => setActiveTab("settings")} 
          />
        </nav>

        <div className="mt-auto">
          <GlassCard title="Quick Connect" icon={Bluetooth} className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-neon-blue/20 flex items-center justify-center">
                <Bluetooth className="text-neon-blue animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold">WH-1000XM5</p>
                <p className="text-[10px] text-gray-500">Connected via LDAC</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </motion.aside>

      {/* Main Dashboard Content */}
      <main className="relative flex-1 h-full overflow-hidden">
        {/* 3D Scene Viewport */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Experience exploded={activeTab === "components"} mousePos={mousePos} />
        </div>

        {/* Floating Holographic UI Elements */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dash-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-[30%] left-[25%] p-4 glass rounded-xl border border-neon-blue/20"
                >
                  <p className="text-[8px] text-neon-blue font-bold tracking-[0.3em] mb-1 uppercase">Processor V1</p>
                  <div className="w-16 h-[1px] bg-neon-blue/40" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-[40%] right-[25%] p-4 glass rounded-xl border border-neon-blue/20"
                >
                  <p className="text-[8px] text-neon-blue font-bold tracking-[0.3em] mb-1 uppercase">30mm Driver</p>
                  <div className="w-16 h-[1px] bg-neon-blue/40" />
                </motion.div>
              </motion.div>
            )}

            {activeTab === "components" && (
              <motion.div
                key="comp-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="grid grid-cols-2 gap-80">
                  <div className="glass p-6 rounded-2xl border border-neon-blue/30 text-right">
                    <h4 className="text-neon-blue text-xs font-bold uppercase mb-2">Left Earcup</h4>
                    <p className="text-[10px] text-gray-400">Battery & Charging Port</p>
                  </div>
                  <div className="glass p-6 rounded-2xl border border-neon-blue/30">
                    <h4 className="text-neon-blue text-xs font-bold uppercase mb-2">Right Earcup</h4>
                    <p className="text-[10px] text-gray-400">Touch Sensor & Processor</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="anal-ui"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="absolute top-[20%] right-[10%] w-64 glass p-6 rounded-[2rem] border border-neon-blue/20"
              >
                <h4 className="text-[10px] text-neon-blue font-bold uppercase mb-4 tracking-widest">Real-time EQ</h4>
                <div className="flex gap-1 h-32 items-end">
                   {[60, 40, 90, 70, 50, 80, 60].map((h, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: [`${h}%`, `${h-30}%`, `${h}%`] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="flex-1 bg-neon-blue/30 rounded-full" 
                     />
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="sett-ui"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute bottom-[20%] left-[30%] glass p-8 rounded-[2.5rem] border border-neon-blue/20"
              >
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[8px] text-gray-500 uppercase font-bold tracking-widest mb-1">Firmware</p>
                    <p className="text-xl font-bold">v2.1.4</p>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div>
                    <p className="text-[8px] text-gray-500 uppercase font-bold tracking-widest mb-1">Hardware</p>
                    <p className="text-xl font-bold">XM5-RevB</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* UI Overlay */}
        <div className="relative z-20 h-full p-12 flex flex-col pointer-events-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-6xl font-black tracking-tighter uppercase mb-2">
                Precision <span className="text-neon-blue">Audio</span>
              </h2>
              <div className="flex gap-6 items-center">
                <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                  System Online
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">
                  Latency: 24ms
                </span>
              </div>
            </motion.div>

            <div className="flex gap-4">
              <button className="glass p-4 rounded-2xl text-white hover:text-neon-blue transition-colors">
                <Share2 size={20} />
              </button>
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold tracking-tighter uppercase hover:bg-neon-blue transition-all">
                Purchase Now
              </button>
            </div>
          </div>

          {/* Widgets Grid */}
          <div className="mt-auto grid grid-cols-4 gap-8 pointer-events-auto">
            <GlassCard title="Energy Status" icon={Zap}>
              <StatWidget label="Battery Life" value="98" unit="%" progress={98} />
              <div className="mt-4 flex items-center gap-2 text-[8px] text-neon-blue font-bold tracking-widest uppercase">
                <Zap size={10} /> Fast Charge Enabled
              </div>
            </GlassCard>

            <GlassCard title="Active Noise Cancelling" icon={Mic2}>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-black text-white">40<span className="text-lg text-neon-blue">dB</span></p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Reduction</p>
                </div>
                <div className="flex gap-1 h-8 items-end">
                  {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [`${h}%`, `${h-20}%`, `${h}%`] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-neon-blue/40 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard title="Acoustic Performance" icon={Music}>
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-500">
                  <span>THD</span>
                  <span className="text-white">0.005%</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-500">
                  <span>SNR</span>
                  <span className="text-white">124dB</span>
                </div>
                <div className="h-12 w-full bg-white/5 rounded-xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-transparent w-1/2 animate-pulse" />
                </div>
              </div>
            </GlassCard>

            <GlassCard title="Spatial Engine" icon={Volume2}>
              <div className="relative h-24 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-neon-blue/20 animate-ping" />
                </div>
                <div className="relative z-10 text-center">
                  <p className="text-xs font-bold text-neon-blue">360°</p>
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest">Active</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Global Overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[100] noise" />
        <div className="absolute inset-0 pointer-events-none z-[100] cinematic-vignette opacity-80" />
        <div className="absolute inset-0 pointer-events-none z-[101] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </main>
    </div>
  );
};
