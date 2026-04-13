import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import { AribaLogo, BrandLockup, CloudNexusLogo } from "@/components/Brand";
import SectionHeader from "@/components/SectionHeader";
import { employees } from "@/data/employees";
import {
  Cloud, Shield, Server, RefreshCw, Linkedin, Twitter, Facebook, Instagram, LogIn, Lock, ArrowRight, ChevronRight
} from "lucide-react";
import type { Employee } from "@/components/EmployeeCard";

// Cinematic Primitives and Components
import { motion } from "framer-motion";
import { MotionSection, AnimatedCard, GlassPanel, MagneticButton } from "@/components/ui/MotionPrimitives";
import ProfileOverlay from "@/components/ProfileOverlay";
import NetworkGraph from "@/components/NetworkGraph";

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgb(9,9,11)" }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5">
              <BrandLockup />
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgb(113,113,122)" }}>
              Delivering world-class DevOps, cloud infrastructure, and automation for CloudNexus.
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://linkedin.com", Icon: Linkedin },
                { href: "https://twitter.com", Icon: Twitter },
                { href: "https://facebook.com", Icon: Facebook },
                { href: "https://instagram.com", Icon: Instagram },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-base hover:text-white hover:border-white/20"
                  style={{ color: "rgb(113,113,122)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 font-mono text-zinc-500">Navigation</p>
            <ul className="space-y-2.5">
              {[{ label: "Experience", href: "/" }].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-zinc-500 hover:text-zinc-400 transition-base">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 font-mono text-zinc-500">Links</p>
            <ul className="space-y-2.5">
              <li>
                <a href="https://cloudnexus.in" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-400 transition-base flex items-center gap-1">
                  cloudnexus.in ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs font-mono text-zinc-500">
            © {new Date().getFullYear()} CloudNexus · Ariba DevOps Department
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-base">Privacy</a>
            <a href="#" className="text-xs text-zinc-600 hover:text-zinc-400 transition-base">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Index() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const stats = [
    { label: "Team Members", value: employees.length, suffix: "" },
    { label: "Delivery Domains", value: 6, suffix: "+" },
    { label: "Uptime SLA", value: 99, suffix: ".9%" },
    { label: "Automation Assets", value: 40, suffix: "+" },
  ];

  const capabilities = [
    { icon: Cloud, title: "Cloud Implementing Strategy", desc: "We design and execute a seamless Cloud Implementation Strategy to help businesses migrate, optimize, and scale in the cloud." },
    { icon: Server, title: "Cloud App Services", desc: "Cutting-edge Cloud Application Services to help businesses scale, innovate, and optimize operations." },
    { icon: Shield, title: "Cloud Management Service", desc: "End-to-end Cloud Management Services to optimize performance, security, and scalability." },
    { icon: RefreshCw, title: "DevOps As A Service", desc: "Streamline development and operations with DaaS. Faster deployments and improved collaboration." },
    { icon: LogIn, title: "Identity & Access", desc: "Robust IAM solutions to secure and streamline user access across your digital ecosystem." },
    { icon: Lock, title: "Infrastructure Security", desc: "Protect your digital assets from evolving cyber threats with robust cloud security." },
  ];

  const processSteps = [
    { step: "01", title: "Infrastructure as Code", desc: "Automated provisioning using Terraform, AWS CloudFormation, and Ansible." },
    { step: "02", title: "CI/CD Pipelines", desc: "Automated build, test, and deployment workflows via GitHub Actions and Jenkins." },
    { step: "03", title: "Monitoring", desc: "Comprehensive system monitoring using Prometheus, Grafana, and ELK Stack." },
    { step: "04", title: "DevSecOps", desc: "Shift Left Security integration using tools like Snyk and HashiCorp Vault." },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      <Header />
      <ProfileOverlay employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />

      {/* ── Phase 1: Immersive Entry (Hero) ─────────────────────────────────── */}
      <section className="relative pt-32 pb-20 flex flex-col justify-center overflow-hidden">
        {/* Deep background aura */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full bg-cyan-900/10 blur-[120px] mix-blend-screen" />
          <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-noise z-0" />
        </div>

        <div className="container mx-auto relative z-20 flex flex-col items-start px-8 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 max-w-4xl"
          >

            <motion.h1 
              className="text-[clamp(3rem,8vw,6.5rem)] font-bold tracking-tighter leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Engine<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 italic font-medium pr-4">
                Behind the Cloud.
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We engineer the scalability, resilience, and automation that drives CloudNexus's infrastructure ecosystem.
            </motion.p>
          </motion.div>
        </div>
        

      </section>

      {/* ── Phase 2: Transition Zone / Stats ─────────────────────────────────── */}
      <MotionSection className="py-16 border-y border-white/5 bg-[#08080a] relative overflow-hidden">
        <div className="absolute inset-0 bg-noise" />
        <div className="container mx-auto px-6 relative z-10 flex flex-wrap justify-between md:justify-around gap-12">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-5xl md:text-6xl font-bold font-mono tracking-tighter text-white mb-2">
                {s.value}<span className="text-cyan-400 text-3xl ml-1">{s.suffix}</span>
              </div>
              <p className="text-sm font-mono tracking-widest text-zinc-500 uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </MotionSection>


      {/* ── Phase 4: Network Graph (Org Structure) ───────────────────────────── */}
      <MotionSection className="py-32 relative overflow-hidden bg-black/50">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            label="Architecture" 
            title="Department Layout" 
            description="The underlying structure connecting business lanes with platform engineering." 
          />
          <GlassPanel className="mt-16 w-full p-2 border-white/5">
            <NetworkGraph onSelect={setSelectedEmployee} />
          </GlassPanel>
        </div>
      </MotionSection>

      {/* ── Phase 5: Capabilities & Process ──────────────────────────────────── */}
      <div className="relative bg-[#050505]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-900/40 to-transparent" />
        
        <MotionSection className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <SectionHeader label="Capabilities" title="Systems & Processes" description="Core pillars executing the DevOps lifecycle." />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <AnimatedCard key={i} className="group bg-[#08080a] hover:bg-[#0a0a0c] transition-colors border-white/[0.04]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.02] border border-white/5 mb-6 group-hover:border-cyan-500/30 transition-colors shadow-[0_0_20px_rgba(6,182,212,0)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3 tracking-tight">{cap.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{cap.desc}</p>
                  </AnimatedCard>
                );
              })}
            </div>

          </div>
        </MotionSection>
      </div>

      <Footer />
    </div>
  );
}
