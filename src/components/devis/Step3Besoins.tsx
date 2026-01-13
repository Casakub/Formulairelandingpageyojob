import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { SECTEURS } from '../../data/devis-data';
import { SECTEURS_DATA, getPostesForSecteur, getClassificationsForSecteur, getConventionForSecteur } from '../../data/secteurs-keys';
import { getSalairesByPaysRegion, getCoefficientByPays } from '../../data/devis-data-pays';
import { calculerTauxHoraireBrut, calculerTauxETTAvecPays, formaterMontant, calculerCoutMensuelProfil } from '../../utils/devis-calculations';
import { useDevisConfig } from '../../hooks/useDevisConfig';
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import { translatePays } from '../../utils/recapitulatif-translations';
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

const CLASSIFICATION_KEY_TO_LABEL: Record<string, Record<string, string>> = {
  batiment: {
    n1p1: 'N1P1', n1p2: 'N1P2', n2p1: 'N2P1', n2p2: 'N2P2',
    n3p1: 'N3P1', n3p2: 'N3P2', n4p1: 'N4P1', n4p2: 'N4P2',
  },
  metallurgie: { niveau_1: 'Niveau I', niveau_2: 'Niveau II', niveau_3: 'Niveau III', niveau_4: 'Niveau IV', niveau_5: 'Niveau V' },
  tp: { n1: 'N1', n2: 'N2', n3: 'N3', n4: 'N4' },
  hotellerie: { niveau_1: 'Niveau I', niveau_2: 'Niveau II', niveau_3: 'Niveau III', niveau_4: 'Niveau IV', niveau_5: 'Niveau V' },
  restauration: { niveau_1: 'Niveau I', niveau_2: 'Niveau II', niveau_3: 'Niveau III', niveau_4: 'Niveau IV', niveau_5: 'Niveau V' },
  plasturgie: { niveau_1: 'Niveau I', niveau_2: 'Niveau II', niveau_3: 'Niveau III', niveau_4: 'Niveau IV' },
  automobile_carrosserie: { niveau_1: 'Niveau I', niveau_2: 'Niveau II', niveau_3: 'Niveau III', niveau_4: 'Niveau IV' },
  sylviculture: { niveau_1: 'Niveau I', niveau_2: 'Niveau II', niveau_3: 'Niveau III', niveau_4: 'Niveau IV' },
  cartonnerie: { niveau_1: 'Niveau I', niveau_2: 'Niveau II', niveau_3: 'Niveau III', niveau_4: 'Niveau IV' },
  autre: { a_definir: 'À définir' },
};

interface Poste {
  id: string;
  secteur: string;
  convention: string;
  nationalite: string;  // 🆕 Code pays (RO, PL, PT, etc.)
  poste: string;
  classification: string;
  quantite: number;
  salaireBrut: number;
  tauxHoraireBrut: number;
  tauxETT: number;
  // Détails du coefficient pour affichage
  coeffBase: number;
  facteurPays: number;
  coeffFinal: number;
  labelPays: string;
}

interface Step3BesoinsProps {
  data: Poste[];
  pays: string;  // 🆕 Pays de l'entreprise cliente
  region: string;
  onChange: (data: Poste[]) => void;
  lang?: DevisLanguage;
}

