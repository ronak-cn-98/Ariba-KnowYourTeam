import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Clock, Phone, Linkedin, Twitter } from "lucide-react";
import { Employee } from "./EmployeeCard";
import { useEffect } from "react";

export default function ProfileOverlay({
  employee,
  onClose,
}: {
  employee: Employee | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (employee) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [employee]);

  return (
    <AnimatePresence>
      {employee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0a0a0c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden shadow-cyan-500/10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] min-h-[600px]">
              {/* Left Column - Image & Quick Info */}
              <div className="relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 flex flex-col items-center text-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden mb-8 border-4 border-[#0a0a0c] outline outline-1 outline-white/10 shadow-2xl relative group">
                  {employee.image ? (
                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: employee.imagePosition || "center center" }}
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-5xl text-white/30 font-bold">
                      {employee.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{employee.name}</h2>
                <p className="text-sm uppercase tracking-widest text-cyan-400 mb-8 font-mono">{employee.role}</p>

                <div className="w-full flex justify-center gap-4 mb-8">
                  {employee.social?.linkedin && (
                    <a href={employee.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-zinc-400 hover:text-white">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {employee.social?.twitter && (
                    <a href={employee.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors text-zinc-400 hover:text-white">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <div className="w-full space-y-4 text-left">
                  <div className="flex items-center gap-3 text-sm text-zinc-400 bg-white/5 p-3 rounded-xl border border-white/5">
                    <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>{employee.location}</span>
                  </div>
                  {employee.timezone && (
                    <div className="flex items-center gap-3 text-sm text-zinc-400 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Clock className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>{employee.timezone}</span>
                    </div>
                  )}
                  {employee.joiningDate && (
                    <div className="flex items-center gap-3 text-sm text-zinc-400 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Calendar className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>Joined {employee.joiningDate}</span>
                    </div>
                  )}
                  {employee.contact && (
                    <div className="flex items-center gap-3 text-sm text-zinc-400 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>{employee.contact}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Deep Dive */}
              <div className="p-8 md:p-12 relative">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500/50" />
                    Background
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-zinc-400 leading-relaxed text-[15px] whitespace-pre-wrap">
                      {employee.introduction || "This employee hasn't provided a background story yet."}
                    </p>
                  </div>

                  <h3 className="text-xl font-medium text-white mt-12 mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan-500/50" />
                    Core Capabilities
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {employee.skills?.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="px-4 py-2 rounded-lg bg-black border border-white/10 text-sm text-zinc-300 font-mono shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
