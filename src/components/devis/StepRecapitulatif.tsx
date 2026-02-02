import { useState } from 'react';
import { 
  Check, AlertCircle, Edit2, ChevronDown, ChevronUp, Package, Users, 
  Globe, Calendar, DollarSign, Building2, Clock, User, Briefcase, 
  FileText, CheckCircle, ArrowRight, Plus 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import type { DevisFormData } from '../../types/devis';
import { 
  formaterMontant, 
  calculerCoutAvecHeuresSup, 
  calculerPanierRepasMensuel,
  calculerTauxETTComplet,
  calculerMajorationsDevis,
  appliquerMajorationTaux
} from '../../utils/devis-calculations';
import { getPanierRepas } from '../../data/config/helpers';
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import { translateSecteur, translatePoste, translateClassification, translatePays } from '../../utils/recapitulatif-translations';
import type { DevisLanguage } from '../../src/i18n/devis/types';

// 🔑 Mapping entre clés techniques et labels français pour compatibilité
const SECTEUR_KEY_TO_LABEL: Record<string, string> = {
  batiment: 'Bâtiment',
  metallurgie: 'Métallurgie',
  tp: 'TP',
  hotellerie: 'Hôtellerie',
  restauration: 'Restauration',
  plasturgie: 'Plasturgie',
  automobile_carrosserie: 'Automobile Carrosserie',
  sylviculture: 'Sylviculture',
  cartonnerie: 'Cartonnerie',
  autre: 'Autre',
};

const BASE_HORAIRE_LEGALE = 151.67;
const DEFAULT_VAT_RATE = 0.2;

interface StepRecapitulatifProps {
  formData: DevisFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
  lang?: DevisLanguage;
  onGoToStep?: (step: number) => void;  // 🆕 Fonction pour naviguer vers une étape
  pricingLoading?: boolean;
}

export function StepRecapitulatif({ formData, onSubmit, isSubmitting, lang = 'fr', onGoToStep, pricingLoading = false }: StepRecapitulatifProps) {
  const { t, isLoading: isLoadingTranslations } = useDevisTranslationStatic(lang);
  const [accepteConditions, setAccepteConditions] = useState(false);

  // 🔒 Protection : Afficher le loader si les traductions ne sont pas chargées
  if (isLoadingTranslations) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
          <div className="text-white/70 text-lg">Chargement des traductions...</div>
        </div>
      </div>
    );
  }

  // 🔒 Vérification complète : toutes les structures de traduction nécessaires
  if (!t || 
      !t.common || 
      !t.recapitulatif || 
      !t.recapitulatif.majorations ||
      !t.step3?.fields?.nationalite ||
      !t.step4?.fields?.delaiPaiement?.options ||
      !t.step5?.sections?.experience?.obligatoire ||
      !t.step5?.sections?.formation?.obligatoire ||
      !t.step5?.sections?.permis?.requis ||
      !t.step5?.sections?.langues ||
      !t.step5?.sections?.outillage?.requis) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
          <div className="text-white/70 text-lg">Chargement des traductions...</div>
        </div>
      </div>
    );
  }

  const pricing = (formData as any)?.pricing;
  const baseHoraireMensuelle = pricing?.baseHoraireMensuelle ?? (Number(formData.conditions.baseHoraire) || BASE_HORAIRE_LEGALE);
  const baseHoraireLegale = pricing?.baseHoraireLegale ?? BASE_HORAIRE_LEGALE;
  const vatRate = pricing?.totals?.tvaRate ?? DEFAULT_VAT_RATE;
  const hasCanonicalPricing = Boolean(pricing?.totals);

  const majorations = calculerMajorationsDevis({
    delaiPaiement: formData.conditions.delaiPaiement,
    experience: formData.candidats.experience,
    permis: formData.candidats.permis,
    langues: formData.candidats.langues,
    outillage: formData.candidats.outillage,
  });

  const formatPercent = (value: number) => {
    if (!value) return '0%';
    const sign = value > 0 ? '+' : '';
    return `${sign}${Math.round(value * 100)}%`;
  };

  const delaiKey = formData.conditions.delaiPaiement as keyof typeof t.step4.fields.delaiPaiement.options | undefined;
  const delaiPaiementLabel = delaiKey
    ? t.step4.fields.delaiPaiement.options[delaiKey]
    : t.recapitulatif.majorations.notSet;

  const yesNoLabels: Record<string, { yes: string; no: string }> = {
    fr: { yes: 'Oui', no: 'Non' },
    en: { yes: 'Yes', no: 'No' },
  };
  const yesNo = yesNoLabels[lang] || yesNoLabels.en;

  const yearsUnit = t.common.year || (lang === 'fr' ? 'ans' : 'years');
  const experienceDetail = formData.candidats.experience.obligatoire
    ? (formData.candidats.experience.annees ? `${formData.candidats.experience.annees} ${yearsUnit}` : yesNo.yes)
    : yesNo.no;

  const getLangueMajorationLabel = () => {
    const langues = formData.candidats.langues || {};
    let bestLevel = '';
    let bestValue = 0;
    Object.values(langues).forEach((niveau) => {
      const normalized = (niveau || '').toUpperCase();
      const value = normalized === 'B1' ? 0.03
        : normalized === 'B2' ? 0.04
        : normalized === 'C1' ? 0.05
        : normalized === 'C2' ? 0.07
        : 0;
      if (value > bestValue) {
        bestValue = value;
        bestLevel = normalized;
      }
    });
    return bestLevel ? bestLevel : t.recapitulatif.majorations.notSet;
  };

  // 🆕 Recalcul complet avec nouvelles fonctions
  const calculerTotalCorrect = () => {
    let totalMensuel = 0;
    
    formData.postes.forEach(poste => {
      const baseHoraire = baseHoraireMensuelle;
      const tauxHoraireBrut = baseHoraire ? poste.salaireBrut / baseHoraire : 0;
      
      // Taux ETT avec suppléments horaires (sans panier)
      const tauxETTBase = calculerTauxETTComplet(
        tauxHoraireBrut,
        poste.coeffBase || 1.92,
        poste.facteurPays || 1.00,
        3.50,
        1.50,
        {
          hebergementNonFourni: !formData.conditions.hebergement.chargeEU,
          transportETT: formData.conditions.transportLocal.chargeETT
        }
      );

      // 🆕 Appliquer les majorations (délai paiement, expérience, permis, langues, outillage)
      const tauxETTMajore = appliquerMajorationTaux(tauxETTBase, majorations.total);
      
      // Coût main d'œuvre avec heures sup
      const detailHeures = calculerCoutAvecHeuresSup(
        tauxETTMajore,
        baseHoraire,
        poste.quantite
      );
      
      // Panier repas mensuel séparé
      const secteurLabel = SECTEUR_KEY_TO_LABEL[poste.secteur] || poste.secteur;
      const montantPanierJour = formData.conditions.repas.type === 'panier'
        ? getPanierRepas(formData.entreprise.region, secteurLabel)
        : 0;
      const panierMensuel = calculerPanierRepasMensuel(
        montantPanierJour,
        baseHoraire,
        poste.quantite
      );
      
      totalMensuel += detailHeures.coutTotal + panierMensuel;
    });
    
    return totalMensuel;
  };
  
  const previewTotalHT = calculerTotalCorrect();
  const previewTotalTVA = Math.round(previewTotalHT * vatRate * 100) / 100;
  const previewTotalTTC = Math.round((previewTotalHT + previewTotalTVA) * 100) / 100;
  
  // Calculer durée mission
  const calculerDuree = (dateDebut: string, dateFin: string | null): number => {
    if (!dateFin) return 1;
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = Math.abs(fin.getTime() - debut.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, Math.ceil(diffDays / 30));
  };
  
  const previewDureeMission = calculerDuree(formData.conditions.dateDebut, formData.conditions.dateFin);
  const previewTotalMission = Math.round(previewTotalTTC * previewDureeMission * 100) / 100;
  const totalHT = pricing?.totals?.totalMensuelHT ?? previewTotalHT;
  const totalTTC = pricing?.totals?.totalMensuelTTC ?? previewTotalTTC;
  const dureeMission = pricing?.totals?.dureeMissionMois ?? previewDureeMission;
  const totalMission = pricing?.totals?.totalMissionTTC ?? previewTotalMission;

  const handleSubmit = () => {
    if (!accepteConditions) {
      alert(t.recapitulatif.acceptConditionsError);
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">{t.recapitulatif.title}</h2>
        <p className="text-white/70">
          {t.recapitulatif.subtitle}
        </p>
      </div>

      {/* Informations Entreprise */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              {t.recapitulatif.entreprise.title}
            </CardTitle>
            {onGoToStep && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGoToStep(1)}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                {t.common?.edit || 'Modifier'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.entreprise.raisonSociale}</p>
              <p className="text-white">{formData.entreprise.raisonSociale}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.entreprise.siret}</p>
              <p className="text-white">{formData.entreprise.siret}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.entreprise.pays}</p>
              <p className="text-white">{formData.entreprise.pays || 'France'}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.entreprise.ville}</p>
              <p className="text-white">{formData.entreprise.ville}</p>
            </div>
            {formData.entreprise.region && (
              <div>
                <p className="text-white/60 text-sm">{t.recapitulatif.entreprise.region}</p>
                <p className="text-white">{formData.entreprise.region}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              {t.recapitulatif.contact.title}
            </CardTitle>
            {onGoToStep && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGoToStep(2)}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                {t.common?.edit || 'Modifier'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.contact.nomPrenom}</p>
              <p className="text-white">{formData.contact.prenom} {formData.contact.nom}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.contact.email}</p>
              <p className="text-white">{formData.contact.email}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.contact.telephone}</p>
              <p className="text-white">{formData.contact.telephonePortable}</p>
            </div>
            {formData.contact.fonction && (
              <div>
                <p className="text-white/60 text-sm">{t.recapitulatif.contact.fonction}</p>
                <p className="text-white">{formData.contact.fonction}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Postes demandés */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-violet-400" />
              {t.recapitulatif.postes.title} ({formData.postes.length})
            </CardTitle>
            {onGoToStep && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGoToStep(3)}
                  className="border-violet-400/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/20 hover:border-violet-400/50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {t.common?.add || 'Ajouter'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onGoToStep(3)}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-cyan-400/50"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  {t.common?.edit || 'Modifier'}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.postes.map((poste, index) => {
            // 🆕 Recalculer avec les nouvelles fonctions
            const pricingPoste = pricing?.postes?.find((p: any) => p?.id && p.id === poste.id) || pricing?.postes?.[index];
            const baseHoraire = baseHoraireMensuelle;
            const tauxHoraireBrut = pricingPoste?.tauxHoraireBrut ?? (baseHoraire ? poste.salaireBrut / baseHoraire : 0);
            
            // Taux ETT avec suppléments horaires uniquement (sans panier)
            const tauxETTBase = pricingPoste?.tauxETTBase ?? calculerTauxETTComplet(
              tauxHoraireBrut,
              poste.coeffBase || 1.92,
              poste.facteurPays || 1.00,
              3.50, // Hébergement
              1.50, // Transport
              {
                hebergementNonFourni: !formData.conditions.hebergement.chargeEU,
                transportETT: formData.conditions.transportLocal.chargeETT
              }
            );

            // 🆕 Appliquer les majorations (délai paiement, expérience, permis, langues, outillage)
            const tauxETTMajore = pricingPoste?.tauxETTMajore ?? appliquerMajorationTaux(tauxETTBase, majorations.total);
            
            // Détail des heures supplémentaires
            const detailHeures = pricingPoste?.heures ?? calculerCoutAvecHeuresSup(
              tauxETTMajore,
              baseHoraire,
              poste.quantite
            );
            
            // Panier repas mensuel (séparé)
            const secteurLabel = SECTEUR_KEY_TO_LABEL[poste.secteur] || poste.secteur;
            const montantPanierJour = pricingPoste?.panier?.montantJour ?? (formData.conditions.repas.type === 'panier' 
              ? getPanierRepas(formData.entreprise.region, secteurLabel)
              : 0);
            const panierMensuel = pricingPoste?.panier?.totalMensuel ?? calculerPanierRepasMensuel(montantPanierJour, baseHoraire, poste.quantite);
            
            const joursParMois = pricingPoste?.panier?.joursParMois ?? Math.round(baseHoraire / 7);
            const hasHeuresSup = baseHoraire > baseHoraireLegale;
            
            return (
              <div key={index} className="border border-white/10 rounded-lg p-4 bg-white/5 space-y-3">
                {/* En-tête du poste */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-medium">{translatePoste(poste.secteur, poste.poste, lang)}</h4>
                    <p className="text-white/60 text-sm">{translateSecteur(poste.secteur, lang)} • {translateClassification(poste.secteur, poste.classification, lang)}</p>
                    {poste.labelPays && (
                      <p className="text-cyan-300/80 text-sm mt-1">
                        📍 {t.step3.fields.nationalite.label}: {translatePays(poste.labelPays, lang)}
                      </p>
                    )}
                  </div>
                  <span className="bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-sm">
                    × {poste.quantite}
                  </span>
                </div>

                {/* Coefficient ETT */}
                {poste.coeffBase && poste.facteurPays && (
                  <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-400/20">
                    <p className="text-violet-200 text-xs mb-1">{t.recapitulatif.postes.coeffETT}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white/70">
                        {t.recapitulatif.postes.coeffBase}: <span className="text-white font-medium">{poste.coeffBase.toFixed(2)}</span>
                      </span>
                      <span className="text-white/50">×</span>
                      <span className="text-white/70">
                        {t.recapitulatif.postes.facteurPays}: <span className="text-white font-medium">{poste.facteurPays.toFixed(2)}</span>
                      </span>
                      <span className="text-white/50">=</span>
                      <span className="text-green-400 font-medium">
                        {(poste.coeffBase * poste.facteurPays).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* 🆕 Suppléments horaires (sans panier) */}
                {(!formData.conditions.hebergement.chargeEU || formData.conditions.transportLocal.chargeETT) && (
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                    <p className="text-cyan-200 text-xs mb-2">{t.recapitulatif.postes.supplementsHoraires}</p>
                    <div className="space-y-1 text-sm">
                      {!formData.conditions.hebergement.chargeEU && (
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">{t.recapitulatif.postes.hebergement}</span>
                          <span className="text-green-400 font-medium">+{formaterMontant(3.50)}/h</span>
                        </div>
                      )}
                      {formData.conditions.transportLocal.chargeETT && (
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">{t.recapitulatif.postes.transport}</span>
                          <span className="text-green-400 font-medium">+{formaterMontant(1.50)}/h</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 🆕 Panier repas (séparé) */}
                {montantPanierJour > 0 && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-400/20">
                    <p className="text-green-200 text-xs mb-2">{t.recapitulatif.postes.panierRepas}</p>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center justify-between text-white/70">
                        <span>
                          {formaterMontant(montantPanierJour)}{t.common.perDay} × {joursParMois} {t.common.days} × {poste.quantite} {t.common.persons}
                        </span>
                        <span className="text-green-400 font-medium">
                          {formaterMontant(panierMensuel)}{t.common.perMonth}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 🆕 Détail heures supplémentaires */}
                {hasHeuresSup && (
                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-400/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <p className="text-orange-200 text-xs">
                        {t.recapitulatif.postes.baseHoraire.replace('{heures}', baseHoraire.toString())}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm">
                      {/* Heures normales */}
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">
                          {t.recapitulatif.postes.heuresNormales} : {detailHeures.heuresNormales}h × {formaterMontant(tauxETTMajore)}/h
                        </span>
                        <span className="text-white font-medium">
                          {formaterMontant(detailHeures.coutHeuresNormales)}
                        </span>
                      </div>
                      
                      {/* Heures +25% */}
                      {detailHeures.heures25 > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">
                            {t.recapitulatif.postes.heuresSup25} : {detailHeures.heures25}h × {formaterMontant(tauxETTMajore * 1.25)}/h
                          </span>
                          <span className="text-orange-400 font-medium">
                            {formaterMontant(detailHeures.coutHeures25)}
                          </span>
                        </div>
                      )}
                      
                      {/* Heures +50% */}
                      {detailHeures.heures50 > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">
                            {t.recapitulatif.postes.heuresSup50} : {detailHeures.heures50}h × {formaterMontant(tauxETTMajore * 1.50)}/h
                          </span>
                          <span className="text-red-400 font-medium">
                            {formaterMontant(detailHeures.coutHeures50)}
                          </span>
                        </div>
                      )}
                      
                      <div className="border-t border-white/10 pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{t.recapitulatif.postes.sousTotal}</span>
                          <span className="text-cyan-400 font-bold">
                            {formaterMontant(detailHeures.coutTotal / poste.quantite)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Résumé final */}
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">{t.recapitulatif.postes.tauxHoraireBrut}</p>
                      <p className="text-white font-medium">{formaterMontant(tauxHoraireBrut)}/h</p>
                    </div>
                    <div>
                      <p className="text-white/60">{t.recapitulatif.postes.tauxETTFinal}</p>
                      <p className="text-white font-medium">{formaterMontant(tauxETTMajore)}/h</p>
                    </div>
                    <div>
                      <p className="text-white/60">{t.recapitulatif.postes.coutMensuel}</p>
                      <p className="text-green-400 font-bold">
                        {formaterMontant(detailHeures.coutTotal + panierMensuel)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Conditions de mission */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-400" />
            {t.recapitulatif.conditions.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.conditions.dateDebut}</p>
              <p className="text-white">{new Date(formData.conditions.dateDebut).toLocaleDateString('fr-FR')}</p>
            </div>
            {formData.conditions.dateFin && (
              <div>
                <p className="text-white/60 text-sm">{t.recapitulatif.conditions.dateFin}</p>
                <p className="text-white">{new Date(formData.conditions.dateFin).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.conditions.dureeEstimee}</p>
              <p className="text-white">{dureeMission} {t.recapitulatif.conditions.mois}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.conditions.lieuMission}</p>
              <p className="text-white">{formData.conditions.lieuxMission}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Majorations appliquées */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            {t.recapitulatif.majorations.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-white/70">
              {t.step4.fields.delaiPaiement.label}
              <span className="text-white/50"> • {delaiPaiementLabel}</span>
            </span>
            <span className={majorations.delaiPaiement < 0 ? 'text-emerald-400 font-medium' : majorations.delaiPaiement > 0 ? 'text-orange-300 font-medium' : 'text-white/70'}>
              {formatPercent(majorations.delaiPaiement)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">
              {t.step5.sections.experience.obligatoire.label}
              <span className="text-white/50"> • {experienceDetail}</span>
            </span>
            <span className={majorations.experience > 0 ? 'text-orange-300 font-medium' : 'text-white/70'}>
              {formatPercent(majorations.experience)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">
              {t.step5.sections.permis.requis.label}
              <span className="text-white/50"> • {formData.candidats.permis.requis ? yesNo.yes : yesNo.no}</span>
            </span>
            <span className={majorations.permis > 0 ? 'text-orange-300 font-medium' : 'text-white/70'}>
              {formatPercent(majorations.permis)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">
              {t.step5.sections.langues.title}
              <span className="text-white/50"> • {getLangueMajorationLabel()}</span>
            </span>
            <span className={majorations.langues > 0 ? 'text-orange-300 font-medium' : 'text-white/70'}>
              {formatPercent(majorations.langues)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">
              {t.step5.sections.outillage.requis.label}
              <span className="text-white/50"> • {formData.candidats.outillage.requis ? yesNo.yes : yesNo.no}</span>
            </span>
            <span className={majorations.outillage > 0 ? 'text-orange-300 font-medium' : 'text-white/70'}>
              {formatPercent(majorations.outillage)}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-2 mt-2">
            <span className="text-white font-medium">{t.recapitulatif.majorations.total}</span>
            <span className={majorations.total < 0 ? 'text-emerald-400 font-bold' : majorations.total > 0 ? 'text-cyan-400 font-bold' : 'text-white/70'}>
              {formatPercent(majorations.total)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Total Devis */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-green-500/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-white">{t.recapitulatif.totaux.mensuelHT}</span>
              <span className="text-white font-medium">{formaterMontant(totalHT)}</span>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span className="text-white">{t.recapitulatif.totaux.mensuelTTC}</span>
              <span className="text-white font-medium">{formaterMontant(totalTTC)}</span>
            </div>
            <div className="h-px bg-white/20 my-4"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">{t.recapitulatif.totaux.totalMission}</p>
                <p className="text-white/60 text-xs">({dureeMission} {t.recapitulatif.conditions.mois})</p>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {formaterMontant(totalMission)}
              </span>
            </div>
            {pricingLoading && (
              <p className="text-xs text-white/70">Calcul en cours…</p>
            )}
            {!hasCanonicalPricing && (
              <p className="text-xs text-white/60">Devis (pré-calcul) — confirmé dans le PDF</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Note légale */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-yellow-200 text-sm">
          {t.recapitulatif.noteLegale}
        </p>
      </div>

      {/* Acceptation des conditions */}
      <div className="flex items-start space-x-2 border border-white/10 rounded-lg p-4 bg-white/5">
        <Checkbox
          id="conditions"
          checked={accepteConditions}
          onCheckedChange={(checked) => setAccepteConditions(checked as boolean)}
          className="mt-1 border-white/20"
        />
        <div className="flex-1">
          <Label htmlFor="conditions" className="text-white cursor-pointer">
            {t.recapitulatif.acceptConditions.text}{' '}
            <a 
              href="/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              {t.recapitulatif.acceptConditions.lien}
            </a>
          </Label>
        </div>
      </div>

      {/* Bouton d'envoi */}
      <Button
        onClick={handleSubmit}
        disabled={!accepteConditions || isSubmitting}
        className="w-full relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all py-8 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center">
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              {t.recapitulatif.boutonEnvoi.enCours}
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              {t.recapitulatif.boutonEnvoi.texte}
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </Button>

      <p className="text-center text-white/60 text-sm">
        {t.recapitulatif.footer}
      </p>
    </div>
  );
}
