// Mock data pour les automatisations (côté serveur Deno)
// Ce fichier est isolé du frontend et accessible uniquement par le serveur

import { SIGNATURE_EMAIL_TEMPLATES } from './signature-email-templates.ts';

type WorkflowStatus = 'active' | 'draft' | 'paused' | 'archived';
type RunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
type EmailStatus = 'queued' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'replied' | 'bounced' | 'failed';
type TriggerType = 'prospect_created' | 'status_changed' | 'tag_added' | 'inactivity' | 'scheduled' | 'event_reached';
type ActionType = 'send_email' | 'create_task' | 'update_prospect' | 'send_webhook' | 'add_tag' | 'change_status' | 'notify_team';

// 🌍 Mapping Pays → Langue pour emails multilingues
export const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  'France': 'fr',
  'Pologne': 'pl',
  'Poland': 'pl',
  'Roumanie': 'ro',
  'Romania': 'ro',
  'Allemagne': 'de',
  'Germany': 'de',
  'Espagne': 'es',
  'Spain': 'es',
  'Italie': 'it',
  'Italy': 'it',
  'Portugal': 'pt',
  'Pays-Bas': 'nl',
  'Netherlands': 'nl',
  'Belgique': 'fr', // Majorité francophone
  'Belgium': 'fr',
  'Bulgarie': 'bg',
  'Bulgaria': 'bg',
  'Hongrie': 'hu',
  'Hungary': 'hu',
  'République Tchèque': 'cs',
  'Czech Republic': 'cs',
  'Slovaquie': 'sk',
  'Slovakia': 'sk',
  'Autriche': 'de',
  'Austria': 'de',
  'Grèce': 'el',
  'Greece': 'el',
  'Suède': 'sv',
  'Sweden': 'sv',
  'Danemark': 'da',
  'Denmark': 'da',
  'Finlande': 'fi',
  'Finland': 'fi',
  'Croatie': 'hr',
  'Croatia': 'hr',
  'Lituanie': 'lt',
  'Lithuania': 'lt',
  'Lettonie': 'lv',
  'Latvia': 'lv',
  'Estonie': 'et',
  'Estonia': 'et',
  'Slovénie': 'sl',
  'Slovenia': 'sl',
  'Irlande': 'en',
  'Ireland': 'en',
  'Malte': 'en',
  'Malta': 'en',
  'Chypre': 'el',
  'Cyprus': 'el',
  'Luxembourg': 'fr',
};

// Helper function pour détecter la langue du prospect
export function detectProspectLanguage(prospect: any): string {
  // 1. Si langue explicite définie
  if (prospect.language_code) {
    return prospect.language_code;
  }
  
  // 2. Déduction depuis le pays
  if (prospect.country) {
    return COUNTRY_TO_LANGUAGE[prospect.country] || 'en';
  }
  
  // 3. Fallback anglais
  return 'en';
}

