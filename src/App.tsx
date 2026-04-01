import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Code, ArrowRight, Play, CheckCircle2, ChevronRight, 
  Github, Twitter, Linkedin, Trophy, Zap, TrendingUp, Target,
  Menu, X, ChevronDown, ChevronUp, Star, Layout, BookOpen, Clock,
  Terminal, Database, Monitor, Globe, Moon, Sun
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Roadmap Flow Component
function RoadmapFlow() {
  const nodes = [
    { id: '1', label: 'Arrays & Hashing', x: 250, y: 50, progress: 100 },
    { id: '2', label: 'Two Pointers', x: 150, y: 180, progress: 80 },
    { id: '3', label: 'Stack', x: 350, y: 180, progress: 60 },
    { id: '4', label: 'Sliding Window', x: 50, y: 310, progress: 40 },
    { id: '5', label: 'Linked List', x: 250, y: 310, progress: 40 },
    { id: '6', label: 'Binary Search', x: 450, y: 310, progress: 40 },
    { id: '7', label: 'Trees', x: 250, y: 440, progress: 60 },
    { id: '8', label: 'Tries', x: 100, y: 570, progress: 10 },
    { id: '9', label: 'Heap / Priority Queue', x: 250, y: 570, progress: 5 },
    { id: '10', label: 'Backtracking', x: 400, y: 570, progress: 0 },
  ];

  const connections = [
    { from: '1', to: '2' },
    { from: '1', to: '3' },
    { from: '2', to: '4' },
    { from: '2', to: '5' },
    { from: '2', to: '6' },
    { from: '5', to: '7' },
    { from: '6', to: '7' },
    { from: '7', to: '8' },
    { from: '7', to: '9' },
    { from: '7', to: '10' },
  ];

  return (
    <div className="relative w-full max-w-[500px] h-[650px] mx-auto scale-[0.7] sm:scale-100 origin-center transition-all duration-700">
      <svg viewBox="0 0 500 650" className="w-full h-full drop-shadow-2xl">
        {/* Animated Paths */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)!;
          const toNode = nodes.find(n => n.id === conn.to)!;
          
          const startX = fromNode.x;
          const startY = fromNode.y + 40;
          const endX = toNode.x;
          const endY = toNode.y - 40;
          
          const pathD = `M ${startX} ${startY} C ${startX} ${startY + 60}, ${endX} ${endY - 60}, ${endX} ${endY}`;
          
          return (
            <g key={i}>
              <path
                d={pathD}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={pathD}
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 12"
                className="animate-flow-dash opacity-60"
              />
              <path
                d={`M ${endX-5} ${endY-10} L ${endX} ${endY} L ${endX+5} ${endY-10}`}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x - 75}, ${node.y - 35})`} className="group cursor-pointer">
            <rect
              width="150"
              height="70"
              rx="16"
              fill="#8C6EE0"
              className="group-hover:fill-[#9B7DFF] transition-all duration-300 drop-shadow-[0_0_15px_rgba(140,110,224,0.3)]"
            />
            <text
              x="75"
              y="32"
              textAnchor="middle"
              fill="white"
              className="text-[13px] font-bold select-none"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              {node.label}
            </text>
            
            <rect
              x="15"
              y="45"
              width="120"
              height="6"
              rx="3"
              fill="white"
              fillOpacity="0.2"
            />
            <rect
              x="15"
              y="45"
              width={(node.progress / 100) * 120}
              height="6"
              rx="3"
              fill="white"
              className="transition-all duration-1000 ease-out"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}


// Hook for scroll reveal animations
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Floating Icon Component
function FloatingIcon({ children, className, delay = 0, speed = 3 }: { children: React.ReactNode; className?: string; delay?: number; speed?: number }) {
  return (
    <div 
      className={`absolute pointer-events-none animate-float ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: `${speed}s`,
      }}
    >
      <div className="relative group">
        {/* Subtle, soft glow */}
        <div className="absolute inset-[-20%] bg-primary/10 blur-2xl rounded-full scale-150 group-hover:bg-primary/20 transition-colors" />
        <div className="relative transform hover:rotate-0 transition-transform duration-500 hover:scale-105">
          {children}
        </div>
      </div>
    </div>
  );
}

