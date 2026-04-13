import { motion, useMotionTemplate, useMotionValue, HTMLMotionProps } from "framer-motion";
import { ReactNode, MouseEvent, forwardRef } from "react";
import { cn } from "@/lib/utils";

// ── MotionSection ─────────────────────────────────────────────────────────────
export const MotionSection = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(({ className, children, ...props }, ref) => {
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
});
MotionSection.displayName = "MotionSection";

// ── AnimatedCard ──────────────────────────────────────────────────────────────
export const AnimatedCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group relative rounded-[24px] border border-white/10 bg-zinc-950/50 p-6 overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// ── MagneticButton ────────────────────────────────────────────────────────────
export const MagneticButton = ({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    x.set((e.clientX - rect.left - halfWidth) * 0.3);
    y.set((e.clientY - rect.top - halfHeight) * 0.3);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("relative z-10", className)}
    >
      {children}
    </motion.button>
  );
};

// ── GlassPanel ────────────────────────────────────────────────────────────────
export const GlassPanel = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl", className)}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
