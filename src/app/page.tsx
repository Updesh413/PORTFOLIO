"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Cpu,
  Layers,
  Globe,
  Bot,
  Award,
  Send,
  ExternalLink,
  FileText,
  Menu,
  X,
  CheckCircle2,
  Smartphone,
  BookOpen,
} from "lucide-react";
import TerminalLoader from "../components/TerminalLoader";

// Dynamically import Three.js scene to avoid hydration issues & SSR errors
const CyberCanvas = dynamic(() => import("../components/CyberCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-[#0e0e0e]/50 border border-brand-neon/10">
      <div className="font-mono text-xs text-brand-neon/40 animate-pulse">
        &gt; MOUNTING_3D_MATRIX_CORE...
      </div>
    </div>
  ),
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Contact Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  // Console log animation helper for contact form
  const logTerminal = (msg: string) => {
    setConsoleLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${msg}`,
    ]);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      logTerminal("ERR: TRANSMISSION_FAILED - EMPTY_FIELDS");
      return;
    }

    setFormStatus("sending");
    setConsoleLogs([]);
    logTerminal("INITIATING_SECURE_TRANSMISSION...");

    await new Promise((resolve) => setTimeout(resolve, 500));
    logTerminal("ENCRYPTING_DATA_PACKETS...");

    await new Promise((resolve) => setTimeout(resolve, 400));
    logTerminal("RESOLVING_UPSTREAM_NODE: api.web3forms.com...");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey || accessKey === "your_access_key_here") {
        logTerminal("ERR: TRANSMISSION_FAILED - KEY_NOT_CONFIGURED");
        await new Promise((resolve) => setTimeout(resolve, 400));
        logTerminal(
          "SYS_HINT: ADD NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY TO .ENV.LOCAL",
        );
        setFormStatus("error");
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Portfolio Message from ${formState.name}`,
          from_name: "Portfolio Terminal",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        logTerminal("OK: PACKETS_ROUTED_SUCCESSFULLY (200 OK)");
        await new Promise((resolve) => setTimeout(resolve, 400));
        logTerminal("TRANSMISSION SUCCESSFUL.");
        setFormStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        const errMsg = data.message || "UNKNOWN_ERROR";
        logTerminal(`ERR: TRANSMISSION_FAILED - ${errMsg.toUpperCase()}`);
        setFormStatus("error");
      }
    } catch (error: any) {
      logTerminal(`ERR: CONNECTION_REFUSED - ${error.message.toUpperCase()}`);
      setFormStatus("error");
    }
  };

  // Scroll spy to highlight current section in navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "about",
        "projects",
        "skills",
        "certifications",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Interactive 3D Cyber Terminal Loading Screen */}
      <TerminalLoader onComplete={() => setLoading(false)} />

      {!loading && (
        <div className="relative min-h-screen bg-[#0e0e0e] text-[#e5e2e1] selection:bg-[#00ff41] selection:text-black font-mono">
          {/* CRT scanlines overlay */}
          <div className="scanlines" aria-hidden="true" />

          {/* Dot grid display calibrator */}
          <div className="grid-overlay" aria-hidden="true" />

          {/* Top HUD Navigation Bar */}
          <nav className="fixed top-0 left-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-md border-b border-[#00ff41]/20 py-4 transition-all duration-300">
            <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
              <motion.a
                href="#"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl md:text-2xl text-[#00ff41] font-bold tracking-tighter neon-glow"
              >
                UPDESH.IO
              </motion.a>

              {/* Desktop links */}
              <div className="hidden md:flex gap-8 items-center text-xs tracking-widest font-bold">
                <a
                  href="#about"
                  className={`transition-colors duration-200 py-1 border-b-2 ${
                    activeSection === "about"
                      ? "text-[#00ff41] border-[#00ff41]"
                      : "text-[#e5e2e1]/70 hover:text-[#00ff41] border-transparent"
                  }`}
                >
                  ABOUT_ME
                </a>
                <a
                  href="#projects"
                  className={`transition-colors duration-200 py-1 border-b-2 ${
                    activeSection === "projects"
                      ? "text-[#00ff41] border-[#00ff41]"
                      : "text-[#e5e2e1]/70 hover:text-[#00ff41] border-transparent"
                  }`}
                >
                  PROJECTS
                </a>
                <a
                  href="#skills"
                  className={`transition-colors duration-200 py-1 border-b-2 ${
                    activeSection === "skills"
                      ? "text-[#00ff41] border-[#00ff41]"
                      : "text-[#e5e2e1]/70 hover:text-[#00ff41] border-transparent"
                  }`}
                >
                  SKILLS
                </a>
                <a
                  href="#certifications"
                  className={`transition-colors duration-200 py-1 border-b-2 ${
                    activeSection === "certifications"
                      ? "text-[#00ff41] border-[#00ff41]"
                      : "text-[#e5e2e1]/70 hover:text-[#00ff41] border-transparent"
                  }`}
                >
                  CREDENTIALS
                </a>
                <a
                  href="#contact"
                  className={`transition-colors duration-200 py-1 border-b-2 ${
                    activeSection === "contact"
                      ? "text-[#00ff41] border-[#00ff41]"
                      : "text-[#e5e2e1]/70 hover:text-[#00ff41] border-transparent"
                  }`}
                >
                  CONNECT
                </a>
                <a
                  href="https://drive.google.com/file/d/1h4wIejh4parOWzwVM9LwU7bQO6LsVWlX/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 bg-[#00ff41] text-black px-5 py-2 font-bold hover:bg-[#00ff41]/80 transition-all btn-glitch flex items-center gap-1.5"
                >
                  RESUME.EXE <FileText size={14} />
                </a>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[#00ff41] focus:outline-none"
                id="mobile-menu-btn"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile HUD Navigation Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="fixed top-[61px] left-0 w-full z-40 bg-black/95 border-b border-[#00ff41]/20 font-bold text-sm"
              >
                <div className="flex flex-col p-6 gap-4">
                  <a
                    href="#about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#e5e2e1] hover:text-[#00ff41] transition-colors py-2 border-b border-[#00ff41]/10"
                  >
                    &gt; ABOUT_ME
                  </a>
                  <a
                    href="#projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#e5e2e1] hover:text-[#00ff41] transition-colors py-2 border-b border-[#00ff41]/10"
                  >
                    &gt; PROJECTS
                  </a>
                  <a
                    href="#skills"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#e5e2e1] hover:text-[#00ff41] transition-colors py-2 border-b border-[#00ff41]/10"
                  >
                    &gt; SKILLS
                  </a>
                  <a
                    href="#certifications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#e5e2e1] hover:text-[#00ff41] transition-colors py-2 border-b border-[#00ff41]/10"
                  >
                    &gt; CREDENTIALS
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#e5e2e1] hover:text-[#00ff41] transition-colors py-2 border-b border-[#00ff41]/10"
                  >
                    &gt; CONNECT
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1NrbDQYpjimxphQuzT8bUG9MCyXItlPfG/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-[#00ff41] text-black py-3 text-center font-bold btn-glitch flex justify-center items-center gap-2 mt-2"
                  >
                    RESUME.EXE <FileText size={16} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="pt-24 z-10 relative">
            {/* Hero Section */}
            <header className="relative min-h-[calc(100vh-96px)] flex items-center py-12">
              <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
                {/* Left Text HUD */}
                <div className="lg:col-span-7 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-[#00ff41] text-xs font-bold tracking-[0.25em] bg-[#00ff41]/10 px-3 py-1 border border-[#00ff41]/20">
                      IDENTIFIER: UPDESH
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none text-white tracking-tight uppercase"
                  >
                    Building{" "}
                    <span className="text-[#00ff41] neon-glow">
                      high-fidelity
                    </span>{" "}
                    mobile experiences via Flutter.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#e5e2e1]/75 max-w-xl text-base md:text-lg leading-relaxed font-mono"
                  >
                    Systems architect focused on performance, accessibility, and
                    autonomous AI integration. Crafting clean software
                    engineering architectures.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-4 pt-4"
                  >
                    <a
                      href="#projects"
                      className="bg-[#00ff41] text-black px-8 py-4 font-bold hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all btn-glitch flex items-center gap-2"
                    >
                      RUN_PROJECTS <Terminal size={18} />
                    </a>
                    <a
                      href="#contact"
                      className="border border-[#00ff41] text-[#00ff41] px-8 py-4 font-bold hover:bg-[#00ff41]/10 transition-all flex items-center gap-2"
                    >
                      CONTACT_ROOT
                    </a>
                  </motion.div>
                </div>

                {/* Right Interactive 3D Canvas Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="lg:col-span-5 h-[350px] md:h-[500px] flex items-center justify-center relative w-full"
                >
                  <div className="w-full h-full border border-[#00ff41]/20 p-4 relative overflow-hidden glass shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col justify-between">
                    {/* Console Header Bar */}
                    <div className="absolute top-0 left-0 w-full bg-[#00ff41]/10 px-3 py-1.5 text-[10px] text-[#00ff41] flex justify-between border-b border-[#00ff41]/20 z-15">
                      <span className="font-bold">SYSTEM_MONITOR.EXE</span>
                      <span className="flex items-center gap-1.5 font-bold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-[#00ff41]"></span>{" "}
                        REC ●
                      </span>
                    </div>

                    {/* Background ThreeJS canvas */}
                    <div className="absolute inset-0 z-0">
                      <CyberCanvas />
                    </div>

                    {/* Console overlay text */}
                    <div className="mt-8 font-mono text-[11px] md:text-[12px] text-[#00ff41]/85 space-y-1 z-10 pointer-events-none select-none max-w-sm">
                      <p className="text-white/60">
                        &gt; CPU: 4.8GHz [CALIBRATED]
                      </p>
                      <p className="text-white/60">
                        &gt; MEMORY: 64GB DDR5 [STABLE]
                      </p>
                      <p className="text-white/60">
                        &gt; RENDERING_ENGINE: THREE.JS
                      </p>
                      <p className="text-[#00f1fd]">
                        &gt; NETWORK: ENCRYPTED // TUNNEL_ESTABLISHED
                      </p>

                      <div className="pt-3">
                        <p className="text-[#00ff41]/50 font-bold">
                          &gt; npm run start --agentic-dev
                        </p>
                        <p className="text-white">
                          &gt; Bootstrapping layout component...
                        </p>
                        <p className="text-white">
                          &gt; Compiling Framer Motion nodes...
                        </p>
                        <p className="text-[#00ff41] font-bold">
                          &gt; Success: 3D HUD Interface Operational.
                        </p>
                      </div>
                    </div>

                    {/* Console Footer */}
                    <div className="text-[9px] text-[#e5e2e1]/30 font-bold text-right pt-2 z-10 select-none">
                      SHADOW_BUFFER: 0x8F99C
                    </div>
                  </div>
                </motion.div>
              </div>
            </header>

            {/* About Profile Section */}
            <section
              id="about"
              className="py-24 bg-[#0a0a0a]/60 border-t border-[#00ff41]/10 relative"
            >
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Left Column Profile Image */}
                  <div className="w-full lg:w-1/3 relative group flex justify-center">
                    <div className="absolute -inset-2 border border-[#00ff41] opacity-40 transition-all duration-300 group-hover:inset-0"></div>
                    <div className="relative overflow-hidden bg-black aspect-square w-full max-w-[320px] cyber-border shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                      <img
                        className="w-full h-full object-cover filter grayscale sepia brightness-[0.75] contrast-[1.2] hover:grayscale-0 hover:sepia-0 hover:brightness-100 transition-all duration-700"
                        src="/assets/Updesh photo.jpeg"
                        alt="Updesh Developer Portrait"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/assets/profile-placeholder.svg";
                        }}
                      />
                      {/* Scanline on photo */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/5 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column Profile Copy */}
                  <div className="w-full lg:w-2/3 space-y-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
                        <span className="text-[#00ff41] font-bold mr-2">
                          01.
                        </span>{" "}
                        CORE_PROFILE
                      </h2>
                      <div className="h-[1px] flex-grow bg-[#00ff41]/20"></div>
                    </div>

                    <p className="text-[#e5e2e1]/85 text-base md:text-lg leading-relaxed">
                      Software Developer specializing in the{" "}
                      <span className="text-[#00ff41] font-bold">
                        Flutter ecosystem
                      </span>
                      . I craft high-performance mobile experiences that
                      prioritize technical precision, neat UI architectures, and
                      creative problem-solving.
                    </p>

                    <p className="text-[#e5e2e1]/85 text-base md:text-lg leading-relaxed">
                      Beyond core frontend development, I architect autonomous{" "}
                      <span className="text-[#00ff41] neon-glow font-bold">
                        AI support platforms
                      </span>
                      , bridging the gap between sophisticated LLMs and business
                      automation using Agentic AI workflows, Spring Boot
                      microservices, and custom server orchestrations.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 text-sm font-bold text-[#00ff41]/80">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00ff41]"></span>{" "}
                          Flutter / Dart
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00ff41]"></span>{" "}
                          Spring Boot
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00ff41]"></span>{" "}
                          Next.js / React
                        </li>
                      </ul>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00ff41]"></span>{" "}
                          Agentic AI / n8n
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00ff41]"></span>{" "}
                          LangChain
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#00ff41]"></span>{" "}
                          Python / TypeScript
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Projects Section */}
            <section
              id="projects"
              className="py-24 bg-[#0e0e0e] border-t border-[#00ff41]/10 relative"
            >
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex items-center gap-4 mb-12">
                  <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
                    <span className="text-[#00ff41] font-bold mr-2">02.</span>{" "}
                    PROJECT_REPOSITORY
                  </h2>
                  <div className="h-[1px] flex-grow bg-[#00ff41]/20"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Project 1 */}
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#131313] border border-[#00ff41]/20 p-6 hover:border-[#00ff41] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <Bot className="text-[#00ff41] w-10 h-10 neon-glow" />
                        <div className="flex gap-3 text-[#e5e2e1]/40">
                          <a
                            href="https://agentic-support-system-inky.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00ff41] transition-colors"
                            aria-label="Live Demo Link"
                          >
                            <ExternalLink size={18} />
                          </a>
                          <a
                            href="https://github.com/Updesh413/AgenticSupportSystem"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00ff41] transition-colors"
                            aria-label="Github Code Link"
                          >
                            <svg
                              className="w-[18px] h-[18px]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3">
                        Agentic Support System
                      </h3>
                      <p className="text-sm text-[#e5e2e1]/65 mb-6 leading-relaxed min-h-[96px]">
                        Built an autonomous AI support platform with Spring Boot
                        microservices and a Next.js 15 frontend, enabling
                        real-time ticket handling with secure authentication and
                        workflow automation.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        Spring Boot
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        Next.js 15
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        LangChain4j
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        n8n
                      </span>
                    </div>
                  </motion.article>

                  {/* Project 2 */}
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#131313] border border-[#00ff41]/20 p-6 hover:border-[#00ff41] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <Smartphone className="text-[#00ff41] w-10 h-10 neon-glow" />
                        <div className="flex gap-3 text-[#e5e2e1]/40">
                          <a
                            href="https://play.google.com/store/apps/details?id=com.Updesh.AIWallpaper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00ff41] transition-colors"
                            aria-label="Play Store Link"
                          >
                            <ExternalLink size={18} />
                          </a>
                          <a
                            href="https://github.com/Updesh413/ai_wallpaper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00ff41] transition-colors"
                            aria-label="Github Code Link"
                          >
                            <svg
                              className="w-[18px] h-[18px]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3">
                        AI Wallpaper
                      </h3>
                      <p className="text-sm text-[#e5e2e1]/65 mb-6 leading-relaxed min-h-[96px]">
                        Launched a high-performance Flutter app integrating
                        Pexels API and Firebase with biometric authentication,
                        optimized image caching, polling configurations, and
                        clean architecture principles.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        Flutter
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        Dart
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        Firebase
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        AI API
                      </span>
                    </div>
                  </motion.article>

                  {/* Project 3 */}
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#131313] border border-[#00ff41]/20 p-6 hover:border-[#00ff41] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <Terminal className="text-[#00ff41] w-10 h-10 neon-glow" />
                        <div className="flex gap-3 text-[#e5e2e1]/40">
                          <a
                            href="https://text-utils-hub.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00ff41] transition-colors"
                            aria-label="Live Demo Link"
                          >
                            <ExternalLink size={18} />
                          </a>
                          <a
                            href="https://github.com/Updesh413/Text-Utils"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00ff41] transition-colors"
                            aria-label="Github Code Link"
                          >
                            <svg
                              className="w-[18px] h-[18px]"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                          </a>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00ff41] transition-colors mb-3">
                        Text Utils
                      </h3>
                      <p className="text-sm text-[#e5e2e1]/65 mb-6 leading-relaxed min-h-[96px]">
                        Developed a highly responsive web application focused on
                        rapid text manipulation, case conversions, clean
                        formatting controls, and reactive light/dark visual
                        theme toggles.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        React.js
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        Bootstrap
                      </span>
                      <span className="text-[10px] px-2 py-1 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase">
                        JavaScript
                      </span>
                    </div>
                  </motion.article>
                </div>
              </div>
            </section>

            {/* Technical Stack Section */}
            <section
              id="skills"
              className="py-24 bg-[#0a0a0a]/60 border-t border-[#00ff41]/10 relative"
            >
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex items-center gap-4 mb-12">
                  <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
                    <span className="text-[#00ff41] font-bold mr-2">03.</span>{" "}
                    TECH_STACK_OVERRIDE
                  </h2>
                  <div className="h-[1px] flex-grow bg-[#00ff41]/20"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Mobile Stack */}
                  <div className="border border-[#00ff41]/20 bg-black/40 p-6 relative hover:border-[#00ff41]/60 transition-colors">
                    <h3 className="text-base font-bold text-[#00ff41] mb-4 flex items-center gap-2 neon-glow uppercase">
                      <Smartphone size={18} /> Mobile
                    </h3>
                    <ul className="space-y-3 text-sm text-[#e5e2e1]/80">
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Flutter</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x01</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Dart</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x02</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Firebase</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x03</span>
                      </li>
                    </ul>
                  </div>

                  {/* Backend Stack */}
                  <div className="border border-[#00ff41]/20 bg-black/40 p-6 relative hover:border-[#00ff41]/60 transition-colors">
                    <h3 className="text-base font-bold text-[#00ff41] mb-4 flex items-center gap-2 neon-glow uppercase">
                      <Cpu size={18} /> Backend
                    </h3>
                    <ul className="space-y-3 text-sm text-[#e5e2e1]/80">
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Java</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x04</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Spring Boot</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x05</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>SQL & REST APIs</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x06</span>
                      </li>
                    </ul>
                  </div>

                  {/* Web Stack */}
                  <div className="border border-[#00ff41]/20 bg-black/40 p-6 relative hover:border-[#00ff41]/60 transition-colors">
                    <h3 className="text-base font-bold text-[#00ff41] mb-4 flex items-center gap-2 neon-glow uppercase">
                      <Globe size={18} /> Web
                    </h3>
                    <ul className="space-y-3 text-sm text-[#e5e2e1]/80">
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Next.js / React</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x07</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>TypeScript</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x08</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Tailwind CSS</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x09</span>
                      </li>
                    </ul>
                  </div>

                  {/* AI & Ops Stack */}
                  <div className="border border-[#00ff41]/20 bg-black/40 p-6 relative hover:border-[#00ff41]/60 transition-colors">
                    <h3 className="text-base font-bold text-[#00ff41] mb-4 flex items-center gap-2 neon-glow uppercase">
                      <Bot size={18} /> AI / Ops
                    </h3>
                    <ul className="space-y-3 text-sm text-[#e5e2e1]/80">
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Agentic AI</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x0A</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>n8n / LangChain</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x0B</span>
                      </li>
                      <li className="flex justify-between border-b border-[#00ff41]/10 pb-1.5">
                        <span>Docker & AWS</span>{" "}
                        <span className="text-[#00ff41] font-bold">0x0C</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications Section */}
            <section
              id="certifications"
              className="py-24 bg-[#0e0e0e] border-t border-[#00ff41]/10 relative"
            >
              <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex items-center gap-4 mb-12">
                  <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">
                    <span className="text-[#00ff41] font-bold mr-2">04.</span>{" "}
                    INDUSTRY_CREDENTIALS
                  </h2>
                  <div className="h-[1px] flex-grow bg-[#00ff41]/20"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Cert 1: Oracle */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#131313] border border-[#00ff41]/20 p-6 hover:border-[#00ff41] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        {/* Company Logo: Oracle */}
                        <img
                          src="/assets/oracle.png"
                          alt="Oracle Logo"
                          className="w-12 h-12 object-contain filter brightness-100 drop-shadow-[0_0_8px_rgba(255,0,0,0.3)]"
                        />
                        <span className="text-[9px] px-2 py-0.5 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase tracking-wider">
                          VERIFIED_0x9A
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm md:text-base font-bold text-white group-hover:text-[#00ff41] transition-colors leading-snug">
                          Oracle Cloud Infrastructure 2025 Certified AI
                          Foundations Associate
                        </h3>
                        <p className="text-xs text-[#e5e2e1]/50 font-bold uppercase mt-1">
                          Oracle
                        </p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <a
                        href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=48172F88DBDE0BF3933C1E49ADEF19403AB82BE2D9F245697CB4496D7ED063F4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#00f1fd] group-hover:text-[#00ff41] transition-colors font-bold uppercase flex items-center gap-1.5"
                      >
                        VIEW_CREDENTIAL <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>

                  {/* Cert 2: AWS Certified AI Practitioner */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#131313] border border-[#00ff41]/20 p-6 hover:border-[#00ff41] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        {/* Company Logo: AWS */}
                        <img
                          src="/assets/aws.png"
                          alt="AWS Logo"
                          className="w-12 h-12 object-contain filter brightness-100 drop-shadow-[0_0_8px_rgba(255,153,0,0.3)]"
                        />
                        <span className="text-[9px] px-2 py-0.5 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase tracking-wider">
                          VERIFIED_0xAF
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm md:text-base font-bold text-white group-hover:text-[#00ff41] transition-colors leading-snug">
                          AWS Certified AI Practitioner
                        </h3>
                        <p className="text-xs text-[#e5e2e1]/50 font-bold uppercase mt-1">
                          AWS
                        </p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <a
                        href="https://www.credly.com/badges/c19a755e-11c8-46bf-a3b0-5a279aaffe67/public_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#00f1fd] group-hover:text-[#00ff41] transition-colors font-bold uppercase flex items-center gap-1.5"
                      >
                        VIEW_CREDENTIAL <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>

                  {/* Cert 3: NVIDIA */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#131313] border border-[#00ff41]/20 p-6 hover:border-[#00ff41] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        {/* Company Logo: NVIDIA */}
                        <img
                          src="/assets/nvidia.png"
                          alt="NVIDIA Logo"
                          className="w-12 h-12 object-contain filter brightness-100 drop-shadow-[0_0_8px_rgba(118,185,0,0.3)]"
                        />
                        <span className="text-[9px] px-2 py-0.5 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase tracking-wider">
                          VERIFIED_0x7C
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm md:text-base font-bold text-white group-hover:text-[#00ff41] transition-colors leading-snug">
                          Fundamentals of Deep Learning
                        </h3>
                        <p className="text-xs text-[#e5e2e1]/50 font-bold uppercase mt-1">
                          NVIDIA
                        </p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <a
                        href="https://learn.nvidia.com/certificates?id=orkOD8orS72oNkUu_FLzkQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#00f1fd] group-hover:text-[#00ff41] transition-colors font-bold uppercase flex items-center gap-1.5"
                      >
                        VIEW_CREDENTIAL <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>

                  {/* Cert 4: Udacity */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#131313] border border-[#00ff41]/20 p-6 hover:border-[#00ff41] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        {/* Company Logo: Udacity */}
                        <img
                          src="/assets/udacity.png"
                          alt="Udacity Logo"
                          className="w-12 h-12 object-contain filter brightness-100 drop-shadow-[0_0_8px_rgba(0,241,253,0.3)]"
                        />
                        <span className="text-[9px] px-2 py-0.5 bg-black text-[#00ff41] border border-[#00ff41]/35 font-bold uppercase tracking-wider">
                          VERIFIED_0x5D
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm md:text-base font-bold text-white group-hover:text-[#00ff41] transition-colors leading-snug">
                          Introducing Generative AI with AWS
                        </h3>
                        <p className="text-xs text-[#e5e2e1]/50 font-bold uppercase mt-1">
                          Udacity
                        </p>
                      </div>
                    </div>

                    <div className="pt-6">
                      <a
                        href="https://www.udacity.com/certificate/e/b7df9e06-436b-11f0-a058-97f01a4c1a5f"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#00f1fd] group-hover:text-[#00ff41] transition-colors font-bold uppercase flex items-center gap-1.5"
                      >
                        VIEW_CREDENTIAL <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Contact / Communication Section */}
            <section
              id="contact"
              className="py-24 bg-[#0a0a0a]/60 border-t border-[#00ff41]/10 relative"
            >
              <div className="max-w-[1200px] mx-auto px-6 text-center">
                <span className="text-[#00ff41] text-xs font-bold tracking-[0.25em] bg-[#00ff41]/10 px-3 py-1 border border-[#00ff41]/20 uppercase">
                  05. ESTABLISH_COMMUNICATION
                </span>

                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-6 uppercase leading-tight">
                  Sync With Me
                </h2>

                <p className="text-[#e5e2e1]/65 max-w-[600px] mx-auto text-sm leading-relaxed mt-4 mb-12">
                  I'm currently seeking new collaborations in high-performance
                  application development and Agentic AI automation. Secure
                  transmission line is open below.
                </p>

                <div className="max-w-[600px] mx-auto bg-black border border-[#00ff41]/30 p-8 glass text-left relative shadow-2xl">
                  {/* Header dots */}
                  <div className="flex gap-1.5 mb-6">
                    <span className="w-2.5 h-2.5 bg-[#00ff41]"></span>
                    <span className="w-2.5 h-2.5 bg-[#00f1fd]"></span>
                    <span className="w-2.5 h-2.5 bg-neutral-800"></span>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label className="text-[10px] text-[#00ff41] font-bold mb-2 block uppercase tracking-wider">
                        Input_Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="ENTER_YOUR_NAME..."
                        className="w-full bg-[#131313] border border-[#00ff41]/20 rounded-none p-3.5 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-all font-mono text-sm placeholder:text-neutral-700"
                        id="contact-name"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-[#00ff41] font-bold mb-2 block uppercase tracking-wider">
                        Input_Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="ENTER_YOUR_EMAIL..."
                        className="w-full bg-[#131313] border border-[#00ff41]/20 rounded-none p-3.5 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-all font-mono text-sm placeholder:text-neutral-700"
                        id="contact-email"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-[#00ff41] font-bold mb-2 block uppercase tracking-wider">
                        Input_Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        placeholder="START_TRANSMISSION..."
                        className="w-full bg-[#131313] border border-[#00ff41]/20 rounded-none p-3.5 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-all font-mono text-sm placeholder:text-neutral-700 resize-none"
                        id="contact-message"
                      />
                    </div>

                    {/* Console Logger Container inside form */}
                    {consoleLogs.length > 0 && (
                      <div className="bg-[#050505] border border-[#00ff41]/10 p-3.5 text-[11px] text-[#00ff41]/85 font-mono space-y-1 mt-4 max-h-[140px] overflow-y-auto">
                        {consoleLogs.map((log, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span>&gt;</span>
                            <p className="whitespace-pre-wrap">{log}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {formStatus === "success" && (
                      <div className="flex items-center gap-2 text-[#00ff41] font-bold text-xs bg-[#00ff41]/10 border border-[#00ff41]/20 p-3">
                        <CheckCircle2 size={16} /> TRANSMISSION RECEIVED.
                        STAND_BY FOR LINK-BACK.
                      </div>
                    )}

                    {formStatus === "error" && (
                      <div className="text-red-500 font-bold text-xs bg-red-500/10 border border-red-500/20 p-3">
                        [ERR] ENCRYPTED_TRANSMISSION_DENIED. VERIFY FIELDS AND
                        RETRY.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full bg-[#00ff41] text-black py-4 font-bold hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] transition-all uppercase tracking-widest btn-glitch text-xs flex justify-center items-center gap-2 disabled:bg-[#00ff41]/50 disabled:cursor-not-allowed"
                    >
                      {formStatus === "sending" ? (
                        "TRANSMITTING..."
                      ) : (
                        <>
                          SEND_PACKET <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </main>

          {/* Footer Bar */}
          <footer className="bg-black w-full py-12 border-t border-[#00ff41]/10 z-10 relative">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start">
                <span className="font-bold text-[#00ff41] text-lg neon-glow tracking-tighter">
                  UPDESH.IO
                </span>
                <p className="text-[10px] text-[#e5e2e1]/30 mt-1 uppercase tracking-widest">
                  © 2026 SYSTEM_ARCHITECT | CORE_STABLE
                </p>
              </div>

              {/* Secure links */}
              <div className="flex gap-8 text-xs font-bold">
                <a
                  href="https://github.com/Updesh413"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5e2e1]/55 hover:text-[#00ff41] transition-all tracking-wider flex items-center gap-1.5"
                >
                  <svg
                    className="w-[14px] h-[14px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>{" "}
                  GITHUB
                </a>
                <a
                  href="https://www.linkedin.com/in/updesh41/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5e2e1]/55 hover:text-[#00ff41] transition-all tracking-wider flex items-center gap-1.5"
                >
                  <svg
                    className="w-[14px] h-[14px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>{" "}
                  LINKEDIN
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