// Background Beams Component (Aceternity UI spec)
function BackgroundBeams({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generating a grid of lines
  const lines = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: i * 2.5,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 antialiased ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full opacity-[0.2] dark:opacity-[0.3]"
      >
        {/* Horizontal Lines (Grid like) */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 3.33}
            x2="100"
            y2={i * 3.33}
            stroke="currentColor"
            strokeWidth="0.05"
            className="text-primary/10"
          />
        ))}
        {/* Vertical Lines */}
        {lines.map((line) => (
          <line
            key={`v-${line.id}`}
            x1={line.x}
            y1="0"
            x2={line.x}
            y2="100"
            stroke="currentColor"
            strokeWidth="0.1"
            className="text-primary/10"
          />
        ))}
      </svg>

      {/* Animated Beams */}
      <div className="absolute inset-0">
        {lines.map((line, i) => (
          i % 3 === 0 && (
            <motion.div
              key={`beam-${line.id}`}
              initial={{ top: "-20%", opacity: 0 }}
              animate={{
                top: ["-20%", "120%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: line.duration,
                repeat: Infinity,
                delay: line.delay,
                ease: "linear",
              }}
              className="absolute w-[3px] h-48 bg-gradient-to-b from-transparent via-primary to-transparent"
              style={{ 
                left: `${line.x}%`,
                filter: 'drop-shadow(0 0 15px rgba(140, 110, 224, 0.9))'
              }}
            />
          )
        ))}
      </div>
      
      {/* Subtle Radial Mask to soften edges but not hide beams */}
      <div className="absolute inset-0 bg-background/30 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_100%)] pointer-events-none" />
    </div>
  );
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Courses', 'Practice', 'Roadmap', 'Pro'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-9 h-9 bg-primary border-b-2 border-black/20 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">NeetCode</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-foreground transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
            <ThemeToggle />
            <button className="px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-foreground transition-colors duration-200">
              Sign in
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-hover transition-all duration-200 transform hover:scale-105 shadow-lg shadow-primary/20">
              Get Pro
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              className="p-2 text-gray-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="bg-background/95 backdrop-blur-md px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-gray-400 hover:text-foreground transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full px-5 py-2 bg-primary text-white rounded-lg font-bold text-sm">
            Get Pro
          </button>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden font-sans">
      {/* Aceternity Background Beams */}
      <BackgroundBeams />
      
      {/* Background Overlay to ensure readability */}
      <div className="absolute inset-0 bg-background/50 dark:bg-[#080808]/50 z-[1]" />
      <div className="absolute inset-0 bg-background dark:bg-[#080808] z-0" />
      
      {/* Original Scroll Animated Background Shade */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-transform duration-300 ease-out z-[2]"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[140px] animate-pulse" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full mb-12 cursor-default group hover:border-primary/40 transition-colors">
          <Trophy className="w-3 h-3 text-primary" />
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">Trusted by 1M+ Top Engineers</span>
          <span className="text-xs">🔥</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.1] animate-slide-up max-w-5xl mx-auto">
          A better way to prepare for <br className="hidden sm:block" />
          your <span className="text-primary italic">technical interviews</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-20 animate-slide-up-delay leading-relaxed font-medium">
          The ultimate roadmap used by developers to land jobs at Google, Meta, and Amazon. Master DSA, System Design, and more.
        </p>

        {/* Visual Showcase (Inspired by image) */}
        <div className="relative max-w-6xl mx-auto animate-fade-in-delay-2">
          {/* Main Showcase Area */}
          <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-black/20 backdrop-blur-sm p-4 sm:p-8">
            <div className="relative z-10">
              <RoadmapFlow />
            </div>
          </div>

          {/* Floating Elements Around the Window (Colorful/Enhanced) */}
          <FloatingIcon className="top-[-60px] left-[-30px] sm:left-[-140px]" delay={0} speed={4}>
            <div className="p-6 sm:p-8 bg-primary/20 dark:bg-primary/20 backdrop-blur-3xl border border-primary/20 rounded-[2.5rem] transform -rotate-12 group-hover:rotate-0 transition-all duration-700">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <Trophy className="w-9 h-9 sm:w-11 sm:h-11 text-white drop-shadow-lg" />
              </div>
              <div className="space-y-3 text-left">
                <div className="w-24 sm:w-32 h-2.5 bg-white/20 rounded-full" />
                <div className="w-16 sm:w-20 h-2.5 bg-white/10 rounded-full" />
              </div>
            </div>
          </FloatingIcon>

          <FloatingIcon className="bottom-[-40px] right-[-30px] sm:right-[-140px]" delay={1.5} speed={5}>
            <div className="p-7 sm:p-9 bg-primary/20 dark:bg-primary/20 backdrop-blur-3xl border border-primary/20 rounded-[2.5rem] transform rotate-12 group-hover:rotate-0 transition-all duration-700">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-primary border border-white/10 flex items-center justify-center">
                  <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-extrabold text-lg sm:text-xl tracking-tight">150+ Solved</div>
                  <div className="text-white/60 text-xs sm:text-sm font-bold tracking-wide">Daily Streak: 42 🔥</div>
                </div>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                <div className="w-[70%] h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </FloatingIcon>

          <FloatingIcon className="top-[10%] right-[-15%] hidden md:block" delay={2} speed={6}>
            <div className="p-6 bg-primary border border-white/20 rounded-2xl shadow-none">
              <Zap className="w-8 h-8 text-white fill-white/20" />
            </div>
          </FloatingIcon>

          <FloatingIcon className="bottom-[40%] left-[-20%] hidden md:block" delay={3} speed={7}>
            <div className="p-6 bg-primary/40 border border-white/10 backdrop-blur-md rounded-2xl shadow-none">
              <Code className="w-8 h-8 text-white" />
            </div>
          </FloatingIcon>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </section>
  );
}

