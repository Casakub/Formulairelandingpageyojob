/**
 * 🌍 Script pour générer toutes les traductions de la landing page
 * Ce script crée les fichiers de traduction pour les 22 langues européennes
 */

import { LandingPageContent } from '../types/landingContent';
import { landingContentFR } from '../content/landing/fr';

// Template pour générer une traduction
export function generateTranslation(
  lang: string,
  translations: {
    [key: string]: string;
  }
): LandingPageContent {
  const t = (frText: string): string => {
    return translations[frText] || frText;
  };

  return {
    ...landingContentFR,
    language: lang as any,
    
    seo: {
      metaTitle: t(landingContentFR.seo.metaTitle),
      metaDescription: t(landingContentFR.seo.metaDescription),
      slug: landingContentFR.seo.slug,
      h1: t(landingContentFR.seo.h1),
      ogTitle: t(landingContentFR.seo.ogTitle),
      ogDescription: t(landingContentFR.seo.ogDescription),
      altTexts: {
        heroVisual: t(landingContentFR.seo.altTexts.heroVisual!),
        europeMap: t(landingContentFR.seo.altTexts.europeMap!),
        logoFooter: t(landingContentFR.seo.altTexts.logoFooter!),
      },
      aiSummary: t(landingContentFR.seo.aiSummary),
      faq: landingContentFR.seo.faq.map(faq => ({
        question: t(faq.question),
        answer: t(faq.answer),
      })),
    },

    hero: {
      badge: t(landingContentFR.hero.badge),
      title: t(landingContentFR.hero.title),
      subtitle: t(landingContentFR.hero.subtitle),
      benefits: landingContentFR.hero.benefits.map(t),
      ctaPrimaryLabel: t(landingContentFR.hero.ctaPrimaryLabel),
      ctaSecondaryLabel: t(landingContentFR.hero.ctaSecondaryLabel),
      stats: {
        agencies: {
          value: landingContentFR.hero.stats.agencies.value,
          label: t(landingContentFR.hero.stats.agencies.label),
        },
        countries: {
          value: landingContentFR.hero.stats.countries.value,
          label: t(landingContentFR.hero.stats.countries.label),
        },
        missions: {
          value: landingContentFR.hero.stats.missions.value,
          label: t(landingContentFR.hero.stats.missions.label),
        },
      },
    },

    stats: {
      badge: t(landingContentFR.stats.badge),
      title: t(landingContentFR.stats.title),
      items: landingContentFR.stats.items.map(item => ({
        value: item.value,
        label: t(item.label),
        icon: item.icon,
      })),
    },

    services: {
      badge: t(landingContentFR.services.badge),
      title: t(landingContentFR.services.title),
      subtitle: t(landingContentFR.services.subtitle),
      services: landingContentFR.services.services.map(service => ({
        icon: service.icon,
        title: t(service.title),
        description: t(service.description),
        linkLabel: t(service.linkLabel),
      })),
    },

    network: {
      badge: t(landingContentFR.network.badge),
      title: t(landingContentFR.network.title),
      subtitle: t(landingContentFR.network.subtitle),
      waitlist: {
        badge: t(landingContentFR.network.waitlist.badge),
        title: t(landingContentFR.network.waitlist.title),
        subtitle: t(landingContentFR.network.waitlist.subtitle),
        features: landingContentFR.network.waitlist.features.map(t),
        emailPlaceholder: t(landingContentFR.network.waitlist.emailPlaceholder),
        ctaLabel: t(landingContentFR.network.waitlist.ctaLabel),
      },
    },

    steps: {
      badge: t(landingContentFR.steps.badge),
      title: t(landingContentFR.steps.title),
      subtitle: t(landingContentFR.steps.subtitle),
      steps: landingContentFR.steps.steps.map(step => ({
        number: step.number,
        title: t(step.title),
        description: t(step.description),
        icon: step.icon,
      })),
    },

    testimonials: {
      badge: t(landingContentFR.testimonials.badge),
      title: t(landingContentFR.testimonials.title),
      subtitle: t(landingContentFR.testimonials.subtitle),
      testimonials: landingContentFR.testimonials.testimonials.map(test => ({
        name: test.name,
        position: t(test.position),
        company: test.company,
        quote: t(test.quote),
        rating: test.rating,
        sector: test.sector,
      })),
    },

    sectors: {
      badge: t(landingContentFR.sectors.badge),
      title: t(landingContentFR.sectors.title),
      subtitle: t(landingContentFR.sectors.subtitle),
      sectors: landingContentFR.sectors.sectors.map(sector => ({
        icon: sector.icon,
        name: t(sector.name),
        color: sector.color,
      })),
    },

    ctaForm: {
      badge: t(landingContentFR.ctaForm.badge),
      title: t(landingContentFR.ctaForm.title),
      subtitle: t(landingContentFR.ctaForm.subtitle),
      benefits: landingContentFR.ctaForm.benefits.map(benefit => ({
        icon: benefit.icon,
        title: t(benefit.title),
        description: t(benefit.description),
      })),
      form: {
        fields: {
          name: {
            label: t(landingContentFR.ctaForm.form.fields.name.label),
            placeholder: t(landingContentFR.ctaForm.form.fields.name.placeholder),
          },
          email: {
            label: t(landingContentFR.ctaForm.form.fields.email.label),
            placeholder: t(landingContentFR.ctaForm.form.fields.email.placeholder),
          },
          phone: {
            label: t(landingContentFR.ctaForm.form.fields.phone.label),
            placeholder: t(landingContentFR.ctaForm.form.fields.phone.placeholder),
          },
          company: {
            label: t(landingContentFR.ctaForm.form.fields.company.label),
            placeholder: t(landingContentFR.ctaForm.form.fields.company.placeholder),
          },
          needType: {
            label: t(landingContentFR.ctaForm.form.fields.needType.label),
            placeholder: t(landingContentFR.ctaForm.form.fields.needType.placeholder),
          },
          message: {
            label: t(landingContentFR.ctaForm.form.fields.message.label),
            placeholder: t(landingContentFR.ctaForm.form.fields.message.placeholder),
          },
        },
        ctaLabel: t(landingContentFR.ctaForm.form.ctaLabel),
        securityNote: t(landingContentFR.ctaForm.form.securityNote),
        successMessage: t(landingContentFR.ctaForm.form.successMessage),
      },
    },

    footer: {
      logo: {
        tagline: t(landingContentFR.footer.logo.tagline),
      },
      columns: {
        services: {
          title: t(landingContentFR.footer.columns.services.title),
          links: landingContentFR.footer.columns.services.links.map(link => ({
            label: t(link.label),
            href: link.href,
          })),
        },
        company: {
          title: t(landingContentFR.footer.columns.company.title),
          links: landingContentFR.footer.columns.company.links.map(link => ({
            label: t(link.label),
            href: link.href,
          })),
        },
        contact: {
          title: t(landingContentFR.footer.columns.contact.title),
          address: t(landingContentFR.footer.columns.contact.address),
          phone: landingContentFR.footer.columns.contact.phone,
          email: landingContentFR.footer.columns.contact.email,
        },
      },
      social: landingContentFR.footer.social,
      bottom: {
        copyright: t(landingContentFR.footer.bottom.copyright),
        legalLinks: landingContentFR.footer.bottom.legalLinks.map(link => ({
          label: t(link.label),
          href: link.href,
        })),
      },
    },
  };
}

console.log('✅ Translation generator ready!');
