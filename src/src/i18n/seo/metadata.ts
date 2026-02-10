/**
 * 🎯 MÉTADONNÉES SEO MULTILINGUES YOJOB
 * 
 * Titles, meta-descriptions et schémas structurés
 * pour toutes les pages du site en 22 langues
 * 
 * @version 2.0.0
 * @created 2025-01-05
 */

import type { DevisLanguage } from '../devis/types';

// ============================================================================
// TYPES
// ============================================================================

export interface PageMetadata {
  title: string;           // Max 60 caractères
  description: string;     // Max 160 caractères
  h1: string;             // Titre principal visible
  keywords?: string[];    // Mots-clés optionnels
}

export type PageKey =
  | 'home'
  | 'devis-form'
  | 'a-propos'
  | 'notre-reseau'
  | 'nos-secteurs'
  | 'temoignages'
  | 'interim-europeen'
  | 'recrutement-specialise'
  | 'conseil-conformite'
  | 'detachement-personnel'
  | 'privacy'
  | 'legal'
  | 'cgv'
  // Pages planifiées (routes à créer - Sprint 3)
  | 'detachement-btp'
  | 'detachement-industrie'
  | 'blog-directive'
  // Deprecated: metadata exists mais sans route planifiée
  | 'methode-a-propos'
  | 'contact-devis';

// ============================================================================
// MÉTADONNÉES PAR PAGE ET PAR LANGUE
// ============================================================================

