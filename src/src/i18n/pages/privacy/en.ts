/**
 * 🇬🇧 ENGLISH TRANSLATIONS - PRIVACY POLICY PAGE
 * 
 * @version 1.0.0
 */

export const enPrivacy = {
  hero: {
    badge: "Privacy Policy",
    title: "Protection of your personal data",
    subtitle: "At {company}, we are committed to protecting and respecting your privacy in accordance with the General Data Protection Regulation (GDPR).",
    lastUpdate: "Last updated:"
  },

  dpo: {
    title: "Data Protection Officer (DPO)",
    subtitle: "Your privileged contact for any questions regarding your data"
  },

  sections: {
    dataController: {
      title: "1. Data Controller",
      intro: "The data controller for personal data is:",
      location: "Bordeaux, France",
      email: "Email:"
    },

    dataCollected: {
      title: "2. Personal Data Collected",
      intro: "We collect the following data as part of our European recruitment services:",
      items: [
        {
          label: "Identification data:",
          description: "Last name, first name, email, phone"
        },
        {
          label: "Professional data:",
          description: "Company, position, sector of activity"
        },
        {
          label: "Contact data:",
          description: "Postal address, communication preferences"
        },
        {
          label: "Navigation data:",
          description: "Cookies, IP address, connection data"
        }
      ]
    },

    purposes: {
      title: "3. Processing Purposes",
      intro: "Your data is collected and processed for the following purposes:",
      items: [
        {
          title: "Management of recruitment requests",
          description: "Process your quote requests and connect you with our network of partner agencies."
        },
        {
          title: "Service improvement",
          description: "Analyze the use of our services to improve your user experience."
        },
        {
          title: "Commercial communication",
          description: "Inform you about our new services and our European marketplace (with your consent)."
        }
      ]
    },

    legalBasis: {
      title: "4. Legal Basis for Processing",
      intro: "The processing of your data is based on the following legal grounds:",
      items: [
        {
          basis: "Contract execution",
          description: "Processing necessary to respond to your recruitment requests"
        },
        {
          basis: "Consent",
          description: "For sending marketing communications (you can withdraw your consent at any time)"
        },
        {
          basis: "Legitimate interest",
          description: "Improvement of our services and security of our platform"
        }
      ]
    },

    retention: {
      title: "5. Retention Period",
      intro: "We retain your personal data for the following periods:",
      items: [
        {
          period: "3 years",
          description: "Prospect and customer data"
        },
        {
          period: "13 months",
          description: "Cookies and navigation data"
        },
        {
          period: "5 years",
          description: "Accounting and tax documents"
        },
        {
          period: "{days} days",
          description: "Form data (configurable)",
          highlight: true
        }
      ]
    },

    rights: {
      title: "6. Your Rights",
      intro: "In accordance with GDPR, you have the following rights:",
      items: [
        {
          title: "Right of access",
          description: "Obtain a copy of your personal data"
        },
        {
          title: "Right to rectification",
          description: "Correct your inaccurate or incomplete data"
        },
        {
          title: "Right to erasure",
          description: "Request the deletion of your data"
        },
        {
          title: "Right to restriction",
          description: "Limit the processing of your data"
        },
        {
          title: "Right to portability",
          description: "Receive your data in a structured format"
        },
        {
          title: "Right to object",
          description: "Object to the processing of your data"
        }
      ],
      footer: "To exercise your rights, contact our DPO at"
    },

    security: {
      title: "7. Data Security",
      intro: "We implement appropriate technical and organizational security measures:",
      measures: [
        "Data encryption in transit and at rest (SSL/TLS)",
        "Restricted access to data through strong authentication",
        "Regular backups and business continuity plan",
        "Security audits and regular updates",
        "Staff training in GDPR best practices"
      ]
    },

    transfers: {
      title: "8. Data Transfers",
      intro: "As part of our European network of 500+ partner agencies in 27 countries:",
      eu: {
        title: "🇪🇺 Within the European Union",
        description: "Your data may be transferred to our partner agencies located in the EU/EEA, which benefit from the same level of GDPR protection."
      },
      nonEu: {
        title: "🌍 Outside the European Union",
        description: "In case of transfer outside the EU, we use the European Commission's Standard Contractual Clauses (SCC) to guarantee an adequate level of protection."
      }
    },

    cookies: {
      title: "9. Cookies and Trackers",
      intro: "Our site uses cookies to improve your browsing experience:",
      types: [
        {
          type: "Essential cookies",
          description: "Necessary for the site to function (session, security)",
          required: true
        },
        {
          type: "Analytical cookies",
          description: "Audience measurement and visit statistics",
          required: false
        },
        {
          type: "Marketing cookies",
          description: "Targeted advertising and personalization",
          required: false
        }
      ],
      footer: "You can manage your cookie preferences at any time through your browser settings."
    },

    contact: {
      title: "10. Contact and Complaint",
      intro: "For any questions regarding the processing of your personal data:",
      dpoCard: {
        title: "Contact our DPO"
      },
      cnilCard: {
        title: "Supervisory Authority",
        name: "CNIL (France)"
      },
      footer: "If you believe your rights are not being respected, you have the right to lodge a complaint with the French Data Protection Authority (CNIL)."
    }
  },

  cta: {
    title: "Your data is secure",
    description: "The protection of your personal data is our priority. We are committed to complying with GDPR and ensuring the security of your information.",
    backHome: "Back to home",
    contactDpo: "Contact DPO"
  },

  badges: {
    required: "Required",
    optional: "Optional"
  }
};