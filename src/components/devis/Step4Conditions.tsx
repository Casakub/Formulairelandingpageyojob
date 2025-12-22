import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { getPanierRepasByPays } from '../../data/devis-data-pays';
import { formaterMontant } from '../../utils/devis-calculations';
import { useState, useMemo } from 'react';
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface Step4ConditionsProps {
  data: {
    dateDebut: string;
    dateFin: string;
    periodeEssai: string;
    baseHoraire: number;
    lieuxMission: string;
    motifRecours: string;
    delaiPaiement: string;
    hebergement: {
      chargeEU: boolean;
      commentaire: string;
    };
    transportLocal: {
      chargeETT: boolean;
    };
    repas: {
      type: 'restaurant' | 'panier' | 'non-concerne';
      montant?: number;
    };
  };
  pays: string;  // 🆕 Pays de l'entreprise cliente
  region: string;
  onChange: (data: any) => void;
  lang?: DevisLanguage;
}

export function Step4Conditions({ data, pays, region, onChange, lang = 'fr' }: Step4ConditionsProps) {
  const { t, isLoading: isLoadingTranslations } = useDevisTranslationStatic(lang);
  const [dateError, setDateError] = useState('');

  // 🔍 DEBUG: Log de la langue active
  console.log('🌍 [Step4] Langue active:', lang);
  console.log('🔍 [Step4] Traductions chargées:', {
    motifRecours: t.step4.fields.motifRecours.options,
    periodeEssai: t.step4.fields.periodeEssai.options,
    delaiPaiement: t.step4.fields.delaiPaiement.options
  });

  // ✅ SOLUTION: Utiliser useMemo pour recalculer les labels quand lang ou data changent
  const periodeEssaiLabel = useMemo(() => {
    if (!data.periodeEssai) return t.step4.fields.periodeEssai.placeholder;
    const options = t.step4.fields.periodeEssai.options;
    const label = options[data.periodeEssai as keyof typeof options] || t.step4.fields.periodeEssai.placeholder;
    console.log('📋 [useMemo periodeEssai]', { value: data.periodeEssai, label, lang });
    return label;
  }, [data.periodeEssai, lang, t]);

  const motifRecoursLabel = useMemo(() => {
    if (!data.motifRecours) return t.step4.fields.motifRecours.placeholder;
    const options = t.step4.fields.motifRecours.options;
    const label = options[data.motifRecours as keyof typeof options] || t.step4.fields.motifRecours.placeholder;
    console.log('🎯 [useMemo motifRecours]', { value: data.motifRecours, label, lang });
    return label;
  }, [data.motifRecours, lang, t]);

  const delaiPaiementLabel = useMemo(() => {
    if (!data.delaiPaiement) return t.step4.fields.delaiPaiement.placeholder;
    const options = t.step4.fields.delaiPaiement.options;
    const label = options[data.delaiPaiement as keyof typeof options] || t.step4.fields.delaiPaiement.placeholder;
    console.log('💰 [useMemo delaiPaiement]', { value: data.delaiPaiement, label, lang });
    return label;
  }, [data.delaiPaiement, lang, t]);

  const handleChange = (field: string, value: any) => {
    console.log('✏️ [handleChange]', { field, value, lang });
    // 🆕 Valider la date de fin si on change la date de fin
    if (field === 'dateFin' && value && data.dateDebut) {
      if (new Date(value) < new Date(data.dateDebut)) {
        setDateError(t.step4.dateError);
        return;
      } else {
        setDateError('');
      }
    }
    
    // 🆕 Réinitialiser l'erreur si on change la date de début
    if (field === 'dateDebut') {
      setDateError('');
    }
    
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleNestedChange = (section: string, field: string, value: any) => {
    onChange({
      ...data,
      [section]: {
        ...data[section as keyof typeof data],
        [field]: value
      }
    });
  };

  const montantPanierJour = getPanierRepasByPays(pays, region);
  const supplementPanierHoraire = montantPanierJour / 7;

  if (isLoadingTranslations) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 🔍 DEBUG PANEL - À RETIRER EN PRODUCTION */}
      <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4">
        <p className="text-purple-200 text-sm">
          🔍 <strong>DEBUG:</strong> Langue active = <strong className="text-purple-100">{lang}</strong>
        </p>
        <p className="text-purple-200/70 text-xs mt-1">
          Vérifiez que la langue affichée correspond au sélecteur de langue en haut de page
        </p>
      </div>

      <div>
        <h2 className="text-white text-2xl mb-2">{t.step4.title}</h2>
        <p className="text-white/70">
          {t.step4.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Date de début */}
        <div>
          <Label htmlFor="dateDebut" className="text-white mb-2 block">
            {t.step4.fields.dateDebut.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="dateDebut"
            type="date"
            value={data.dateDebut}
            onChange={(e) => handleChange('dateDebut', e.target.value)}
            className="bg-white/10 border-white/20 text-white"
            required
          />
        </div>

        {/* Date de fin */}
        <div>
          <Label htmlFor="dateFin" className="text-white mb-2 block">
            {t.step4.fields.dateFin.label}
          </Label>
          <Input
            id="dateFin"
            type="date"
            value={data.dateFin}
            onChange={(e) => handleChange('dateFin', e.target.value)}
            className="bg-white/10 border-white/20 text-white"
            disabled={!!dateError}
          />
          {dateError && <p className="text-red-400 text-sm mt-1">{dateError}</p>}
        </div>

        {/* Période d'essai */}
        <div>
          <Label className="text-white mb-2 block">
            {t.step4.fields.periodeEssai.label}
          </Label>
          <Select key={`periodeEssai-${lang}-${data.periodeEssai}`} value={data.periodeEssai} onValueChange={(value) => handleChange('periodeEssai', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={periodeEssaiLabel} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              <SelectItem value="2" className="text-white hover:bg-white/10">
                {t.step4.fields.periodeEssai.options['2']}
              </SelectItem>
              <SelectItem value="3" className="text-white hover:bg-white/10">
                {t.step4.fields.periodeEssai.options['3']}
              </SelectItem>
              <SelectItem value="5" className="text-white hover:bg-white/10">
                {t.step4.fields.periodeEssai.options['5']}
              </SelectItem>
              <SelectItem value="15" className="text-white hover:bg-white/10">
                {t.step4.fields.periodeEssai.options['15']}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Base horaire */}
        <div>
          <Label htmlFor="baseHoraire" className="text-white mb-2 block">
            {t.step4.fields.baseHoraire.label}
          </Label>
          <Input
            id="baseHoraire"
            type="number"
            value={data.baseHoraire}
            onChange={(e) => handleChange('baseHoraire', parseFloat(e.target.value))}
            className="bg-white/10 border-white/20 text-white"
            step="0.01"
          />
          <p className="text-white/60 text-xs mt-1">{t.step4.fields.baseHoraire.helper}</p>
        </div>

        {/* Lieu(x) de mission */}
        <div className="md:col-span-2">
          <Label htmlFor="lieuxMission" className="text-white mb-2 block">
            {t.step4.fields.lieuxMission.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="lieuxMission"
            value={data.lieuxMission}
            onChange={(e) => handleChange('lieuxMission', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step4.fields.lieuxMission.placeholder}
            required
          />
        </div>

        {/* Motif du recours */}
        <div>
          <Label className="text-white mb-2 block">
            {t.step4.fields.motifRecours.label}
          </Label>
          <Select key={`motifRecours-${lang}-${data.motifRecours}`} value={data.motifRecours} onValueChange={(value) => handleChange('motifRecours', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={motifRecoursLabel} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              <SelectItem value="accroissement" className="text-white hover:bg-white/10">
                {t.step4.fields.motifRecours.options.accroissement}
              </SelectItem>
              <SelectItem value="remplacement" className="text-white hover:bg-white/10">
                {t.step4.fields.motifRecours.options.remplacement}
              </SelectItem>
              <SelectItem value="saisonnier" className="text-white hover:bg-white/10">
                {t.step4.fields.motifRecours.options.saisonnier}
              </SelectItem>
              <SelectItem value="exportation" className="text-white hover:bg-white/10">
                {t.step4.fields.motifRecours.options.exportation}
              </SelectItem>
              <SelectItem value="autre" className="text-white hover:bg-white/10">
                {t.step4.fields.motifRecours.options.autre}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Délai de paiement */}
        <div>
          <Label className="text-white mb-2 block">
            {t.step4.fields.delaiPaiement.label}
          </Label>
          <Select key={`delaiPaiement-${lang}-${data.delaiPaiement}`} value={data.delaiPaiement} onValueChange={(value) => handleChange('delaiPaiement', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={delaiPaiementLabel} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              <SelectItem value="reception" className="text-white hover:bg-white/10">
                {t.step4.fields.delaiPaiement.options.reception}
              </SelectItem>
              <SelectItem value="j30" className="text-white hover:bg-white/10">
                {t.step4.fields.delaiPaiement.options.j30}
              </SelectItem>
              <SelectItem value="j45" className="text-white hover:bg-white/10">
                {t.step4.fields.delaiPaiement.options.j45}
              </SelectItem>
              <SelectItem value="j60" className="text-white hover:bg-white/10">
                {t.step4.fields.delaiPaiement.options.j60}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Section Hébergement */}
      <div className="border border-white/10 rounded-lg p-6 bg-white/5">
        <h3 className="text-white text-lg mb-4">{t.step4.hebergement.title}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">{t.step4.hebergement.chargeEU.label}</Label>
              <p className="text-white/60 text-sm">{t.step4.hebergement.chargeEU.helper}</p>
            </div>
            <Switch
              checked={data.hebergement.chargeEU}
              onCheckedChange={(checked) => handleNestedChange('hebergement', 'chargeEU', checked)}
            />
          </div>
          
          {!data.hebergement.chargeEU && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-yellow-200 text-sm">
                {t.step4.hebergement.supplementWarning}
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="commentaireHebergement" className="text-white mb-2 block">
              {t.step4.hebergement.commentaire.label}
            </Label>
            <Textarea
              id="commentaireHebergement"
              value={data.hebergement.commentaire}
              onChange={(e) => handleNestedChange('hebergement', 'commentaire', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder={t.step4.hebergement.commentaire.placeholder}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Section Transport local */}
      <div className="border border-white/10 rounded-lg p-6 bg-white/5">
        <h3 className="text-white text-lg mb-4">{t.step4.transport.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white">{t.step4.transport.chargeETT.label}</Label>
            <p className="text-white/60 text-sm">{t.step4.transport.chargeETT.helper}</p>
          </div>
          <Switch
            checked={data.transportLocal.chargeETT}
            onCheckedChange={(checked) => handleNestedChange('transportLocal', 'chargeETT', checked)}
          />
        </div>
        
        {data.transportLocal.chargeETT && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mt-4">
            <p className="text-cyan-200 text-sm">
              {t.step4.transport.supplementInfo}
            </p>
          </div>
        )}
      </div>

      {/* Section Repas */}
      <div className="border border-white/10 rounded-lg p-6 bg-white/5">
        <h3 className="text-white text-lg mb-4">{t.step4.repas.title}</h3>
        <RadioGroup value={data.repas.type} onValueChange={(value: any) => handleNestedChange('repas', 'type', value)}>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="restaurant" id="restaurant" className="border-white/20" />
              <Label htmlFor="restaurant" className="text-white cursor-pointer">
                {t.step4.repas.options.restaurant}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="panier" id="panier" className="border-white/20" />
              <Label htmlFor="panier" className="text-white cursor-pointer">
                {t.step4.repas.options.panier}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-concerne" id="non-concerne" className="border-white/20" />
              <Label htmlFor="non-concerne" className="text-white cursor-pointer">
                {t.step4.repas.options.nonConcerne}
              </Label>
            </div>
          </div>
        </RadioGroup>

        {data.repas.type === 'panier' && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
            <p className="text-green-200/80 text-sm mt-1">
              {region && getPanierRepasByPays(pays, region) > 0
                ? t.step4.repas.montantInfo.replace('{montant}', formaterMontant(getPanierRepasByPays(pays, region)))
                : t.step4.repas.montantNonDefini}
            </p>
            {/* ❌ SUPPRIMÉ : Le panier repas n'est pas un supplément horaire */}
          </div>
        )}
      </div>
    </div>
  );
}