export const SEO_METADATA: Record<PageKey, Record<DevisLanguage, PageMetadata>> = {
  
  // --------------------------------------------------------------------------
  // HOME
  // --------------------------------------------------------------------------
  'home': {
    'fr': {
      title: 'Détachement Personnel Européen BTP Industrie Portugal | YOJOB',
      description: 'Détachement travailleurs européens BTP (gros œuvre, second œuvre) et industrie depuis Portugal, Roumanie, Pologne. Gestion administrative complète. Devis YOJOB.',
      h1: 'Leader du Détachement de Personnel Européen pour le BTP et l\'Industrie',
      keywords: ['détachement personnel européen', 'intérim Portugal', 'travailleurs détachés BTP', 'main-d\'œuvre Roumanie']
    },
    'en': {
      title: 'European Worker Posting Construction Industry Portugal | YOJOB',
      description: 'Posting of European workers for construction (structural work, finishing) and industry from Portugal, Romania, Poland. Full administrative management. YOJOB quote.',
      h1: 'Leader in European Worker Posting for Construction and Industry',
      keywords: ['European worker posting', 'temporary work Portugal', 'posted workers construction', 'Romanian workforce']
    },
    'es': {
      title: 'Destacamento Personal Europeo Construcción Industria Portugal | YOJOB',
      description: 'Destacamento trabajadores europeos construcción (obra gruesa, acabados) e industria desde Portugal, Rumanía, Polonia. Gestión administrativa completa. Presupuesto YOJOB.',
      h1: 'Líder en Destacamento de Personal Europeo para Construcción e Industria'
    },
    'pt': {
      title: 'Destacamento Pessoal Europeu Construção Indústria Portugal | YOJOB',
      description: 'Destacamento trabalhadores europeus construção (obra grossa, acabamentos) e indústria de Portugal, Roménia, Polónia. Gestão administrativa completa. Orçamento YOJOB.',
      h1: 'Líder em Destacamento de Pessoal Europeu para Construção e Indústria'
    },
    'de': {
      title: 'Entsendung Europäisches Personal Bau Industrie Portugal | YOJOB',
      description: 'Entsendung europäischer Arbeitnehmer Bau (Rohbau, Ausbau) und Industrie aus Portugal, Rumänien, Polen. Vollständige Verwaltung. YOJOB Angebot.',
      h1: 'Marktführer bei der Entsendung europäischer Fachkräfte für Bau und Industrie'
    },
    'it': {
      title: 'Distacco Personale Europeo Edilizia Industria Portogallo | YOJOB',
      description: 'Distacco lavoratori europei edilizia (opera grezza, finiture) e industria da Portogallo, Romania, Polonia. Gestione amministrativa completa. Preventivo YOJOB.',
      h1: 'Leader nel Distacco di Personale Europeo per Edilizia e Industria'
    },
    'nl': {
      title: 'Detachering Europees Personeel Bouw Industrie Portugal | YOJOB',
      description: 'Detachering Europese werknemers bouw (ruwbouw, afwerking) en industrie vanuit Portugal, Roemenië, Polen. Volledige administratieve afhandeling. YOJOB offerte.',
      h1: 'Leider in Detachering van Europees Personeel voor Bouw en Industrie'
    },
    'pl': {
      title: 'Delegowanie Pracowników Europejskich Budowa Przemysł Portugalia | YOJOB',
      description: 'Delegowanie pracowników europejskich budowa (stan surowy, wykończenia) i przemysł z Portugalii, Rumunii, Polski. Pełna obsługa administracyjna. Wycena YOJOB.',
      h1: 'Lider w Delegowaniu Pracowników Europejskich do Budownictwa i Przemysłu'
    },
    'ro': {
      title: 'Detașare Personal European Construcții Industrie Portugalia | YOJOB',
      description: 'Detașare lucrători europeni construcții (lucrări structurale, finisaje) și industrie din Portugalia, România, Polonia. Gestionare administrativă completă. Ofertă YOJOB.',
      h1: 'Lider în Detașarea de Personal European pentru Construcții și Industrie'
    },
    'cs': {
      title: 'Vyslání Evropských Pracovníků Stavebnictví Průmysl Portugalsko | YOJOB',
      description: 'Vyslání evropských pracovníků stavebnictví (hrubá stavba, dokončovací práce) a průmysl z Portugalska, Rumunska, Polska. Kompletní administrativa. Nabídka YOJOB.',
      h1: 'Vedoucí v Vysílání Evropských Pracovníků do Stavebnictví a Průmyslu'
    },
    'sk': {
      title: 'Vyslanie Európskych Pracovníkov Stavebníctvo Priemysel Portugalsko | YOJOB',
      description: 'Vyslanie európskych pracovníkov stavebníctvo (hrubá stavba, dokončovacie práce) a priemysel z Portugalska, Rumunska, Poľska. Kompletná administrativa. Ponuka YOJOB.',
      h1: 'Líder vo Vysielaní Európskych Pracovníkov do Stavebníctva a Priemyslu'
    },
    'hu': {
      title: 'Európai Munkavállalók Kiküldetése Építőipar Ipar Portugália | YOJOB',
      description: 'Európai munkavállalók kiküldetése építőipar (szerkezetépítés, befejező) és ipar Portugáliából, Romániából, Lengyelországból. Teljes adminisztráció. YOJOB ajánlat.',
      h1: 'Vezető az Európai Munkavállalók Kiküldetésében az Építőipar és Ipar Számára'
    },
    'bg': {
      title: 'Командироване Европейски Работници Строителство Индустрия Португалия | YOJOB',
      description: 'Командироване на европейски работници строителство (груб строеж, довършителни) и индустрия от Португалия, Румъния, Полша. Пълна администрация. Оферта YOJOB.',
      h1: 'Лидер в Командироването на Европейски Работници за Строителство и Индустрия'
    },
    'el': {
      title: 'Απόσπαση Ευρωπαίων Εργαζομένων Κατασκευές Βιομηχανία Πορτογαλία | YOJOB',
      description: 'Απόσπαση ευρωπαίων εργαζομένων κατασκευές (ακατέργαστα, φινιρίσματα) και βιομηχανία από Πορτογαλία, Ρουμανία, Πολωνία. Πλήρης διαχείριση. Προσφορά YOJOB.',
      h1: 'Ηγέτης στην Απόσπαση Ευρωπαίων Εργαζομένων για Κατασκευές και Βιομηχανία'
    },
    'hr': {
      title: 'Upućivanje Europskih Radnika Gradnja Industrija Portugalija | YOJOB',
      description: 'Upućivanje europskih radnika gradnja (grubiizgradnja, završni radovi) i industrija iz Portugala, Rumunjske, Poljske. Potpuna administracija. Ponuda YOJOB.',
      h1: 'Vodeći u Upućivanju Europskih Radnika za Gradnju i Industriju'
    },
    'sl': {
      title: 'Napotitev Evropskih Delavcev Gradbeništvo Industrija Portugalska | YOJOB',
      description: 'Napotitev evropskih delavcev gradbeništvo (surova gradnja, zaključna dela) in industrija iz Portugalske, Romunije, Poljske. Popolna administracija. Ponudba YOJOB.',
      h1: 'Vodilni v Napotitvi Evropskih Delavcev za Gradbeništvo in Industrijo'
    },
    'lt': {
      title: 'Europos Darbuotojų Komandiravimas Statyba Pramonė Portugalija | YOJOB',
      description: 'Europos darbuotojų komandiravimas statyba (grubūs darbai, apdailos) ir pramonė iš Portugalijos, Rumunijos, Lenkijos. Pilna administracija. YOJOB pasiūlymas.',
      h1: 'Lyderiai Europos Darbuotojų Komandiravime Statybai ir Pramonei'
    },
    'lv': {
      title: 'Eiropas Darbinieku Komandēšana Būvniecība Rūpniecība Portugāle | YOJOB',
      description: 'Eiropas darbinieku komandēšana būvniecība (rupjie darbi, apdare) un rūpniecība no Portugāles, Rumānijas, Polijas. Pilna administrācija. YOJOB piedāvājums.',
      h1: 'Vadošie Eiropas Darbinieku Komandēšanā Būvniecībai un Rūpniecībai'
    },
    'et': {
      title: 'Euroopa Töötajate Lähetamine Ehitus Tööstus Portugal | YOJOB',
      description: 'Euroopa töötajate lähetamine ehitus (toorkonstruktsioon, viimistlus) ja tööstus Portugalist, Rumeeniast, Poolast. Täielik haldamine. YOJOB pakkumine.',
      h1: 'Juhtiv Euroopa Töötajate Lähetamisel Ehituses ja Tööstuses'
    },
    'sv': {
      title: 'Utstationering Europeiska Arbetstagare Bygg Industri Portugal | YOJOB',
      description: 'Utstationering europeiska arbetstagare bygg (stomme, slutarbeten) och industri från Portugal, Rumänien, Polen. Fullständig administration. YOJOB offert.',
      h1: 'Ledande inom Utstationering av Europeiska Arbetstagare för Bygg och Industri'
    },
    'da': {
      title: 'Udstationering Europæiske Medarbejdere Byggeri Industri Portugal | YOJOB',
      description: 'Udstationering europæiske medarbejdere byggeri (rå byggeri, færdiggørelse) og industri fra Portugal, Rumænien, Polen. Fuldstændig administration. YOJOB tilbud.',
      h1: 'Førende inden for Udstationering af Europæiske Medarbejdere til Byggeri og Industri'
    },
    'fi': {
      title: 'Eurooppalaisten Työntekijöiden Lähettäminen Rakentaminen Teollisuus Portugali | YOJOB',
      description: 'Eurooppalaisten työntekijöiden lähettäminen rakentaminen (runkotyöt, viimeistely) ja teollisuus Portugalista, Romaniasta, Puolasta. Täysi hallinto. YOJOB tarjous.',
      h1: 'Johtava Eurooppalaisten Työntekijöiden Lähettämisessä Rakentamiseen ja Teollisuuteen'
    },
    'no': {
      title: 'Utsending Europeiske Arbeidstakere Bygg Industri Portugal | YOJOB',
      description: 'Utsending europeiske arbeidstakere bygg (rått bygg, sluttarbeid) og industri fra Portugal, Romania, Polen. Fullstendig administrasjon. YOJOB tilbud.',
      h1: 'Ledende innen Utsending av Europeiske Arbeidstakere til Bygg og Industri'
    }
  },

  // --------------------------------------------------------------------------
  // DÉTACHEMENT BTP
  // --------------------------------------------------------------------------
  'detachement-btp': {
    'fr': {
      title: 'Détachement Ouvriers Qualifiés BTP Europe Portugal Roumanie | YOJOB',
      description: 'Recrutement ouvriers qualifiés BTP (maçons, coffreurs, ferrilleurs, électriciens) depuis Portugal, Roumanie, Pologne. Conformité UE garantie. Mobilisation 15 jours.',
      h1: 'Détachement d\'Ouvriers Qualifiés BTP depuis l\'Europe de l\'Est'
    },
    'en': {
      title: 'Posting Skilled Construction Workers Europe Portugal Romania | YOJOB',
      description: 'Recruitment of skilled construction workers (masons, formwork, steel fixers, electricians) from Portugal, Romania, Poland. EU compliance guaranteed. 15-day mobilization.',
      h1: 'Posting of Skilled Construction Workers from Eastern Europe'
    },
    'es': {
      title: 'Destacamento Trabajadores Cualificados Construcción Europa Portugal Rumanía | YOJOB',
      description: 'Reclutamiento trabajadores cualificados construcción (albañiles, encofradores, ferrallistas, electricistas) desde Portugal, Rumanía, Polonia. Conformidad UE garantizada.',
      h1: 'Destacamento de Trabajadores Cualificados de Construcción desde Europa del Este'
    },
    'pt': {
      title: 'Destacamento Trabalhadores Qualificados Construção Europa Portugal Roménia | YOJOB',
      description: 'Recrutamento trabalhadores qualificados construção (pedreiros, carpinteiros, ferreiros, eletricistas) de Portugal, Roménia, Polónia. Conformidade UE garantida.',
      h1: 'Destacamento de Trabalhadores Qualificados de Construção da Europa de Leste'
    },
    'de': {
      title: 'Entsendung Qualifizierte Bauarbeiter Europa Portugal Rumänien | YOJOB',
      description: 'Rekrutierung qualifizierter Bauarbeiter (Maurer, Schalungsbauer, Eisenbieger, Elektriker) aus Portugal, Rumänien, Polen. EU-Konformität garantiert.',
      h1: 'Entsendung Qualifizierter Bauarbeiter aus Osteuropa'
    },
    'it': {
      title: 'Distacco Operai Qualificati Edilizia Europa Portogallo Romania | YOJOB',
      description: 'Reclutamento operai qualificati edilizia (muratori, carpentieri, ferraioli, elettricisti) da Portogallo, Romania, Polonia. Conformità UE garantita.',
      h1: 'Distacco di Operai Qualificati Edilizia dall\'Europa dell\'Est'
    },
    'nl': {
      title: 'Detachering Gekwalificeerde Bouwvakkers Europa Portugal Roemenië | YOJOB',
      description: 'Werving gekwalificeerde bouwvakkers (metselaars, bekisters, ijzervlechters, elektriciens) uit Portugal, Roemenië, Polen. EU-conformiteit gegarandeerd.',
      h1: 'Detachering van Gekwalificeerde Bouwvakkers uit Oost-Europa'
    },
    'pl': {
      title: 'Delegowanie Wykwalifikowanych Pracowników Budowlanych Europa Portugalia Rumunia | YOJOB',
      description: 'Rekrutacja wykwalifikowanych pracowników budowlanych (murarzy, szalunkarzy, zbrojarzy, elektryków) z Portugalii, Rumunii, Polski. Zgodność UE gwarantowana.',
      h1: 'Delegowanie Wykwalifikowanych Pracowników Budowlanych z Europy Wschodniej'
    },
    'ro': {
      title: 'Detașare Muncitori Calificați Construcții Europa Portugalia România | YOJOB',
      description: 'Recrutare muncitori calificați construcții (zidari, dulgheri, fierari, electricieni) din Portugalia, România, Polonia. Conformitate UE garantată.',
      h1: 'Detașare de Muncitori Calificați Construcții din Europa de Est'
    },
    'cs': {
      title: 'Vyslání Kvalifikovaných Stavebních Dělníků Evropa Portugalsko Rumunsko | YOJOB',
      description: 'Nábor kvalifikovaných stavebních dělníků (zedníků, bednářů, železářů, elektrikářů) z Portugalska, Rumunska, Polska. Shoda s EU zaručena.',
      h1: 'Vyslání Kvalifikovaných Stavebních Dělníků z Východní Evropy'
    },
    'sk': {
      title: 'Vyslanie Kvalifikovaných Stavebných Robotníkov Európa Portugalsko Rumunsko | YOJOB',
      description: 'Nábor kvalifikovaných stavebných robotníkov (murárov, tesárov, železiarov, elektrikárov) z Portugalska, Rumunska, Poľska. Zhoda s EÚ zaručená.',
      h1: 'Vyslanie Kvalifikovaných Stavebných Robotníkov z Východnej Európy'
    },
    'hu': {
      title: 'Képzett Építőmunkások Kiküldetése Európa Portugália Románia | YOJOB',
      description: 'Képzett építőmunkások (kőművesek, zsaluzók, vasbetonszerelők, villanyszerelők) toborzása Portugáliából, Romániából, Lengyelországból. EU megfelelőség garantált.',
      h1: 'Képzett Építőmunkások Kiküldetése Kelet-Európából'
    },
    'bg': {
      title: 'Командироване Квалифицирани Строителни Работници Европа Португалия Румъния | YOJOB',
      description: 'Набиране квалифицирани строителни работници (зидари, дърводелци, арматорни, електротехници) от Португалия, Румъния, Полша. ЕС съответствие гарантирано.',
      h1: 'Командироване на Квалифицирани Строителни Работници от Източна Европа'
    },
    'el': {
      title: 'Απόσπαση Ειδικευμένων Οικοδόμων Ευρώπη Πορτογαλία Ρουμανία | YOJOB',
      description: 'Πρόσληψη ειδικευμένων οικοδόμων (τοιχοποιών, ξυλουργών, σιδηρουργών, ηλεκτρολόγων) από Πορτογαλία, Ρουμανία, Πολωνία. Συμμόρφωση ΕΕ εγγυημένη.',
      h1: 'Απόσπαση Ειδικευμένων Οικοδόμων από την Ανατολική Ευρώπη'
    },
    'hr': {
      title: 'Upućivanje Kvalificiranih Građevinskih Radnika Europa Portugal Rumunjska | YOJOB',
      description: 'Zapošljavanje kvalificiranih građevinskih radnika (zidara, tesara, armiračkih radnika, električara) iz Portugala, Rumunjske, Poljske. EU usklađenost zajamčena.',
      h1: 'Upućivanje Kvalificiranih Građevinskih Radnika iz Istočne Europe'
    },
    'sl': {
      title: 'Napotitev Usposobljenih Gradbenih Delavcev Evropa Portugalska Romunija | YOJOB',
      description: 'Zaposlovanje usposobljenih gradbenih delavcev (zidarjev, tesarjev, armircev, elektrikarjev) iz Portugalske, Romunije, Poljske. EU skladnost zagotovljena.',
      h1: 'Napotitev Usposobljenih Gradbenih Delavcev iz Vzhodne Evrope'
    },
    'lt': {
      title: 'Kvalifikuotų Statybos Darbininkų Komandiravimas Europa Portugalija Rumunija | YOJOB',
      description: 'Kvalifikuotų statybos darbininkų (mūrininkų, dailidžių, armuotojų, elektrikų) įdarbinimas iš Portugalijos, Rumunijos, Lenkijos. ES atitiktis užtikrinta.',
      h1: 'Kvalifikuotų Statybos Darbininkų Komandiravimas iš Rytų Europos'
    },
    'lv': {
      title: 'Kvalificētu Būvstrādnieku Komandēšana Eiropa Portugāle Rumānija | YOJOB',
      description: 'Kvalificētu būvstrādnieku (mūrnieku, namdaru, armētāju, elektriķu) pieņemšana darbā no Portugāles, Rumānijas, Polijas. ES atbilstība garantēta.',
      h1: 'Kvalificētu Būvstrādnieku Komandēšana no Austrumeiropas'
    },
    'et': {
      title: 'Kvalifitseeritud Ehitustöötajate Lähetamine Euroopa Portugal Rumeenia | YOJOB',
      description: 'Kvalifitseeritud ehitustöötajate (müürseppade, puusepadetöötajate, rauabetoonitöötajate, elektrikute) värbamine Portugalist, Rumeeniast, Poolast. EL vastavus tagatud.',
      h1: 'Kvalifitseeritud Ehitustöötajate Lähetamine Ida-Euroopast'
    },
    'sv': {
      title: 'Utstationering Kvalificerade Byggnadsarbetare Europa Portugal Rumänien | YOJOB',
      description: 'Rekrytering kvalificerade byggnadsarbetare (murare, snickare, armörare, elektriker) från Portugal, Rumänien, Polen. EU-efterlevnad garanterad.',
      h1: 'Utstationering av Kvalificerade Byggnadsarbetare från Östeuropa'
    },
    'da': {
      title: 'Udstationering Kvalificerede Bygningsarbejdere Europa Portugal Rumænien | YOJOB',
      description: 'Rekruttering kvalificerede bygningsarbejdere (murere, tømrere, armeringsarbejdere, elektrikere) fra Portugal, Rumænien, Polen. EU-overholdelse garanteret.',
      h1: 'Udstationering af Kvalificerede Bygningsarbejdere fra Østeuropa'
    },
    'fi': {
      title: 'Pätevien Rakennustyöntekijöiden Lähettäminen Eurooppa Portugali Romania | YOJOB',
      description: 'Pätevien rakennustyöntekijöiden (muurareiden, kirvesmiesten, raudoittajien, sähköasentajien) rekrytointi Portugalista, Romaniasta, Puolasta. EU-vaatimustenmukaisuus taattu.',
      h1: 'Pätevien Rakennustyöntekijöiden Lähettäminen Itä-Euroopasta'
    },
    'no': {
      title: 'Utsending Kvalifiserte Bygningsarbeidere Europa Portugal Romania | YOJOB',
      description: 'Rekruttering kvalifiserte bygningsarbeidere (murere, tømrere, armeringsarbeidere, elektrikere) fra Portugal, Romania, Polen. EU-samsvar garantert.',
      h1: 'Utsending av Kvalifiserte Bygningsarbeidere fra Øst-Europa'
    }
  },

  // --------------------------------------------------------------------------
  // DÉTACHEMENT INDUSTRIE
  // --------------------------------------------------------------------------
  'detachement-industrie': {
    'fr': {
      title: 'Détachement Personnel Industrie Agroalimentaire Europe | YOJOB',
      description: 'Main-d\'œuvre européenne qualifiée industrie et agroalimentaire (opérateurs, techniciens, agents logistique). Détachement conforme Portugal, Roumanie. Devis gratuit.',
      h1: 'Détachement de Personnel Qualifié pour l\'Industrie et l\'Agroalimentaire'
    },
    'en': {
      title: 'Industrial Food Processing Worker Posting Europe | YOJOB',
      description: 'Qualified European industrial and food processing workforce (operators, technicians, logistics agents). Compliant posting from Portugal, Romania. Free quote.',
      h1: 'Posting of Qualified Personnel for Industry and Food Processing'
    },
    'es': {
      title: 'Destacamento Personal Industria Agroalimentaria Europa | YOJOB',
      description: 'Mano de obra europea cualificada industria y agroalimentaria (operarios, técnicos, agentes logística). Destacamento conforme Portugal, Rumanía. Presupuesto gratuito.',
      h1: 'Destacamento de Personal Cualificado para Industria y Agroalimentaria'
    },
    'pt': {
      title: 'Destacamento Pessoal Indústria Agroalimentar Europa | YOJOB',
      description: 'Mão-de-obra europeia qualificada indústria e agroalimentar (operadores, técnicos, agentes logística). Destacamento conforme Portugal, Roménia. Orçamento gratuito.',
      h1: 'Destacamento de Pessoal Qualificado para Indústria e Agroalimentar'
    },
    'de': {
      title: 'Entsendung Personal Industrie Lebensmittel Europa | YOJOB',
      description: 'Qualifizierte europäische Arbeitskräfte Industrie und Lebensmittel (Bediener, Techniker, Logistikagenten). Konforme Entsendung Portugal, Rumänien. Kostenloses Angebot.',
      h1: 'Entsendung von Qualifiziertem Personal für Industrie und Lebensmittel'
    },
    'it': {
      title: 'Distacco Personale Industria Agroalimentare Europa | YOJOB',
      description: 'Manodopera europea qualificata industria e agroalimentare (operatori, tecnici, agenti logistica). Distacco conforme Portogallo, Romania. Preventivo gratuito.',
      h1: 'Distacco di Personale Qualificato per Industria e Agroalimentare'
    },
    'nl': {
      title: 'Detachering Personeel Industrie Voedingsmiddelen Europa | YOJOB',
      description: 'Gekwalificeerde Europese arbeidskrachten industrie en voedingsmiddelen (operators, technici, logistiek medewerkers). Conforme detachering Portugal, Roemenië. Gratis offerte.',
      h1: 'Detachering van Gekwalificeerd Personeel voor Industrie en Voedingsmiddelen'
    },
    'pl': {
      title: 'Delegowanie Pracowników Przemysł Spożywczy Europa | YOJOB',
      description: 'Wykwalifikowana europejska siła robocza przemysł i spożywczy (operatorzy, technicy, agenci logistyczni). Zgodne delegowanie Portugalia, Rumunia. Darmowa wycena.',
      h1: 'Delegowanie Wykwalifikowanego Personelu dla Przemysłu i Spożywczego'
    },
    'ro': {
      title: 'Detașare Personal Industrie Agroalimentar Europa | YOJOB',
      description: 'Forță de muncă europeană calificată industrie și agroalimentar (operatori, tehnicieni, agenți logistici). Detașare conformă Portugalia, România. Ofertă gratuită.',
      h1: 'Detașare de Personal Calificat pentru Industrie și Agroalimentar'
    },
    'cs': {
      title: 'Vyslání Pracovníků Průmysl Potravinářství Evropa | YOJOB',
      description: 'Kvalifikovaná evropská pracovní síla průmysl a potravinářství (operátoři, technici, logističtí agenti). Vyslání v souladu Portugalsko, Rumunsko. Bezplatná nabídka.',
      h1: 'Vyslání Kvalifikovaného Personálu pro Průmysl a Potravinářství'
    },
    'sk': {
      title: 'Vyslanie Pracovníkov Priemysel Potravinárstvo Európa | YOJOB',
      description: 'Kvalifikovaná európska pracovná sila priemysel a potravinárstvo (operátori, technici, logistickí agenti). Vyslanie v súlade Portugalsko, Rumunsko. Bezplatná ponuka.',
      h1: 'Vyslanie Kvalifikovaného Personálu pre Priemysel a Potravinárstvo'
    },
    'hu': {
      title: 'Ipari Élelmiszeripari Munkavállalók Kiküldetése Európa | YOJOB',
      description: 'Képzett európai ipari és élelmiszeripari munkaerő (operátorok, technikusok, logisztikai ügynökök). Megfelelő kiküldetés Portugália, Románia. Ingyenes ajánlat.',
      h1: 'Képzett Személyzet Kiküldetése az Ipar és Élelmiszeripar Számára'
    },
    'bg': {
      title: 'Командироване Персонал Индустрия Хранително-вкусова Европа | YOJOB',
      description: 'Квалифицирана европейска работна сила индустрия и хранително-вкусова (оператори, техници, логистични агенти). Съответстващо командироване Португалия, Румъния. Безплатна оферта.',
      h1: 'Командироване на Квалифициран Персонал за Индустрия и Хранително-вкусова Промишленост'
    },
    'el': {
      title: 'Απόσπαση Προσωπικού Βιομηχανία Τροφίμων Ευρώπη | YOJOB',
      description: 'Ειδικευμένο ευρωπαϊκό εργατικό δυναμικό βιομηχανία και τρόφιμα (χειριστές, τεχνικοί, πράκτορες logistics). Συμμορφούμενη απόσπαση Πορτογαλία, Ρουμανία. Δωρεάν προσφορά.',
      h1: 'Απόσπαση Ειδικευμένου Προσωπικού για Βιομηχανία και Τρόφιμα'
    },
    'hr': {
      title: 'Upućivanje Osoblja Industrija Prehrambena Europa | YOJOB',
      description: 'Kvalificirana europska radna snaga industrija i prehrambena (operateri, tehničari, logistički agenti). Usklađeno upućivanje Portugal, Rumunjska. Besplatna ponuda.',
      h1: 'Upućivanje Kvalificiranog Osoblja za Industriju i Prehrambenu Industriju'
    },
    'sl': {
      title: 'Napotitev Osebja Industrija Živilska Evropa | YOJOB',
      description: 'Usposobljena evropska delovna sila industrija in živilska (operaterji, tehniki, logistični agenti). Skladna napotitev Portugalska, Romunija. Brezplačna ponudba.',
      h1: 'Napotitev Usposobljenega Osebja za Industrijo in Živilsko Industrijo'
    },
    'lt': {
      title: 'Pramonės Maisto Darbuotojų Komandiravimas Europa | YOJOB',
      description: 'Kvalifikuota europiečių darbo jėga pramonė ir maistas (operatoriai, technikai, logistikos agentai). Atitinkantis komandiravimas Portugalija, Rumunija. Nemokamas pasiūlymas.',
      h1: 'Kvalifikuotų Darbuotojų Komandiravimas Pramonei ir Maisto Pramonei'
    },
    'lv': {
      title: 'Rūpniecības Pārtikas Darbinieku Komandēšana Eiropa | YOJOB',
      description: 'Kvalificēta Eiropas darba spēks rūpniecība un pārtika (operatori, tehniķi, loģistikas aģenti). Atbilstoša komandēšana Portugāle, Rumānija. Bezmaksas piedāvājums.',
      h1: 'Kvalificētu Darbinieku Komandēšana Rūpniecībai un Pārtikas Rūpniecībai'
    },
    'et': {
      title: 'Tööstuse Toiduainete Töötajate Lähetamine Euroopa | YOJOB',
      description: 'Kvalifitseeritud Euroopa tööjõud tööstus ja toiduained (operaatorid, tehnikud, logistika agendid). Vastavalt lähetamine Portugal, Rumeenia. Tasuta pakkumine.',
      h1: 'Kvalifitseeritud Töötajate Lähetamine Tööstusele ja Toiduainetööstusele'
    },
    'sv': {
      title: 'Utstationering Personal Industri Livsmedel Europa | YOJOB',
      description: 'Kvalificerad europeisk arbetskraft industri och livsmedel (operatörer, tekniker, logistikagenter). Efterlevande utstationering Portugal, Rumänien. Gratis offert.',
      h1: 'Utstationering av Kvalificerad Personal för Industri och Livsmedel'
    },
    'da': {
      title: 'Udstationering Personale Industri Fødevarer Europa | YOJOB',
      description: 'Kvalificeret europæisk arbejdskraft industri og fødevarer (operatører, teknikere, logistikagenter). Overholdende udstationering Portugal, Rumænien. Gratis tilbud.',
      h1: 'Udstationering af Kvalificeret Personale til Industri og Fødevarer'
    },
    'fi': {
      title: 'Teollisuuden Elintarvikkeiden Työntekijöiden Lähettäminen Eurooppa | YOJOB',
      description: 'Pätevä eurooppalainen työvoima teollisuus ja elintarvikkeet (operaattorit, teknikot, logistiikka-agentit). Vaatimustenmukainen lähettäminen Portugali, Romania. Ilmainen tarjous.',
      h1: 'Pätevän Henkilöstön Lähettäminen Teollisuudelle ja Elintarviketeollisuudelle'
    },
    'no': {
      title: 'Utsending Personell Industri Næringsmidler Europa | YOJOB',
      description: 'Kvalifisert europeisk arbeidskraft industri og næringsmidler (operatører, teknikere, logistikkagenter). Samsvarende utsending Portugal, Romania. Gratis tilbud.',
      h1: 'Utsending av Kvalifisert Personell til Industri og Næringsmidler'
    }
  },

  // --------------------------------------------------------------------------
  // MÉTHODE / À PROPOS
  // --------------------------------------------------------------------------
  'methode-a-propos': {
    'fr': {
      title: 'Courtier Intérim Européen BTP Industrie 27 Pays | YOJOB',
      description: 'YOJOB, courtier intérim européen : 500+ agences dans 27 pays, 10 ans d\'expertise détachement BTP et industrie. Découvrez notre méthode de recrutement européen.',
      h1: 'Notre Méthode de Recrutement Européen : 500+ Agences dans 27 Pays'
    },
    'en': {
      title: 'European Temporary Work Broker Construction Industry 27 Countries | YOJOB',
      description: 'YOJOB, European temporary work broker: 500+ agencies in 27 countries, 10 years expertise in construction and industry posting. Discover our European recruitment method.',
      h1: 'Our European Recruitment Method: 500+ Agencies in 27 Countries'
    },
    'es': {
      title: 'Agente Trabajo Temporal Europeo Construcción Industria 27 Países | YOJOB',
      description: 'YOJOB, agente trabajo temporal europeo: 500+ agencias en 27 países, 10 años experiencia destacamento construcción e industria. Descubra nuestro método de reclutamiento europeo.',
      h1: 'Nuestro Método de Reclutamiento Europeo: 500+ Agencias en 27 Países'
    },
    'pt': {
      title: 'Corretor Trabalho Temporário Europeu Construção Indústria 27 Países | YOJOB',
      description: 'YOJOB, corretor trabalho temporário europeu: 500+ agências em 27 países, 10 anos experiência destacamento construção e indústria. Descubra nosso método de recrutamento europeu.',
      h1: 'Nosso Método de Recrutamento Europeu: 500+ Agências em 27 Países'
    },
    'de': {
      title: 'Europäischer Zeitarbeitsmakler Bau Industrie 27 Länder | YOJOB',
      description: 'YOJOB, europäischer Zeitarbeitsmakler: 500+ Agenturen in 27 Ländern, 10 Jahre Erfahrung in Bau- und Industrieentsendung. Entdecken Sie unsere europäische Rekrutierungsmethode.',
      h1: 'Unsere Europäische Rekrutierungsmethode: 500+ Agenturen in 27 Ländern'
    },
    'it': {
      title: 'Broker Lavoro Temporaneo Europeo Edilizia Industria 27 Paesi | YOJOB',
      description: 'YOJOB, broker lavoro temporaneo europeo: 500+ agenzie in 27 paesi, 10 anni esperienza distacco edilizia e industria. Scopri il nostro metodo di reclutamento europeo.',
      h1: 'Il Nostro Metodo di Reclutamento Europeo: 500+ Agenzie in 27 Paesi'
    },
    'nl': {
      title: 'Europese Uitzendbureau Makelaar Bouw Industrie 27 Landen | YOJOB',
      description: 'YOJOB, Europese uitzendbureau makelaar: 500+ bureaus in 27 landen, 10 jaar ervaring in bouw- en industriedetachering. Ontdek onze Europese wervingsmethode.',
      h1: 'Onze Europese Wervingsmethode: 500+ Bureaus in 27 Landen'
    },
    'pl': {
      title: 'Europejski Broker Pracy Tymczasowej Budowa Przemysł 27 Krajów | YOJOB',
      description: 'YOJOB, europejski broker pracy tymczasowej: 500+ agencji w 27 krajach, 10 lat doświadczenia w delegowaniu budowy i przemysłu. Odkryj naszą europejską metodę rekrutacji.',
      h1: 'Nasza Europejska Metoda Rekrutacji: 500+ Agencji w 27 Krajach'
    },
    'ro': {
      title: 'Broker Muncă Temporară Europeană Construcții Industrie 27 Țări | YOJOB',
      description: 'YOJOB, broker muncă temporară europeană: 500+ agenții în 27 țări, 10 ani experiență detașare construcții și industrie. Descoperă metoda noastră de recrutare europeană.',
      h1: 'Metoda Noastră de Recrutare Europeană: 500+ Agenții în 27 Țări'
    },
    'cs': {
      title: 'Evropský Zprostředkovatel Dočasné Práce Stavebnictví Průmysl 27 Zemí | YOJOB',
      description: 'YOJOB, evropský zprostředkovatel dočasné práce: 500+ agentur ve 27 zemích, 10 let zkušeností s vysláním stavebnictví a průmyslu. Objevte naši evropskou metodu náboru.',
      h1: 'Naše Evropská Metoda Náboru: 500+ Agentur ve 27 Zemích'
    },
    'sk': {
      title: 'Európsky Sprostredkovateľ Dočasnej Práce Stavebníctvo Priemysel 27 Krajín | YOJOB',
      description: 'YOJOB, európsky sprostredkovateľ dočasnej práce: 500+ agentúr v 27 krajinách, 10 rokov skúseností s vyslaním stavebníctva a priemyslu. Objavte našu európsku metódu náboru.',
      h1: 'Naša Európska Metóda Náboru: 500+ Agentúr v 27 Krajinách'
    },
    'hu': {
      title: 'Európai Ideiglenes Munka Bróker Építőipar Ipar 27 Ország | YOJOB',
      description: 'YOJOB, európai ideiglenes munka bróker: 500+ ügynökség 27 országban, 10 év tapasztalat építőipari és ipari kiküldetésben. Fedezze fel európai toborzási módszerünket.',
      h1: 'Európai Toborzási Módszerünk: 500+ Ügynökség 27 Országban'
    },
    'bg': {
      title: 'Европейски Брокер Временна Работа Строителство Индустрия 27 Държави | YOJOB',
      description: 'YOJOB, европейски брокер временна работа: 500+ агенции в 27 държави, 10 години опит в командироване строителство и индустрия. Открийте нашия европейски метод на набиране.',
      h1: 'Нашият Европейски Метод на Набиране: 500+ Агенции в 27 Държави'
    },
    'el': {
      title: 'Ευρωπαίος Μεσίτης Προσωρινής Εργασίας Κατασκευές Βιομηχανία 27 Χώρες | YOJOB',
      description: 'YOJOB, ευρωπαίος μεσίτης προσωρινής εργασίας: 500+ πρακτορεία σε 27 χώρες, 10 χρόνια εμπειρίας σε απόσπαση κατασκευών και βιομηχανίας. Ανακαλύψτε την ευρωπαϊκή μας μέθοδο πρόσληψης.',
      h1: 'Η Ευρωπαϊκή Μας Μέθοδος Πρόσληψης: 500+ Πρακτορεία σε 27 Χώρες'
    },
    'hr': {
      title: 'Europski Posrednik Privremenog Rada Gradnja Industrija 27 Zemalja | YOJOB',
      description: 'YOJOB, europski posrednik privremenog rada: 500+ agencija u 27 zemalja, 10 godina iskustva u upućivanju gradnje i industrije. Otkrijte našu europsku metodu zapošljavanja.',
      h1: 'Naša Europska Metoda Zapošljavanja: 500+ Agencija u 27 Zemalja'
    },
    'sl': {
      title: 'Evropski Posrednik Začasnega Dela Gradbeništvo Industrija 27 Držav | YOJOB',
      description: 'YOJOB, evropski posrednik začasnega dela: 500+ agencij v 27 državah, 10 let izkušenj z napotitvijo gradbeništva in industrije. Odkrijte našo evropsko metodo zaposlovanja.',
      h1: 'Naša Evropska Metoda Zaposlovanja: 500+ Agencij v 27 Državah'
    },
    'lt': {
      title: 'Europos Laikino Darbo Brokeris Statyba Pramonė 27 Šalys | YOJOB',
      description: 'YOJOB, Europos laikino darbo brokeris: 500+ agentūros 27 šalyse, 10 metų patirtis statybos ir pramonės komandiravime. Atraskite mūsų europos įdarbinimo metodą.',
      h1: 'Mūsų Europos Įdarbinimo Metodas: 500+ Agentūros 27 Šalyse'
    },
    'lv': {
      title: 'Eiropas Īslaicīgā Darba Brokeris Būvniecība Rūpniecība 27 Valstis | YOJOB',
      description: 'YOJOB, Eiropas īslaicīgā darba brokeris: 500+ aģentūras 27 valstīs, 10 gadu pieredze būvniecības un rūpniecības komandēšanā. Atklājiet mūsu Eiropas pieņemšanas darbā metodi.',
      h1: 'Mūsu Eiropas Pieņemšanas Darbā Metode: 500+ Aģentūras 27 Valstīs'
    },
    'et': {
      title: 'Euroopa Ajutöö Maakler Ehitus Tööstus 27 Riiki | YOJOB',
      description: 'YOJOB, Euroopa ajutöö maakler: 500+ agentuuri 27 riigis, 10 aastat kogemust ehituse ja tööstuse lähetamises. Avastage meie Euroopa värbamismeetod.',
      h1: 'Meie Euroopa Värbamismeetod: 500+ Agentuuri 27 Riigis'
    },
    'sv': {
      title: 'Europeisk Temporärt Arbete Mäklare Bygg Industri 27 Länder | YOJOB',
      description: 'YOJOB, europeisk temporärt arbete mäklare: 500+ byråer i 27 länder, 10 års erfarenhet av bygg- och industriutstationering. Upptäck vår europeiska rekryteringsmetod.',
      h1: 'Vår Europeiska Rekryteringsmetod: 500+ Byråer i 27 Länder'
    },
    'da': {
      title: 'Europæisk Midlertidigt Arbejde Mægler Byggeri Industri 27 Lande | YOJOB',
      description: 'YOJOB, europæisk midlertidigt arbejde mægler: 500+ bureauer i 27 lande, 10 års erfaring med bygge- og industriudstationering. Opdag vores europæiske rekrutteringsmetode.',
      h1: 'Vores Europæiske Rekrutteringsmetode: 500+ Bureauer i 27 Lande'
    },
    'fi': {
      title: 'Eurooppalainen Väliaikainen Työ Välittäjä Rakentaminen Teollisuus 27 Maata | YOJOB',
      description: 'YOJOB, eurooppalainen väliaikainen työ välittäjä: 500+ toimistoa 27 maassa, 10 vuoden kokemus rakentamisen ja teollisuuden lähettämisestä. Tutustu eurooppalaiseen rekrytointimenetelmäämme.',
      h1: 'Eurooppalainen Rekrytointimenetelmämme: 500+ Toimistoa 27 Maassa'
    },
    'no': {
      title: 'Europeisk Midlertidig Arbeid Megler Bygg Industri 27 Land | YOJOB',
      description: 'YOJOB, europeisk midlertidig arbeid megler: 500+ byråer i 27 land, 10 års erfaring med bygg- og industriutsending. Oppdag vår europeiske rekrutteringsmetode.',
      h1: 'Vår Europeiske Rekrutteringsmetode: 500+ Byråer i 27 Land'
    }
  },

  // --------------------------------------------------------------------------
  // CONTACT / DEVIS
  // --------------------------------------------------------------------------
  'contact-devis': {
    'fr': {
      title: 'Devis Détachement Personnel Européen BTP Industrie | YOJOB',
      description: 'Besoin de travailleurs détachés Europe pour vos chantiers BTP ou sites industriels ? Devis personnalisé sous 24h. Expert intérim européen depuis 10 ans.',
      h1: 'Demandez Votre Devis Personnalisé pour le Détachement de Personnel Européen'
    },
    'en': {
      title: 'Quote European Worker Posting Construction Industry | YOJOB',
      description: 'Need European posted workers for your construction sites or industrial facilities? Personalized quote within 24h. European temporary work expert for 10 years.',
      h1: 'Request Your Personalized Quote for European Worker Posting'
    },
    'es': {
      title: 'Presupuesto Destacamento Personal Europeo Construcción Industria | YOJOB',
      description: '¿Necesita trabajadores destacados Europa para sus obras o instalaciones industriales? Presupuesto personalizado en 24h. Experto trabajo temporal europeo desde hace 10 años.',
      h1: 'Solicite Su Presupuesto Personalizado para Destacamento de Personal Europeo'
    },
    'pt': {
      title: 'Orçamento Destacamento Pessoal Europeu Construção Indústria | YOJOB',
      description: 'Precisa de trabalhadores destacados Europa para suas obras ou instalações industriais? Orçamento personalizado em 24h. Especialista trabalho temporário europeu há 10 anos.',
      h1: 'Solicite Seu Orçamento Personalizado para Destacamento de Pessoal Europeu'
    },
    'de': {
      title: 'Angebot Entsendung Europäisches Personal Bau Industrie | YOJOB',
      description: 'Benötigen Sie entsandte europäische Arbeitnehmer für Ihre Baustellen oder Industrieanlagen? Personalisiertes Angebot innerhalb 24 Std. Europäischer Zeitarbeitsexperte seit 10 Jahren.',
      h1: 'Fordern Sie Ihr Personalisiertes Angebot für die Entsendung Europäischen Personals An'
    },
    'it': {
      title: 'Preventivo Distacco Personale Europeo Edilizia Industria | YOJOB',
      description: 'Bisogno di lavoratori distaccati Europa per i vostri cantieri o impianti industriali? Preventivo personalizzato entro 24h. Esperto lavoro temporaneo europeo da 10 anni.',
      h1: 'Richieda il Suo Preventivo Personalizzato per il Distacco di Personale Europeo'
    },
    'nl': {
      title: 'Offerte Detachering Europees Personeel Bouw Industrie | YOJOB',
      description: 'Hebt u gedetacheerde Europese werknemers nodig voor uw bouwplaatsen of industriële faciliteiten? Gepersonaliseerde offerte binnen 24u. Europees uitzendwerk expert sinds 10 jaar.',
      h1: 'Vraag Uw Gepersonaliseerde Offerte aan voor Detachering van Europees Personeel'
    },
    'pl': {
      title: 'Wycena Delegowanie Pracowników Europejskich Budowa Przemysł | YOJOB',
      description: 'Potrzebujesz delegowanych pracowników Europa na swoje budowy lub zakłady przemysłowe? Spersonalizowana wycena w ciągu 24h. Ekspert pracy tymczasowej europejskiej od 10 lat.',
      h1: 'Poproś o Spersonalizowaną Wycenę Delegowania Pracowników Europejskich'
    },
    'ro': {
      title: 'Ofertă Detașare Personal European Construcții Industrie | YOJOB',
      description: 'Aveți nevoie de lucrători detașați Europa pentru șantierele sau instalațiile dumneavoastră industriale? Ofertă personalizată în 24h. Expert muncă temporară europeană de 10 ani.',
      h1: 'Solicitați Oferta Dumneavoastră Personalizată pentru Detașarea de Personal European'
    },
    'cs': {
      title: 'Nabídka Vyslání Evropských Pracovníků Stavebnictví Průmysl | YOJOB',
      description: 'Potřebujete vyslaných evropských pracovníků na své staveniště nebo průmyslová zařízení? Personalizovaná nabídka do 24h. Experti na evropskou dočasnou práci již 10 let.',
      h1: 'Vyžádejte Si Svou Personalizovanou Nabídku na Vyslání Evropských Pracovníků'
    },
    'sk': {
      title: 'Ponuka Vyslanie Európskych Pracovníkov Stavebníctvo Priemysel | YOJOB',
      description: 'Potrebujete vyslaných európskych pracovníkov na svoje stavenisko alebo priemyselné zariadenia? Personalizovaná ponuka do 24h. Experti na európsku dočasnú prácu už 10 rokov.',
      h1: 'Vyžiadajte Si Svoju Personalizovanú Ponuku na Vyslanie Európskych Pracovníkov'
    },
    'hu': {
      title: 'Ajánlat Európai Munkavállalók Kiküldetése Építőipar Ipar | YOJOB',
      description: 'Szüksége van kiküldetett európai munkavállalókra építkezéseire vagy ipari létesítményeire? Személyre szabott ajánlat 24 órán belül. Európai ideiglenes munka szakértő 10 éve.',
      h1: 'Kérje Személyre Szabott Ajánlatát az Európai Munkavállalók Kiküldetéséhez'
    },
    'bg': {
      title: 'Оферта Командироване Европейски Работници Строителство Индустрия | YOJOB',
      description: 'Нуждаете се от командировани европейски работници за вашите строителни обекти или промишлени съоръжения? Персонализирана оферта в рамките на 24 часа. Експерт по европейска временна работа от 10 години.',
      h1: 'Поискайте Вашата Персонализирана Оферта за Командироване на Европейски Работници'
    },
    'el': {
      title: 'Προσφορά Απόσπαση Ευρωπαίων Εργαζομένων Κατασκευές Βιομηχανία | YOJOB',
      description: 'Χρειάζεστε αποσπασμένους ευρωπαίους εργαζόμενους για τα εργοτάξια ή τις βιομηχανικές σας εγκαταστάσεις; Εξατομικευμένη προσφορά εντός 24 ωρών. Ειδικός στην ευρωπαϊκή προσωρινή εργασία εδώ και 10 χρόνια.',
      h1: 'Ζητήστε την Εξατομικευμένη Σας Προσφορά για Απόσπαση Ευρωπαίων Εργαζομένων'
    },
    'hr': {
      title: 'Ponuda Upućivanje Europskih Radnika Gradnja Industrija | YOJOB',
      description: 'Trebaju vam upućeni europski radnici za vaša gradilišta ili industrijska postrojenja? Personalizirana ponuda unutar 24h. Stručnjak za europski privremeni rad već 10 godina.',
      h1: 'Zatražite Svoju Personaliziranu Ponudu za Upućivanje Europskih Radnika'
    },
    'sl': {
      title: 'Ponudba Napotitev Evropskih Delavcev Gradbeništvo Industrija | YOJOB',
      description: 'Potrebujete napotene evropske delavce za svoja gradbišča ali industrijske objekte? Personalizirana ponudba v 24 urah. Strokovnjak za evropsko začasno delo že 10 let.',
      h1: 'Zahtevajte Svojo Personalizirano Ponudbo za Napotitev Evropskih Delavcev'
    },
    'lt': {
      title: 'Pasiūlymas Europos Darbuotojų Komandiravimas Statyba Pramonė | YOJOB',
      description: 'Reikia komandiruotų Europos darbuotojų jūsų statybvietėms ar pramonės objektams? Individualizuotas pasiūlymas per 24 val. Europos laikino darbo ekspertas jau 10 metų.',
      h1: 'Prašykite Savo Individualizuoto Pasiūlymo Europos Darbuotojų Komandiravimui'
    },
    'lv': {
      title: 'Piedāvājums Eiropas Darbinieku Komandēšana Būvniecība Rūpniecība | YOJOB',
      description: 'Vai jums nepieciešami komandēti Eiropas darbinieki jūsu būvlaukumiem vai rūpnieciskajiem objektiem? Personalizēts piedāvājums 24 stundu laikā. Eiropas pagaidu darba eksperts jau 10 gadus.',
      h1: 'Pieprasiet Savu Personalizēto Piedāvājumu Eiropas Darbinieku Komandēšanai'
    },
    'et': {
      title: 'Pakkumine Euroopa Töötajate Lähetamine Ehitus Tööstus | YOJOB',
      description: 'Kas vajate lähetatud Euroopa töötajaid oma ehitusplatsidele või tööstusrajatistele? Personaliseeritud pakkumine 24 tunni jooksul. Euroopa ajutöö ekspert juba 10 aastat.',
      h1: 'Taotlege Oma Personaliseeritud Pakkumist Euroopa Töötajate Lähetamiseks'
    },
    'sv': {
      title: 'Offert Utstationering Europeiska Arbetstagare Bygg Industri | YOJOB',
      description: 'Behöver du utstationerade europeiska arbetstagare för dina byggarbetsplatser eller industrianläggningar? Personlig offert inom 24h. Europeisk temporär arbetsexpert sedan 10 år.',
      h1: 'Begär Din Personliga Offert för Utstationering av Europeiska Arbetstagare'
    },
    'da': {
      title: 'Tilbud Udstationering Europæiske Medarbejdere Byggeri Industri | YOJOB',
      description: 'Har du brug for udstationerede europæiske medarbejdere til dine byggepladser eller industrianlæg? Personligt tilbud inden for 24t. Europæisk midlertidig arbejdsekspert i 10 år.',
      h1: 'Anmod Om Dit Personlige Tilbud til Udstationering af Europæiske Medarbejdere'
    },
    'fi': {
      title: 'Tarjous Eurooppalaisten Työntekijöiden Lähettäminen Rakentaminen Teollisuus | YOJOB',
      description: 'Tarvitsetko lähetetyt eurooppalaiset työntekijät työmaillesi tai teollisuuslaitoksillesi? Henkilökohtainen tarjous 24 tunnin kuluessa. Eurooppalaisen väliaikaisen työn asiantuntija jo 10 vuotta.',
      h1: 'Pyydä Henkilökohtainen Tarjouksesi Eurooppalaisten Työntekijöiden Lähettämiseen'
    },
    'no': {
      title: 'Tilbud Utsending Europeiske Arbeidstakere Bygg Industri | YOJOB',
      description: 'Trenger du utsendte europeiske arbeidstakere til dine byggeplasser eller industrianlegg? Personlig tilbud innen 24t. Europeisk midlertidig arbeidsekspert i 10 år.',
      h1: 'Be Om Ditt Personlige Tilbud for Utsending av Europeiske Arbeidstakere'
    }
  },

  // --------------------------------------------------------------------------
  // BLOG - DIRECTIVE
  // --------------------------------------------------------------------------
  'blog-directive': {
    'fr': {
      title: 'Directive Travailleurs Détachés UE 2024 : Guide Employeurs | YOJOB',
      description: 'Directive européenne travailleurs détachés : obligations employeurs, A1, salaire minimum, cotisations. Guide pratique pour DRH BTP et industrie par YOJOB.',
      h1: 'Guide Complet de la Directive Européenne des Travailleurs Détachés 2024'
    },
    'en': {
      title: 'EU Posted Workers Directive 2024: Employers Guide | YOJOB',
      description: 'European posted workers directive: employer obligations, A1, minimum wage, contributions. Practical guide for HR managers construction and industry by YOJOB.',
      h1: 'Complete Guide to the European Posted Workers Directive 2024'
    },
    'es': {
      title: 'Directiva Trabajadores Desplazados UE 2024: Guía Empleadores | YOJOB',
      description: 'Directiva europea trabajadores desplazados: obligaciones empleadores, A1, salario mínimo, cotizaciones. Guía práctica para directores RRHH construcción e industria por YOJOB.',
      h1: 'Guía Completa de la Directiva Europea de Trabajadores Desplazados 2024'
    },
    'pt': {
      title: 'Diretiva Trabalhadores Destacados UE 2024: Guia Empregadores | YOJOB',
      description: 'Diretiva europeia trabalhadores destacados: obrigações empregadores, A1, salário mínimo, contribuições. Guia prático para diretores RH construção e indústria pela YOJOB.',
      h1: 'Guia Completo da Diretiva Europeia dos Trabalhadores Destacados 2024'
    },
    'de': {
      title: 'EU-Richtlinie Entsandte Arbeitnehmer 2024: Arbeitgeberhandbuch | YOJOB',
      description: 'Europäische Richtlinie entsandte Arbeitnehmer: Arbeitgeberpflichten, A1, Mindestlohn, Beiträge. Praktischer Leitfaden für HR-Manager Bau und Industrie von YOJOB.',
      h1: 'Vollständiger Leitfaden zur Europäischen Richtlinie über Entsandte Arbeitnehmer 2024'
    },
    'it': {
      title: 'Direttiva Lavoratori Distaccati UE 2024: Guida Datori Lavoro | YOJOB',
      description: 'Direttiva europea lavoratori distaccati: obblighi datori lavoro, A1, salario minimo, contributi. Guida pratica per direttori HR edilizia e industria di YOJOB.',
      h1: 'Guida Completa alla Direttiva Europea sui Lavoratori Distaccati 2024'
    },
    'nl': {
      title: 'EU-Richtlijn Gedetacheerde Werknemers 2024: Werkgeversgids | YOJOB',
      description: 'Europese richtlijn gedetacheerde werknemers: werkgeversverplichtingen, A1, minimumloon, bijdragen. Praktische gids voor HR-managers bouw en industrie door YOJOB.',
      h1: 'Volledige Gids voor de Europese Richtlijn inzake Gedetacheerde Werknemers 2024'
    },
    'pl': {
      title: 'Dyrektywa UE Pracownicy Delegowani 2024: Przewodnik Pracodawców | YOJOB',
      description: 'Dyrektywa europejska pracownicy delegowani: obowiązki pracodawców, A1, płaca minimalna, składki. Przewodnik praktyczny dla kierowników HR budowa i przemysł od YOJOB.',
      h1: 'Pełny Przewodnik po Dyrektywie Europejskiej dotyczącej Pracowników Delegowanych 2024'
    },
    'ro': {
      title: 'Directiva UE Lucrători Detașați 2024: Ghid Angajatori | YOJOB',
      description: 'Directiva europeană lucrători detașați: obligații angajatori, A1, salariu minim, contribuții. Ghid practic pentru directori HR construcții și industrie de la YOJOB.',
      h1: 'Ghid Complet al Directivei Europene privind Lucrătorii Detașați 2024'
    },
    'cs': {
      title: 'Směrnice EU Vyslaní Pracovníci 2024: Průvodce Pro Zaměstnavatele | YOJOB',
      description: 'Evropská směrnice vyslaní pracovníci: povinnosti zaměstnavatelů, A1, minimální mzda, příspěvky. Praktický průvodce pro HR manažery stavebnictví a průmyslu od YOJOB.',
      h1: 'Kompletní Průvodce Evropskou Směrnicí o Vyslaných Pracovnících 2024'
    },
    'sk': {
      title: 'Smernica EÚ Vyslaní Pracovníci 2024: Sprievodca Pre Zamestnávateľov | YOJOB',
      description: 'Európska smernica vyslaní pracovníci: povinnosti zamestnávateľov, A1, minimálna mzda, príspevky. Praktický sprievodca pre HR manažérov stavebníctvo a priemysel od YOJOB.',
      h1: 'Kompletný Sprievodca Európskou Smernicou o Vyslaných Pracovníkoch 2024'
    },
    'hu': {
      title: 'EU-Irányelv Kiküldött Munkavállalók 2024: Munkáltatói Útmutató | YOJOB',
      description: 'Európai irányelv kiküldött munkavállalók: munkáltatói kötelezettségek, A1, minimálbér, járulékok. Gyakorlati útmutató HR-vezetők építőipar és ipar számára a YOJOB-tól.',
      h1: 'Teljes Útmutató a Kiküldött Munkavállalókra Vonatkozó Európai Irányelvhez 2024'
    },
    'bg': {
      title: 'Директива ЕС Командировани Работници 2024: Ръководство За Работодатели | YOJOB',
      description: 'Европейска директива командировани работници: задължения на работодателите, A1, минимална заплата, вноски. Практическо ръководство за мениджъри по персонал строителство и индустрия от YOJOB.',
      h1: 'Пълно Ръководство за Европейската Директива относно Командированите Работници 2024'
    },
    'el': {
      title: 'Οδηγία ΕΕ Αποσπασμένοι Εργαζόμενοι 2024: Οδηγός Εργοδοτών | YOJOB',
      description: 'Ευρωπαϊκή οδηγία αποσπασμένοι εργαζόμενοι: υποχρεώσεις εργοδοτών, A1, κατώτατος μισθός, εισφορές. Πρακτικός οδηγός για διευθυντές HR κατασκευών και βιομηχανίας από YOJOB.',
      h1: 'Πλήρης Οδηγός για την Ευρωπαϊκή Οδηγία σχετικά με τους Αποσπασμένους Εργαζομένους 2024'
    },
    'hr': {
      title: 'Direktiva EU Upućeni Radnici 2024: Vodič Za Poslodavce | YOJOB',
      description: 'Europska direktiva upućeni radnici: obveze poslodavaca, A1, minimalna plaća, doprinosi. Praktični vodič za HR menadžere gradnja i industrija od YOJOB.',
      h1: 'Potpuni Vodič za Europsku Direktivu o Upućenim Radnicima 2024'
    },
    'sl': {
      title: 'Direktiva EU Napoteni Delavci 2024: Vodnik Za Delodajalce | YOJOB',
      description: 'Evropska direktiva napoteni delavci: obveznosti delodajalcev, A1, minimalna plača, prispevki. Praktični vodnik za HR managerje gradbeništvo in industrija od YOJOB.',
      h1: 'Popoln Vodnik po Evropski Direktivi o Napotenih Delavcih 2024'
    },
    'lt': {
      title: 'ES Direktyva Komandiruoti Darbuotojai 2024: Darbdavių Vadovas | YOJOB',
      description: 'Europos direktyva komandiruoti darbuotojai: darbdavių pareigos, A1, minimalus atlyginimas, įnašai. Praktinis vadovas HR vadovams statyba ir pramonė iš YOJOB.',
      h1: 'Visas Vadovas pagal Europos Direktyvą dėl Komandiruotų Darbuotojų 2024'
    },
    'lv': {
      title: 'ES Direktīva Komandētie Darbinieki 2024: Darba Devēju Ceļvedis | YOJOB',
      description: 'Eiropas direktīva komandētie darbinieki: darba devēju pienākumi, A1, minimālā alga, iemaksas. Praktisks ceļvedis HR vadītājiem būvniecība un rūpniecība no YOJOB.',
      h1: 'Pilnīgs Ceļvedis par Eiropas Direktīvu attiecībā uz Komandētajiem Darbiniekiem 2024'
    },
    'et': {
      title: 'EL Direktiiv Lähetatud Töötajad 2024: Tööandjate Juhend | YOJOB',
      description: 'Euroopa direktiiv lähetatud töötajad: tööandjate kohustused, A1, miinimumpalk, maksed. Praktiline juhend personalijuhtidele ehitus ja tööstus YOJOBilt.',
      h1: 'Täielik Juhend Euroopa Direktiivi kohta Lähetatud Töötajate Kohta 2024'
    },
    'sv': {
      title: 'EU-Direktiv Utstationerade Arbetstagare 2024: Arbetsgivarguide | YOJOB',
      description: 'Europeiskt direktiv utstationerade arbetstagare: arbetsgivarskyldigheteri, A1, minimilön, avgifter. Praktisk guide för HR-chefer bygg och industri från YOJOB.',
      h1: 'Fullständig Guide till Europeiska Direktivet om Utstationerade Arbetstagare 2024'
    },
    'da': {
      title: 'EU-Direktiv Udstationerede Medarbejdere 2024: Arbejdsgivervejledning | YOJOB',
      description: 'Europæisk direktiv udstationerede medarbejdere: arbejdsgiverforpligtelser, A1, mindsteløn, bidrag. Praktisk vejledning til HR-ledere byggeri og industri fra YOJOB.',
      h1: 'Komplet Vejledning til Europæiske Direktiv om Udstationerede Medarbejdere 2024'
    },
    'fi': {
      title: 'EU-Direktiivi Lähetetyt Työntekijät 2024: Työnantajaopas | YOJOB',
      description: 'Eurooppalainen direktiivi lähetetyt työntekijät: työnantajavelvoitteet, A1, minimipalkka, maksut. Käytännöllinen opas HR-johtajille rakentaminen ja teollisuus YOJOBilta.',
      h1: 'Täydellinen Opas Euroopan Direktiiviin Lähetetyistä Työntekijöistä 2024'
    },
    'no': {
      title: 'EU-Direktiv Utsendte Arbeidstakere 2024: Arbeidsgiverveiledning | YOJOB',
      description: 'Europeisk direktiv utsendte arbeidstakere: arbeidsgiverforpliktelser, A1, minstelønn, avgifter. Praktisk veiledning for HR-ledere bygg og industri fra YOJOB.',
      h1: 'Komplett Veiledning til Europeisk Direktiv om Utsendte Arbeidstakere 2024'
    }
  },

  // --------------------------------------------------------------------------
  // FORMULAIRE DEVIS (page actuelle)
  // --------------------------------------------------------------------------
  'devis-form': {
    'fr': {
      title: 'Simulateur Devis Détachement Personnel Européen | YOJOB',
      description: 'Calculez votre devis détachement de travailleurs européens BTP et industrie en 3 minutes. Tarifs transparents Portugal, Roumanie, Pologne. Estimation gratuite YOJOB.',
      h1: 'Calculateur de Devis pour le Détachement de Personnel Européen'
    },
    'en': {
      title: 'European Worker Posting Quote Simulator | YOJOB',
      description: 'Calculate your European worker posting quote for construction and industry in 3 minutes. Transparent rates Portugal, Romania, Poland. Free YOJOB estimate.',
      h1: 'Quote Calculator for European Worker Posting'
    },
    'es': {
      title: 'Simulador Presupuesto Destacamento Personal Europeo | YOJOB',
      description: 'Calcule su presupuesto destacamento trabajadores europeos construcción e industria en 3 minutos. Tarifas transparentes Portugal, Rumanía, Polonia. Estimación gratuita YOJOB.',
      h1: 'Calculadora de Presupuesto para Destacamento de Personal Europeo'
    },
    'pt': {
      title: 'Simulador Orçamento Destacamento Pessoal Europeu | YOJOB',
      description: 'Calcule seu orçamento destacamento trabalhadores europeus construção e indústria em 3 minutos. Preços transparentes Portugal, Roménia, Polónia. Estimativa gratuita YOJOB.',
      h1: 'Calculadora de Orçamento para Destacamento de Pessoal Europeu'
    },
    'de': {
      title: 'Angebotsrechner Entsendung Europäisches Personal | YOJOB',
      description: 'Berechnen Sie Ihr Angebot Entsendung europäischer Arbeitnehmer Bau und Industrie in 3 Minuten. Transparente Tarife Portugal, Rumänien, Polen. Kostenlose Schätzung YOJOB.',
      h1: 'Angebotsrechner für die Entsendung Europäischen Personals'
    },
    'it': {
      title: 'Simulatore Preventivo Distacco Personale Europeo | YOJOB',
      description: 'Calcola il tuo preventivo distacco lavoratori europei edilizia e industria in 3 minuti. Tariffe trasparenti Portogallo, Romania, Polonia. Stima gratuita YOJOB.',
      h1: 'Calcolatore di Preventivo per il Distacco di Personale Europeo'
    },
    'nl': {
      title: 'Offerterechner Detachering Europees Personeel | YOJOB',
      description: 'Bereken uw offerte detachering Europese werknemers bouw en industrie in 3 minuten. Transparante tarieven Portugal, Roemenië, Polen. Gratis schatting YOJOB.',
      h1: 'Offerterechner voor Detachering van Europees Personeel'
    },
    'pl': {
      title: 'Symulator Wyceny Delegowanie Pracowników Europejskich | YOJOB',
      description: 'Oblicz swoją wycenę delegowanie pracowników europejskich budowa i przemysł w 3 minuty. Przejrzyste stawki Portugalia, Rumunia, Polska. Darmowe oszacowanie YOJOB.',
      h1: 'Kalkulator Wyceny Delegowania Pracowników Europejskich'
    },
    'ro': {
      title: 'Simulator Ofertă Detașare Personal European | YOJOB',
      description: 'Calculați oferta dvs. detașare lucrători europeni construcții și industrie în 3 minute. Tarife transparente Portugalia, România, Polonia. Estimare gratuită YOJOB.',
      h1: 'Calculator de Ofertă pentru Detașarea de Personal European'
    },
    'cs': {
      title: 'Simulátor Nabídky Vyslání Evropských Pracovníků | YOJOB',
      description: 'Vypočítejte svou nabídku vyslání evropských pracovníků stavebnictví a průmysl za 3 minuty. Transparentní ceny Portugalsko, Rumunsko, Polsko. Bezplatný odhad YOJOB.',
      h1: 'Kalkulačka Nabídky na Vyslání Evropských Pracovníků'
    },
    'sk': {
      title: 'Simulátor Ponuky Vyslanie Európskych Pracovníkov | YOJOB',
      description: 'Vypočítajte svoju ponuku vyslanie európskych pracovníkov stavebníctvo a priemysel za 3 minúty. Transparentné ceny Portugalsko, Rumunsko, Poľsko. Bezplatný odhad YOJOB.',
      h1: 'Kalkulačka Ponuky na Vyslanie Európskych Pracovníkov'
    },
    'hu': {
      title: 'Ajánlatszámító Európai Munkavállalók Kiküldetése | YOJOB',
      description: 'Számítsa ki európai munkavállalók kiküldetése építőipar és ipar ajánlatát 3 perc alatt. Átlátható árak Portugália, Románia, Lengyelország. Ingyenes becslés YOJOB.',
      h1: 'Ajánlatszámító az Európai Munkavállalók Kiküldetéséhez'
    },
    'bg': {
      title: 'Симулатор Оферта Командироване Европейски Работници | YOJOB',
      description: 'Изчислете вашата оферта командироване европейски работници строителство и индустрия за 3 минути. Прозрачни цени Португалия, Румъния, Полша. Безплатна оценка YOJOB.',
      h1: 'Калкулатор на Оферта за Командироване на Европейски Работници'
    },
    'el': {
      title: 'Προσομοιωτής Προσφοράς Απόσπαση Ευρωπαίων Εργαζομένων | YOJOB',
      description: 'Υπολογίστε την προσφορά σας απόσπαση ευρωπαίων εργαζομένων κατασκευές και βιομηχανία σε 3 λεπτά. Διαφανείς τιμές Πορτογαλία, Ρουμανία, Πολωνία. Δωρεάν εκτίμηση YOJOB.',
      h1: 'Υπολογιστής Προσφοράς για Απόσπαση Ευρωπαίων Εργαζομένων'
    },
    'hr': {
      title: 'Simulator Ponude Upućivanje Europskih Radnika | YOJOB',
      description: 'Izračunajte svoju ponudu upućivanje europskih radnika gradnja i industrija za 3 minute. Transparentne cijene Portugal, Rumunjska, Poljska. Besplatna procjena YOJOB.',
      h1: 'Kalkulator Ponude za Upućivanje Europskih Radnika'
    },
    'sl': {
      title: 'Simulator Ponudbe Napotitev Evropskih Delavcev | YOJOB',
      description: 'Izračunajte svojo ponudbo napotitev evropskih delavcev gradbeništvo in industrija v 3 minutah. Pregledne cene Portugalska, Romunija, Poljska. Brezplačna ocena YOJOB.',
      h1: 'Kalkulator Ponudbe za Napotitev Evropskih Delavcev'
    },
    'lt': {
      title: 'Pasiūlymo Simuliatorius Europos Darbuotojų Komandiravimas | YOJOB',
      description: 'Apskaičiuokite savo pasiūlymą Europos darbuotojų komandiravimas statyba ir pramonė per 3 minutes. Skaidrūs įkainiai Portugalija, Rumunija, Lenkija. Nemokamas įvertinimas YOJOB.',
      h1: 'Pasiūlymo Kalkuliatorius Europos Darbuotojų Komandiravimui'
    },
    'lv': {
      title: 'Piedāvājuma Simulators Eiropas Darbinieku Komandēšana | YOJOB',
      description: 'Aprēķiniet savu piedāvājumu Eiropas darbinieku komandēšana būvniecība un rūpniecība 3 minūtēs. Pārredzamas cenas Portugāle, Rumānija, Polija. Bezmaksas novērtējums YOJOB.',
      h1: 'Piedāvājuma Kalkulators Eiropas Darbinieku Komandēšanai'
    },
    'et': {
      title: 'Pakkumise Simulaator Euroopa Töötajate Lähetamine | YOJOB',
      description: 'Arvutage oma pakkumine Euroopa töötajate lähetamine ehitus ja tööstus 3 minutiga. Läbipaistvad hinnad Portugal, Rumeenia, Poola. Tasuta hinnang YOJOB.',
      h1: 'Pakkumise Kalkulaator Euroopa Töötajate Lähetamiseks'
    },
    'sv': {
      title: 'Offertsimulator Utstationering Europeiska Arbetstagare | YOJOB',
      description: 'Beräkna din offert utstationering europeiska arbetstagare bygg och industri på 3 minuter. Transparenta priser Portugal, Rumänien, Polen. Gratis uppskattning YOJOB.',
      h1: 'Offertkalkylator för Utstationering av Europeiska Arbetstagare'
    },
    'da': {
      title: 'Tilbudssimulator Udstationering Europæiske Medarbejdere | YOJOB',
      description: 'Beregn dit tilbud udstationering europæiske medarbejdere byggeri og industri på 3 minutter. Gennemsigtige priser Portugal, Rumænien, Polen. Gratis estimat YOJOB.',
      h1: 'Tilbudskalkulator for Udstationering af Europæiske Medarbejdere'
    },
    'fi': {
      title: 'Tarjoussimulaattori Eurooppalaisten Työntekijöiden Lähettäminen | YOJOB',
      description: 'Laske tarjouksesi eurooppalaisten työntekijöiden lähettäminen rakentaminen ja teollisuus 3 minuutissa. Läpinäkyvät hinnat Portugali, Romania, Puola. Ilmainen arvio YOJOB.',
      h1: 'Tarjouslaskuri Eurooppalaisten Työntekijöiden Lähettämiseen'
    },
    'no': {
      title: 'Tilbudssimulator Utsending Europeiske Arbeidstakere | YOJOB',
      description: 'Beregn ditt tilbud utsending europeiske arbeidstakere bygg og industri på 3 minutter. Transparente priser Portugal, Romania, Polen. Gratis estimat YOJOB.',
      h1: 'Tilbudskalkulator for Utsending av Europeiske Arbeidstakere'
    }
  },

  // --------------------------------------------------------------------------
  // À PROPOS
  // --------------------------------------------------------------------------
  'a-propos': {
    'fr': {
      title: 'À Propos YOJOB | Leader Recrutement Européen depuis 2014',
      description: 'Découvrez YOJOB : 10 ans d\'expertise, 500+ agences partenaires, 27 pays. Histoire, valeurs, équipe. Leader français du courtage en recrutement européen BTP et Industrie.',
      h1: '10 ans d\'expertise au service de votre recrutement européen',
      keywords: ['à propos YOJOB', 'histoire YOJOB', 'courtage recrutement', 'agences européennes', 'expertise recrutement']
    },
    'en': {
      title: 'About YOJOB | European Recruitment Leader since 2014',
      description: 'Discover YOJOB: 10 years of expertise, 500+ partner agencies, 27 countries. History, values, team. French leader in European recruitment brokerage for Construction and Industry.',
      h1: '10 years of expertise serving your European recruitment'
    },
    'es': {
      title: 'Sobre YOJOB | Líder Reclutamiento Europeo desde 2014',
      description: 'Descubra YOJOB: 10 años de experiencia, 500+ agencias asociadas, 27 países. Historia, valores, equipo. Líder francés en intermediación de reclutamiento europeo Construcción e Industria.',
      h1: '10 años de experiencia al servicio de su reclutamiento europeo'
    },
    'pt': {
      title: 'Sobre YOJOB | Líder Recrutamento Europeu desde 2014',
      description: 'Descubra YOJOB: 10 anos de experiência, 500+ agências parceiras, 27 países. História, valores, equipe. Líder francês em intermediação de recrutamento europeu Construção e Indústria.',
      h1: '10 anos de experiência ao serviço do seu recrutamento europeu'
    },
    'de': {
      title: 'Über YOJOB | Europäischer Recruiting-Marktführer seit 2014',
      description: 'Entdecken Sie YOJOB: 10 Jahre Erfahrung, 500+ Partneragenturen, 27 Länder. Geschichte, Werte, Team. Französischer Marktführer im europäischen Recruiting-Brokerage Bau und Industrie.',
      h1: '10 Jahre Expertise im Dienste Ihrer europäischen Personalbeschaffung'
    },
    'it': {
      title: 'Chi Siamo YOJOB | Leader Reclutamento Europeo dal 2014',
      description: 'Scopri YOJOB: 10 anni di esperienza, 500+ agenzie partner, 27 paesi. Storia, valori, team. Leader francese nell\'intermediazione reclutamento europeo Edilizia e Industria.',
      h1: '10 anni di esperienza al servizio del vostro reclutamento europeo'
    },
    'nl': {
      title: 'Over YOJOB | Europese Wervingsleider sinds 2014',
      description: 'Ontdek YOJOB: 10 jaar ervaring, 500+ partneragentschappen, 27 landen. Geschiedenis, waarden, team. Franse leider in Europese wervingsbemiddeling Bouw en Industrie.',
      h1: '10 jaar expertise ten dienste van uw Europese werving'
    },
    'pl': {
      title: 'O YOJOB | Lider Rekrutacji Europejskiej od 2014',
      description: 'Poznaj YOJOB: 10 lat doświadczenia, 500+ agencji partnerskich, 27 krajów. Historia, wartości, zespół. Francuski lider w pośrednictwie rekrutacji europejskiej Budownictwo i Przemysł.',
      h1: '10 lat doświadczenia w służbie Twojej rekrutacji europejskiej'
    },
    'ro': {
      title: 'Despre YOJOB | Lider Recrutare Europeană din 2014',
      description: 'Descoperiți YOJOB: 10 ani de experiență, 500+ agenții partenere, 27 țări. Istorie, valori, echipă. Lider francez în intermedierea recrutării europene Construcții și Industrie.',
      h1: '10 ani de expertiză în serviciul recrutării dumneavoastră europene'
    },
    'cs': {
      title: 'O YOJOB | Evropský Lídr v Náboru od 2014',
      description: 'Objevte YOJOB: 10 let zkušeností, 500+ partnerských agentur, 27 zemí. Historie, hodnoty, tým. Francouzský lídr v evropském zprostředkování náboru Stavebnictví a Průmysl.',
      h1: '10 let odborných znalostí ve službě vašeho evropského náboru'
    },
    'sk': {
      title: 'O YOJOB | Európsky Líder v Nábore od 2014',
      description: 'Objavte YOJOB: 10 rokov skúseností, 500+ partnerských agentúr, 27 krajín. História, hodnoty, tím. Francúzsky líder v európskom sprostredkovaní náboru Stavebníctvo a Priemysel.',
      h1: '10 rokov odborných znalostí v službe vášho európskeho náboru'
    },
    'hu': {
      title: 'YOJOB-ról | Európai Toborzási Vezető 2014 óta',
      description: 'Fedezze fel YOJOB-ot: 10 év tapasztalat, 500+ partnerügynökség, 27 ország. Történet, értékek, csapat. Francia vezető az európai toborzási közvetítésben Építőipar és Ipar.',
      h1: '10 év szakértelem az Ön európai toborzásának szolgálatában'
    },
    'bg': {
      title: 'За YOJOB | Европейски Лидер в Набирането от 2014',
      description: 'Открийте YOJOB: 10 години опит, 500+ партньорски агенции, 27 държави. История, ценности, екип. Френски лидер в европейското посредничество в наборите Строителство и Индустрия.',
      h1: '10 години експертиза в услуга на вашето европейско набиране'
    },
    'el': {
      title: 'Σχετικά με το YOJOB | Ευρωπαίος Ηγέτης Πρόσληψης από το 2014',
      description: 'Ανακαλύψτε το YOJOB: 10 χρόνια εμπειρίας, 500+ συνεργαζόμενα πρακτορεία, 27 χώρες. Ιστορία, αξίες, ομάδα. Γαλλικός ηγέτης στη μεσολάβηση ευρωπαϊκής πρόσληψης Κατασκευές και Βιομηχανία.',
      h1: '10 χρόνια εμπειρογνωμοσύνης στην υπηρεσία της ευρωπαϊκής σας πρόσληψης'
    },
    'hr': {
      title: 'O YOJOB-u | Europski Lider u Zapošljavanju od 2014',
      description: 'Otkrijte YOJOB: 10 godina iskustva, 500+ partnerskih agencija, 27 zemalja. Povijest, vrijednosti, tim. Francuski lider u europskom posredovanju zapošljavanja Gradnja i Industrija.',
      h1: '10 godina stručnosti u službi vašeg europskog zapošljavanja'
    },
    'sl': {
      title: 'O YOJOB | Evropski Vodja v Zaposlovanju od 2014',
      description: 'Odkrijte YOJOB: 10 let izkušenj, 500+ partnerskih agencij, 27 držav. Zgodovina, vrednote, ekipa. Francoski vodja v evropskem posredovanju zaposlovanja Gradbeništvo in Industrija.',
      h1: '10 let strokovnega znanja v službi vašega evropskega zaposlovanja'
    },
    'lt': {
      title: 'Apie YOJOB | Europos Įdarbinimo Lyderis nuo 2014',
      description: 'Atraskite YOJOB: 10 metų patirties, 500+ partnerių agentūrų, 27 šalys. Istorija, vertybės, komanda. Prancūzijos lyderis Europos įdarbinimo tarpininkavime Statyba ir Pramonė.',
      h1: '10 metų patirties jūsų europos įdarbinimo tarnyboje'
    },
    'lv': {
      title: 'Par YOJOB | Eiropas Pieņemšanas Darbā Līderis kopš 2014',
      description: 'Atklājiet YOJOB: 10 gadu pieredze, 500+ partneraģentūras, 27 valstis. Vēsture, vērtības, komanda. Francijas līderis Eiropas pieņemšanas darbā starpniecībā Būvniecība un Rūpniecība.',
      h1: '10 gadu pieredze jūsu Eiropas pieņemšanas darbā pakalpojumā'
    },
    'et': {
      title: 'YOJOB-ist | Euroopa Värbamise Juht alates 2014',
      description: 'Avastage YOJOB: 10 aastat kogemust, 500+ partneragentuurid, 27 riiki. Ajalugu, väärtused, meeskond. Prantsuse juht Euroopa värbamise vahendamises Ehitus ja Tööstus.',
      h1: '10 aastat kogemust teie Euroopa värbamise teenistuses'
    },
    'sv': {
      title: 'Om YOJOB | Europeisk Rekryteringsledare sedan 2014',
      description: 'Upptäck YOJOB: 10 års erfarenhet, 500+ partnerbyråer, 27 länder. Historia, värderingar, team. Fransk ledare i europeisk rekryteringsförmedling Bygg och Industri.',
      h1: '10 års expertis i tjänst för din europeiska rekrytering'
    },
    'da': {
      title: 'Om YOJOB | Europæisk Rekrutteringsleder siden 2014',
      description: 'Opdag YOJOB: 10 års erfaring, 500+ partnerbureauer, 27 lande. Historie, værdier, team. Fransk leder i europæisk rekrutteringsformidling Byggeri og Industri.',
      h1: '10 års ekspertise i tjeneste for din europæiske rekruttering'
    },
    'fi': {
      title: 'YOJOB:sta | Eurooppalainen Rekrytointijohtaja vuodesta 2014',
      description: 'Tutustu YOJOB:hon: 10 vuoden kokemus, 500+ kumppanit, 27 maata. Historia, arvot, tiimi. Ranskalainen johtaja eurooppalaisessa rekrytointivälityksessä Rakentaminen ja Teollisuus.',
      h1: '10 vuoden asiantuntemus eurooppalaisen rekrytointinne palveluksessa'
    },
    'no': {
      title: 'Om YOJOB | Europeisk Rekrutteringsleder siden 2014',
      description: 'Oppdag YOJOB: 10 års erfaring, 500+ partnerbyråer, 27 land. Historie, verdier, team. Fransk leder i europeisk rekrutteringsformidling Bygg og Industri.',
      h1: '10 års ekspertise i tjeneste for din europeiske rekruttering'
    }
  },

  // --------------------------------------------------------------------------
  // NOTRE RÉSEAU
  // --------------------------------------------------------------------------
  'notre-reseau': {
    'fr': {
      title: '500+ Agences Partenaires 27 Pays | Réseau Européen YOJOB',
      description: 'Découvrez notre réseau européen : 500+ agences d\'emploi temporaire certifiées dans 27 pays. Carte interactive, pays partenaires, couverture complète de l\'Union Européenne.',
      h1: '500+ agences partenaires dans 27 pays européens',
      keywords: ['réseau européen', 'agences partenaires', 'couverture Europe', '27 pays', 'agences certifiées']
    },
    'en': {
      title: '500+ Partner Agencies 27 Countries | YOJOB European Network',
      description: 'Discover our European network: 500+ certified temporary employment agencies in 27 countries. Interactive map, partner countries, complete European Union coverage.',
      h1: '500+ partner agencies in 27 European countries'
    },
    'es': {
      title: '500+ Agencias Asociadas 27 Países | Red Europea YOJOB',
      description: 'Descubra nuestra red europea: 500+ agencias de empleo temporal certificadas en 27 países. Mapa interactivo, países socios, cobertura completa de la Unión Europea.',
      h1: '500+ agencias asociadas en 27 países europeos'
    },
    'pt': {
      title: '500+ Agências Parceiras 27 Países | Rede Europeia YOJOB',
      description: 'Descubra nossa rede europeia: 500+ agências de emprego temporário certificadas em 27 países. Mapa interativo, países parceiros, cobertura completa da União Europeia.',
      h1: '500+ agências parceiras em 27 países europeus'
    },
    'de': {
      title: '500+ Partneragenturen 27 Länder | YOJOB Europäisches Netzwerk',
      description: 'Entdecken Sie unser europäisches Netzwerk: 500+ zertifizierte Zeitarbeitsfirmen in 27 Ländern. Interaktive Karte, Partnerländer, vollständige Abdeckung der Europäischen Union.',
      h1: '500+ Partneragenturen in 27 europäischen Ländern'
    },
    'it': {
      title: '500+ Agenzie Partner 27 Paesi | Rete Europea YOJOB',
      description: 'Scopri la nostra rete europea: 500+ agenzie di lavoro temporaneo certificate in 27 paesi. Mappa interattiva, paesi partner, copertura completa dell\'Unione Europea.',
      h1: '500+ agenzie partner in 27 paesi europei'
    },
    'nl': {
      title: '500+ Partneragentschappen 27 Landen | YOJOB Europees Netwerk',
      description: 'Ontdek ons Europees netwerk: 500+ gecertificeerde uitzendbureaus in 27 landen. Interactieve kaart, partnerlanden, volledige dekking van de Europese Unie.',
      h1: '500+ partneragentschappen in 27 Europese landen'
    },
    'pl': {
      title: '500+ Agencji Partnerskich 27 Krajów | Sieć Europejska YOJOB',
      description: 'Odkryj naszą sieć europejską: 500+ certyfikowanych agencji pracy tymczasowej w 27 krajach. Interaktywna mapa, kraje partnerskie, pełne pokrycie Unii Europejskiej.',
      h1: '500+ agencji partnerskich w 27 krajach europejskich'
    },
    'ro': {
      title: '500+ Agenții Partenere 27 Țări | Rețea Europeană YOJOB',
      description: 'Descoperiți rețeaua noastră europeană: 500+ agenții de muncă temporară certificate în 27 țări. Hartă interactivă, țări partenere, acoperire completă a Uniunii Europene.',
      h1: '500+ agenții partenere în 27 țări europene'
    },
    'cs': {
      title: '500+ Partnerských Agentur 27 Zemí | Evropská Síť YOJOB',
      description: 'Objevte naši evropskou síť: 500+ certifikovaných agentur dočasné práce ve 27 zemích. Interaktivní mapa, partnerské země, úplné pokrytí Evropské unie.',
      h1: '500+ partnerských agentur ve 27 evropských zemích'
    },
    'sk': {
      title: '500+ Partnerských Agentúr 27 Krajín | Európska Sieť YOJOB',
      description: 'Objavte našu európsku sieť: 500+ certifikovaných agentúr dočasnej práce v 27 krajinách. Interaktívna mapa, partnerské krajiny, úplné pokrytie Európskej únie.',
      h1: '500+ partnerských agentúr v 27 európskych krajinách'
    },
    'hu': {
      title: '500+ Partnerügynökség 27 Ország | YOJOB Európai Hálózat',
      description: 'Fedezze fel európai hálózatunkat: 500+ tanúsított időszakos foglalkoztatási ügynökség 27 országban. Interaktív térkép, partnerországok, teljes Európai Unió lefedettség.',
      h1: '500+ partnerügynökség 27 európai országban'
    },
    'bg': {
      title: '500+ Партньорски Агенции 27 Държави | Европейска Мрежа YOJOB',
      description: 'Открийте нашата европейска мрежа: 500+ сертифицирани агенции за временна заетост в 27 държави. Интерактивна карта, партньорски държави, пълно покритие на Европейския съюз.',
      h1: '500+ партньорски агенции в 27 европейски държави'
    },
    'el': {
      title: '500+ Συνεργαζόμενα Πρακτορεία 27 Χώρες | Ευρωπαϊκό Δίκτυο YOJOB',
      description: 'Ανακαλύψτε το ευρωπαϊκό μας δίκτυο: 500+ πιστοποιημένα πρακτορεία προσωρινής απασχόλησης σε 27 χώρες. Διαδραστικός χάρτης, χώρες-εταίροι, πλήρης κάλυψη της Ευρωπαϊκής Ένωσης.',
      h1: '500+ συνεργαζόμενα πρακτορεία σε 27 ευρωπαϊκές χώρες'
    },
    'hr': {
      title: '500+ Partnerskih Agencija 27 Zemalja | Europska Mreža YOJOB',
      description: 'Otkrijte našu europsku mrežu: 500+ certificiranih agencija za privremeni rad u 27 zemalja. Interaktivna karta, partnerske zemlje, potpuna pokrivenost Europske unije.',
      h1: '500+ partnerskih agencija u 27 europskih zemalja'
    },
    'sl': {
      title: '500+ Partnerskih Agencij 27 Držav | Evropska Mreža YOJOB',
      description: 'Odkrijte naše evropsko mrežo: 500+ certificiranih agencij za začasno delo v 27 državah. Interaktivni zemljevid, partnerske države, popolna pokritost Evropske unije.',
      h1: '500+ partnerskih agencij v 27 evropskih državah'
    },
    'lt': {
      title: '500+ Partnerių Agentūrų 27 Šalys | Europos Tinklas YOJOB',
      description: 'Atraskite mūsų Europos tinklą: 500+ sertifikuotų laikino darbo agentūrų 27 šalyse. Interaktyvus žemėlapis, šalys partnerės, visas Europos Sąjungos padengimas.',
      h1: '500+ partnerių agentūrų 27 Europos šalyse'
    },
    'lv': {
      title: '500+ Partneraģentūras 27 Valstis | Eiropas Tīkls YOJOB',
      description: 'Atklājiet mūsu Eiropas tīklu: 500+ sertificētas pagaidu nodarbinātības aģentūras 27 valstīs. Interaktīva karte, partnervalstis, pilnīgs Eiropas Savienības pārklājums.',
      h1: '500+ partneraģentūras 27 Eiropas valstīs'
    },
    'et': {
      title: '500+ Partneragentuurid 27 Riiki | Euroopa Võrgustik YOJOB',
      description: 'Avastage meie Euroopa võrgustik: 500+ sertifitseeritud ajutise töö agentuurid 27 riigis. Interaktiivne kaart, partnerriigid, täielik Euroopa Liidu katvus.',
      h1: '500+ partneragentuurid 27 Euroopa riigis'
    },
    'sv': {
      title: '500+ Partnerbyråer 27 Länder | YOJOB Europeiskt Nätverk',
      description: 'Upptäck vårt europeiska nätverk: 500+ certifierade bemanningsföretag i 27 länder. Interaktiv karta, partnerländer, fullständig täckning av Europeiska unionen.',
      h1: '500+ partnerbyråer i 27 europeiska länder'
    },
    'da': {
      title: '500+ Partnerbureauer 27 Lande | YOJOB Europæisk Netværk',
      description: 'Opdag vores europæiske netværk: 500+ certificerede vikarbureauer i 27 lande. Interaktivt kort, partnerlande, fuld dækning af Den Europæiske Union.',
      h1: '500+ partnerbureauer i 27 europæiske lande'
    },
    'fi': {
      title: '500+ Kumppania 27 Maata | YOJOB Eurooppalainen Verkosto',
      description: 'Tutustu eurooppalaiseen verkostoomme: 500+ sertifioitua henkilöstövuokrausyritystä 27 maassa. Interaktiivinen kartta, kumppanimaat, täydellinen Euroopan unionin kattavuus.',
      h1: '500+ kumppania 27 eurooppalaisessa maassa'
    },
    'no': {
      title: '500+ Partnerbyråer 27 Land | YOJOB Europeisk Nettverk',
      description: 'Oppdag vårt europeiske nettverk: 500+ sertifiserte vikarbyrå i 27 land. Interaktivt kart, partnerland, full dekning av Den europeiske union.',
      h1: '500+ partnerbyråer i 27 europeiske land'
    }
  },

  // --------------------------------------------------------------------------
  // NOS SECTEURS
  // --------------------------------------------------------------------------
  'nos-secteurs': {
    'fr': {
      title: 'Tous nos Secteurs d\'Activité | BTP Industrie Hôtellerie Tech',
      description: '9 secteurs d\'activité couverts : BTP, Industrie, Agriculture, Hôtellerie, Santé, Logistique, Tech, Commerce, Maintenance. Talents européens qualifiés pour tous vos besoins.',
      h1: 'Des talents européens pour tous vos secteurs d\'activité',
      keywords: ['secteurs activité', 'BTP', 'industrie', 'hôtellerie', 'tech', 'logistique', 'agriculture']
    },
    'en': {
      title: 'All Our Activity Sectors | Construction Industry Hospitality Tech',
      description: '9 activity sectors covered: Construction, Industry, Agriculture, Hospitality, Healthcare, Logistics, Tech, Retail, Maintenance. Qualified European talents for all your needs.',
      h1: 'European talents for all your activity sectors'
    },
    'es': {
      title: 'Todos nuestros Sectores de Actividad | Construcción Industria Hostelería Tech',
      description: '9 sectores de actividad cubiertos: Construcción, Industria, Agricultura, Hostelería, Salud, Logística, Tech, Comercio, Mantenimiento. Talentos europeos cualificados para todas sus necesidades.',
      h1: 'Talentos europeos para todos sus sectores de actividad'
    },
    'pt': {
      title: 'Todos os nossos Setores de Atividade | Construção Indústria Hotelaria Tech',
      description: '9 setores de atividade cobertos: Construção, Indústria, Agricultura, Hotelaria, Saúde, Logística, Tech, Comércio, Manutenção. Talentos europeus qualificados para todas as suas necessidades.',
      h1: 'Talentos europeus para todos os seus setores de atividade'
    },
    'de': {
      title: 'Alle unsere Tätigkeitsbereiche | Bau Industrie Gastgewerbe Tech',
      description: '9 Tätigkeitsbereiche abgedeckt: Bau, Industrie, Landwirtschaft, Gastgewerbe, Gesundheit, Logistik, Tech, Handel, Wartung. Qualifizierte europäische Talente für alle Ihre Bedürfnisse.',
      h1: 'Europäische Talente für alle Ihre Tätigkeitsbereiche'
    },
    'it': {
      title: 'Tutti i nostri Settori di Attività | Edilizia Industria Ospitalità Tech',
      description: '9 settori di attività coperti: Edilizia, Industria, Agricoltura, Ospitalità, Sanità, Logistica, Tech, Commercio, Manutenzione. Talenti europei qualificati per tutte le vostre esigenze.',
      h1: 'Talenti europei per tutti i vostri settori di attività'
    },
    'nl': {
      title: 'Al onze Activiteitensectoren | Bouw Industrie Horeca Tech',
      description: '9 activiteitensectoren gedekt: Bouw, Industrie, Landbouw, Horeca, Gezondheidszorg, Logistiek, Tech, Handel, Onderhoud. Gekwalificeerde Europese talenten voor al uw behoeften.',
      h1: 'Europese talenten voor al uw activiteitensectoren'
    },
    'pl': {
      title: 'Wszystkie nasze Sektory Działalności | Budowa Przemysł Hotelarstwo Tech',
      description: '9 sektorów działalności objętych: Budowa, Przemysł, Rolnictwo, Hotelarstwo, Zdrowie, Logistyka, Tech, Handel, Konserwacja. Wykwalifikowani europejscy talenty dla wszystkich Twoich potrzeb.',
      h1: 'Europejskie talenty dla wszystkich Twoich sektorów działalności'
    },
    'ro': {
      title: 'Toate Sectoarele noastre de Activitate | Construcții Industrie Ospitalitate Tech',
      description: '9 sectoare de activitate acoperite: Construcții, Industrie, Agricultură, Ospitalitate, Sănătate, Logistică, Tech, Comerț, Întreținere. Talente europene calificate pentru toate nevoile dumneavoastră.',
      h1: 'Talente europene pentru toate sectoarele dumneavoastră de activitate'
    },
    'cs': {
      title: 'Všechny naše Odvětví Činnosti | Stavebnictví Průmysl Pohostinství Tech',
      description: '9 odvětví činnosti pokrytých: Stavebnictví, Průmysl, Zemědělství, Pohostinství, Zdravotnictví, Logistika, Tech, Obchod, Údržba. Kvalifikované evropské talenty pro všechny vaše potřeby.',
      h1: 'Evropské talenty pro všechna vaše odvětví činnosti'
    },
    'sk': {
      title: 'Všetky naše Odvetvia Činnosti | Stavebníctvo Priemysel Pohostinstvo Tech',
      description: '9 odvetví činnosti pokrytých: Stavebníctvo, Priemysel, Poľnohospodárstvo, Pohostinstvo, Zdravotníctvo, Logistika, Tech, Obchod, Údržba. Kvalifikované európske talenty pre všetky vaše potreby.',
      h1: 'Európske talenty pre všetky vaše odvetvia činnosti'
    },
    'hu': {
      title: 'Minden Tevékenységi Ágazatunk | Építőipar Ipar Vendéglátás Tech',
      description: '9 tevékenységi ágazat lefedve: Építőipar, Ipar, Mezőgazdaság, Vendéglátás, Egészségügy, Logisztika, Tech, Kereskedelem, Karbantartás. Képzett európai tehetségek minden igényére.',
      h1: 'Európai tehetségek minden tevékenységi ágazatához'
    },
    'bg': {
      title: 'Всички наши Сектори на Дейност | Строителство Индустрия Хотелиерство Tech',
      description: '9 сектора на дейност покрити: Строителство, Индустрия, Земеделие, Хотелиерство, Здравеопазване, Логистика, Tech, Търговия, Поддръжка. Квалифицирани европейски таланти за всички ваши нужди.',
      h1: 'Европейски таланти за всички ваши сектори на дейност'
    },
    'el': {
      title: 'Όλοι οι Τομείς Δραστηριότητάς μας | Κατασκευές Βιομηχανία Φιλοξενία Tech',
      description: '9 τομείς δραστηριότητας καλύπτονται: Κατασκευές, Βιομηχανία, Γεωργία, Φιλοξενία, Υγεία, Logistics, Tech, Εμπόριο, Συντήρηση. Καταρτισμένα ευρωπαϊκά ταλέντα για όλες τις ανάγκες σας.',
      h1: 'Ευρωπαϊκά ταλέντα για όλους τους τομείς δραστηριότητάς σας'
    },
    'hr': {
      title: 'Svi naši Sektori Djelatnosti | Gradnja Industrija Ugostiteljstvo Tech',
      description: '9 sektora djelatnosti pokriveno: Gradnja, Industrija, Poljoprivreda, Ugostiteljstvo, Zdravstvo, Logistika, Tech, Trgovina, Održavanje. Kvalificirani europski talenti za sve vaše potrebe.',
      h1: 'Europski talenti za sve vaše sektore djelatnosti'
    },
    'sl': {
      title: 'Vsi naši Sektorji Dejavnosti | Gradbeništvo Industrija Gostinstvo Tech',
      description: '9 sektorjev dejavnosti pokritih: Gradbeništvo, Industrija, Kmetijstvo, Gostinstvo, Zdravstvo, Logistika, Tech, Trgovina, Vzdrževanje. Kvalificirani evropski talenti za vse vaše potrebe.',
      h1: 'Evropski talenti za vse vaše sektorje dejavnosti'
    },
    'lt': {
      title: 'Visi mūsų Veiklos Sektoriai | Statyba Pramonė Svetingumas Tech',
      description: '9 veiklos sektoriai padengti: Statyba, Pramonė, Žemės ūkis, Svetingumas, Sveikatos priežiūra, Logistika, Tech, Prekyba, Priežiūra. Kvalifikuoti europos talentai visiems jūsų poreikiams.',
      h1: 'Europos talentai visiems jūsų veiklos sektoriams'
    },
    'lv': {
      title: 'Visi mūsu Darbības Sektori | Būvniecība Rūpniecība Viesmīlība Tech',
      description: '9 darbības sektori apsegti: Būvniecība, Rūpniecība, Lauksaimniecība, Viesmīlība, Veselības aprūpe, Loģistika, Tech, Tirdzniecība, Apkope. Kvalificēti Eiropas talanti visām jūsu vajadzībām.',
      h1: 'Eiropas talanti visiem jūsu darbības sektoriem'
    },
    'et': {
      title: 'Kõik meie Tegevusvaldkonnad | Ehitus Tööstus Külalislahkus Tech',
      description: '9 tegevusvaldkonda kaetud: Ehitus, Tööstus, Põllumajandus, Külalislahkus, Tervishoid, Logistika, Tech, Kaubandus, Hooldus. Kvalifitseeritud Euroopa talendid kõigiks teie vajadusteks.',
      h1: 'Euroopa talendid kõigisse teie tegevusvaldkondadesse'
    },
    'sv': {
      title: 'Alla våra Verksamhetssektorer | Bygg Industri Gästfrihet Tech',
      description: '9 verksamhetssektorer täckta: Bygg, Industri, Jordbruk, Gästfrihet, Hälsovård, Logistik, Tech, Handel, Underhåll. Kvalificerade europeiska talanger för alla dina behov.',
      h1: 'Europeiska talanger för alla dina verksamhetssektorer'
    },
    'da': {
      title: 'Alle vores Aktivitetssektorer | Byggeri Industri Gæstfrihed Tech',
      description: '9 aktivitetssektorer dækket: Byggeri, Industri, Landbrug, Gæstfrihed, Sundhed, Logistik, Tech, Handel, Vedligeholdelse. Kvalificerede europæiske talenter til alle dine behov.',
      h1: 'Europæiske talenter til alle dine aktivitetssektorer'
    },
    'fi': {
      title: 'Kaikki toimiala-aluemme | Rakentaminen Teollisuus Vieraanvaraisuus Tech',
      description: '9 toimiala-aluetta katettu: Rakentaminen, Teollisuus, Maatalous, Vieraanvaraisuus, Terveydenhuolto, Logistiikka, Tech, Kauppa, Ylläpito. Pätevät eurooppalaiset lahjakkuudet kaikkiin tarpeisiisi.',
      h1: 'Eurooppalaiset lahjakkuudet kaikkiin toimiala-alueisiisi'
    },
    'no': {
      title: 'Alle våre Aktivitetssektorer | Bygg Industri Gjestfrihet Tech',
      description: '9 aktivitetssektorer dekket: Bygg, Industri, Jordbruk, Gjestfrihet, Helsevesen, Logistikk, Tech, Handel, Vedlikehold. Kvalifiserte europeiske talenter for alle dine behov.',
      h1: 'Europeiske talenter for alle dine aktivitetssektorer'
    }
  },

  // --------------------------------------------------------------------------
  // TÉMOIGNAGES
  // --------------------------------------------------------------------------
  'temoignages': {
    'fr': {
      title: 'Témoignages Clients | Avis & Retours d\'Expérience YOJOB',
      description: 'Découvrez les témoignages de nos clients : études de cas Bouygues, Renault, Pierre & Vacances. 98% de satisfaction, 2000+ missions réussies. Note moyenne 4.9/5.',
      h1: 'Ils nous font confiance pour leur recrutement européen',
      keywords: ['témoignages clients', 'avis YOJOB', 'études de cas', 'satisfaction client', 'retours expérience']
    },
    'en': {
      title: 'Client Testimonials | Reviews & Feedback YOJOB',
      description: 'Discover our clients\' testimonials: case studies Bouygues, Renault, Pierre & Vacances. 98% satisfaction, 2000+ successful missions. Average rating 4.9/5.',
      h1: 'They trust us for their European recruitment'
    },
    'es': {
      title: 'Testimonios de Clientes | Opiniones y Comentarios YOJOB',
      description: 'Descubra los testimonios de nuestros clientes: estudios de caso Bouygues, Renault, Pierre & Vacances. 98% de satisfacción, 2000+ misiones exitosas. Calificación promedio 4.9/5.',
      h1: 'Confían en nosotros para su reclutamiento europeo'
    },
    'pt': {
      title: 'Testemunhos de Clientes | Avaliações e Feedback YOJOB',
      description: 'Descubra os testemunhos dos nossos clientes: estudos de caso Bouygues, Renault, Pierre & Vacances. 98% de satisfação, 2000+ missões bem-sucedidas. Avaliação média 4.9/5.',
      h1: 'Eles confiam em nós para o seu recrutamento europeu'
    },
    'de': {
      title: 'Kundenstimmen | Bewertungen & Feedback YOJOB',
      description: 'Entdecken Sie die Erfahrungsberichte unserer Kunden: Fallstudien Bouygues, Renault, Pierre & Vacances. 98% Zufriedenheit, 2000+ erfolgreiche Missionen. Durchschnittsbewertung 4.9/5.',
      h1: 'Sie vertrauen uns für ihre europäische Personalbeschaffung'
    },
    'it': {
      title: 'Testimonianze dei Clienti | Recensioni & Feedback YOJOB',
      description: 'Scopri le testimonianze dei nostri clienti: casi studio Bouygues, Renault, Pierre & Vacances. 98% di soddisfazione, 2000+ missioni riuscite. Valutazione media 4.9/5.',
      h1: 'Si fidano di noi per il loro reclutamento europeo'
    },
    'nl': {
      title: 'Klantervaringen | Beoordelingen & Feedback YOJOB',
      description: 'Ontdek de getuigenissen van onze klanten: casestudies Bouygues, Renault, Pierre & Vacances. 98% tevredenheid, 2000+ succesvolle opdrachten. Gemiddelde beoordeling 4.9/5.',
      h1: 'Ze vertrouwen ons voor hun Europese werving'
    },
    'pl': {
      title: 'Opinie Klientów | Recenzje & Opinie YOJOB',
      description: 'Odkryj opinie naszych klientów: studia przypadków Bouygues, Renault, Pierre & Vacances. 98% zadowolenia, 2000+ udanych misji. Średnia ocena 4.9/5.',
      h1: 'Ufają nam w swojej europejskiej rekrutacji'
    },
    'ro': {
      title: 'Mărturii Clienți | Recenzii & Feedback YOJOB',
      description: 'Descoperiți mărturiile clienților noștri: studii de caz Bouygues, Renault, Pierre & Vacances. 98% satisfacție, 2000+ misiuni reușite. Evaluare medie 4.9/5.',
      h1: 'Ne au încredere pentru recrutarea lor europeană'
    },
    'cs': {
      title: 'Reference Klientů | Hodnocení & Zpětná Vazba YOJOB',
      description: 'Objevte reference našich klientů: případové studie Bouygues, Renault, Pierre & Vacances. 98% spokojenost, 2000+ úspěšných misí. Průměrné hodnocení 4.9/5.',
      h1: 'Důvěřují nám pro svůj evropský nábor'
    },
    'sk': {
      title: 'Referencie Klientov | Hodnotenia & Spätná Väzba YOJOB',
      description: 'Objavte referencie našich klientov: prípadové štúdie Bouygues, Renault, Pierre & Vacances. 98% spokojnosť, 2000+ úspešných misií. Priemerné hodnotenie 4.9/5.',
      h1: 'Dôverujú nám pre svoj európsky nábor'
    },
    'hu': {
      title: 'Ügyféltörténetek | Értékelések & Visszajelzések YOJOB',
      description: 'Fedezze fel ügyfeleink véleményét: esettanulmányok Bouygues, Renault, Pierre & Vacances. 98% elégedettség, 2000+ sikeres küldetés. Átlagos értékelés 4.9/5.',
      h1: 'Bíznak bennünk európai toborzásukban'
    },
    'bg': {
      title: 'Отзиви на Клиенти | Мнения & Обратна Връзка YOJOB',
      description: 'Открийте отзивите на нашите клиенти: казуси Bouygues, Renault, Pierre & Vacances. 98% удовлетвореност, 2000+ успешни мисии. Средна оценка 4.9/5.',
      h1: 'Доверяват ни се за техния европейски набор'
    },
    'el': {
      title: 'Μαρτυρίες Πελατών | Αξιολογήσεις & Σχόλια YOJOB',
      description: 'Ανακαλύψτε τις μαρτυρίες των πελατών μας: μελέτες περίπτωσης Bouygues, Renault, Pierre & Vacances. 98% ικανοποίηση, 2000+ επιτυχημένες αποστολές. Μέση βαθμολογία 4.9/5.',
      h1: 'Μας εμπιστεύονται για την ευρωπαϊκή τους πρόσληψη'
    },
    'hr': {
      title: 'Svjedočanstva Klijenata | Recenzije & Povratne Informacije YOJOB',
      description: 'Otkrijte svjedočanstva naših klijenata: studije slučaja Bouygues, Renault, Pierre & Vacances. 98% zadovoljstvo, 2000+ uspješnih misija. Prosječna ocjena 4.9/5.',
      h1: 'Vjeruju nam za svoje europsko zapošljavanje'
    },
    'sl': {
      title: 'Pričevanja Strank | Ocene & Povratne Informacije YOJOB',
      description: 'Odkrijte pričevanja naših strank: študije primerov Bouygues, Renault, Pierre & Vacances. 98% zadovoljstvo, 2000+ uspešnih misij. Povprečna ocena 4.9/5.',
      h1: 'Zaupajo nam za svoje evropsko zaposlovanje'
    },
    'lt': {
      title: 'Klientų Atsiliepimai | Apžvalgos & Grįžtamasis Ryšys YOJOB',
      description: 'Atraskite mūsų klientų atsiliepimus: atvejų studijos Bouygues, Renault, Pierre & Vacances. 98% pasitenkinimas, 2000+ sėkmingų misijų. Vidutinis įvertinimas 4.9/5.',
      h1: 'Jie pasitiki mumis dėl savo Europos įdarbinimo'
    },
    'lv': {
      title: 'Klientu Atsauksmes | Vērtējumi & Atgriezeniskā Saite YOJOB',
      description: 'Atklājiet mūsu klientu atsauksmes: gadījumu izpēte Bouygues, Renault, Pierre & Vacances. 98% apmierinātība, 2000+ veiksmīgas misijas. Vidējais vērtējums 4.9/5.',
      h1: 'Viņi uzticas mums savas Eiropas pieņemšanas darbā'
    },
    'et': {
      title: 'Klientide Tunnustused | Arvustused & Tagasiside YOJOB',
      description: 'Avastage meie klientide tunnustused: juhtumite uuringud Bouygues, Renault, Pierre & Vacances. 98% rahulolu, 2000+ edukat missiooni. Keskmine hinnang 4.9/5.',
      h1: 'Nad usaldavad meid oma Euroopa värbamises'
    },
    'sv': {
      title: 'Kundrecensioner | Omdömen & Återkoppling YOJOB',
      description: 'Upptäck våra kunders vittnesmål: fallstudier Bouygues, Renault, Pierre & Vacances. 98% tillfredsställelse, 2000+ framgångsrika uppdrag. Genomsnittligt betyg 4.9/5.',
      h1: 'De litar på oss för sin europeiska rekrytering'
    },
    'da': {
      title: 'Kundeanmeldelser | Anmeldelser & Feedback YOJOB',
      description: 'Opdag vores kunders anbefalinger: casestudier Bouygues, Renault, Pierre & Vacances. 98% tilfredshed, 2000+ vellykkede missioner. Gennemsnitlig vurdering 4.9/5.',
      h1: 'De stoler på os til deres europæiske rekruttering'
    },
    'fi': {
      title: 'Asiakaspalautteet | Arvostelut & Palaute YOJOB',
      description: 'Tutustu asiakkaidemme suosituksiin: tapaustutkimukset Bouygues, Renault, Pierre & Vacances. 98% tyytyväisyys, 2000+ onnistunutta tehtävää. Keskiarvo 4.9/5.',
      h1: 'He luottavat meihin eurooppalaisessa rekrytoinnissaan'
    },
    'no': {
      title: 'Kundeanbefalinger | Anmeldelser & Tilbakemelding YOJOB',
      description: 'Oppdag våre kunders vitnesbyrd: casestudier Bouygues, Renault, Pierre & Vacances. 98% tilfredshet, 2000+ vellykkede oppdrag. Gjennomsnittlig vurdering 4.9/5.',
      h1: 'De stoler på oss for sin europeiske rekruttering'
    }
  },

  // --------------------------------------------------------------------------
  // INTÉRIM EUROPÉEN (service page)
  // --------------------------------------------------------------------------
  'interim-europeen': {
    'fr': {
      title: 'Intérim Européen BTP Industrie | Travailleurs Détachés YOJOB',
      description: 'Service d\'intérim européen pour le BTP et l\'industrie. Travailleurs qualifiés détachés depuis le Portugal, la Roumanie et la Pologne. Conformité UE garantie.',
      h1: 'Intérim Européen : Vos Travailleurs Qualifiés en 15 Jours',
      keywords: ['intérim européen', 'travailleurs détachés', 'BTP Europe', 'personnel européen']
    },
    'en': {
      title: 'European Temporary Work Construction Industry | Posted Workers YOJOB',
      description: 'European temporary staffing service for construction and industry. Qualified posted workers from Portugal, Romania and Poland. EU compliance guaranteed.',
      h1: 'European Temporary Work: Your Qualified Workers in 15 Days'
    }
  },

  // --------------------------------------------------------------------------
  // RECRUTEMENT SPÉCIALISÉ (service page)
  // --------------------------------------------------------------------------
  'recrutement-specialise': {
    'fr': {
      title: 'Recrutement Spécialisé Europe | Talents Qualifiés BTP Industrie YOJOB',
      description: 'Recrutement spécialisé de talents européens qualifiés pour le BTP et l\'industrie. Sélection rigoureuse, profils vérifiés, mobilisation rapide dans 27 pays.',
      h1: 'Recrutement Spécialisé de Talents Européens Qualifiés',
      keywords: ['recrutement spécialisé', 'talents européens', 'recrutement BTP', 'profils qualifiés Europe']
    },
    'en': {
      title: 'Specialized European Recruitment | Qualified Talents Construction YOJOB',
      description: 'Specialized recruitment of qualified European talents for construction and industry. Rigorous selection, verified profiles, rapid mobilization in 27 countries.',
      h1: 'Specialized Recruitment of Qualified European Talents'
    }
  },

  // --------------------------------------------------------------------------
  // CONSEIL CONFORMITÉ (service page)
  // --------------------------------------------------------------------------
  'conseil-conformite': {
    'fr': {
      title: 'Conseil Conformité Détachement Travailleurs Europe | YOJOB',
      description: 'Conseil en conformité pour le détachement de travailleurs européens. Directive UE, formulaire A1, obligations légales. Accompagnement expert pour employeurs.',
      h1: 'Conseil en Conformité pour le Détachement de Travailleurs Européens',
      keywords: ['conformité détachement', 'directive travailleurs détachés', 'formulaire A1', 'obligations légales']
    },
    'en': {
      title: 'Compliance Consulting European Worker Posting | YOJOB',
      description: 'Compliance consulting for European worker posting. EU directive, A1 form, legal obligations. Expert support for employers.',
      h1: 'Compliance Consulting for European Worker Posting'
    }
  },

  // --------------------------------------------------------------------------
  // DÉTACHEMENT DE PERSONNEL (service page)
  // --------------------------------------------------------------------------
  'detachement-personnel': {
    'fr': {
      title: 'Détachement de Personnel Européen | Gestion Complète YOJOB',
      description: 'Service complet de détachement de personnel européen. Gestion administrative, hébergement, transport. Travailleurs qualifiés BTP et industrie depuis 27 pays UE.',
      h1: 'Détachement de Personnel Européen : Gestion Complète de A à Z',
      keywords: ['détachement personnel', 'gestion détachement', 'personnel européen', 'travailleurs BTP Europe']
    },
    'en': {
      title: 'European Staff Posting | Complete Management YOJOB',
      description: 'Complete European staff posting service. Administrative management, accommodation, transport. Qualified construction and industry workers from 27 EU countries.',
      h1: 'European Staff Posting: Complete A-to-Z Management'
    }
  },

  // --------------------------------------------------------------------------
  // PRIVACY (legal page)
  // --------------------------------------------------------------------------
  'privacy': {
    'fr': {
      title: 'Politique de Confidentialité | Protection des Données YOJOB',
      description: 'Politique de confidentialité YOJOB. Traitement des données personnelles conforme RGPD. Droits d\'accès, de rectification et de suppression. DPO joignable.',
      h1: 'Politique de Confidentialité et Protection des Données'
    },
    'en': {
      title: 'Privacy Policy | Data Protection YOJOB',
      description: 'YOJOB privacy policy. Personal data processing compliant with GDPR. Rights of access, rectification and deletion. DPO reachable.',
      h1: 'Privacy Policy and Data Protection'
    }
  },

  // --------------------------------------------------------------------------
  // LEGAL (legal page)
  // --------------------------------------------------------------------------
  'legal': {
    'fr': {
      title: 'Mentions Légales | Informations Juridiques YOJOB',
      description: 'Mentions légales du site yojob.fr. Éditeur, hébergeur, conditions d\'utilisation, propriété intellectuelle. YOJOB - Courtier en recrutement européen.',
      h1: 'Mentions Légales'
    },
    'en': {
      title: 'Legal Notice | Legal Information YOJOB',
      description: 'Legal notice of yojob.fr website. Publisher, host, terms of use, intellectual property. YOJOB - European recruitment broker.',
      h1: 'Legal Notice'
    }
  },

  // --------------------------------------------------------------------------
  // CGV (legal page)
  // --------------------------------------------------------------------------
  'cgv': {
    'fr': {
      title: 'Conditions Générales de Vente | CGV YOJOB',
      description: 'Conditions générales de vente YOJOB. Prestations de courtage en intérim et détachement européen. Tarification, paiement, responsabilités, litiges.',
      h1: 'Conditions Générales de Vente'
    },
    'en': {
      title: 'General Terms and Conditions | YOJOB',
      description: 'YOJOB general terms and conditions. European temporary work and posting brokerage services. Pricing, payment, responsibilities, disputes.',
      h1: 'General Terms and Conditions'
    }
  }
};

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Récupérer les métadonnées d'une page dans une langue donnée
 */
