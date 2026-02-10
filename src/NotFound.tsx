import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Home, Briefcase, Users, FileText, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { Footer } from './components/landing/Footer';
import { LogoSvg } from './imports/YojobLogoComplete';
import { useLanguageManager } from './hooks/useLanguageManager';
import { buildLocalizedPath, splitPathByLang } from './lib/i18nRouting';

// ============================================================================
// Traductions 404 pour les 23 langues
// ============================================================================
const translations: Record<string, {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  quickLinks: string;
  backHome: string;
  noResults: string;
}> = {
  fr: {
    title: 'Page introuvable',
    subtitle: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
    searchPlaceholder: 'Rechercher sur yojob.fr...',
    quickLinks: 'Accès rapide',
    backHome: 'Retour à l\'accueil',
    noResults: 'Aucun résultat trouvé',
  },
  en: {
    title: 'Page not found',
    subtitle: 'The page you are looking for does not exist or has been moved.',
    searchPlaceholder: 'Search on yojob.fr...',
    quickLinks: 'Quick access',
    backHome: 'Back to home',
    noResults: 'No results found',
  },
  de: {
    title: 'Seite nicht gefunden',
    subtitle: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
    searchPlaceholder: 'Auf yojob.fr suchen...',
    quickLinks: 'Schnellzugriff',
    backHome: 'Zurück zur Startseite',
    noResults: 'Keine Ergebnisse gefunden',
  },
  es: {
    title: 'Página no encontrada',
    subtitle: 'La página que busca no existe o ha sido movida.',
    searchPlaceholder: 'Buscar en yojob.fr...',
    quickLinks: 'Acceso rápido',
    backHome: 'Volver al inicio',
    noResults: 'No se encontraron resultados',
  },
  it: {
    title: 'Pagina non trovata',
    subtitle: 'La pagina che stai cercando non esiste o è stata spostata.',
    searchPlaceholder: 'Cerca su yojob.fr...',
    quickLinks: 'Accesso rapido',
    backHome: 'Torna alla home',
    noResults: 'Nessun risultato trovato',
  },
  nl: {
    title: 'Pagina niet gevonden',
    subtitle: 'De pagina die u zoekt bestaat niet of is verplaatst.',
    searchPlaceholder: 'Zoeken op yojob.fr...',
    quickLinks: 'Snelle toegang',
    backHome: 'Terug naar home',
    noResults: 'Geen resultaten gevonden',
  },
  pt: {
    title: 'Página não encontrada',
    subtitle: 'A página que procura não existe ou foi movida.',
    searchPlaceholder: 'Pesquisar em yojob.fr...',
    quickLinks: 'Acesso rápido',
    backHome: 'Voltar ao início',
    noResults: 'Nenhum resultado encontrado',
  },
  pl: {
    title: 'Strona nie znaleziona',
    subtitle: 'Strona, której szukasz, nie istnieje lub została przeniesiona.',
    searchPlaceholder: 'Szukaj na yojob.fr...',
    quickLinks: 'Szybki dostęp',
    backHome: 'Powrót do strony głównej',
    noResults: 'Nie znaleziono wyników',
  },
  cs: {
    title: 'Stránka nenalezena',
    subtitle: 'Stránka, kterou hledáte, neexistuje nebo byla přesunuta.',
    searchPlaceholder: 'Hledat na yojob.fr...',
    quickLinks: 'Rychlý přístup',
    backHome: 'Zpět na úvodní stránku',
    noResults: 'Nebyly nalezeny žádné výsledky',
  },
  sk: {
    title: 'Stránka nenájdená',
    subtitle: 'Stránka, ktorú hľadáte, neexistuje alebo bola presunutá.',
    searchPlaceholder: 'Hľadať na yojob.fr...',
    quickLinks: 'Rýchly prístup',
    backHome: 'Späť na úvodnú stránku',
    noResults: 'Nenašli sa žiadne výsledky',
  },
  hu: {
    title: 'Az oldal nem található',
    subtitle: 'A keresett oldal nem létezik vagy áthelyezték.',
    searchPlaceholder: 'Keresés a yojob.fr-en...',
    quickLinks: 'Gyors hozzáférés',
    backHome: 'Vissza a főoldalra',
    noResults: 'Nincs találat',
  },
  ro: {
    title: 'Pagina nu a fost găsită',
    subtitle: 'Pagina pe care o căutați nu există sau a fost mutată.',
    searchPlaceholder: 'Căutați pe yojob.fr...',
    quickLinks: 'Acces rapid',
    backHome: 'Înapoi la pagina principală',
    noResults: 'Nu s-au găsit rezultate',
  },
  bg: {
    title: 'Страницата не е намерена',
    subtitle: 'Страницата, която търсите, не съществува или е преместена.',
    searchPlaceholder: 'Търсене в yojob.fr...',
    quickLinks: 'Бърз достъп',
    backHome: 'Обратно към началото',
    noResults: 'Няма намерени резултати',
  },
  hr: {
    title: 'Stranica nije pronađena',
    subtitle: 'Stranica koju tražite ne postoji ili je premještena.',
    searchPlaceholder: 'Pretraži yojob.fr...',
    quickLinks: 'Brzi pristup',
    backHome: 'Natrag na početnu',
    noResults: 'Nema pronađenih rezultata',
  },
  sl: {
    title: 'Stran ni najdena',
    subtitle: 'Stran, ki jo iščete, ne obstaja ali je bila premaknjena.',
    searchPlaceholder: 'Iskanje po yojob.fr...',
    quickLinks: 'Hitri dostop',
    backHome: 'Nazaj na domačo stran',
    noResults: 'Ni najdenih rezultatov',
  },
  et: {
    title: 'Lehte ei leitud',
    subtitle: 'Otsitavat lehte ei eksisteeri või see on teisaldatud.',
    searchPlaceholder: 'Otsi yojob.fr...',
    quickLinks: 'Kiirpääs',
    backHome: 'Tagasi avalehele',
    noResults: 'Tulemusi ei leitud',
  },
  lv: {
    title: 'Lapa nav atrasta',
    subtitle: 'Meklētā lapa nepastāv vai ir pārvietota.',
    searchPlaceholder: 'Meklēt yojob.fr...',
    quickLinks: 'Ātrā piekļuve',
    backHome: 'Atpakaļ uz sākumlapu',
    noResults: 'Rezultāti nav atrasti',
  },
  lt: {
    title: 'Puslapis nerastas',
    subtitle: 'Puslapis, kurio ieškote, neegzistuoja arba buvo perkeltas.',
    searchPlaceholder: 'Ieškoti yojob.fr...',
    quickLinks: 'Greita prieiga',
    backHome: 'Grįžti į pradžią',
    noResults: 'Rezultatų nerasta',
  },
  el: {
    title: 'Η σελίδα δεν βρέθηκε',
    subtitle: 'Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί.',
    searchPlaceholder: 'Αναζήτηση στο yojob.fr...',
    quickLinks: 'Γρήγορη πρόσβαση',
    backHome: 'Επιστροφή στην αρχική',
    noResults: 'Δεν βρέθηκαν αποτελέσματα',
  },
  sv: {
    title: 'Sidan hittades inte',
    subtitle: 'Sidan du letar efter finns inte eller har flyttats.',
    searchPlaceholder: 'Sök på yojob.fr...',
    quickLinks: 'Snabblänkar',
    backHome: 'Tillbaka till startsidan',
    noResults: 'Inga resultat hittades',
  },
  da: {
    title: 'Siden blev ikke fundet',
    subtitle: 'Den side, du leder efter, findes ikke eller er blevet flyttet.',
    searchPlaceholder: 'Søg på yojob.fr...',
    quickLinks: 'Hurtig adgang',
    backHome: 'Tilbage til forsiden',
    noResults: 'Ingen resultater fundet',
  },
  fi: {
    title: 'Sivua ei löytynyt',
    subtitle: 'Etsimääsi sivua ei ole olemassa tai se on siirretty.',
    searchPlaceholder: 'Hae yojob.fr...',
    quickLinks: 'Pikapääsy',
    backHome: 'Takaisin etusivulle',
    noResults: 'Tuloksia ei löytynyt',
  },
  no: {
    title: 'Siden ble ikke funnet',
    subtitle: 'Siden du leter etter finnes ikke eller har blitt flyttet.',
    searchPlaceholder: 'Søk på yojob.fr...',
    quickLinks: 'Hurtigtilgang',
    backHome: 'Tilbake til forsiden',
    noResults: 'Ingen resultater funnet',
  },
};

