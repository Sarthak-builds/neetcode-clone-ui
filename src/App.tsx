import { useState, useEffect, useRef } from 'react';
import { Code, BookOpen, Users, ChevronDown, ChevronUp, Play, CheckCircle2, Star, ArrowRight, Menu, X, Zap, Trophy, Target, TrendingUp } from 'lucide-react';
import './App.css';

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
      isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">NeetCode</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
            <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
              Sign in
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium text-sm hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-green-500/25">
              Get Pro
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <div className="bg-[#0a0a0a]/95 backdrop-blur-md px-4 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium text-sm">
            Get Pro
          </button>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f1f0f] to-[#0a0a0a]" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glowing Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8 animate-fade-in">
          <Zap className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-medium">Trusted by 1M+ engineers worldwide</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-slide-up">
          A Better Way to
          <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Prepare
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 animate-slide-up-delay">
          Tech interview roadmaps trusted by engineers at Google, Meta, OpenAI, and other top tech companies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delay-2">
          <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-green-500/30 flex items-center space-x-2">
            <span>Get Pro</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Start Practicing Free</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto animate-fade-in-delay">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              <AnimatedCounter end={1000} suffix="+" />
            </div>
            <p className="text-gray-500">Practice Problems</p>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              <AnimatedCounter end={1} suffix="M+" />
            </div>
            <p className="text-gray-500">Engineers Prepared</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-500" />
      </div>
    </section>
  );
}

// Trusted Companies Section
function TrustedCompanies() {
  const companies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Netflix', 'OpenAI', 'Anthropic'];

  return (
    <section className="py-16 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wider">
          Trusted by engineers at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {companies.map((company, index) => (
            <div
              key={company}
              className="text-gray-400 text-xl sm:text-2xl font-semibold hover:text-white transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {company}
            </div>
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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Master Every Topic
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive coverage of all essential data structures and algorithms topics
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
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
      className={`group relative p-6 bg-[#1a1a1a] rounded-2xl border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105 ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {feature.icon}
      </div>
      <h3 className="text-white font-medium text-sm">{feature.name}</h3>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Start Practicing
              <span className="block text-green-400">for Free</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              The best resources for coding interviews. Period.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Organized study plans: Blind 75, NeetCode 150, NeetCode 250',
                'Detailed video explanations for every problem',
                'Track your progress and stay motivated',
                'Join our public Discord community'
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25">
                Start Practicing
              </button>
              <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                View Roadmap
              </button>
            </div>
          </div>

          {/* Code Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl rounded-3xl" />
            <div className="relative bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center space-x-2 px-4 py-3 bg-[#252525] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-500 text-sm">two-sum.py</span>
              </div>
              {/* Code Content */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300"><span className="text-purple-400">class</span> <span className="text-yellow-400">Solution</span>:
    <span className="text-purple-400">    def</span> <span className="text-cyan-400">twoSum</span>(<span className="text-purple-400">self</span>, nums: List[<span className="text-purple-400">int</span>], target: <span className="text-purple-400">int</span>) {'->'} List[<span className="text-purple-400">int</span>]:
        seen = {'{}'}
        <span className="text-purple-400">        for</span> i, num <span className="text-purple-400">in</span> <span className="text-purple-400">enumerate</span>(nums):
            complement = target - num
            <span className="text-purple-400">            if</span> complement <span className="text-purple-400">in</span> seen:
                <span className="text-purple-400">                return</span> [seen[complement], i]
            seen[num] = i
        <span className="text-purple-400">        return</span> []</pre>
              </div>
              {/* Status Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#252525] border-t border-white/5">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accepted</span>
                  </span>
                  <span className="text-gray-500">O(n) time</span>
                </div>
                <span className="text-gray-500 text-sm">Easy</span>
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
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'System Design',
      description: 'Brush up on core system design concepts for designing robust backend systems.',
      items: [
        { name: 'System Design for Beginners', duration: '10 hours', difficulty: 'Medium' },
        { name: 'System Design Interview', duration: '10 hours', difficulty: 'Medium' },
      ],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Python',
      description: 'Learn the Python programming language with interactive coding lessons.',
      items: [
        { name: 'Python for Beginners', duration: '12 hours', difficulty: 'Easy' },
        { name: 'Python for Coding Interviews', duration: '8 hours', difficulty: 'Easy' },
        { name: 'Python OOP', duration: '8 hours', difficulty: 'Easy' },
      ],
      color: 'from-yellow-500 to-orange-600',
    },
  ];

  return (
    <section className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Structured Learning Paths
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  item.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
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
      className={`bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 hover:border-green-500/30 transition-all duration-300 ${
        isVisible ? 'animate-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
          {testimonial.name[0]}
        </div>
        <div>
          <p className="text-white font-medium">{testimonial.name}</p>
          <p className="text-green-400 text-sm">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}

// Founder Section
function FounderSection() {
  return (
    <section className="py-24 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] rounded-3xl p-8 sm:p-12 border border-white/5 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
                N
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">About the Founder</h3>
                <p className="text-green-400">Navi</p>
                <p className="text-gray-500 text-sm">Previously: Google, Amazon, Capital One</p>
              </div>
            </div>

            <blockquote className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-8">
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
                <span className="text-white font-medium pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
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
        <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl p-12 text-center border border-green-500/20 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full mb-6">
              <Trophy className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Join 1M+ successful engineers</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Land Your
              <span className="block text-green-400">Dream Job?</span>
            </h2>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Start your journey today with NeetCode Pro and get access to everything you need to ace your next technical interview.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-green-500/30 flex items-center space-x-2">
                <span>Get NeetCode Pro</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
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
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">NeetCode</span>
            </div>
            <p className="text-gray-500 text-sm">
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