export function getPageMetadata(page: PageKey, lang: DevisLanguage): PageMetadata {
  return SEO_METADATA[page][lang] || SEO_METADATA[page]['fr'];
}

/**
 * Générer le schéma Organization pour toutes les pages
 */
export function getOrganizationSchema(baseUrl: string = 'https://yojob.fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YOJOB',
    description: 'Courtier en recrutement et détachement de personnel européen BTP et industrie',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    areaServed: ['FR', 'PT', 'RO', 'PL', 'ES', 'IT', 'DE', 'NL', 'BE', 'LU', 'AT', 'CZ', 'SK', 'HU', 'BG', 'GR', 'HR', 'SI', 'LT', 'LV', 'EE', 'SE', 'DK', 'FI', 'NO', 'IE'],
    serviceType: ['Détachement de personnel', 'Intérim européen', 'Recrutement international'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      areaServed: 'EU',
      availableLanguage: ['French', 'English', 'Portuguese', 'Spanish', 'German', 'Italian', 'Polish', 'Romanian']
    },
    sameAs: [
      'https://www.linkedin.com/company/yojob'
    ]
  };
}

/**
 * Générer le schéma Service pour une page spécifique
 */
export function getServiceSchema(page: PageKey, lang: DevisLanguage = 'fr') {
  const metadata = getPageMetadata(page, lang);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: metadata.h1,
    description: metadata.description,
    provider: {
      '@type': 'Organization',
      name: 'YOJOB'
    },
    areaServed: {
      '@type': 'Country',
      name: ['Portugal', 'Romania', 'Poland', 'France']
    },
    serviceType: page.includes('btp') ? 'Construction Worker Posting' : 'Industrial Worker Posting'
  };
}

