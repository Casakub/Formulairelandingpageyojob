import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useState } from 'react';
import { ArrowRight, Download, CheckCircle, Building2, User, Briefcase, FileText, Clock } from 'lucide-react';
import { DevisFormData } from '../../DemandeDevis';
import { 
  calculerRecapitulatif, 
  formaterMontant, 
  calculerCoutAvecHeuresSup, 
  calculerPanierRepasMensuel,
  calculerTauxETTComplet
} from '../../utils/devis-calculations';
import { getPanierRepasByPays } from '../../data/devis-data-pays';
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import { translateSecteur, translatePoste, translateClassification, translatePays } from '../../utils/recapitulatif-translations';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface StepRecapitulatifProps {
  formData: DevisFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
  lang?: DevisLanguage;
}

export function StepRecapitulatif({ formData, onSubmit, isSubmitting, lang = 'fr' }: StepRecapitulatifProps) {
  const { t, isLoading: isLoadingTranslations } = useDevisTranslationStatic(lang);
  const [accepteConditions, setAccepteConditions] = useState(false);

  // 🆕 Recalcul complet avec nouvelles fonctions
  const calculerTotalCorrect = () => {
    let totalMensuel = 0;
    
    formData.postes.forEach(poste => {
      const baseHoraire = formData.conditions.baseHoraire;
      const tauxHoraireBrut = poste.salaireBrut / 151.67;
      
      // Taux ETT avec suppléments horaires (sans panier)
      const tauxETTAvecSupplements = calculerTauxETTComplet(
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
      
      // Coût main d'œuvre avec heures sup
      const detailHeures = calculerCoutAvecHeuresSup(
        tauxETTAvecSupplements,
        baseHoraire,
        poste.quantite
      );
      
      // Panier repas mensuel séparé
      const montantPanierJour = formData.conditions.repas.type === 'panier'
        ? getPanierRepasByPays(formData.entreprise.pays)
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
  
  const totalHT = calculerTotalCorrect();
  const totalTTC = Math.round(totalHT * 1.20 * 100) / 100;
  
  // Calculer durée mission
  const calculerDuree = (dateDebut: string, dateFin: string | null): number => {
    if (!dateFin) return 1;
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = Math.abs(fin.getTime() - debut.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, Math.ceil(diffDays / 30));
  };
  
  const dureeMission = calculerDuree(formData.conditions.dateDebut, formData.conditions.dateFin);
  const totalMission = Math.round(totalHT * dureeMission * 100) / 100;

  // Calculer le récapitulatif complet (pour compatibilité)
  const postesAvecDetails = formData.postes.map(poste => ({
    ...poste,
    secteur: poste.secteur,
    poste: poste.poste,
    classification: poste.classification,
    quantite: poste.quantite,
    salaireBrut: poste.salaireBrut,
    baseHoraire: formData.conditions.baseHoraire,
    hebergementEU: formData.conditions.hebergement.chargeEU,
    transportETT: formData.conditions.transportLocal.chargeETT,
    panierRepas: formData.conditions.repas.type === 'panier',
    region: formData.entreprise.region,
    // 🆕 Passer les détails du coefficient
    coeffBase: poste.coeffBase,
    facteurPays: poste.facteurPays,
    labelPays: poste.labelPays,
  }));

  const recap = calculerRecapitulatif(
    postesAvecDetails,
    formData.conditions.dateDebut,
    formData.conditions.dateFin
  );

  const handleSubmit = () => {
    if (!accepteConditions) {
      alert(t.recapitulatif.acceptConditionsError);
      return;
    }
    onSubmit();
  };

  if (isLoadingTranslations) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">{t.common.loading}</div>
      </div>
    );
  }

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
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            {t.recapitulatif.entreprise.title}
          </CardTitle>
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
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            {t.recapitulatif.contact.title}
          </CardTitle>
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
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-violet-400" />
            {t.recapitulatif.postes.title} ({formData.postes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.postes.map((poste, index) => {
            // 🆕 Recalculer avec les nouvelles fonctions
            const baseHoraire = formData.conditions.baseHoraire;
            const tauxHoraireBrut = poste.salaireBrut / 151.67; // Toujours sur base légale
            
            // Taux ETT avec suppléments horaires uniquement (sans panier)
            const tauxETTAvecSupplements = calculerTauxETTComplet(
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
            
            // Détail des heures supplémentaires
            const detailHeures = calculerCoutAvecHeuresSup(
              tauxETTAvecSupplements,
              baseHoraire,
              poste.quantite
            );
            
            // Panier repas mensuel (séparé)
            const montantPanierJour = formData.conditions.repas.type === 'panier' 
              ? getPanierRepasByPays(formData.entreprise.pays)
              : 0;
            const panierMensuel = calculerPanierRepasMensuel(
              montantPanierJour,
              baseHoraire,
              poste.quantite
            );
            
            const joursParMois = Math.round(baseHoraire / 7);
            const hasHeuresSup = baseHoraire > 151.67;
            
            return (
              <div key={index} className="border border-white/10 rounded-lg p-4 bg-white/5 space-y-3">
                {/* En-tête du poste */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-medium">{translatePoste(poste.secteur, poste.poste, lang)}</h4>
                    <p className="text-white/60 text-sm">{translateSecteur(poste.secteur, lang)} • {translateClassification(poste.secteur, poste.classification, lang)}</p>
                    {poste.labelPays && (
                      <p className="text-cyan-300/80 text-sm mt-1">
                        📍 Nationalité: {translatePays(poste.labelPays, lang)}
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
                          {formaterMontant(montantPanierJour)}/jour × {joursParMois} jours × {poste.quantite} pers.
                        </span>
                        <span className="text-green-400 font-medium">
                          {formaterMontant(panierMensuel)}/mois
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
                          {t.recapitulatif.postes.heuresNormales} : {detailHeures.heuresNormales}h × {formaterMontant(tauxETTAvecSupplements)}/h
                        </span>
                        <span className="text-white font-medium">
                          {formaterMontant(detailHeures.coutHeuresNormales)}
                        </span>
                      </div>
                      
                      {/* Heures +25% */}
                      {detailHeures.heures25 > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">
                            {t.recapitulatif.postes.heuresSup25} : {detailHeures.heures25}h × {formaterMontant(tauxETTAvecSupplements * 1.25)}/h
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
                            {t.recapitulatif.postes.heuresSup50} : {detailHeures.heures50}h × {formaterMontant(tauxETTAvecSupplements * 1.50)}/h
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
                      <p className="text-white font-medium">{formaterMontant(tauxETTAvecSupplements)}/h</p>
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
              <p className="text-white">{recap.dureeMission} {t.recapitulatif.conditions.mois}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">{t.recapitulatif.conditions.lieuMission}</p>
              <p className="text-white">{formData.conditions.lieuxMission}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Estimation */}
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
            <a href="/privacy" className="text-cyan-400 hover:underline">
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