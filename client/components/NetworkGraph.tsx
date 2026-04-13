import { motion } from "framer-motion";
import { Employee } from "@/components/EmployeeCard";
import { teamStructure } from "@/data/employees";

// Node sizes mapping
const sizeMap = {
  lg: { wrapper: "w-20 h-20 sm:w-24 sm:h-24", img: "w-16 h-16 sm:w-20 sm:h-20", text: "text-base", label: "text-xs" },
  md: { wrapper: "w-16 h-16 sm:w-20 sm:h-20", img: "w-12 h-12 sm:w-16 sm:h-16", text: "text-sm", label: "text-[10px]" },
  sm: { wrapper: "w-14 h-14 sm:w-16 sm:h-16", img: "w-10 h-10 sm:w-12 sm:h-12", text: "text-xs", label: "text-[9px]" },
};

function GraphNode({
  employee,
  onClick,
  size = "md",
  delay = 0,
}: {
  employee: Employee;
  onClick: (emp: Employee) => void;
  size?: "lg" | "md" | "sm";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 10 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", delay, stiffness: 200, damping: 20 }}
      className="flex flex-col items-center gap-3 relative z-10 cursor-pointer group"
      onClick={() => onClick(employee)}
      whileHover={{ y: -4 }}
    >
      <div
        className={`relative flex items-center justify-center rounded-full bg-black border-2 border-white/10 group-hover:border-cyan-500/60 transition-all shadow-xl group-hover:shadow-cyan-500/20 ${sizeMap[size].wrapper}`}
      >
        {employee.image ? (
          <img
            src={employee.image}
            alt={employee.name}
            className={`rounded-full object-cover p-1 ${sizeMap[size].img}`}
            style={{ objectPosition: employee.imagePosition || "center center" }}
          />
        ) : (
          <div className={`${sizeMap[size].img} rounded-full bg-zinc-900 flex items-center justify-center font-bold text-white/50`}>
            {employee.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="text-center w-max px-2">
        <h4 className={`font-semibold text-white/90 group-hover:text-white transition-colors ${sizeMap[size].text}`}>
          {employee.name}
        </h4>
        <p className={`uppercase tracking-widest text-cyan-500/80 mt-1 ${sizeMap[size].label}`}>
          {employee.role.split("·")[0].split("–")[0].trim()}
        </p>
      </div>
    </motion.div>
  );
}

// Vertical Line component
function VertLine({ delay = 0, h = "h-8" }: { delay?: number; h?: string }) {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "anticipate" }}
      className={`w-px ${h} bg-gradient-to-b from-cyan-500/60 to-cyan-500/10 origin-top shadow-[0_0_8px_rgba(6,182,212,0.3)]`}
    />
  );
}

export default function NetworkGraph({ onSelect }: { onSelect: (emp: Employee) => void }) {
  const { cloudNexus, aribaLeadership, technology } = teamStructure;
  const executiveSponsor = cloudNexus[0];
  const deputyLeader = cloudNexus[1];
  const aribaLeads = aribaLeadership.slice(2, 4);

  return (
    <div className="relative w-full flex flex-col items-center py-16 px-4 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.03),transparent_70%)] rounded-3xl overflow-hidden">
      
      {/* ── Level 1: CEO ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center">
        <GraphNode employee={executiveSponsor} size="lg" onClick={onSelect} delay={0.1} />
        <VertLine h="h-10 sm:h-16" delay={0.3} />
      </div>

      {/* ── Level 2: CTO ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center">
        <GraphNode employee={deputyLeader} size="md" onClick={onSelect} delay={0.5} />
        <VertLine h="h-10 sm:h-16" delay={0.7} />
      </div>

      {/* ── Level 3: Ariba Leadership (Forked) ─────────────────────────────────── */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Horizontal Connector */}
        <div className="relative w-full sm:w-[60%] h-10 border-t border-cyan-500/30 flex justify-between">
          {/* Animated glow on horizontal line */}
          <motion.div 
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.9 }}
            className="absolute -top-px left-0 right-0 h-px bg-cyan-400/80 shadow-[0_0_10px_rgba(6,182,212,0.6)] origin-center"
          />
          {/* Drop down to Left Lead */}
          <div className="w-px h-10 bg-cyan-500/40 relative">
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.4 }} className="absolute inset-0 origin-top bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </div>
          {/* Drop down to Right Lead */}
          <div className="w-px h-10 bg-cyan-500/40 relative">
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.4 }} className="absolute inset-0 origin-top bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </div>
        </div>

        {/* Nodes for Ariba Leads */}
        <div className="w-full sm:w-[60%] flex justify-between -mt-2">
          {aribaLeads.map((lead, i) => (
            <div key={lead.id} className="flex flex-col items-center relative z-10 w-32">
              <GraphNode employee={lead} size="md" onClick={onSelect} delay={1.6 + i * 0.1} />
            </div>
          ))}
        </div>

        {/* Merge down into Tech Core */}
        <div className="relative w-full sm:w-[60%] flex justify-between mt-4 h-12">
           <div className="w-px h-full border-r border-dashed border-white/20 ml-[calc(50%-0.5px)]" />
           <div className="w-px h-full border-r border-dashed border-white/20 mr-[calc(50%-0.5px)]" />
           
           {/* Center merge line forming */}
           <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-cyan-500/40" />
           <div className="absolute top-0 left-0 right-0 h-full border-b border-dashed border-white/20" />
        </div>
      </div>

      {/* ── Level 4: Tech Core (Grid Pool) ─────────────────────────────────────── */}
      <div className="flex flex-col items-center mt-8 relative w-full">
        <VertLine h="h-8" delay={2.0} />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 w-full max-w-5xl shadow-2xl backdrop-blur-sm relative"
        >
          {/* Label overlapping the top border */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#09090b] px-4 py-1 border border-white/10 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">DevOps Technologists</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-x-10 sm:gap-y-8 mt-2">
            {technology.map((tech, i) => (
              <div key={tech.id} className="w-28 sm:w-32 flex justify-center">
                <GraphNode employee={tech} size="sm" onClick={onSelect} delay={2.4 + i * 0.05} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
}
