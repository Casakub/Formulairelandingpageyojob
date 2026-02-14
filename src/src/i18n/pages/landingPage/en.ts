/**
 * 🇬🇧 ENGLISH TRANSLATIONS - LANDING PAGE
 * 
 * @version 2.0.0
 */

import type { LandingPageContent } from '../../../types/landingContent';

export const enLandingPage: LandingPageContent = {
  language: 'en',
  
  // SEO & Meta
  seo: {
    metaTitle: "YOJOB | European Recruitment Leader - Temporary & Permanent Staffing in 27 Countries",
    metaDescription: "Access 500+ recruitment agencies across 27 European countries. Temporary work, permanent contracts, staff secondment: YOJOB simplifies your international recruitment.",
    slug: "/en",
    h1: "European recruitment leader",
    ogTitle: "YOJOB - Your European Recruitment Partner",
    ogDescription: "Simplified European recruitment: 500+ agencies, 27 countries, all formalities managed.",
    altTexts: {
      heroVisual: "Interactive map of Europe showing the YOJOB network",
      europeMap: "Map of 27 European countries covered by YOJOB",
      logoFooter: "YOJOB Logo - European Recruitment",
    },
    aiSummary: "YOJOB is the French leader in European recruitment brokerage, with a network of 500+ partner agencies across 27 countries. We facilitate European temporary staffing, specialized recruitment, staff secondment, and provide compliance consulting. Our expertise enables companies to recruit quickly and legally anywhere in Europe, with complete management of administrative formalities.",
    faq: [
      {
        question: "What is YOJOB?",
        answer: "YOJOB is a European recruitment broker that connects French companies to a network of 500+ agencies across 27 European countries to facilitate temporary staffing, recruitment, and staff secondment."
      },
      {
        question: "Which countries do you operate in?",
        answer: "We cover all 27 European Union countries plus Norway, providing complete coverage of Western, Northern, Southern, and Eastern Europe."
      },
      {
        question: "What types of recruitment do you offer?",
        answer: "We offer European temporary staffing, permanent/fixed-term recruitment, staff secondment, and compliance consulting to ensure regulatory compliance."
      }
    ]
  },

  // Header
  header: {
    nav: {
      home: "Home",
      services: "Services",
      network: "Network",
      blog: "Blog",
      contact: "Contact"
    },
    cta: "Request a quote",
    survey: "European Survey"
  },

  // Hero Section
  hero: {
    badge: "⭐ European recruitment leader",
    title: "Recruit anywhere in Europe through our network of 500+ partner agencies",
    subtitle: "Temporary, permanent, secondment: access the best European talent pool. We handle all the formalities for you.",
    benefits: [
      "27 European countries covered",
      "500+ certified agencies",
      "Complete administrative management",
      "Guaranteed compliance"
    ],
    ctaPrimaryLabel: "Get a free quote",
    ctaSecondaryLabel: "Discover our services",
    stats: {
      agencies: { value: "500+", label: "partner agencies" },
      countries: { value: "27", label: "European countries" },
      missions: { value: "2000+", label: "successful missions" }
    },
    floatingCards: {
      since: { label: "Since", value: "2014" },
      expertise: { value: "10 years", label: "of leading expertise" },
      partners: { label: "Partners", value: "500+ certified agencies" },
      countries: { value: "27", label: "European countries" },
      certified: { value: "500+", label: "Certified agencies" },
      activeNetwork: "Active network"
    }
  },

  // Stats Section
  stats: {
    badge: "📊 Key Figures",
    title: "Recognized expertise across Europe",
    items: [
      { value: "10", label: "years of expertise", icon: "Target" },
      { value: "27", label: "countries covered", icon: "Globe" },
      { value: "500", label: "partner agencies", icon: "Network" },
      { value: "2000", label: "missions completed", icon: "CheckCircle" }
    ]
  },

  // Services Section
  services: {
    badge: "🎯 Our Services",
    title: "Recruitment solutions tailored to your needs",
    subtitle: "Whether you're looking for temporary, permanent, or seconded staff, we have the solution",
    services: [
      {
        icon: "Users",
        title: "European Temporary Staffing",
        description: "Recruit qualified temporary staff anywhere in Europe. We handle all administrative formalities.",
        linkLabel: "Learn more",
        href: "/service/interim-europeen"
      },
      {
        icon: "Target",
        title: "Specialized Recruitment",
        description: "Find the best talent for your permanent/fixed-term positions through our European network of experts.",
        linkLabel: "Learn more",
        href: "/service/recrutement-specialise"
      },
      {
        icon: "ShieldCheck",
        title: "Consulting & Compliance",
        description: "Ensure compliance with all European regulations regarding secondment and mobility.",
        linkLabel: "Learn more",
        href: "/service/conseil-conformite"
      }
    ]
  },

  // Network Section
  network: {
    badge: "🌍 European Network",
    title: "27 countries, 500+ certified partner agencies",
    subtitle: "Our strength: a dense and qualified network across all of Europe",
    mapLabel: "partner agencies",
    waitlist: {
      badge: "🚀 Coming in 2025",
      title: "European agencies marketplace",
      subtitle: "Soon: compare and directly contact agencies from our network",
      features: [
        "✓ Multi-criteria search (country, sector, profession)",
        "✓ Instant agency comparison",
        "✓ Verified client reviews",
        "✓ Direct and secure connection"
      ],
      formTitle: "Be among the first!",
      formSubtitle: "Join the waitlist for early access",
      emailPlaceholder: "your@email.com",
      ctaLabel: "Join the waitlist",
      securityNote: "🔒 Your data is secure and will never be shared",
      successMessage: "Thank you! You're on the waitlist. We'll contact you when we launch."
    }
  },

  // Steps Section (How it works)
  steps: {
    badge: "🚀 How it works",
    title: "European recruitment simplified in 4 steps",
    subtitle: "A clear and efficient process for your recruitment needs",
    steps: [
      {
        number: "01",
        title: "Describe your need",
        description: "Share your recruitment needs: profession, number of positions, duration, required qualifications.",
        icon: "FileText"
      },
      {
        number: "02",
        title: "We activate our network",
        description: "Our partner agencies across Europe identify and select the best available profiles.",
        icon: "Network"
      },
      {
        number: "03",
        title: "Validate candidates",
        description: "You receive pre-selected CVs and conduct interviews with candidates who interest you.",
        icon: "UserCheck"
      },
      {
        number: "04",
        title: "Welcome your team",
        description: "Selected candidates join your teams. We handle all administrative and legal formalities.",
        icon: "CheckCircle"
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    badge: "⭐ Testimonials",
    title: "They trust us",
    subtitle: "Discover feedback from our clients",
    testimonials: [
      {
        name: "Pierre Durand",
        position: "HR Director",
        company: "TechBuild France",
        quote: "Thanks to YOJOB, we recruited 15 qualified Polish masons in 3 weeks. Professional and efficient service!",
        rating: 5,
        sector: "Construction"
      },
      {
        name: "Sophie Martin",
        position: "HR Manager",
        company: "AgroFrance",
        quote: "Administrative management is a real headache when recruiting internationally. YOJOB takes care of everything, it's a huge time saver.",
        rating: 5,
        sector: "Food Industry"
      },
      {
        name: "Marc Lefebvre",
        position: "Production Manager",
        company: "AutoParts Europe",
        quote: "Excellent support! We found specialized technicians in Germany that we could never have recruited on our own.",
        rating: 5,
        sector: "Manufacturing"
      }
    ]
  },

  // Sectors Section
  sectors: {
    badge: "🏭 Industries",
    title: "We recruit across all sectors",
    subtitle: "Our network covers all professions and industries",
    sectors: [
      { icon: "Building2", name: "Construction & Building", color: "orange" },
      { icon: "Factory", name: "Manufacturing", color: "blue" },
      { icon: "Tractor", name: "Agriculture", color: "green" },
      { icon: "UtensilsCrossed", name: "Hospitality & Catering", color: "red" },
      { icon: "Heart", name: "Healthcare & Social", color: "pink" },
      { icon: "Laptop", name: "Tech & IT", color: "violet" },
      { icon: "Truck", name: "Logistics & Transport", color: "blue" },
      { icon: "ShoppingBag", name: "Retail & Distribution", color: "green" },
      { icon: "Briefcase", name: "Business Services", color: "cyan" },
      { icon: "Wrench", name: "Maintenance & Support", color: "orange" },
      { icon: "Plane", name: "Tourism & Leisure", color: "blue" },
      { icon: "Ship", name: "Maritime & Port", color: "blue" }
    ]
  },

  // CTA Form Section
  ctaForm: {
    badge: "📞 Contact us",
    title: "Ready to recruit in Europe?",
    subtitle: "Get a free personalized quote within 24 hours",
    benefits: [
      {
        icon: "CheckCircle",
        title: "Quick response",
        description: "Quote within 24 business hours"
      },
      {
        icon: "ShieldCheck",
        title: "No commitment",
        description: "Free with no obligation"
      },
      {
        icon: "Users",
        title: "Dedicated support",
        description: "An expert at your service"
      },
      {
        icon: "Globe",
        title: "European coverage",
        description: "27 countries accessible"
      }
    ],
    form: {
      fields: {
        name: { label: "Full name", placeholder: "John Smith" },
        email: { label: "Professional email", placeholder: "john.smith@company.com" },
        phone: { label: "Phone", placeholder: "+44 20 1234 5678" },
        company: { label: "Company", placeholder: "Your company name" },
        needType: { 
          label: "Type of need", 
          placeholder: "Select your need",
          options: [
            "European Temporary Staffing",
            "Specialized Recruitment",
            "Consulting & Compliance",
            "Other needs"
          ]
        },
        message: { label: "Describe your need", placeholder: "E.g.: Looking for 10 masons for a 6-month project in the Paris region..." }
      },
      ctaLabel: "Send my request",
      securityNote: "🔒 Your data is protected and will never be shared with third parties",
      successMessage: "Thank you! We have received your request and will contact you within 24 hours."
    }
  },

  // Footer
  footer: {
    logo: {
      tagline: "Your European recruitment partner"
    },
    columns: {
      services: {
        title: "Services",
        links: [
          { label: "European Temporary Staffing", href: "/service/interim-europeen" },
          { label: "Specialized Recruitment", href: "/service/recrutement-specialise" },
          { label: "Staff Secondment", href: "/service/detachement-personnel" },
          { label: "Consulting & Compliance", href: "/service/conseil-conformite" }
        ]
      },
      company: {
        title: "Company",
        links: [
          { label: "About us", href: "/a-propos" },
          { label: "Our network", href: "/notre-reseau" },
          { label: "Our sectors", href: "/nos-secteurs" },
          { label: "Testimonials", href: "/temoignages" }
        ]
      },
      contact: {
        title: "Contact",
        address: "Bordeaux, France",
        phone: "+33 6 50 62 25 24",
        email: "contact@yojob.fr"
      }
    },
    social: {
      linkedin: "https://linkedin.com/company/yojob",
      twitter: "https://twitter.com/yojob",
      facebook: "https://facebook.com/yojob"
    },
    bottom: {
      copyright: "© 2026 YOJOB. All rights reserved.",
      madeWith: "Made with ❤️ to facilitate European recruitment",
      legalLinks: [
        { label: "Legal notice", href: "/legal" },
        { label: "Terms & Conditions", href: "/cgv" },
        { label: "Privacy policy", href: "/privacy" }
      ]
    }
  }
};