export const MOCK_EMAIL_TEMPLATES: any[] = [
  ...SIGNATURE_EMAIL_TEMPLATES, // 🆕 TEMPLATES SIGNATURE EN LIGNE
  
  {
    id: 'tpl-waitlist-welcome',
    name: 'Waitlist - Bienvenue',
    description: 'Premier email envoyé aux inscrits à la waitlist marketplace',
    subject: '🎉 Bienvenue sur la liste d\'attente YoJob !',
    body_html: '<p>Bonjour {{name}},</p><p>Merci de votre intérêt pour notre future marketplace européenne de recrutement !</p>',
    body_text: 'Bonjour {{name}}, merci de votre inscription à notre waitlist...',
    variables: ['{{name}}', '{{email}}', '{{country}}'],
    category: 'waitlist',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 142,
  },
  {
    id: 'tpl-waitlist-value',
    name: 'Waitlist - Proposition de valeur',
    description: 'J+2 - Mise en avant des bénéfices',
    subject: 'Comment YoJob va révolutionner votre recrutement européen',
    body_html: '<p>Bonjour {{name}},</p><p>Découvrez comment YoJob transforme le recrutement européen...</p>',
    body_text: 'Bonjour {{name}}, découvrez comment YoJob révolutionne le recrutement...',
    variables: ['{{name}}', '{{company}}'],
    category: 'waitlist',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 98,
  },
  {
    id: 'tpl-agency-qualification',
    name: 'Agence ETT - Qualification',
    description: 'Email de qualification pour agences partenaires',
    subject: 'YoJob - Qualifions votre candidature',
    body_html: '<p>Bonjour {{name}},</p><p>Merci pour votre intérêt à rejoindre le réseau YoJob...</p>',
    body_text: 'Bonjour {{name}}, qualifions votre candidature agence...',
    variables: ['{{name}}', '{{company}}', '{{country}}', '{{sender_name}}'],
    category: 'agency',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 67,
  },
  {
    id: 'tpl-client-followup',
    name: 'Client - Relance devis',
    description: 'Relance après envoi de devis',
    subject: 'Suite à votre demande de recrutement',
    body_html: '<p>Bonjour {{name}},</p><p>Je reviens vers vous concernant votre besoin...</p>',
    body_text: 'Bonjour {{name}}, suite à votre demande...',
    variables: ['{{name}}', '{{company}}', '{{need_type}}', '{{quote_date}}', '{{phone}}', '{{sender_name}}'],
    category: 'client',
    language: 'fr',
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2024-12-01T10:00:00Z',
    usage_count: 45,
  },
  
  // 🚀 QUICK WIN #2: Templates Conversion Waitlist → Client
  {
    id: 'tpl-waitlist-to-client-welcome',
    name: 'Conversion Waitlist → Client - Bienvenue',
    description: 'Email immédiat envoyé quand un prospect waitlist manifeste son intérêt pour devenir client',
    subject: '🎉 {{name}}, passez à l\'action avec YOJOB !',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Bonjour {{name}},</h2>
        
        <p>Vous avez manifesté votre intérêt pour un devis personnalisé.</p>
        
        <p><strong>Génial !</strong> Parlons de votre projet de recrutement européen.</p>
        
        <div style="background: linear-gradient(135deg, #1E3A8A, #06B6D4); padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: white; margin-top: 0;">🎁 OFFRE SPÉCIALE EARLY ADOPTER</h3>
          <ul style="color: white;">
            <li><strong>-30%</strong> sur votre premier recrutement</li>
            <li>Accompagnement personnalisé gratuit</li>
            <li>Priorité sur nos meilleures agences partenaires</li>
          </ul>
        </div>
        
        <p>Vos besoins :</p>
        <ul>
          <li>Travailleurs : <strong>{{workers_count}}</strong></li>
          <li>Pays : <strong>{{country}}</strong></li>
          <li>Secteur : <strong>{{industry}}</strong></li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yojob.com/devis?ref={{prospect_id}}" 
             style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            📋 Demander mon devis maintenant
          </a>
        </div>
        
        <p><em>⏰ Offre limitée aux 50 premiers !</em></p>
        
        <p>À très vite,<br>
        <strong>L'équipe YOJOB</strong><br>
        📞 +33 1 23 45 67 89<br>
        ✉️ contact@yojob.com</p>
      </div>
    `,
    body_text: 'Bonjour {{name}}, vous avez manifesté votre intérêt pour devenir client YOJOB. Offre spéciale : -30% sur votre premier recrutement. Demandez votre devis : https://yojob.com/devis',
    variables: ['{{name}}', '{{workers_count}}', '{{country}}', '{{industry}}', '{{prospect_id}}'],
    category: 'conversion',
    language: 'fr',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
  {
    id: 'tpl-waitlist-to-client-followup',
    name: 'Conversion Waitlist → Client - Relance J+2',
    description: 'Relance 2 jours après pour convertir',
    subject: '⏰ {{name}}, votre offre -30% expire bientôt !',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Bonjour {{name}},</h2>
        
        <p>Je reviens vers vous concernant votre intérêt pour nos services.</p>
        
        <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;"><strong>⚠️ ATTENTION :</strong> Votre offre <strong>-30%</strong> expire dans <strong>48 heures</strong> !</p>
        </div>
        
        <p>Nos clients recrutent déjà en Europe avec YOJOB :</p>
        <ul>
          <li>✅ AgriTech : 50 saisonniers recrutés en 3 semaines</li>
          <li>✅ BTP Solutions : 25 maçons qualifiés en 2 semaines</li>
          <li>✅ IndustrieMax : 40 opérateurs formés en 10 jours</li>
        </ul>
        
        <p><strong>Pourquoi attendre ?</strong></p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yojob.com/devis?ref={{prospect_id}}" 
             style="background: #7C3AED; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            🚀 Je réserve mon offre maintenant
          </a>
        </div>
        
        <p>Ou appelez-moi directement : <strong>+33 1 23 45 67 89</strong></p>
        
        <p>Cordialement,<br>
        <strong>L'équipe YOJOB</strong></p>
      </div>
    `,
    body_text: 'Bonjour {{name}}, votre offre -30% expire dans 48h ! Réservez maintenant : https://yojob.com/devis',
    variables: ['{{name}}', '{{prospect_id}}'],
    category: 'conversion',
    language: 'fr',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
  
  // 🚀 QUICK WIN #3: Templates BTP Urgent
  {
    id: 'tpl-btp-urgent-confirmation',
    name: 'BTP Urgent - Confirmation Prioritaire',
    description: 'Email immédiat pour demandes BTP avec traitement ultra-rapide',
    subject: '🚧 {{company}} - Devis BTP prioritaire en cours',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F59E0B, #EF4444); padding: 20px; border-radius: 10px; color: white; text-align: center;">
          <h2 style="margin: 0;">🚧 DEMANDE BTP PRIORITAIRE</h2>
          <p style="font-size: 18px; margin: 10px 0 0 0;">Traitement express activé !</p>
        </div>
        
        <h2 style="color: #1E3A8A; margin-top: 30px;">Bonjour {{name}},</h2>
        
        <p>Votre demande de recrutement BTP a été <strong>détectée et priorisée</strong>.</p>
        
        <div style="background: #DBEAFE; border-left: 4px solid #1E3A8A; padding: 15px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1E3A8A;">📋 VOTRE BESOIN :</h3>
          <ul style="margin: 10px 0;">
            <li>Entreprise : <strong>{{company}}</strong></li>
            <li>Secteur : <strong>BTP / Construction</strong></li>
            <li>Nombre de travailleurs : <strong>{{workers_count}}</strong></li>
            <li>Projet : {{project_description}}</li>
          </ul>
        </div>
        
        <div style="background: #10B981; color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin-top: 0;">⚡ NOTRE ENGAGEMENT BTP :</h3>
          <ul>
            <li>✅ <strong>Devis personnalisé sous 4H</strong> (ouvrées)</li>
            <li>✅ Travailleurs qualifiés (CAP/BEP vérifiés)</li>
            <li>✅ Conformité chantier garantie (A1, détachement)</li>
            <li>✅ Remplacement 24h en cas d'absence</li>
          </ul>
        </div>
        
        <p><strong>Notre expert BTP</strong> prend en charge votre dossier immédiatement.</p>
        
        <p>Dans le BTP, chaque jour compte. Nous le savons. C'est pourquoi nous traitons votre demande en <strong>priorité absolue</strong>.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #7C3AED; font-size: 18px; font-weight: bold;">
            ⏰ Vous recevrez votre devis avant {{deadline_time}}
          </p>
        </div>
        
        <p>Questions urgentes ? Appelez-nous directement :<br>
        <strong style="font-size: 20px; color: #EF4444;">📞 +33 1 23 45 67 89</strong></p>
        
        <p>À très vite,<br>
        <strong>L'équipe BTP YOJOB</strong></p>
      </div>
    `,
    body_text: 'Bonjour {{name}}, votre demande BTP est en traitement PRIORITAIRE. Devis sous 4H. Questions urgentes : +33 1 23 45 67 89',
    variables: ['{{name}}', '{{company}}', '{{workers_count}}', '{{project_description}}', '{{deadline_time}}'],
    category: 'btp_urgent',
    language: 'fr',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
  
  // 🌍 TRADUCTIONS MULTILINGUES - Templates Conversion Waitlist
  
  // POLONAIS - Conversion Waitlist Welcome
  {
    id: 'tpl-waitlist-to-client-welcome-pl',
    name: 'Conversion Waitlist → Client - Witamy (PL)',
    description: 'Email natychmiastowy wysłany, gdy potencjalny klient z listy oczekujących wyraża zainteresowanie',
    subject: '🎉 {{name}}, działaj teraz z YOJOB!',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Dzień dobry {{name}},</h2>
        
        <p>Wyraziłeś zainteresowanie spersonalizowaną ofertą.</p>
        
        <p><strong>Świetnie!</strong> Porozmawiajmy o Twoim europejskim projekcie rekrutacyjnym.</p>
        
        <div style="background: linear-gradient(135deg, #1E3A8A, #06B6D4); padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: white; margin-top: 0;">🎁 OFERTA SPECJALNA EARLY ADOPTER</h3>
          <ul style="color: white;">
            <li><strong>-30%</strong> na pierwszą rekrutację</li>
            <li>Bezpłatne wsparcie personalizowane</li>
            <li>Priorytet u naszych najlepszych agencji partnerskich</li>
          </ul>
        </div>
        
        <p>Twoje potrzeby:</p>
        <ul>
          <li>Pracownicy: <strong>{{workers_count}}</strong></li>
          <li>Kraj: <strong>{{country}}</strong></li>
          <li>Sektor: <strong>{{industry}}</strong></li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yojob.com/devis?ref={{prospect_id}}" 
             style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            📋 Poproś o ofertę teraz
          </a>
        </div>
        
        <p><em>⏰ Oferta ograniczona do 50 pierwszych!</em></p>
        
        <p>Do zobaczenia wkrótce,<br>
        <strong>Zespół YOJOB</strong><br>
        📞 +33 1 23 45 67 89<br>
        ✉️ contact@yojob.com</p>
      </div>
    `,
    body_text: 'Dzień dobry {{name}}, wyraziłeś zainteresowanie zostaniem klientem YOJOB. Oferta specjalna: -30% na pierwszą rekrutację. Poproś o ofertę: https://yojob.com/devis',
    variables: ['{{name}}', '{{workers_count}}', '{{country}}', '{{industry}}', '{{prospect_id}}'],
    category: 'conversion',
    language: 'pl',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
  
  // ALLEMAND - Conversion Waitlist Welcome
  {
    id: 'tpl-waitlist-to-client-welcome-de',
    name: 'Conversion Waitlist → Client - Willkommen (DE)',
    description: 'Sofortige E-Mail, wenn ein Interessent Interesse bekundet',
    subject: '🎉 {{name}}, handeln Sie jetzt mit YOJOB!',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Guten Tag {{name}},</h2>
        
        <p>Sie haben Ihr Interesse an einem personalisierten Angebot geäußert.</p>
        
        <p><strong>Großartig!</strong> Lassen Sie uns über Ihr europäisches Rekrutierungsprojekt sprechen.</p>
        
        <div style="background: linear-gradient(135deg, #1E3A8A, #06B6D4); padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: white; margin-top: 0;">🎁 SONDERANGEBOT EARLY ADOPTER</h3>
          <ul style="color: white;">
            <li><strong>-30%</strong> auf Ihre erste Rekrutierung</li>
            <li>Kostenlose personalisierte Begleitung</li>
            <li>Priorität bei unseren besten Partneragenturen</li>
          </ul>
        </div>
        
        <p>Ihre Bedürfnisse:</p>
        <ul>
          <li>Mitarbeiter: <strong>{{workers_count}}</strong></li>
          <li>Land: <strong>{{country}}</strong></li>
          <li>Sektor: <strong>{{industry}}</strong></li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yojob.com/devis?ref={{prospect_id}}" 
             style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            📋 Angebot jetzt anfordern
          </a>
        </div>
        
        <p><em>⏰ Angebot begrenzt auf die ersten 50!</em></p>
        
        <p>Bis bald,<br>
        <strong>Das YOJOB Team</strong><br>
        📞 +33 1 23 45 67 89<br>
        ✉️ contact@yojob.com</p>
      </div>
    `,
    body_text: 'Guten Tag {{name}}, Sie haben Interesse bekundet, YOJOB-Kunde zu werden. Sonderangebot: -30% auf Ihre erste Rekrutierung. Angebot anfordern: https://yojob.com/devis',
    variables: ['{{name}}', '{{workers_count}}', '{{country}}', '{{industry}}', '{{prospect_id}}'],
    category: 'conversion',
    language: 'de',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
  
  // ESPAGNOL - Conversion Waitlist Welcome
  {
    id: 'tpl-waitlist-to-client-welcome-es',
    name: 'Conversion Waitlist → Client - Bienvenida (ES)',
    description: 'Email inmediato cuando un prospecto manifiesta interés',
    subject: '🎉 {{name}}, ¡actúa ahora con YOJOB!',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Hola {{name}},</h2>
        
        <p>Has manifestado tu interés por un presupuesto personalizado.</p>
        
        <p><strong>¡Genial!</strong> Hablemos de tu proyecto de reclutamiento europeo.</p>
        
        <div style="background: linear-gradient(135deg, #1E3A8A, #06B6D4); padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: white; margin-top: 0;">🎁 OFERTA ESPECIAL EARLY ADOPTER</h3>
          <ul style="color: white;">
            <li><strong>-30%</strong> en tu primer reclutamiento</li>
            <li>Acompañamiento personalizado gratuito</li>
            <li>Prioridad en nuestras mejores agencias asociadas</li>
          </ul>
        </div>
        
        <p>Tus necesidades:</p>
        <ul>
          <li>Trabajadores: <strong>{{workers_count}}</strong></li>
          <li>País: <strong>{{country}}</strong></li>
          <li>Sector: <strong>{{industry}}</strong></li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yojob.com/devis?ref={{prospect_id}}" 
             style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            📋 Solicitar mi presupuesto ahora
          </a>
        </div>
        
        <p><em>⏰ Oferta limitada a los primeros 50!</em></p>
        
        <p>Hasta pronto,<br>
        <strong>El equipo YOJOB</strong><br>
        📞 +33 1 23 45 67 89<br>
        ✉️ contact@yojob.com</p>
      </div>
    `,
    body_text: 'Hola {{name}}, has manifestado tu interés en convertirte en cliente YOJOB. Oferta especial: -30% en tu primer reclutamiento. Solicita tu presupuesto: https://yojob.com/devis',
    variables: ['{{name}}', '{{workers_count}}', '{{country}}', '{{industry}}', '{{prospect_id}}'],
    category: 'conversion',
    language: 'es',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
  
  // ITALIEN - Conversion Waitlist Welcome
  {
    id: 'tpl-waitlist-to-client-welcome-it',
    name: 'Conversion Waitlist → Client - Benvenuto (IT)',
    description: 'Email immediata quando un prospect manifesta interesse',
    subject: '🎉 {{name}}, agisci ora con YOJOB!',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Buongiorno {{name}},</h2>
        
        <p>Hai manifestato il tuo interesse per un preventivo personalizzato.</p>
        
        <p><strong>Fantastico!</strong> Parliamo del tuo progetto di reclutamento europeo.</p>
        
        <div style="background: linear-gradient(135deg, #1E3A8A, #06B6D4); padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: white; margin-top: 0;">🎁 OFFERTA SPECIALE EARLY ADOPTER</h3>
          <ul style="color: white;">
            <li><strong>-30%</strong> sul tuo primo reclutamento</li>
            <li>Accompagnamento personalizzato gratuito</li>
            <li>Priorità presso le nostre migliori agenzie partner</li>
          </ul>
        </div>
        
        <p>Le tue esigenze:</p>
        <ul>
          <li>Lavoratori: <strong>{{workers_count}}</strong></li>
          <li>Paese: <strong>{{country}}</strong></li>
          <li>Settore: <strong>{{industry}}</strong></li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yojob.com/devis?ref={{prospect_id}}" 
             style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            📋 Richiedi il mio preventivo ora
          </a>
        </div>
        
        <p><em>⏰ Offerta limitata ai primi 50!</em></p>
        
        <p>A presto,<br>
        <strong>Il team YOJOB</strong><br>
        📞 +33 1 23 45 67 89<br>
        ✉️ contact@yojob.com</p>
      </div>
    `,
    body_text: 'Buongiorno {{name}}, hai manifestato interesse a diventare cliente YOJOB. Offerta speciale: -30% sul tuo primo reclutamento. Richiedi il tuo preventivo: https://yojob.com/devis',
    variables: ['{{name}}', '{{workers_count}}', '{{country}}', '{{industry}}', '{{prospect_id}}'],
    category: 'conversion',
    language: 'it',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
  
  // ANGLAIS - Conversion Waitlist Welcome
  {
    id: 'tpl-waitlist-to-client-welcome-en',
    name: 'Conversion Waitlist → Client - Welcome (EN)',
    description: 'Immediate email when a prospect shows interest',
    subject: '🎉 {{name}}, take action with YOJOB now!',
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A;">Hello {{name}},</h2>
        
        <p>You've expressed interest in a personalized quote.</p>
        
        <p><strong>Great!</strong> Let's talk about your European recruitment project.</p>
        
        <div style="background: linear-gradient(135deg, #1E3A8A, #06B6D4); padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: white; margin-top: 0;">🎁 EARLY ADOPTER SPECIAL OFFER</h3>
          <ul style="color: white;">
            <li><strong>-30%</strong> on your first recruitment</li>
            <li>Free personalized support</li>
            <li>Priority access to our best partner agencies</li>
          </ul>
        </div>
        
        <p>Your needs:</p>
        <ul>
          <li>Workers: <strong>{{workers_count}}</strong></li>
          <li>Country: <strong>{{country}}</strong></li>
          <li>Sector: <strong>{{industry}}</strong></li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yojob.com/devis?ref={{prospect_id}}" 
             style="background: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
            📋 Request my quote now
          </a>
        </div>
        
        <p><em>⏰ Offer limited to the first 50!</em></p>
        
        <p>See you soon,<br>
        <strong>The YOJOB team</strong><br>
        📞 +33 1 23 45 67 89<br>
        ✉️ contact@yojob.com</p>
      </div>
    `,
    body_text: 'Hello {{name}}, you have expressed interest in becoming a YOJOB client. Special offer: -30% on your first recruitment. Request your quote: https://yojob.com/devis',
    variables: ['{{name}}', '{{workers_count}}', '{{country}}', '{{industry}}', '{{prospect_id}}'],
    category: 'conversion',
    language: 'en',
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    usage_count: 0,
  },
];

export const MOCK_WORKFLOWS: any[] = [
  {
    id: 'wf-waitlist-nurture',
    name: 'Waitlist - Nurturing 4 étapes',
    description: 'Séquence automatique pour les inscrits waitlist : J+0 welcome, J+2 value, J+7 case study, J+14 dernier rappel',
    status: 'active',
    trigger: { type: 'prospect_created', config: {} },
    conditions: [{ type: 'prospect_type', operator: 'equals', value: 'waitlist' }],
    steps: [
      { id: 'step-1', type: 'send_email', delay_minutes: 0, config: { template_id: 'tpl-waitlist-welcome' } },
      { id: 'step-2', type: 'send_email', delay_minutes: 2880, config: { template_id: 'tpl-waitlist-value' } },
      { id: 'step-3', type: 'send_email', delay_minutes: 10080, config: { subject: '📊 Cas client', body: '...' } },
      { id: 'step-4', type: 'send_email', delay_minutes: 20160, config: { subject: '⏰ Dernier rappel', body: '...' } },
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2025-01-05T14:00:00Z',
    created_by: 'admin',
  },
  {
    id: 'wf-agency-qualification',
    name: 'Agence ETT - Qualification + Call',
    description: 'Workflow de qualification des agences : email qualification J+0, relance J+3, création tâche "Call" J+5',
    status: 'active',
    trigger: { type: 'prospect_created', config: {} },
    conditions: [{ type: 'prospect_type', operator: 'equals', value: 'agency' }],
    steps: [
      { id: 'step-1', type: 'send_email', delay_minutes: 0, config: { template_id: 'tpl-agency-qualification' } },
      { id: 'step-2', type: 'send_email', delay_minutes: 4320, config: { subject: 'Relance', body: '...' } },
      { id: 'step-3', type: 'create_task', delay_minutes: 7200, config: { task_title: 'Call agence', task_type: 'call' } },
      { id: 'step-4', type: 'change_status', delay_minutes: 7200, config: { new_status: 'qualified' } },
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2024-11-20T10:00:00Z',
    updated_at: '2025-01-05T14:00:00Z',
    created_by: 'admin',
  },
  {
    id: 'wf-client-followup',
    name: 'Client - Relance devis',
    description: 'Relance automatique après envoi devis',
    status: 'active',
    trigger: { type: 'status_changed', config: { status_to: 'qualified' } },
    conditions: [{ type: 'prospect_type', operator: 'equals', value: 'client' }],
    steps: [
      { id: 'step-1', type: 'send_email', delay_minutes: 2880, config: { template_id: 'tpl-client-followup' } },
      { id: 'step-2', type: 'send_email', delay_minutes: 7200, config: { subject: 'Dernière relance', body: '...' } },
      { id: 'step-3', type: 'create_task', delay_minutes: 10080, config: { task_title: 'Call closing', task_type: 'call' } },
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2024-11-25T10:00:00Z',
    updated_at: '2025-01-05T14:00:00Z',
    created_by: 'admin',
  },
  {
    id: 'wf-inactivity-reactivation',
    name: 'Réactivation - Inactivité 30 jours',
    description: 'Workflow déclenché après 30 jours sans activité',
    status: 'paused',
    trigger: { type: 'inactivity', config: { days_inactive: 30 } },
    conditions: [
      { type: 'status', operator: 'not_equals', value: 'converted' },
      { type: 'status', operator: 'not_equals', value: 'lost' },
    ],
    steps: [
      { id: 'step-1', type: 'send_email', delay_minutes: 0, config: { subject: 'On vous a perdu...', body: '...' } },
      { id: 'step-2', type: 'add_tag', delay_minutes: 0, config: { tag_name: 'Réactivation' } },
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2024-12-01T10:00:00Z',
    updated_at: '2025-01-05T14:00:00Z',
    created_by: 'admin',
  },
  
  // 🚀 QUICK WIN #2: Workflow Conversion Waitlist → Client
  {
    id: 'wf-waitlist-to-client',
    name: '🎯 Conversion Waitlist → Client',
    description: 'Workflow de conversion des inscrits waitlist en clients actifs avec offre -30% limitée dans le temps',
    status: 'active',
    trigger: { type: 'tag_added', config: { tag_name: 'Intéressé Devis' } },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'waitlist' },
      { type: 'status', operator: 'not_equals', value: 'converted' },
    ],
    steps: [
      // J+0 : Email immédiat avec offre -30%
      { 
        id: 'step-1', 
        type: 'send_email', 
        delay_minutes: 0, 
        config: { 
          template_id: 'tpl-waitlist-to-client-welcome',
          subject: '🎉 {{name}}, passez à l\'action avec YOJOB !',
        } 
      },
      // J+0 : Changement statut
      { 
        id: 'step-2', 
        type: 'change_status', 
        delay_minutes: 0, 
        config: { 
          new_status: 'interested' 
        } 
      },
      // J+0 : Création tâche équipe commerciale
      { 
        id: 'step-3', 
        type: 'create_task', 
        delay_minutes: 0, 
        config: { 
          task_title: '🔥 HOT LEAD - Waitlist → Client - {{company}}',
          task_description: 'Prospect waitlist intéressé pour devenir client. Offre -30% active. Appeler sous 24h.',
          task_type: 'call',
          priority: 'high',
        } 
      },
      // J+0 : Ajout tag
      { 
        id: 'step-4', 
        type: 'add_tag', 
        delay_minutes: 0, 
        config: { 
          tag_name: 'Conversion Active' 
        } 
      },
      // J+2 : Relance avec urgence
      { 
        id: 'step-5', 
        type: 'send_email', 
        delay_minutes: 2880, // 2 jours
        config: { 
          template_id: 'tpl-waitlist-to-client-followup',
          subject: '⏰ {{name}}, votre offre -30% expire bientôt !',
        } 
      },
      // J+5 : Tâche call final si pas de conversion
      { 
        id: 'step-6', 
        type: 'create_task', 
        delay_minutes: 7200, // 5 jours
        config: { 
          task_title: '☎️ CALL FINAL - Conversion Waitlist - {{company}}',
          task_description: 'Dernier appel avant expiration offre -30%. Négociation possible.',
          task_type: 'call',
          priority: 'medium',
        } 
      },
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    created_by: 'admin',
  },
  
  // 🚀 QUICK WIN #3: Workflow BTP Urgent
  {
    id: 'wf-btp-urgent',
    name: '🚧 BTP - Traitement Ultra-Rapide',
    description: 'Workflow prioritaire pour le secteur BTP avec engagement de devis sous 4H et notifications immédiates équipe',
    status: 'active',
    trigger: { type: 'prospect_created', config: {} },
    conditions: [
      { type: 'prospect_type', operator: 'equals', value: 'client' },
      { type: 'industry_sector', operator: 'equals', value: 'BTP' },
    ],
    steps: [
      // J+0 : Email confirmation prioritaire immédiat
      { 
        id: 'step-1', 
        type: 'send_email', 
        delay_minutes: 0, 
        config: { 
          template_id: 'tpl-btp-urgent-confirmation',
          subject: '🚧 {{company}} - Devis BTP prioritaire en cours',
        } 
      },
      // J+0 : Notification équipe BTP (Slack/Teams)
      { 
        id: 'step-2', 
        type: 'notify_team', 
        delay_minutes: 0, 
        config: { 
          channel: 'btp-urgent',
          title: '🚨 NOUVEAU DEVIS BTP URGENT',
          message: `
            Client : {{company}}
            Contact : {{name}} - {{email}} - {{phone}}
            Besoin : {{workers_count}} travailleurs BTP
            Projet : {{project_description}}
            
            ⚡ ENGAGEMENT : Devis sous 4H !
             Traiter IMMÉDIATEMENT
          `,
          priority: 'urgent',
        } 
      },
      // J+0 : Création tâche ultra-prioritaire
      { 
        id: 'step-3', 
        type: 'create_task', 
        delay_minutes: 0, 
        config: { 
          task_title: '🚨 BTP URGENT - Devis à préparer SOUS 4H - {{company}}',
          task_description: `
            Demande BTP prioritaire détectée !
            
            Client : {{company}}
            Contact : {{name}}
            Téléphone : {{phone}}
            Email : {{email}}
            
            Besoin : {{workers_count}} travailleurs
            Secteur : BTP / Construction
            Projet : {{project_description}}
            
            ⏰ DEADLINE : Devis à envoyer avant {{deadline_4h}}
            
            Actions :
            1. Analyser le besoin en détail
            2. Contacter agences BTP disponibles
            3. Préparer devis personnalisé
            4. Envoyer devis + appeler client
          `,
          task_type: 'quote',
          priority: 'urgent',
          due_date: 'now+4hours',
        } 
      },
      // J+0 : Ajout tag
      { 
        id: 'step-4', 
        type: 'add_tag', 
        delay_minutes: 0, 
        config: { 
          tag_name: 'BTP Urgent' 
        } 
      },
      // J+0 : Changement statut
      { 
        id: 'step-5', 
        type: 'change_status', 
        delay_minutes: 0, 
        config: { 
          new_status: 'in_progress' 
        } 
      },
      // 4H : Escalade si pas traité
      { 
        id: 'step-6', 
        type: 'notify_team', 
        delay_minutes: 240, // 4 heures
        config: { 
          channel: 'management',
          title: '⚠️ ALERTE BTP - Devis non traité depuis 4H',
          message: `
            🚨 INTERVENTION MANAGER REQUISE
            
            Client BTP : {{company}}
            Contact : {{name}} - {{phone}}
            
            Le devis n'a pas été envoyé dans les 4H promises.
            → Intervention immédiate nécessaire !
          `,
          priority: 'critical',
        } 
      },
      // 6H : Email si devis envoyé (conditionnel - à implémenter)
      // Ce step sera exécuté seulement si le statut passe à "quoted"
      { 
        id: 'step-7', 
        type: 'send_email', 
        delay_minutes: 360, // 6 heures (backup si devis envoyé manuellement)
        config: { 
          template_id: 'tpl-btp-urgent-quote-sent',
          subject: '✅ {{company}} - Votre devis BTP est prêt !',
        } 
      },
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    created_by: 'admin',
  },
  
  // 🆕 WORKFLOWS SIGNATURE EN LIGNE
  // Workflow 1 : Envoi automatique email avec lien après génération token
  {
    id: 'wf-signature-link-sent',
    name: '✍️ Signature - Envoi lien automatique',
    description: 'Envoie automatiquement un email avec le lien de signature après génération du token',
    status: 'active',
    trigger: { 
      type: 'status_changed', 
      config: { status_to: 'devisEnvoye' } 
    },
    conditions: [
      { type: 'signatureToken', operator: 'exists' },
      { type: 'statut', operator: 'not_equals', value: 'signe' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 0,
        config: {
          template_id: 'tpl-signature-link',
          to: '{{contact.email}}',
          variables: {
            contact_firstname: '{{contact.prenom}}',
            contact_lastname: '{{contact.nom}}',
            company: '{{entreprise.raisonSociale}}',
            quote_number: '{{numero}}',
            signature_url: '{{signatureUrl}}',
            positions_count: '{{postes.length}}',
            candidates_count: '{{totalCandidats}}',
            sector: '{{postes[0].secteur}}'
          }
        }
      },
      {
        id: 'step-2',
        type: 'add_tag',
        delay_minutes: 0,
        config: { tag_name: 'Lien signature envoyé' }
      }
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    created_by: 'admin',
  },
  
  // Workflow 2 : Relance J+2 si non signé
  {
    id: 'wf-signature-reminder-j2',
    name: '⏰ Signature - Relance J+2',
    description: 'Relance automatique 2 jours après envoi du lien si devis non signé',
    status: 'active',
    trigger: { 
      type: 'scheduled',
      config: { 
        frequency: 'daily',
        check_condition: 'signatureLinkGeneratedAt > now-2days AND statut != signe'
      } 
    },
    conditions: [
      { type: 'signatureToken', operator: 'exists' },
      { type: 'statut', operator: 'not_equals', value: 'signe' },
      { type: 'signatureLinkGeneratedAt', operator: 'older_than', value: '2days' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 0,
        config: {
          template_id: 'tpl-signature-reminder-j2',
          to: '{{contact.email}}',
          variables: {
            contact_firstname: '{{contact.prenom}}',
            quote_number: '{{numero}}',
            signature_url: '{{signatureUrl}}',
            candidates_count: '{{totalCandidats}}',
            sector: '{{postes[0].secteur}}',
            country: '{{postes[0].labelPays}}'
          }
        }
      },
      {
        id: 'step-2',
        type: 'add_tag',
        delay_minutes: 0,
        config: { tag_name: 'Relance J+2' }
      }
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    created_by: 'admin',
  },
  
  // Workflow 3 : Relance J+7 urgente si toujours non signé
  {
    id: 'wf-signature-reminder-j7',
    name: '🚨 Signature - Relance J+7 URGENTE',
    description: 'Relance urgente 7 jours après si toujours non signé + notification admin',
    status: 'active',
    trigger: { 
      type: 'scheduled',
      config: { 
        frequency: 'daily',
        check_condition: 'signatureLinkGeneratedAt > now-7days AND statut != signe'
      } 
    },
    conditions: [
      { type: 'signatureToken', operator: 'exists' },
      { type: 'statut', operator: 'not_equals', value: 'signe' },
      { type: 'signatureLinkGeneratedAt', operator: 'older_than', value: '7days' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 0,
        config: {
          template_id: 'tpl-signature-reminder-j7',
          to: '{{contact.email}}',
          variables: {
            contact_firstname: '{{contact.prenom}}',
            quote_number: '{{numero}}',
            signature_url: '{{signatureUrl}}',
            available_candidates: '{{estimatedCandidatesAvailable}}'
          }
        }
      },
      {
        id: 'step-2',
        type: 'notify_team',
        delay_minutes: 0,
        config: {
          channel: 'commercial',
          title: '📞 Devis J+7 non signé - Action requise',
          message: `
            Devis : {{numero}}
            Client : {{entreprise.raisonSociale}}
            Contact : {{contact.prenom}} {{contact.nom}}
            Téléphone : {{contact.telephonePortable}}
            Email : {{contact.email}}
            
            Le devis a été envoyé il y a 7 jours et n'est toujours pas signé.
            → Appel commercial recommandé AUJOURD'HUI
          `,
          priority: 'medium'
        }
      },
      {
        id: 'step-3',
        type: 'create_task',
        delay_minutes: 0,
        config: {
          task_title: '☎️ CALL - Devis non signé J+7 - {{entreprise.raisonSociale}}',
          task_description: 'Appeler le client pour comprendre blocage et débloquer signature',
          task_type: 'call',
          priority: 'high',
        }
      },
      {
        id: 'step-4',
        type: 'add_tag',
        delay_minutes: 0,
        config: { tag_name: 'Relance J+7 - Action requise' }
      }
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    created_by: 'admin',
  },
  
  // Workflow 4 : Confirmation après signature
  {
    id: 'wf-signature-confirmed',
    name: '✅ Signature - Confirmation client',
    description: 'Email de confirmation + activation automatique après signature',
    status: 'active',
    trigger: { 
      type: 'status_changed', 
      config: { status_to: 'signe' } 
    },
    conditions: [
      { type: 'signature', operator: 'exists' },
    ],
    steps: [
      {
        id: 'step-1',
        type: 'send_email',
        delay_minutes: 0,
        config: {
          template_id: 'tpl-signature-confirmed',
          to: '{{contact.email}}',
          variables: {
            contact_firstname: '{{contact.prenom}}',
            contact_lastname: '{{contact.nom}}',
            quote_number: '{{numero}}',
            signature_date: '{{signature.metadata.timestampReadable}}'
          }
        }
      },
      {
        id: 'step-2',
        type: 'notify_team',
        delay_minutes: 0,
        config: {
          channel: 'operations',
          title: '✅ NOUVEAU DEVIS SIGNÉ',
          message: `
            🎉 Devis {{numero}} signé !
            
            Client : {{entreprise.raisonSociale}}
            Contact : {{contact.prenom}} {{contact.nom}}
            Email : {{contact.email}}
            Téléphone : {{contact.telephonePortable}}
            
            Postes : {{postes.length}}
            Candidats : {{totalCandidats}}
            Secteur : {{postes[0].secteur}}
            
            → Lancer la recherche de candidats MAINTENANT
          `,
          priority: 'high'
        }
      },
      {
        id: 'step-3',
        type: 'create_task',
        delay_minutes: 0,
        config: {
          task_title: '🔍 RECHERCHE CANDIDATS - {{entreprise.raisonSociale}}',
          task_description: `
            Devis signé ! Activation de la recherche.
            
            Objectif : Présenter premiers profils sous 48-72h
            
            Actions :
            1. Analyser profils requis
            2. Contacter agences réseau
            3. Pré-qualifier candidats
            4. Préparer dossiers + CV
          `,
          task_type: 'recruitment',
          priority: 'urgent',
          due_date: 'now+72hours'
        }
      },
      {
        id: 'step-4',
        type: 'change_status',
        delay_minutes: 0,
        config: { new_status: 'in_recruitment' }
      },
      {
        id: 'step-5',
        type: 'add_tag',
        delay_minutes: 0,
        config: { tag_name: 'Devis signé - Actif' }
      }
    ],
    stats: { total_runs: 0, success_runs: 0, failed_runs: 0, conversion_rate: 0 },
    created_at: '2025-01-05T12:00:00Z',
    updated_at: '2025-01-05T12:00:00Z',
    created_by: 'admin',
  },
];

export const MOCK_AUTOMATION_RUNS: any[] = [
  // Tableau vide - Aucune exécution pour l'instant
  // Les workflows sont configurés mais n'ont pas encore été exécutés
];

export const MOCK_AUTOMATION_LOGS: any[] = [
  // Tableau vide - Aucun log pour l'instant
];

export const WORKFLOW_TEMPLATES: any[] = [
  {
    id: 'template-waitlist',
    name: 'Nurturing Waitlist',
    description: 'Séquence de 4 emails pour engager les inscrits waitlist sur 14 jours',
    category: 'waitlist',
    icon: 'Rocket',
    color: 'from-amber-500 to-orange-500',
    trigger: { type: 'prospect_created', config: {} },
    conditions: [{ type: 'prospect_type', operator: 'equals', value: 'waitlist' }],
    steps: [
      { type: 'send_email', delay_minutes: 0, config: { template_id: 'tpl-waitlist-welcome' } },
      { type: 'send_email', delay_minutes: 2880, config: { template_id: 'tpl-waitlist-value' } },
      { type: 'send_email', delay_minutes: 10080, config: { subject: 'Case study', body: '...' } },
      { type: 'send_email', delay_minutes: 20160, config: { subject: 'Dernier rappel', body: '...' } },
    ],
    estimated_duration_days: 14,
  },
  {
    id: 'template-agency',
    name: 'Qualification Agence',
    description: 'Qualifiez et planifiez un call avec les agences partenaires',
    category: 'agency',
    icon: 'Briefcase',
    color: 'from-orange-500 to-red-500',
    trigger: { type: 'prospect_created', config: {} },
    conditions: [{ type: 'prospect_type', operator: 'equals', value: 'agency' }],
    steps: [
      { type: 'send_email', delay_minutes: 0, config: { template_id: 'tpl-agency-qualification' } },
      { type: 'send_email', delay_minutes: 4320, config: { subject: 'Relance', body: '...' } },
      { type: 'create_task', delay_minutes: 7200, config: { task_title: 'Call agence', task_type: 'call' } },
    ],
    estimated_duration_days: 5,
  },
  {
    id: 'template-client',
    name: 'Relance Devis Client',
    description: 'Relances automatiques après envoi d\'un devis',
    category: 'client',
    icon: 'Building2',
    color: 'from-blue-500 to-cyan-500',
    trigger: { type: 'status_changed', config: { status_to: 'qualified' } },
    conditions: [{ type: 'prospect_type', operator: 'equals', value: 'client' }],
    steps: [
      { type: 'send_email', delay_minutes: 2880, config: { template_id: 'tpl-client-followup' } },
      { type: 'send_email', delay_minutes: 7200, config: { subject: 'Dernière relance', body: '...' } },
      { type: 'create_task', delay_minutes: 10080, config: { task_title: 'Call closing', task_type: 'call' } },
    ],
    estimated_duration_days: 7,
  },
  {
    id: 'template-reactivation',
    name: 'Réactivation Inactifs',
    description: 'Relancez automatiquement les prospects inactifs depuis 30 jours',
    category: 'reactivation',
    icon: 'RefreshCw',
    color: 'from-purple-500 to-pink-500',
    trigger: { type: 'inactivity', config: { days_inactive: 30 } },
    conditions: [{ type: 'status', operator: 'not_equals', value: 'converted' }],
    steps: [
      { type: 'send_email', delay_minutes: 0, config: { subject: 'On vous a perdu...', body: '...' } },
      { type: 'add_tag', delay_minutes: 0, config: { tag_name: 'Réactivation' } },
    ],
    estimated_duration_days: 1,
  },
];

export const MOCK_SMTP_SETTINGS: any = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  user: 'contact@yojob.eu',
  password_encrypted: '••••••••••••',
  from_name: 'YoJob Team',
  from_email: 'contact@yojob.eu',
  reply_to: 'contact@yojob.eu',
  bcc: null,
  daily_limit: 500,
  hourly_limit: 50,
  quiet_hours_start: '22:00',
  quiet_hours_end: '08:00',
  working_days_only: true,
  signature_html: SIGNATURE_EMAIL_TEMPLATES['fr'],
  unsubscribe_footer: '<p>Se désinscrire</p>',
  last_test_at: '2024-12-18T09:30:00Z',
  last_test_status: 'success',
};