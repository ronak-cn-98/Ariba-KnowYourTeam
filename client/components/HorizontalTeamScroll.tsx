import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Employee } from "@/components/EmployeeCard";
import { AnimatedCard } from "./ui/MotionPrimitives";

export default function HorizontalTeamScroll({ 
  employees, 
  onSelect 
}: { 
  employees: Employee[], 
  onSelect: (emp: Employee) => void 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Convert vertical scroll progress to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <div ref={containerRef} className="h-[250vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-black">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        
        <div className="container mx-auto px-6 absolute top-20 left-0 right-0 z-10">
          <h2 className="text-4xl font-bold text-white tracking-tight">Meet the Crew</h2>
          <p className="text-zinc-500 mt-2">Scroll to discover the individuals driving our infrastructure.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-24 w-max relative z-20 mt-16">
          {employees.map((employee, idx) => (
            <motion.div 
              key={employee.id} 
              className="w-[300px] shrink-0 cursor-pointer"
              whileHover={{ y: -10 }}
              onClick={() => onSelect(employee)}
            >
              <AnimatedCard className="h-[420px] flex flex-col items-center justify-center bg-[#0a0a0c] border-white/5">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 mb-6">
                  {employee.image ? (
                    <img 
                      src={employee.image} 
                      alt={employee.name} 
                      className="w-full h-full object-cover" 
                      style={{ objectPosition: employee.imagePosition || "center center" }}
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-2xl text-white/50">
                      {employee.name.split(" ").map(n => n[0]).join("")}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-medium text-white text-center">{employee.name}</h3>
                <p className="text-xs uppercase tracking-widest text-cyan-500 mt-2 text-center h-8">
                  {employee.role}
                </p>
                
                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                  {employee.skills?.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-1 rounded bg-white/5 text-[10px] text-zinc-400 border border-white/5">
                      {skill}
                    </span>
                  ))}
                  {(employee.skills?.length || 0) > 3 && (
                    <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-zinc-500 border border-white/5">
                      +{(employee.skills?.length || 0) - 3}
                    </span>
                  )}
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
