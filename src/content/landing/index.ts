/**
 * 🌍 Landing Page Content - Central Export
 * Point d'entrée unique pour tous les contenus multilingues
 */

import { LandingContentCollection } from '../../types/landingContent';
import { landingContentFR } from './fr';
import { landingContentEN } from './en';
import { landingContentDE } from './de';
import { landingContentES } from './es';
import { landingContentIT } from './it';
import { landingContentPT } from './pt';
import { landingContentNL } from './nl';
import { landingContentPL } from './pl';
import { landingContentRO } from './ro';
import { landingContentBG } from './bg';
import { landingContentHU } from './hu';
import { landingContentCS } from './cs';
import { landingContentSK } from './sk';
import { landingContentHR } from './hr';
import { landingContentSL } from './sl';
import { landingContentLT } from './lt';
import { landingContentLV } from './lv';
import { landingContentET } from './et';
import { landingContentEL } from './el';
import { landingContentSV } from './sv';
import { landingContentDA } from './da';
import { landingContentFI } from './fi';
import { landingContentNO } from './no';

/**
 * Collection complète des contenus de la landing
 * 23 langues européennes entièrement traduites ✅
 */
export const landingContent: LandingContentCollection = {
  fr: landingContentFR,
  en: landingContentEN,
  de: landingContentDE,
  es: landingContentES,
  it: landingContentIT,
  pt: landingContentPT,
  nl: landingContentNL,
  pl: landingContentPL,
  ro: landingContentRO,
  bg: landingContentBG,
  hu: landingContentHU,
  cs: landingContentCS,
  sk: landingContentSK,
  hr: landingContentHR,
  sl: landingContentSL,
  lt: landingContentLT,
  lv: landingContentLV,
  et: landingContentET,
  el: landingContentEL,
  sv: landingContentSV,
  da: landingContentDA,
  fi: landingContentFI,
  no: landingContentNO,
};

/**
 * Helper pour récupérer le contenu dans une langue donnée
 * Fallback sur le français si la langue n'existe pas
 */
export function getLandingContent(lang: string) {
  const content = landingContent[lang as keyof LandingContentCollection];
  return content || landingContent.fr;
}

// Exports individuels pour toutes les langues
export { landingContentFR } from './fr';
export { landingContentEN } from './en';
export { landingContentDE } from './de';
export { landingContentES } from './es';
export { landingContentIT } from './it';
export { landingContentPT } from './pt';
export { landingContentNL } from './nl';
export { landingContentPL } from './pl';
export { landingContentRO } from './ro';
export { landingContentBG } from './bg';
export { landingContentHU } from './hu';
export { landingContentCS } from './cs';
export { landingContentSK } from './sk';
export { landingContentHR } from './hr';
export { landingContentSL } from './sl';
export { landingContentLT } from './lt';
export { landingContentLV } from './lv';
export { landingContentET } from './et';
export { landingContentEL } from './el';
export { landingContentSV } from './sv';
export { landingContentDA } from './da';
export { landingContentFI } from './fi';
export { landingContentNO } from './no';