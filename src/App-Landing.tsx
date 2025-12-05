import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Target,
  ShieldCheck,
  FileText,
  Network,
  CheckCircle,
  UserCheck,
  Building2,
  Tractor,
  Factory,
  UtensilsCrossed,
  Heart,
  Laptop,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { Badge } from './components/ui/badge';
import { CountUpStat } from './components/landing/CountUpStat';
import { EuropeMap } from './components/landing/EuropeMap';
import { TestimonialCarousel } from './components/landing/TestimonialCarousel';

export default function AppLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    needType: '',
    message: '',
  });

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Waitlist email:', waitlistEmail);
    alert('Merci ! Vous êtes inscrit à la liste d\'attente.');
    setWaitlistEmail('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert('Merci ! Nous vous recontacterons sous 24h.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      needType: '',
      message: '',
    });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg">
                YOJOB
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#home" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                Accueil
              </a>
              <a href="#services" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                Services
              </a>
              <a href="#network" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                Notre réseau
              </a>
              <a href="#contact" className={`transition-colors ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                Contact
              </a>
            </nav>

            {/* CTA + Language Selector */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className={`text-sm flex items-center gap-1 bg-transparent transition-colors ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-blue-200'}`}
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
              </button>
              <a 
                href="/survey"
                className="relative overflow-hidden group rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 px-6 py-3 border-2 border-white/20 inline-flex items-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Enquête Européenne</span>
                  <Badge className="bg-yellow-400 text-yellow-900 border-0 text-xs px-2 py-0.5">
                    5 min
                  </Badge>
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                {/* Glow rings */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 blur-xl animate-pulse" />
                </div>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4 pb-6 bg-gradient-to-br from-[#1E3A8A]/95 via-[#7C3AED]/95 to-[#06B6D4]/95 backdrop-blur-xl border-t border-white/20 rounded-b-3xl shadow-2xl"
            >
              <nav className="flex flex-col gap-3 px-4 pt-6">
                <a
                  href="#home"
                  className="text-white hover:text-cyan-300 transition-all py-3 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </a>
                <a
                  href="#services"
                  className="text-white hover:text-cyan-300 transition-all py-3 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#network"
                  className="text-white hover:text-cyan-300 transition-all py-3 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notre réseau
                </a>
                <a
                  href="#contact"
                  className="text-white hover:text-cyan-300 transition-all py-3 px-4 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <a 
                  href="/survey"
                  onClick={() => setIsMenuOpen(false)}
                  className="relative overflow-hidden group rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:via-purple-500 hover:to-cyan-500 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 px-6 py-3 border-2 border-white/20 inline-flex items-center justify-center mt-4"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Enquête Européenne</span>
                    <Badge className="bg-yellow-400 text-yellow-900 border-0 text-xs px-2 py-0.5">
                      5 min
                    </Badge>
                  </span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  {/* Glow rings */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/30 to-cyan-500/30 blur-xl animate-pulse" />
                  </div>
                </a>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * -100, Math.random() * 100],
              x: [null, Math.random() * -50, Math.random() * 50],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10 pt-16 pb-8 lg:pt-20 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Badge className="mb-3 lg:mb-6 bg-white/20 text-white border-white/30 px-4 py-2 backdrop-blur-md shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all">
                  <span className="text-yellow-300">⭐</span> Leader du recrutement européen
                </Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white mb-2 lg:mb-6 text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight"
              >
                Recrutez les meilleurs talents européens
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/95 text-lg lg:text-xl mb-4 lg:mb-8 leading-relaxed"
              >
                Un interlocuteur unique pour accéder à 500+ agences d'emploi certifiées dans 27 pays
              </motion.p>

              {/* Stats in glassmorphism cards - Desktop only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden lg:grid grid-cols-3 gap-3 mb-8"
              >
                {[
                  { value: '500+', label: 'Agences' },
                  { value: '27', label: 'Pays' },
                  { value: '2000+', label: 'Missions' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-white mb-1">{stat.value}</div>
                    <div className="text-cyan-200 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-2.5 lg:gap-4 mb-5 lg:mb-0"
              >
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="relative overflow-hidden group rounded-full bg-white text-blue-900 hover:bg-cyan-50 shadow-2xl hover:shadow-white/70 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Trouver du personnel
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </Button>
                <Button
                  onClick={scrollToServices}
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-white/30 text-white bg-transparent hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50"
                >
                  Découvrir nos services
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Interactive Europe Map - Desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* Glassmorphism container */}
              <div className="relative overflow-hidden rounded-3xl">
                {/* Decorative glows */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
                
                {/* Glassmorphism container */}
                <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl shadow-2xl px-[135px] py-[40px]">
                  <EuropeMap variant="hero" />

                  {/* Floating stats badges - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="absolute top-4 right-4 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-3 text-white shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
                      </div>
                      <div>
                        <div className="text-xs text-cyan-200">Réseau actif</div>
                        <div>27 pays européens</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 }}
                    className="absolute bottom-4 left-4 bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-md border border-white/40 rounded-2xl px-5 py-3 text-white shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-cyan-300" />
                      <div>
                        <div className="text-xs text-cyan-200">Partenaires</div>
                        <div>500+ agences certifiées</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.9 }}
                    className="absolute top-4 left-4 bg-gradient-to-br from-yellow-400/30 to-orange-400/20 backdrop-blur-md border border-yellow-300/40 rounded-2xl px-5 py-3 text-white shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🌟</span>
                      <div>
                        <div className="text-xs text-yellow-200">Depuis</div>
                        <div>2014</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Mobile: Key Features Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:hidden space-y-2.5"
            >
              {/* Card 1: 27 pays */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-3.5 shadow-xl hover:shadow-cyan-500/30 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 p-2.5 rounded-xl">
                    <Globe className="w-8 h-8 text-cyan-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-2xl font-extrabold mb-0.5">27</div>
                    <div className="text-cyan-200 text-xs">Pays européens</div>
                  </div>
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
                  </div>
                </div>
              </motion.div>

              {/* Card 2: 500+ agences */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-3.5 shadow-xl hover:shadow-green-500/30 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 p-2.5 rounded-xl">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-2xl font-extrabold mb-0.5">500+</div>
                    <div className="text-cyan-200 text-xs">Agences certifiées</div>
                  </div>
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
              </motion.div>

              {/* Card 3: 10 ans d'expérience */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-yellow-400/20 to-orange-400/10 backdrop-blur-xl border-2 border-yellow-300/30 rounded-2xl p-3.5 shadow-xl hover:shadow-yellow-500/40 hover:from-yellow-400/30 hover:to-orange-400/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-500/20 p-2.5 rounded-xl">
                    <ShieldCheck className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-2xl font-extrabold mb-0.5">10 ans</div>
                    <div className="text-yellow-200 text-xs">D'expertise leader</div>
                  </div>
                  <span className="text-3xl">⭐</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-1 border-0">
                Nos chiffres clés
              </Badge>
            </motion.div>
            <h2 className="text-gray-900 mb-4">10 ans d'expertise européenne</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Des résultats concrets qui témoignent de notre engagement et de notre savoir-faire
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Stat 1 - Années d'expertise */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-8 relative text-center">
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CountUpStat end={10} suffix="+" label="ans d'expertise" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Stat 2 - Pays couverts */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-cyan-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-8 relative text-center">
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CountUpStat end={27} label="pays couverts" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Stat 3 - Agences partenaires */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-purple-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-8 relative text-center">
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Network className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CountUpStat end={500} suffix="+" label="agences partenaires" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Stat 4 - Missions réalisées */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-green-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-8 relative text-center">
                  <div className="mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <CountUpStat end={2000} suffix="+" label="missions réalisées" />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="relative py-24 overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6"
            >
              <span className="text-2xl">⚡</span>
              <span className="text-white/90 tracking-wide">Nos services</span>
            </motion.div>
            <h2 className="text-white mb-6">Des solutions adaptées à vos besoins</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Que vous cherchiez du personnel en intérim, des profils spécialisés ou un accompagnement administratif, nous avons la solution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Service 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="h-full border border-white/10 hover:border-blue-400/50 transition-all duration-300 shadow-2xl bg-white/5 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <CardHeader className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] group-hover:scale-110 transition-all duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white mb-3 text-center">Intérim européen</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-gray-300 text-center text-sm leading-relaxed mb-4">
                    Accédez à une main-d'œuvre qualifiée et disponible immédiatement. Nos agences partenaires sélectionnent les meilleurs profils pour vos chantiers et projets.
                  </p>
                  <a href="#contact" className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2 group/link">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="h-full border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-2xl bg-white/5 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <CardHeader className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-all duration-300">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white mb-3 text-center">Recrutement spécialisé</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-gray-300 text-center text-sm leading-relaxed mb-4">
                    Profils rares, postes techniques, cadres européens : notre réseau trouve les talents introuvables en France.
                  </p>
                  <a href="#contact" className="text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-2 group/link">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <Card className="h-full border border-white/10 hover:border-purple-400/50 transition-all duration-300 shadow-2xl bg-white/5 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <CardHeader className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(124,58,237,0.5)] group-hover:shadow-[0_0_50px_rgba(124,58,237,0.8)] group-hover:scale-110 transition-all duration-300">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-white mb-3 text-center">Conseil & Conformité</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-gray-300 text-center text-sm leading-relaxed mb-4">
                    Détachement SIPSI, hébergement, contrats : nous sécurisons 100% de vos démarches administratives.
                  </p>
                  <a href="#contact" className="text-purple-400 hover:text-purple-300 flex items-center justify-center gap-2 group/link">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NETWORK SECTION - Full Width */}
      <section id="network" className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)',
          }} />
        </div>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`network-particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * 600,
            }}
            animate={{
              y: [null, Math.random() * -80, Math.random() * 80],
              x: [null, Math.random() * -40, Math.random() * 40],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}

        {/* Header section with container */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
                🌍 Réseau Européen
              </div>
            </motion.div>
            <h2 className="text-white mb-6">Le plus grand réseau d'agences d'emploi en Europe</h2>
            <p className="text-cyan-100 text-xl max-w-3xl mx-auto">
              Des partenaires vérifiés dans chaque pays de l'Union Européenne
            </p>
          </motion.div>
        </div>

        {/* Europe Map - Full width, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 px-4 relative z-10"
        >
          <EuropeMap variant="network" />
        </motion.div>

        {/* Country Badges and rest - back in container */}
        <div className="container mx-auto px-4 relative z-10">
          {/* Waitlist Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-1 shadow-2xl">
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-50" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -mr-48 -mt-48 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -ml-48 -mb-48 animate-pulse" />
              
              {/* Glass card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-8 lg:p-12 border border-white/20">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left side: Content */}
                  <div className="relative z-10">
                    <div className="flex flex-col items-center lg:items-start w-full">
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        whileInView={{ scale: 1, rotate: 12 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2, duration: 0.6 }}
                        className="inline-block"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(124,58,237,0.6)] transform rotate-12 group-hover:shadow-[0_0_50px_rgba(124,58,237,0.8)] transition-all duration-300">
                          <span className="text-4xl transform -rotate-12">🚀</span>
                        </div>
                      </motion.div>
                      
                      <div className="mb-4 w-full">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                          className="flex justify-center lg:justify-start"
                        >
                          <Badge className="mb-4 bg-gradient-to-r from-violet-500/30 to-cyan-500/30 text-white border-white/40 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-violet-500/20">
                            ✨ Nouveauté 2025
                          </Badge>
                        </motion.div>
                        <h3 className="text-white mb-3 text-center lg:text-left px-0">
                          Bientôt : Accédez directement à notre base d'agences
                        </h3>
                        <p className="text-cyan-100 text-lg leading-relaxed text-center lg:text-left px-0">
                          Recherchez, comparez et contactez les agences européennes directement sur notre plateforme. 
                          Gagnez du temps et trouvez le partenaire idéal en quelques clics.
                        </p>
                      </div>

                      {/* Features list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 w-full px-0">
                        {[
                          'Recherche multicritères',
                          'Comparaison instantanée',
                          'Avis vérifiés',
                          'Mise en relation directe'
                        ].map((feature, i) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-2 text-white/90 justify-center lg:justify-start"
                          >
                            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side: Form */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                    className="relative"
                  >
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl shadow-violet-500/10 border border-white/60 hover:border-violet-300/50 transition-all duration-300">
                      <div className="text-center mb-6">
                        <h4 className="text-gray-900 mb-2">Soyez parmi les premiers !</h4>
                        <p className="text-gray-600">
                          Inscrivez-vous à la liste d'attente et recevez un accès prioritaire
                        </p>
                      </div>
                      
                      <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                        <div className="relative group">
                          <Input
                            type="email"
                            placeholder="Votre email professionnel"
                            value={waitlistEmail}
                            onChange={(e) => setWaitlistEmail(e.target.value)}
                            required
                            className="h-14 px-6 bg-white border-2 border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 rounded-xl text-base shadow-sm transition-all duration-300"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 group-focus-within:text-violet-500">
                            <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-violet-500" />
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          size="lg"
                          className="relative overflow-hidden group w-full h-14 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-700 hover:via-purple-700 hover:to-cyan-700 text-white rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            M'inscrire à la liste d'attente
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </span>
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </Button>
                      </form>

                      <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                        🔒 <span>Vos données sont sécurisées et ne seront jamais partagées</span>
                      </p>
                    </div>

                    {/* Decorative elements - Cohérent avec la palette */}
                    <div className="absolute -top-3 -right-3 w-32 h-32 bg-violet-500/30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 px-4 py-1 border-0">
                Notre méthodologie
              </Badge>
            </motion.div>
            <h2 className="text-gray-900 mb-4">Simple, rapide, sécurisé</h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Un processus en 4 étapes pour trouver vos talents partout en Europe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative max-w-7xl mx-auto">
            {/* Connecting line with dots (desktop) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 via-purple-600 to-green-500 opacity-20 rounded-full" style={{ width: 'calc(100% - 120px)', left: '60px' }} />
            
            {/* Animated dots on the line */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`dot-${i}`}
                className="hidden lg:block absolute w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg"
                style={{
                  top: '93px',
                  left: `calc(${60 + (i * 33.33)}% + ${i === 0 ? '0px' : i === 3 ? '-12px' : '-6px'})`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              />
            ))}

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-blue-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 relative">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <span className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">01</span>
                  </div>
                  
                  <div className="mt-6 mb-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-1 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-gray-900 mb-3 text-center">Décrivez votre besoin</h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Remplissez notre formulaire en 2 minutes : profils recherchés, nombre de postes et dates de mission
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-cyan-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 relative">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <span className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">02</span>
                  </div>
                  
                  <div className="mt-6 mb-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-1 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Network className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-gray-900 mb-3 text-center">Nous activons notre réseau</h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Nos 500+ agences partenaires européennes recherchent les meilleurs candidats pour votre projet
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-purple-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 relative">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center text-white shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <span className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">03</span>
                  </div>
                  
                  <div className="mt-6 mb-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-1 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <UserCheck className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-gray-900 mb-3 text-center">Validez les candidats</h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Recevez les CV pré-qualifiés et organisez les entretiens selon vos critères de sélection
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-transparent hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-green-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="p-6 relative">
                  {/* Step number badge */}
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <span className="transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">04</span>
                  </div>
                  
                  <div className="mt-6 mb-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-1 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-gray-900 mb-3 text-center">Accueillez votre équipe</h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    Nous gérons la logistique complète, l'administratif et l'hébergement de A à Z
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-6"
            >
              <span className="text-2xl">⭐</span>
              <span className="text-white/90 tracking-wide">Témoignages clients</span>
            </motion.div>
            <h2 className="text-white mb-6">Ils nous font confiance</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Découvrez les retours d'expérience de nos clients satisfaits à travers toute l'Europe
            </p>
          </motion.div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* SECTORS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1E3A8A]/10 to-[#06B6D4]/10 backdrop-blur-sm border border-[#06B6D4]/30 rounded-full px-6 py-2 mb-6"
            >
              <span className="text-2xl">🎯</span>
              <span className="text-[#1E3A8A] tracking-wide">Tous secteurs</span>
            </motion.div>
            <h2 className="text-gray-900 mb-4">Tous secteurs, tous profils</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Nous recrutons pour l'ensemble des secteurs d'activité à travers toute l'Europe
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { icon: Building2, name: 'BTP & Construction', gradient: 'from-orange-500 to-orange-600', iconColor: 'text-orange-500' },
              { icon: Tractor, name: 'Agriculture & Viticulture', gradient: 'from-green-500 to-green-600', iconColor: 'text-green-500' },
              { icon: Factory, name: 'Industrie & Logistique', gradient: 'from-[#1E3A8A] to-[#06B6D4]', iconColor: 'text-[#1E3A8A]' },
              { icon: UtensilsCrossed, name: 'Hôtellerie & Restauration', gradient: 'from-red-500 to-rose-600', iconColor: 'text-red-500' },
              { icon: Heart, name: 'Santé & Médical', gradient: 'from-pink-500 to-rose-600', iconColor: 'text-pink-500' },
              { icon: Laptop, name: 'Tertiaire & IT', gradient: 'from-[#06B6D4] to-[#7C3AED]', iconColor: 'text-[#06B6D4]' },
            ].map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group"
              >
                <div className="relative h-full bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-xl hover:shadow-[#06B6D4]/10 hover:-translate-y-2 hover:bg-white/80 cursor-pointer overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sector.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon container with gradient */}
                  <div className="relative">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${sector.gradient} p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <sector.icon className={`w-8 h-8 ${sector.iconColor} transition-all duration-300 group-hover:scale-110`} strokeWidth={2} />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                      {sector.name}
                    </p>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + CONTACT FORM SECTION */}
      <section
        id="contact"
        className="py-12 lg:py-20 relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#7C3AED] to-[#06B6D4]"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Badge className="mb-3 lg:mb-4 bg-white/20 text-white border-white/30 px-4 py-2 backdrop-blur-md shadow-lg shadow-cyan-500/30">
                  <span className="text-yellow-300">💼</span> Demande de devis
                </Badge>
              </motion.div>

              <motion.h2 
                className="text-white mb-3 lg:mb-4 text-3xl lg:text-4xl font-extrabold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Prêt à recruter en Europe ?
              </motion.h2>
              
              <motion.p 
                className="text-lg lg:text-xl text-white/95 mb-5 lg:mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Décrivez votre projet, nous vous recontactons sous 24h
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
                {[
                  { text: 'Devis gratuit et personnalisé', icon: '✓' },
                  { text: 'Sans engagement', icon: '✓' },
                  { text: 'Réponse sous 24h', icon: '⚡' }
                ].map((benefit, index) => (
                  <motion.div 
                    key={benefit.text} 
                    className="flex items-center gap-2 lg:gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2.5 lg:p-3 hover:bg-white/20 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="bg-green-500/20 p-1.5 lg:p-2 rounded-lg">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    </div>
                    <span className="text-sm lg:text-base font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/40 shadow-2xl shadow-violet-500/20 p-5 lg:p-8 rounded-3xl">
                <form onSubmit={handleContactSubmit} className="space-y-4 lg:space-y-5">
                  <div className="grid md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="space-y-1.5 lg:space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Jean Dupont"
                        className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5 lg:space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email professionnel *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="j.dupont@entreprise.fr"
                        className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 lg:gap-4">
                    <div className="space-y-1.5 lg:space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder="06 12 34 56 78"
                        className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5 lg:space-y-2">
                      <Label htmlFor="company" className="text-gray-700 font-medium">Entreprise *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                        placeholder="Nom de votre entreprise"
                        className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 lg:space-y-2">
                    <Label htmlFor="needType" className="text-gray-700 font-medium">Type de besoin *</Label>
                    <Select
                      value={formData.needType}
                      onValueChange={(value) => setFormData({ ...formData, needType: value })}
                      required
                    >
                      <SelectTrigger id="needType" className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-xl">
                        <SelectValue placeholder="Sélectionnez votre besoin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interim">Intérim européen</SelectItem>
                        <SelectItem value="recruitment">Recrutement spécialisé</SelectItem>
                        <SelectItem value="consulting">Conseil & Conformité</SelectItem>
                        <SelectItem value="other">Autre besoin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 lg:space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      placeholder="Décrivez votre besoin (profils recherchés, nombre, durée...)"
                      rows={3}
                      className="border-gray-300 focus:border-violet-500 focus:ring-violet-500 rounded-xl resize-none"
                    />
                  </div>

                  <div className="text-xs lg:text-sm text-gray-500 leading-snug">
                    En soumettant ce formulaire, vous acceptez que vos données soient utilisées dans le cadre de votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression.
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 rounded-full shadow-xl hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Envoyer ma demande
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] text-white py-12 lg:py-16">
        {/* Radial gradients - same as network section */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)',
        }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10 lg:mb-12">
            {/* Column 1: Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl inline-block mb-4 shadow-xl shadow-violet-500/30 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-extrabold tracking-tight text-lg">YOJOB</span>
              </motion.div>
              <p className="text-sm text-white/90 mb-5 leading-relaxed">
                Votre partenaire de confiance pour le recrutement de talents européens.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: '#', color: 'cyan' },
                  { icon: Twitter, href: '#', color: 'violet' },
                  { icon: Facebook, href: '#', color: 'blue' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <social.icon className={`w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white mb-4 text-cyan-300">Liens rapides</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { name: 'Nos services', href: '#services' },
                  { name: 'Notre réseau', href: '#network' },
                  { name: 'Blog', href: '#blog' },
                  { name: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href={link.href} className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white mb-4 text-cyan-300">Ressources</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { name: 'Guide du détachement', href: '#' },
                  { name: 'FAQ', href: '#' },
                  { name: 'Mentions légales', href: '#' },
                  { name: 'CGV', href: '#' }
                ].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a href={link.href} className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-white mb-4 text-cyan-300">Contact</h3>
              <ul className="space-y-3 text-sm">
                <motion.li 
                  className="flex items-start gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  whileHover={{ x: 3 }}
                >
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  <span className="text-white/90">123 Avenue de l'Europe<br />75001 Paris, France</span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  whileHover={{ x: 3 }}
                >
                  <Phone className="w-5 h-5 text-violet-400 drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
                  <span className="text-white/90">+33 1 23 45 67 89</span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  whileHover={{ x: 3 }}
                >
                  <Mail className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  <span className="text-white/90">contact@yojob.eu</span>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div 
            className="border-t border-white/20 pt-6 lg:pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-white/80">
              <p>&copy; 2024 YOJOB. Tous droits réservés.</p>
              <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white px-3 py-1 shadow-lg">
                Fait avec <span className="text-red-400 mx-1 animate-pulse">❤️</span> pour faciliter le recrutement européen
              </Badge>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}