/**
 * Générer le schéma WebSite + SearchAction pour la page d'accueil
 */
export function getWebSiteSchema(baseUrl: string = 'https://yojob.fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'YOJOB',
    url: baseUrl,
    description: 'Courtier en recrutement et détachement de personnel européen BTP et industrie',
    inLanguage: 'fr',
  };
}

/**
 * Mapping des noms de pages FR pour les breadcrumbs
 */
const BREADCRUMB_LABELS_FR: Record<string, string> = {
  '': 'Accueil',
  'services': 'Services',
  'interim-europeen': 'Intérim Européen',
  'recrutement-specialise': 'Recrutement Spécialisé',
  'conseil-conformite': 'Conseil Conformité',
  'detachement-personnel': 'Détachement de Personnel',
  'a-propos': 'À Propos',
  'notre-reseau': 'Notre Réseau',
  'nos-secteurs': 'Nos Secteurs',
  'temoignages': 'Témoignages',
  'devis': 'Devis',
  'privacy': 'Politique de Confidentialité',
  'legal': 'Mentions Légales',
  'cgv': 'CGV',
  'detachement-btp': 'Détachement BTP',
  'detachement-industrie': 'Détachement Industrie',
  'blog': 'Blog',
  'directive-detachement-europe': 'Directive Travailleurs Détachés',
};

/**
 * Générer le schéma BreadcrumbList basé sur le chemin courant
 */
export function getBreadcrumbSchema(currentPath: string, baseUrl: string = 'https://yojob.fr') {
  const segments = currentPath.split('/').filter(Boolean);

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: baseUrl
    }
  ];

  let cumulativePath = '';
  for (let i = 0; i < segments.length; i++) {
    cumulativePath += '/' + segments[i];
    const label = BREADCRUMB_LABELS_FR[segments[i]] || segments[i];
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: label,
      item: `${baseUrl}${cumulativePath}`
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

/**
 * Générer le schéma FAQPage à partir d'une liste de Q/A
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
