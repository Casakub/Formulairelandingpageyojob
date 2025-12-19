import { LandingPageContent } from '../../types/landingContent';

/**
 * 🇬🇧 YOJOB Landing Page Content - English Version
 * Professionally translated from French
 */

export const landingContentEN: LandingPageContent = {
  language: 'en',
  
  seo: {
    metaTitle: 'YOJOB - European Posted Workers Platform | 27 Countries',
    metaDescription: 'Centralize your European posting procedures. Secure digital vault, online administrative procedures and job offers management. 500+ partner agencies in 27 countries.',
    slug: '/',
    h1: 'Your all-in-one platform for European posting',
    ogTitle: 'YOJOB - Simplified Posted Workers in Europe',
    ogDescription: 'Manage your posting procedures with YOJOB: guaranteed compliance, 500+ partner agencies, 27 European countries.',
    altTexts: {
      heroVisual: 'Interactive map of Europe showing the YOJOB network of 500+ agencies in 27 countries',
      europeMap: 'Map of Europe with the 27 countries covered by YOJOB',
      logoFooter: 'YOJOB Logo - European Posting Platform',
    },
    aiSummary: 'YOJOB is a European platform specialized in posted workers. It centralizes all documents and administrative procedures in a secure digital vault. Companies can manage their job offers, prepare posting files and ensure legal compliance in 27 European countries through a network of 500+ partner agencies. The platform simplifies European recruitment and guarantees social compliance.',
    faq: [
      {
        question: 'What is YOJOB?',
        answer: 'YOJOB is a European platform for recruitment brokerage and posted workers management. We connect companies with more than 500 partner agencies in 27 European countries.',
      },
      {
        question: 'In which countries does YOJOB operate?',
        answer: 'YOJOB covers 27 European countries: France, Germany, Spain, Italy, Poland, Romania, Netherlands, Belgium, Portugal, Czech Republic, Hungary, Sweden, Austria, Bulgaria, Denmark, Finland, Slovakia, Ireland, Croatia, Lithuania, Slovenia, Latvia, Estonia, Cyprus, Luxembourg, Malta and Greece.',
      },
      {
        question: 'How does the digital vault work?',
        answer: 'Our digital vault centralizes all your posting documents (A1, contracts, supporting documents) in a secure space accessible 24/7. You can prepare your files, track ongoing procedures and archive all your posting operations.',
      },
      {
        question: 'Does YOJOB guarantee legal compliance?',
        answer: 'Yes, YOJOB integrates European regulations on posted workers. Our platform guides you through mandatory procedures and ensures that your files comply with the legal requirements of each country.',
      },
      {
        question: 'How to post a job offer on YOJOB?',
        answer: 'From 2026, you will be able to post your job offers directly on our marketplace. Our 500+ partner agencies will be able to respond and offer you qualified candidates adapted to your needs.',
      },
      {
        question: 'What is the cost of the YOJOB platform?',
        answer: 'YOJOB offers different packages adapted to your needs. Contact us via the form to get a personalized quote based on your activity volume and desired services.',
      },
    ],
  },

  header: {
    nav: {
      home: 'Home',
      services: 'Services',
      network: 'Our Network',
      contact: 'Contact',
    },
    cta: 'Request a Quote',
  },

  hero: {
    badge: '⭐ European Recruitment Leader',
    title: 'Your partner to recruit in Europe',
    subtitle: 'Access a network of 500+ employment agencies in 27 countries. Simplify your European recruitment with an expert and trusted broker.',
    benefits: [
      'Centralized and secure files',
      'Online administrative procedures',
      'Job offers management',
      'Multi-country compliance',
    ],
    ctaPrimaryLabel: 'Request a quote',
    ctaSecondaryLabel: 'Discover our network',
    stats: {
      agencies: { value: '500+', label: 'partner agencies' },
      countries: { value: '27', label: 'European countries' },
      missions: { value: '2000+', label: 'successful missions' },
    },
    floatingCards: {
      since: { label: 'Since', value: '2014' },
      expertise: { value: '10 years', label: 'Of leading expertise' },
      partners: { label: 'Partners', value: '500+ certified agencies' },
      countries: { value: '27', label: 'European countries' },
      certified: { value: '500+', label: 'Certified agencies' },
      activeNetwork: 'Active network',
    },
  },

  stats: {
    badge: '📊 Our Key Figures',
    title: 'Recognized expertise in Europe',
    items: [
      { value: '10+', label: 'years of expertise', icon: 'Target' },
      { value: '27', label: 'countries covered', icon: 'Globe' },
      { value: '500+', label: 'partner agencies', icon: 'Network' },
      { value: '2000+', label: 'missions completed', icon: 'CheckCircle' },
    ],
  },

  services: {
    badge: '💼 Our Services',
    title: 'Solutions adapted to your needs',
    subtitle: 'We support you in all your European recruitment procedures.',
    services: [
      {
        icon: 'Users',
        title: 'European Temporary Work',
        description: 'Recruitment of temporary staff throughout Europe with complete formalities management.',
        linkLabel: 'Learn more',
        href: '/services/interim-europeen',
      },
      {
        icon: 'Target',
        title: 'Specialized Recruitment',
        description: 'Find the talents you need thanks to our network of sector experts.',
        linkLabel: 'Learn more',
        href: '/services/recrutement-specialise',
      },
      {
        icon: 'ShieldCheck',
        title: 'Consulting & Compliance',
        description: 'Ensure compliance with all European regulations on posting.',
        linkLabel: 'Learn more',
        href: '/services/conseil-conformite',
      },
    ],
  },

  network: {
    badge: '🌍 European Network',
    title: 'A network covering all of Europe',
    subtitle: 'More than 500 partner agencies in 27 countries to meet all your recruitment needs.',
    mapLabel: 'partner agencies',
    waitlist: {
      badge: '✨ New in 2026',
      title: 'Your all-in-one platform for European posting',
      subtitle: 'Centralize all your posting documents and data in a secure space. Carry out your administrative procedures directly online and manage your job offers from a single interface. Simplify your compliance and save precious time.',
      features: [
        'Centralized and secure files',
        'Online administrative procedures',
        'Job offers management',
        'Multi-country compliance',
      ],
      formTitle: 'Be among the first!',
      formSubtitle: 'Sign up for the waitlist and get priority access',
      emailPlaceholder: 'Your professional email address',
      ctaLabel: 'Join the waitlist',
      securityNote: '🔒 Your data is secure and will never be shared.',
      successMessage: 'Thank you! You are now on the waitlist.',
    },
  },

  steps: {
    badge: '🎯 How It Works',
    title: 'A simple and efficient process',
    subtitle: 'In 4 steps, find the talents you need anywhere in Europe.',
    steps: [
      {
        number: '01',
        title: 'Describe your need',
        description: 'Share your recruitment needs with us: profiles, skills, location and duration.',
        icon: 'FileText',
      },
      {
        number: '02',
        title: 'We activate our network',
        description: 'Our partner agencies throughout Europe search for the best candidates for you.',
        icon: 'Network',
      },
      {
        number: '03',
        title: 'Validate the candidates',
        description: 'We present you with a selection of qualified profiles that you can evaluate.',
        icon: 'UserCheck',
      },
      {
        number: '04',
        title: 'Welcome your team',
        description: 'We handle all administrative formalities so you can focus on the essentials.',
        icon: 'CheckCircle',
      },
    ],
  },

  testimonials: {
    badge: '⭐ Testimonials',
    title: 'They trust us',
    subtitle: 'Discover the feedback from our clients throughout Europe.',
    testimonials: [
      {
        name: 'Marc Durand',
        position: 'HR Director',
        company: 'BTP Solutions France',
        quote: 'YOJOB enabled us to recruit 50 qualified workers in Poland in just 3 weeks. A considerable time saving and flawless administrative management.',
        rating: 5,
        sector: 'BTP',
      },
      {
        name: 'Sophie Martin',
        position: 'Mobility Manager',
        company: 'IndusTech Germany',
        quote: 'YOJOB\'s European network is impressive. We were able to extend our operations to 5 countries with expert support at every stage.',
        rating: 5,
        sector: 'Industry',
      },
      {
        name: 'Antonio Silva',
        position: 'CEO',
        company: 'AgriPro Portugal',
        quote: 'Finally a solution that truly simplifies cross-border recruitment. Compliance is guaranteed and deadlines are met.',
        rating: 5,
        sector: 'Agriculture',
      },
    ],
  },

  sectors: {
    badge: '🏭 Business Sectors',
    title: 'We operate in all sectors',
    subtitle: 'Our expertise covers all European business sectors.',
    sectors: [
      { icon: 'Building2', name: 'Construction & Building', color: 'orange' },
      { icon: 'Factory', name: 'Industry & Logistics', color: 'blue' },
      { icon: 'Tractor', name: 'Agriculture & Viticulture', color: 'green' },
      { icon: 'UtensilsCrossed', name: 'Hospitality & Catering', color: 'red' },
      { icon: 'Heart', name: 'Health & Medical', color: 'pink' },
      { icon: 'Laptop', name: 'Services & IT', color: 'violet' },
    ],
  },

  ctaForm: {
    badge: '📞 Contact Us',
    title: 'Ready to recruit in Europe?',
    subtitle: 'Tell us about your project and receive a personalized quote within 24 hours.',
    benefits: [
      {
        icon: 'Users',
        title: 'Personalized support',
        description: 'A dedicated expert for your project',
      },
      {
        icon: 'ShieldCheck',
        title: 'Guaranteed compliance',
        description: 'Compliance with all regulations',
      },
      {
        icon: 'Globe',
        title: 'European coverage',
        description: '27 countries immediately accessible',
      },
      {
        icon: 'CheckCircle',
        title: 'Maximum responsiveness',
        description: 'Response within 24 business hours',
      },
    ],
    form: {
      fields: {
        name: { label: 'Full name', placeholder: 'John Smith' },
        email: { label: 'Professional email', placeholder: 'john.smith@company.com' },
        phone: { label: 'Phone', placeholder: '+44 20 1234 5678' },
        company: { label: 'Company', placeholder: 'Your company name' },
        needType: { label: 'Type of need', placeholder: 'Select a type of need' },
        message: { label: 'Describe your need', placeholder: 'Tell us about your European recruitment project...' },
      },
      ctaLabel: 'Send my request',
      securityNote: '🔒 Your data is secure and will never be shared.',
      successMessage: 'Thank you! We will contact you within 24 hours.',
    },
  },

  footer: {
    logo: {
      tagline: 'Your trusted partner for European recruitment',
    },
    columns: {
      services: {
        title: 'Services',
        links: [
          { label: 'European Temporary Work', href: '/services/interim-europeen' },
          { label: 'Specialized Recruitment', href: '/services/recrutement-specialise' },
          { label: 'Consulting & Compliance', href: '/services/conseil-conformite' },
          { label: 'Posted Workers', href: '/services/detachement-personnel' },
        ],
      },
      company: {
        title: 'Company',
        links: [
          { label: 'About', href: '#about' },
          { label: 'Our Network', href: '#reseau' },
          { label: 'Our Sectors', href: '#secteurs' },
          { label: 'Testimonials', href: '#temoignages' },
        ],
      },
      contact: {
        title: 'Contact',
        address: '123 Avenue de l\'Europe, 75001 Paris, France',
        phone: '+33 1 23 45 67 89',
        email: 'contact@yojob.fr',
      },
    },
    social: {
      linkedin: 'https://linkedin.com/company/yojob',
      twitter: 'https://twitter.com/yojob',
      facebook: 'https://facebook.com/yojob',
    },
    bottom: {
      copyright: '© 2026 YOJOB. All rights reserved. Made with ❤️ in Europe.',
      madeWith: 'Made with ❤️ to facilitate European recruitment',
      legalLinks: [
        { label: 'Legal Notice', href: '#mentions' },
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms & Conditions', href: '#cgv' },
      ],
    },
  },
};