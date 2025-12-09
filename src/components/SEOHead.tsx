import { Helmet } from 'react-helmet-async';
import type { LandingPageContent, LandingContentState } from '../types/landing';

interface SEOHeadProps {
  content: LandingPageContent;
  language: string;
  allContent: LandingContentState;
}

/**
 * 🎯 SEO Head Component
 * Gère toutes les balises SEO de la landing page :
 * - Meta tags (title, description, keywords)
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Cards
 * - Hreflang automatique multilingue
 * - Schema.org JSON-LD (FAQ, Organization)
 * - Google Analytics & Tag Manager
 */
export function SEOHead({ content, language, allContent }: SEOHeadProps) {
  return (
    <>
      <Helmet>
        {/* Title & Description */}
        <title>{content.seo?.title || 'YoJob - Courtage en recrutement européen'}</title>
        <meta name="description" content={content.seo?.description || 'Accédez à 500+ agences de recrutement dans 27 pays européens'} />
        <meta name="keywords" content={(content.seo?.keywords || []).join(', ')} />
        
        {/* Language */}
        <html lang={language} />
        
        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:type" content={content.seo?.ogType || 'website'} />
        <meta property="og:title" content={content.seo?.ogTitle || content.seo?.title || 'YoJob'} />
        <meta property="og:description" content={content.seo?.ogDescription || content.seo?.description || ''} />
        <meta property="og:image" content={content.seo?.ogImage || 'https://yojob.fr/og-image.jpg'} />
        <meta property="og:url" content={content.seo?.ogUrl || content.seo?.canonicalUrl || 'https://yojob.fr'} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content={content.seo?.twitterCard || 'summary_large_image'} />
        <meta name="twitter:title" content={content.seo?.twitterTitle || content.seo?.title || 'YoJob'} />
        <meta name="twitter:description" content={content.seo?.twitterDescription || content.seo?.description || ''} />
        <meta name="twitter:image" content={content.seo?.twitterImage || content.seo?.ogImage || 'https://yojob.fr/twitter-image.jpg'} />
        
        {/* Canonical */}
        {content.seo?.canonicalUrl && <link rel="canonical" href={content.seo.canonicalUrl} />}
        
        {/* 🌍 Hreflang automatique pour toutes les langues disponibles */}
        {Object.keys(allContent).map((lang) => {
          const baseUrl = content.seo?.canonicalUrl || 'https://yojob.fr';
          const langUrl = lang === 'fr' ? baseUrl : `${baseUrl}/${lang}`;
          return <link key={lang} rel="alternate" hrefLang={lang} href={langUrl} />;
        })}
        <link rel="alternate" hrefLang="x-default" href={content.seo?.canonicalUrl || 'https://yojob.fr'} />
        
        {/* Référencement IA */}
        {content.seo?.aiSummary && (
          <meta name="ai-summary" content={content.seo.aiSummary} />
        )}
        
        {/* 📋 FAQ Schema.org (JSON-LD) */}
        {content.seo?.faq && content.seo.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: content.seo.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            })}
          </script>
        )}
        
        {/* 🏢 Organization Schema.org (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'YoJob',
            description: content.seo?.description || 'Courtage en recrutement européen',
            url: content.seo?.canonicalUrl || 'https://yojob.fr',
            logo: 'https://yojob.fr/logo.png',
            foundingDate: '2014',
            numberOfEmployees: {
              '@type': 'QuantitativeValue',
              value: '500+',
            },
            areaServed: {
              '@type': 'Place',
              name: 'Europe',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+33-1-23-45-67-89',
              contactType: 'Customer Service',
              email: 'contact@yojob.fr',
            },
          })}
        </script>
        
        {/* 📊 Google Analytics */}
        {content.seo?.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${content.seo.googleAnalyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${content.seo.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}
        
        {/* 🏷️ Google Tag Manager */}
        {content.seo?.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${content.seo.googleTagManagerId}');
              `,
            }}
          />
        )}
        
        {/* Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1E3A8A" />
      </Helmet>
      
      {/* 🏷️ Google Tag Manager (noscript) */}
      {content.seo?.googleTagManagerId && (
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${content.seo.googleTagManagerId}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
    </>
  );
}