// ============================================================================
// Pages navigables avec icones et labels multilingues
// ============================================================================
interface NavPage {
  path: string;
  icon: typeof Home;
  labels: Record<string, string>;
  keywords: string[];
}

const NAV_PAGES: NavPage[] = [
  {
    path: '/',
    icon: Home,
    labels: { fr: 'Accueil', en: 'Home', de: 'Startseite', es: 'Inicio', it: 'Home', nl: 'Home', pt: 'Início', pl: 'Strona główna', cs: 'Domů', sk: 'Domov', hu: 'Főoldal', ro: 'Acasă', bg: 'Начало', hr: 'Početna', sl: 'Domov', et: 'Avaleht', lv: 'Sākums', lt: 'Pradžia', el: 'Αρχική', sv: 'Hem', da: 'Hjem', fi: 'Etusivu', no: 'Hjem' },
    keywords: ['accueil', 'home', 'startseite', 'inicio', 'yojob'],
  },
  {
    path: '/a-propos',
    icon: Users,
    labels: { fr: 'À propos', en: 'About us', de: 'Über uns', es: 'Sobre nosotros', it: 'Chi siamo', nl: 'Over ons', pt: 'Sobre nós', pl: 'O nas', cs: 'O nás', sk: 'O nás', hu: 'Rólunk', ro: 'Despre noi', bg: 'За нас', hr: 'O nama', sl: 'O nas', et: 'Meist', lv: 'Par mums', lt: 'Apie mus', el: 'Σχετικά', sv: 'Om oss', da: 'Om os', fi: 'Meistä', no: 'Om oss' },
    keywords: ['propos', 'about', 'über', 'equipe', 'team'],
  },
  {
    path: '/services/interim-europeen',
    icon: Briefcase,
    labels: { fr: 'Intérim européen', en: 'European temporary work', de: 'Europäische Zeitarbeit', es: 'Trabajo temporal europeo', it: 'Lavoro interinale europeo', nl: 'Europees uitzendwerk', pt: 'Trabalho temporário europeu', pl: 'Europejska praca tymczasowa', cs: 'Evropská agenturní práce', sk: 'Európska dočasná práca', hu: 'Európai munkaerő-kölcsönzés', ro: 'Muncă temporară europeană', bg: 'Европейска временна заетост', hr: 'Europski privremeni rad', sl: 'Evropsko začasno delo', et: 'Euroopa ajutöö', lv: 'Eiropas pagaidu darbs', lt: 'Europos laikinas darbas', el: 'Ευρωπαϊκή προσωρινή εργασία', sv: 'Europeiskt bemanningsarbete', da: 'Europæisk vikararbejde', fi: 'Eurooppalainen vuokratyö', no: 'Europeisk vikararbeid' },
    keywords: ['interim', 'temporary', 'zeitarbeit', 'uitzend', 'travail temporaire'],
  },
  {
    path: '/services/recrutement-specialise',
    icon: Users,
    labels: { fr: 'Recrutement spécialisé', en: 'Specialized recruitment', de: 'Spezialisierte Rekrutierung', es: 'Reclutamiento especializado', it: 'Reclutamento specializzato', nl: 'Gespecialiseerde werving', pt: 'Recrutamento especializado', pl: 'Rekrutacja specjalistyczna', cs: 'Specializovaný nábor', sk: 'Špecializovaný nábor', hu: 'Szakosodott toborzás', ro: 'Recrutare specializată', bg: 'Специализиран подбор', hr: 'Specijalizirano zapošljavanje', sl: 'Specializirano zaposlovanje', et: 'Spetsialiseeritud värbamine', lv: 'Specializēta atlase', lt: 'Specializuotas įdarbinimas', el: 'Εξειδικευμένη πρόσληψη', sv: 'Specialiserad rekrytering', da: 'Specialiseret rekruttering', fi: 'Erikoistunut rekrytointi', no: 'Spesialisert rekruttering' },
    keywords: ['recrutement', 'recruitment', 'rekrutierung', 'embauche', 'hiring'],
  },
  {
    path: '/services/conseil-conformite',
    icon: FileText,
    labels: { fr: 'Conseil & conformité', en: 'Consulting & compliance', de: 'Beratung & Compliance', es: 'Consultoría y cumplimiento', it: 'Consulenza e conformità', nl: 'Advies & compliance', pt: 'Consultoria e conformidade', pl: 'Doradztwo i zgodność', cs: 'Poradenství a soulad', sk: 'Poradenstvo a súlad', hu: 'Tanácsadás és megfelelőség', ro: 'Consultanță și conformitate', bg: 'Консултиране и съответствие', hr: 'Savjetovanje i usklađenost', sl: 'Svetovanje in skladnost', et: 'Nõustamine ja vastavus', lv: 'Konsultācijas un atbilstība', lt: 'Konsultavimas ir atitiktis', el: 'Συμβουλευτική και συμμόρφωση', sv: 'Rådgivning och efterlevnad', da: 'Rådgivning og compliance', fi: 'Konsultointi ja vaatimustenmukaisuus', no: 'Rådgivning og compliance' },
    keywords: ['conseil', 'consulting', 'compliance', 'conformite', 'beratung'],
  },
  {
    path: '/services/detachement-personnel',
    icon: MapPin,
    labels: { fr: 'Détachement de personnel', en: 'Staff secondment', de: 'Personalentsendung', es: 'Destacamento de personal', it: 'Distacco del personale', nl: 'Detachering', pt: 'Destacamento de pessoal', pl: 'Delegowanie pracowników', cs: 'Vyslání zaměstnanců', sk: 'Vysielanie zamestnancov', hu: 'Munkavállalók kiküldése', ro: 'Detașarea personalului', bg: 'Командироване на персонал', hr: 'Upućivanje radnika', sl: 'Napotitev delavcev', et: 'Töötajate lähetamine', lv: 'Darbinieku norīkošana', lt: 'Darbuotojų komandiravimas', el: 'Απόσπαση προσωπικού', sv: 'Personalutstationering', da: 'Udstationering af personale', fi: 'Henkilöstön lähettäminen', no: 'Utsending av personell' },
    keywords: ['detachement', 'secondment', 'entsendung', 'detachering', 'posting'],
  },
  {
    path: '/devis',
    icon: MessageSquare,
    labels: { fr: 'Demander un devis', en: 'Request a quote', de: 'Angebot anfordern', es: 'Solicitar presupuesto', it: 'Richiedi un preventivo', nl: 'Offerte aanvragen', pt: 'Pedir orçamento', pl: 'Zapytaj o wycenę', cs: 'Požádat o nabídku', sk: 'Požiadať o ponuku', hu: 'Árajánlat kérése', ro: 'Solicită o ofertă', bg: 'Поискайте оферта', hr: 'Zatražite ponudu', sl: 'Zaprosite ponudbo', et: 'Küsi pakkumist', lv: 'Pieprasīt piedāvājumu', lt: 'Prašyti pasiūlymo', el: 'Ζητήστε προσφορά', sv: 'Begär offert', da: 'Anmod om tilbud', fi: 'Pyydä tarjous', no: 'Be om tilbud' },
    keywords: ['devis', 'quote', 'angebot', 'offerte', 'contact', 'prix'],
  },
  {
    path: '/notre-reseau',
    icon: MapPin,
    labels: { fr: 'Notre réseau', en: 'Our network', de: 'Unser Netzwerk', es: 'Nuestra red', it: 'La nostra rete', nl: 'Ons netwerk', pt: 'Nossa rede', pl: 'Nasza sieć', cs: 'Naše síť', sk: 'Naša sieť', hu: 'Hálózatunk', ro: 'Rețeaua noastră', bg: 'Нашата мрежа', hr: 'Naša mreža', sl: 'Naša mreža', et: 'Meie võrgustik', lv: 'Mūsu tīkls', lt: 'Mūsų tinklas', el: 'Το δίκτυό μας', sv: 'Vårt nätverk', da: 'Vores netværk', fi: 'Verkostomme', no: 'Vårt nettverk' },
    keywords: ['reseau', 'network', 'netzwerk', 'europe', 'pays', 'countries'],
  },
  {
    path: '/temoignages',
    icon: MessageSquare,
    labels: { fr: 'Témoignages', en: 'Testimonials', de: 'Referenzen', es: 'Testimonios', it: 'Testimonianze', nl: 'Getuigenissen', pt: 'Testemunhos', pl: 'Referencje', cs: 'Reference', sk: 'Referencie', hu: 'Referenciák', ro: 'Testimoniale', bg: 'Отзиви', hr: 'Svjedočanstva', sl: 'Pričevanja', et: 'Tagasiside', lv: 'Atsauksmes', lt: 'Atsiliepimai', el: 'Μαρτυρίες', sv: 'Omdömen', da: 'Udtalelser', fi: 'Suositukset', no: 'Anbefalinger' },
    keywords: ['temoignages', 'testimonials', 'referenzen', 'avis', 'reviews'],
  },
];