// Trusted Companies Section
function TrustedCompanies() {
  const companies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix', 'OpenAI', 'Anthropic'];

  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 opacity-50">
          Trusted by developers at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-20">
          {companies.map((company) => (
            <span
              key={company}
              className="text-gray-400 font-bold text-xl md:text-2xl hover:text-primary transition-all duration-300 cursor-default"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    { name: 'Arrays & Hashing', icon: '📊', color: 'from-blue-500 to-cyan-500' },
    { name: 'Two Pointers', icon: '🔄', color: 'from-purple-500 to-pink-500' },
    { name: 'Binary Search', icon: '🔍', color: 'from-orange-500 to-red-500' },
    { name: 'Stack', icon: '📚', color: 'from-green-500 to-emerald-500' },
    { name: 'Sliding Window', icon: '🪟', color: 'from-cyan-500 to-blue-500' },
    { name: 'Linked List', icon: '🔗', color: 'from-pink-500 to-rose-500' },
    { name: 'Trees', icon: '🌲', color: 'from-green-500 to-teal-500' },
    { name: 'Tries', icon: '🌳', color: 'from-amber-500 to-orange-500' },
    { name: 'Heap / Priority Queue', icon: '⚡', color: 'from-violet-500 to-purple-500' },
    { name: 'Backtracking', icon: '↩️', color: 'from-indigo-500 to-blue-500' },
  ];

  return (
    <section id="courses" className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            Master Every <span className="gradient-text">Topic</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Comprehensive coverage of all essential data structures and algorithms topics, designed to make you an expert.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.name} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: { name: string; icon: string; color: string }; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group relative p-6 bg-card rounded-2xl border border-border hover:border-primary/40 transition-all duration-500 hover:transform hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-primary/5 ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
          <span className="filter transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(140,110,224,0.5)]">{feature.icon}</span>
        </div>
        <h3 className="text-foreground font-bold text-sm tracking-tight mb-2 group-hover:text-primary transition-colors">{feature.name}</h3>
        <div className="w-8 h-1 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
}

// Practice Section
function PracticeSection() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Practicing
              <span className="block text-primary">for Free</span>
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              The best resources for coding interviews. Period.
            </p>

            <div className="space-y-3 mb-8">
              {[
                'Organized study plans: Blind 75, NeetCode 150, NeetCode 250',
                'Detailed video explanations for every problem',
                'Track your progress and stay motivated',
                'Join our public Discord community'
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/20">
                Start Practicing
              </button>
              <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-all duration-300">
                View Roadmap
              </button>
            </div>
          </div>

          {/* Code Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl" />
            <div className="relative bg-[#111111] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center space-x-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-4 text-gray-500 text-[11px] font-mono">two-sum.py</span>
              </div>
              {/* Code Content */}
              <div className="p-0 font-mono text-[13px] overflow-x-auto bg-[#0a0a0a]">
                <div className="flex flex-col py-4">
                  {[
                    { number: 1, content: <><span className="text-purple-400">class</span> <span className="text-yellow-400">Solution</span>:</> },
                    { number: 2, content: <><span className="ml-4"><span className="text-purple-400">def</span> <span className="text-cyan-400">twoSum</span>(<span className="text-purple-400">self</span>, nums: List[<span className="text-purple-400">int</span>], target: <span className="text-purple-400">int</span>) {'->'} List[<span className="text-purple-400">int</span>]:</span></> },
                    { number: 3, content: <><span className="ml-8">seen = {'{}'}</span></> },
                    { number: 4, content: <><span className="ml-8"><span className="text-purple-400">for</span> i, num <span className="text-purple-400">in</span> <span className="text-purple-400">enumerate</span>(nums):</span></> },
                    { number: 5, content: <><span className="ml-12">complement = target - num</span></> },
                    { number: 6, content: <><span className="ml-12"><span className="text-purple-400">if</span> complement <span className="text-purple-400">in</span> seen:</span></> },
                    { number: 7, content: <><span className="ml-16"><span className="text-purple-400">return</span> [seen[complement], i]</span></> },
                    { number: 8, content: <><span className="ml-12">seen[num] = i</span></> },
                    { number: 9, content: <><span className="ml-8"><span className="text-purple-400">return</span> []</span></> },
                  ].map((line) => (
                    <div key={line.number} className="flex hover:bg-white/5 transition-colors group px-4">
                      <span className="w-8 text-gray-700 text-[10px] text-right pr-4 select-none pt-1">{line.number}</span>
                      <span className="text-gray-300 py-0.5">{line.content}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Status Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-t border-white/5">
                <div className="flex items-center space-x-4 text-[11px]">
                  <span className="text-primary flex items-center space-x-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accepted</span>
                  </span>
                  <span className="text-gray-500">O(n) time</span>
                </div>
                <span className="text-gray-500 text-[11px]">Easy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Courses Section
function CoursesSection() {
  const courses = [
    {
      title: 'Data Structures & Algorithms',
      description: 'Follow a structured path to learn all of the core data structures & algorithms. Perfect for coding interview preparation.',
      items: [
        { name: 'Algorithms & Data Structures for Beginners', duration: '25 hours', difficulty: 'Medium' },
        { name: 'Advanced Algorithms', duration: '25 hours', difficulty: 'Hard' },
      ],
      color: 'from-primary to-accent',
    },
    {
      title: 'System Design',
      description: 'Brush up on core system design concepts for designing robust backend systems.',
      items: [
        { name: 'System Design for Beginners', duration: '10 hours', difficulty: 'Medium' },
        { name: 'System Design Interview', duration: '10 hours', difficulty: 'Medium' },
      ],
      color: 'from-[#4F46E5] to-[#7C3AED]',
    },
    {
      title: 'Python',
      description: 'Learn the Python programming language with interactive coding lessons.',
      items: [
        { name: 'Python for Beginners', duration: '12 hours', difficulty: 'Easy' },
        { name: 'Python for Coding Interviews', duration: '8 hours', difficulty: 'Easy' },
        { name: 'Python OOP', duration: '8 hours', difficulty: 'Easy' },
      ],
      color: 'from-accent to-[#B794F4]',
    },
  ];

  return (
    <section className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Structured Learning Paths
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            From beginner to advanced, follow courses designed to take you from zero to interview-ready
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.title} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, index }: { course: { title: string; description: string; items: { name: string; duration: string; difficulty: string }[]; color: string }; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group bg-[#1a1a1a] rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`h-2 bg-gradient-to-r ${course.color}`} />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3">{course.title}</h3>
        <p className="text-gray-400 text-sm mb-6">{course.description}</p>
        <div className="space-y-3">
          {course.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-t border-white/5">
              <span className="text-gray-300 text-sm">{item.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{item.duration}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  item.difficulty === 'Easy' ? 'bg-primary/20 text-primary' :
                  item.difficulty === 'Medium' ? 'bg-accent/20 text-accent' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {item.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    { name: 'Amog Chandrashekar', company: 'Google', text: 'I signed my offer with Google as a software engineer (L4) and you have a fair share of contribution in it.' },
    { name: 'Rodrigo Ramirez', company: 'Microsoft', text: 'I recently got an offer for Microsoft, and I will be starting next year! Thank you so much for your videos!' },
    { name: 'Aiswarya Sukumar', company: 'Amazon', text: 'Got an offer from Amazon today. Thanks a lot for your videos. It really helped me during the preparation.' },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-400">
            Real results from real engineers who prepared with NeetCode
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: { name: string; company: string; text: string }; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`bg-[#111111] rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all duration-300 ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      <p className="text-gray-400 mb-6 italic text-sm leading-relaxed">"{testimonial.text}"</p>
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          {testimonial.name[0]}
        </div>
        <div>
          <p className="text-white font-bold text-sm">{testimonial.name}</p>
          <p className="text-primary text-xs font-medium">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}

// Founder Section
function FounderSection() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] rounded-3xl p-8 sm:p-10 border border-white/5 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl font-bold">
                N
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">About the Founder</h3>
                <p className="text-primary font-bold text-sm">Navi</p>
                <p className="text-gray-500 text-xs font-medium">Previously: Google, Amazon, Capital One</p>
              </div>
            </div>

            <blockquote className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 font-medium italic">
              "I created NeetCode in 2020 when I was unemployed and couldn't find a job. While I was struggling myself, it was still rewarding for me to make videos. I received so many messages from others who got jobs after studying with my videos. I felt so gratifying and kept me motivated. About a year later I managed to get a job at Google."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What makes NeetCode different from other coding interview prep platforms?',
      answer: 'NeetCode provides a structured, curated learning path with high-quality video explanations. Our content is designed to be efficient and practical, focusing on patterns and concepts that appear frequently in real interviews at top tech companies.'
    },
    {
      question: 'How much time do I need to prepare for coding interviews?',
      answer: 'Most students who follow our curriculum consistently for 2-3 months (15-20 hours per week) are able to clear coding interviews at major tech companies. However, the exact time depends on your starting level and target companies.'
    },
    {
      question: 'Are the video explanations included with the free tier?',
      answer: 'The free tier includes access to our problem bank and community features. Pro subscribers get access to detailed video explanations, curated study plans, and additional premium content.'
    },
    {
      question: 'What programming languages are supported?',
      answer: 'We support Python, Java, JavaScript, TypeScript, C++, Go, and Rust. Our code examples and explanations are available in all major languages used in technical interviews.'
    },
    {
      question: 'Can I track my progress across devices?',
      answer: 'Yes! Your progress syncs automatically when you sign in. You can practice on any device and pick up exactly where you left off.'
    },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-bold text-sm pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                )}
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
              }`}>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#111111] rounded-3xl p-10 text-center border border-white/5 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-3 px-5 py-2.5 bg-black rounded-full mb-8 group relative cursor-default">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[-1px] rounded-full bg-gradient-to-r from-primary/20 to-primary/20" />
              
              <div className="relative flex items-center space-x-2">
                <span className="text-[13px] text-white font-bold tracking-wide">Crafted By Top Engineers</span>
                <span className="text-sm">🔥</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Land Your
              <span className="block text-primary">Dream Job?</span>
            </h2>

            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto font-medium">
              Start your journey today with NeetCode Pro and get access to everything you need to ace your next technical interview.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-3 bg-primary text-white rounded-xl font-bold text-base hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 shadow-xl shadow-primary/20 flex items-center space-x-2">
                <span>Get NeetCode Pro</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-base hover:bg-white/10 transition-all duration-300">
                Try Free First
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const footerLinks = {
    Practice: ['Blind 75', 'NeetCode 150', 'NeetCode 250', 'How to use NeetCode'],
    Resources: ['Courses', 'Roadmap', 'Discord', 'YouTube'],
    Company: ['About', 'Contact', 'Privacy', 'Terms'],
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">NeetCode</span>
            </div>
            <p className="text-gray-500 text-xs font-medium leading-relaxed">
              A better way to prepare for your technical interviews.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            Copyright © 2026 neetcode.io All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <HeroSection />
      <TrustedCompanies />
      <FeaturesSection />
      <PracticeSection />
      <CoursesSection />
      <TestimonialsSection />
      <FounderSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