export function Step3Besoins({ data, pays, region, onChange, lang = 'fr' }: Step3BesoinsProps) {
  const { t, isLoading: isLoadingTranslations } = useDevisTranslationStatic(lang);
  // 🆕 Charger la configuration dynamique
  const { getPaysActifs, getCoefficientDetail, getPaysInfo, isLoading } = useDevisConfig();
  const paysDisponibles = getPaysActifs();

  // 🐛 DEBUG: Vérifier l'état des traductions
  console.log('🔍 [Step3Besoins] État des traductions:', {
    lang,
    isLoadingTranslations,
    hasT: !!t,
    hasStep3: !!t?.step3,
    hasSecteurs: !!t?.secteurs,
    tKeys: t ? Object.keys(t) : [],
  });

  const handleAddPoste = () => {
    const newPoste: Poste = {
      id: crypto.randomUUID(),
      secteur: '',
      convention: '',
      nationalite: 'RO',  // 🆕 Roumanie par défaut
      poste: '',
      classification: '',
      quantite: 1,
      salaireBrut: 0,
      tauxHoraireBrut: 0,
      tauxETT: 0,
      coeffBase: 1.92,
      facteurPays: 1.00,
      coeffFinal: 1.92,
      labelPays: 'Roumanie'
    };
    onChange([...data, newPoste]);
  };

  const handleRemovePoste = (id: string) => {
    if (data.length > 1) {
      onChange(data.filter(p => p.id !== id));
    }
  };

  const handlePosteChange = (id: string, field: keyof Poste, value: any) => {
    const updatedPostes = data.map(poste => {
      if (poste.id === id) {
        const updated = { ...poste, [field]: value };

        // Auto-remplir la convention si le secteur change
        if (field === 'secteur' && value) {
          // ✅ Nouvelle logique : utiliser getConventionForSecteur avec clé technique
          updated.convention = getConventionForSecteur(value) || '';
          updated.poste = '';
          updated.classification = '';
          updated.salaireBrut = 0;
          
          console.log('📋 [Step3Besoins] Convention remplie:', {
            secteurKey: value,
            convention: updated.convention
          });
        }

        // Auto-remplir le salaire si la classification change
        if (field === 'classification' && value && updated.secteur) {
          // 🔑 Convertir clé technique vers label français pour compatibilité SALAIRES
          const secteurLabelFr = SECTEUR_KEY_TO_LABEL[updated.secteur] || updated.secteur;
          const classificationLabelFr = CLASSIFICATION_KEY_TO_LABEL[updated.secteur]?.[value] || value;
          
          const salaires = getSalairesByPaysRegion(pays, secteurLabelFr, region);
          updated.salaireBrut = salaires[classificationLabelFr] || 0;
          
          console.log('💶 [Step3Besoins] Calcul salaire:', {
            secteurKey: updated.secteur,
            secteurLabelFr,
            classificationKey: value,
            classificationLabelFr,
            salaireBrut: updated.salaireBrut
          });
        }

        // 🆕 Recalculer le coefficient si secteur, classification ou nationalité change
        if ((field === 'secteur' || field === 'classification' || field === 'nationalite') && 
            updated.secteur && updated.classification && updated.nationalite) {
          // 🔑 Convertir clés techniques vers labels français pour compatibilité
          const secteurLabelFr = SECTEUR_KEY_TO_LABEL[updated.secteur] || updated.secteur;
          const classificationLabelFr = CLASSIFICATION_KEY_TO_LABEL[updated.secteur]?.[updated.classification] || updated.classification;
          
          const detail = getCoefficientDetail(secteurLabelFr, classificationLabelFr, updated.nationalite);
          updated.coeffBase = detail.coeffBase;
          updated.facteurPays = detail.facteurPays;
          updated.coeffFinal = detail.coeffFinal;
          updated.labelPays = detail.labelPays;
          
          console.log('🔄 [Step3Besoins] Recalcul du coefficient:', {
            champ: field,
            secteurKey: updated.secteur,
            secteurLabelFr,
            classificationKey: updated.classification,
            classificationLabelFr,
            nationalite: updated.nationalite,
            coeffBase: detail.coeffBase,
            facteurPays: detail.facteurPays,
            coeffFinal: detail.coeffFinal,
            labelPays: detail.labelPays
          });
        }

        // Recalculer les taux
        if (updated.salaireBrut > 0 && updated.coeffBase && updated.facteurPays) {
          updated.tauxHoraireBrut = calculerTauxHoraireBrut(updated.salaireBrut, 151.67);
          updated.tauxETT = calculerTauxETTAvecPays(updated.tauxHoraireBrut, updated.coeffBase, updated.facteurPays);
        }

        return updated;
      }
      return poste;
    });
    onChange(updatedPostes);
  };

  if (isLoadingTranslations) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">{t?.common?.loading || "Chargement..."}</div>
      </div>
    );
  }

  // Protection : Vérifier que les traductions sont complètes
  if (!t || !t.step3 || !t.secteurs) {
    console.error('❌ [Step3Besoins] Traductions incomplètes:', {
      hasT: !!t,
      hasStep3: !!t?.step3,
      hasSecteurs: !!t?.secteurs,
      tKeys: t ? Object.keys(t) : [],
    });
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">Chargement des traductions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">{t.step3.title}</h2>
        <p className="text-white/70">
          {t.step3.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {data.map((poste, index) => (
          <Card key={poste.id} className="border border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">
                {t.step3.profileLabel} {index + 1}
              </CardTitle>
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePoste(poste.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t.step3.removeProfile}
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Secteur d'activité */}
                <div>
                  <Label className="text-white mb-2 block">
                    {t.step3.fields.secteur.label} <span className="text-red-400">{t.common.required}</span>
                  </Label>
                  <Select
                    value={poste.secteur}
                    onValueChange={(value) => handlePosteChange(poste.id, 'secteur', value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-cyan-400">
                      <span className="flex items-center gap-2">
                        {poste.secteur && t.secteurs[poste.secteur]?.label 
                          ? t.secteurs[poste.secteur].label 
                          : t.step3.fields.secteur.placeholder}
                      </span>
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
                      {Object.keys(SECTEURS_DATA).map((secteurKey) => (
                        <SelectItem key={secteurKey} value={secteurKey} className="text-white hover:bg-white/10 focus:bg-white/10">
                          {t.secteurs?.[secteurKey]?.label || SECTEUR_KEY_TO_LABEL[secteurKey] || secteurKey}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Convention collective */}
                <div>
                  <Label className="text-white mb-2 block">
                    {t.step3.fields.convention.label}
                  </Label>
                  <Input
                    value={poste.secteur && t.secteurs[poste.secteur]?.convention 
                      ? t.secteurs[poste.secteur].convention 
                      : poste.convention}
                    className="bg-white/10 border-white/20 text-white/90 placeholder:text-white/40"
                    readOnly
                    placeholder={t.step3.fields.convention.placeholder}
                  />
                </div>

                {/* 🆕 Nationalité souhaitée */}
                <div>
                  <Label className="text-white mb-2 block">
                    {t.step3.fields.nationalite.label} <span className="text-red-400">{t.common.required}</span>
                  </Label>
                  <Select
                    value={poste.nationalite}
                    onValueChange={(value) => handlePosteChange(poste.id, 'nationalite', value)}
                    disabled={isLoading || paysDisponibles.length === 0}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/90">
                      {poste.nationalite ? (
                        <div className="flex items-center">
                          <span className="mr-2">{getPaysInfo(poste.nationalite)?.flag || '🌍'}</span>
                          <span>{translatePays(getPaysInfo(poste.nationalite)?.label || poste.nationalite, lang)}</span>
                        </div>
                      ) : (
                        <span className="text-white/60">{isLoading ? t.common.loading : t.step3.fields.nationalite.placeholder}</span>
                      )}
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
                      {paysDisponibles.length > 0 ? (
                        paysDisponibles.map((pays) => (
                          <SelectItem key={pays.code} value={pays.code} className="text-white hover:bg-white/10 focus:bg-white/10">
                            <span className="mr-2">{pays.flag}</span>
                            {translatePays(pays.label, lang)}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="RO" className="text-white hover:bg-white/10 focus:bg-white/10">
                          <span className="mr-2">🇷🇴</span>
                          {translatePays('Roumanie', lang)}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {isLoading && (
                    <p className="text-xs text-cyan-300/70 mt-1">{t.step3.loadingConfig}</p>
                  )}
                </div>

                {/* Poste recherché */}
                <div>
                  <Label className="text-white mb-2 block">
                    {t.step3.fields.poste.label} <span className="text-red-400">{t.common.required}</span>
                  </Label>
                  <Select
                    value={poste.poste}
                    onValueChange={(value) => handlePosteChange(poste.id, 'poste', value)}
                    disabled={!poste.secteur}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/90">
                      <span className="text-white/90">
                        {poste.poste && poste.secteur && t.secteurs[poste.secteur]?.postes[poste.poste]
                          ? t.secteurs[poste.secteur].postes[poste.poste]
                          : t.step3.fields.poste.placeholder}
                      </span>
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
                      {poste.secteur && getPostesForSecteur(poste.secteur).map((posteKey) => (
                        <SelectItem key={posteKey} value={posteKey} className="text-white hover:bg-white/10 focus:bg-white/10">
                          {t.secteurs[poste.secteur]?.postes[posteKey] || posteKey}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Classification */}
                <div>
                  <Label className="text-white mb-2 block">
                    {t.step3.fields.classification.label} <span className="text-red-400">{t.common.required}</span>
                  </Label>
                  <Select
                    value={poste.classification}
                    onValueChange={(value) => handlePosteChange(poste.id, 'classification', value)}
                    disabled={!poste.secteur}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/90">
                      <span className="text-white/90">
                        {poste.classification && poste.secteur && t.secteurs[poste.secteur]?.classifications[poste.classification]
                          ? t.secteurs[poste.secteur].classifications[poste.classification]
                          : t.step3.fields.classification.placeholder}
                      </span>
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
                      {poste.secteur && getClassificationsForSecteur(poste.secteur).map((classKey) => (
                        <SelectItem key={classKey} value={classKey} className="text-white hover:bg-white/10 focus:bg-white/10">
                          {t.secteurs[poste.secteur]?.classifications[classKey] || classKey}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantité */}
                <div>
                  <Label className="text-white mb-2 block">
                    {t.step3.fields.quantite.label} <span className="text-red-400">{t.common.required}</span>
                  </Label>
                  <Input
                    type="number"
                    value={poste.quantite}
                    onChange={(e) => handlePosteChange(poste.id, 'quantite', parseInt(e.target.value) || 1)}
                    min={1}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                {/* Salaire brut mensuel */}
                <div>
                  <Label className="text-white mb-2 block">
                    {t.step3.fields.salaireBrut.label}
                  </Label>
                  <Input
                    value={poste.salaireBrut > 0 ? formaterMontant(poste.salaireBrut) : ''}
                    className="bg-green-500/10 border-green-500/30 text-green-200 font-medium placeholder:text-green-400/40"
                    readOnly
                    placeholder={t.step3.fields.salaireBrut.placeholder}
                  />
                </div>
              </div>

              {/* Résumé des calculs */}
              {poste.salaireBrut > 0 ? (
                <div className="space-y-3 mt-4">
                  {/* 🆕 Rémunération simplifiée - SANS taux ETT (incomplet car sans options) */}
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-200 text-sm mb-3 font-medium">💶 {t.step3.summary.title}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">{t.step3.summary.salaireBrutMensuel}</span>
                        <span className="text-white text-xl font-medium">{formaterMontant(poste.salaireBrut)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">{t.step3.summary.tauxHoraireBrut}</span>
                        <span className="text-white text-xl font-medium">{formaterMontant(poste.tauxHoraireBrut)}/h</span>
                      </div>
                      <div className="border-t border-white/10 my-2"></div>
                      <p className="text-white/50 text-xs text-center">
                        {t.step3.summary.baseMensuelle}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // 🆕 Placeholder quand le salaire n'est pas calculé
                <div className="space-y-3 mt-4">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-200 text-sm mb-2 font-medium">⚠️ {t.step3?.summary?.title || "Rémunération du salarié"}</p>
                    <p className="text-yellow-100/70 text-xs">
                      {!region 
                        ? "Veuillez sélectionner votre région à l'étape 1 pour afficher les salaires."
                        : "Sélectionnez une classification pour calculer le salaire."}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bouton ajouter un profil */}
      <Button
        onClick={handleAddPoste}
        variant="outline"
        className="w-full relative overflow-hidden group rounded-full border-cyan-400/30 bg-cyan-500/10 backdrop-blur-sm text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all py-6"
      >
        <Plus className="w-5 h-5 mr-2" />
        {t.step3.addProfile}
      </Button>

      {!region && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-yellow-200 text-sm">
            {t.step3.missingRegionWarning}
          </p>
        </div>
      )}
    </div>
  );
}