// ============================================================================
// Composant NotFound
// ============================================================================
export default function NotFound() {
  const { currentLanguage } = useLanguageManager();
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[currentLanguage] || translations.fr;

  // Filtrer les pages selon la recherche
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return NAV_PAGES;
    const q = searchQuery.toLowerCase();
    return NAV_PAGES.filter(page => {
      const label = (page.labels[currentLanguage] || page.labels.fr).toLowerCase();
      const matchLabel = label.includes(q);
      const matchKeyword = page.keywords.some(kw => kw.includes(q));
      const matchPath = page.path.toLowerCase().includes(q);
      return matchLabel || matchKeyword || matchPath;
    });
  }, [searchQuery, currentLanguage]);

  const homePath = buildLocalizedPath('/', currentLanguage);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)',
      }} />

      {/* Header minimal */}
      <header className="relative z-10 py-6 px-4">
        <div className="container mx-auto flex justify-center">
          <a href={homePath}>
            <LogoSvg className="w-20 h-20" aria-label="YOJOB" />
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl text-center">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1
              className="text-[120px] sm:text-[160px] font-extrabold leading-none select-none"
              style={{
                background: 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 50%, #F97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t.title}
            </h2>
            <p className="text-white/60 text-base sm:text-lg mb-8 max-w-md mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-10"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/60 focus:bg-white/15 transition-all text-base backdrop-blur-sm"
                autoFocus
              />
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
              {t.quickLinks}
            </h3>

            {filteredPages.length === 0 ? (
              <p className="text-white/50 text-sm py-4">{t.noResults}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {filteredPages.map((page) => {
                  const Icon = page.icon;
                  const label = page.labels[currentLanguage] || page.labels.fr;
                  const localizedPath = buildLocalizedPath(page.path, currentLanguage);

                  return (
                    <motion.a
                      key={page.path}
                      href={localizedPath}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all group text-left"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-white/80 group-hover:text-white text-sm flex-1">
                        {label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Back home button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-10"
          >
            <a
              href={homePath}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium hover:from-cyan-400 hover:to-violet-500 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Home className="w-4 h-4" />
              {t.backHome}
            </a>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer language={currentLanguage} />
    </div>
  );
}