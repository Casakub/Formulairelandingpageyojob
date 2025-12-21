import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { MOTIFS_RECOURS, PERIODES_ESSAI, DELAIS_PAIEMENT } from '../../data/devis-data';
import { getPanierRepasByPays } from '../../data/devis-data-pays';
import { formaterMontant } from '../../utils/devis-calculations';
import { useState } from 'react';
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

  const handleChange = (field: string, value: any) => {
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
          <Select value={data.periodeEssai} onValueChange={(value) => handleChange('periodeEssai', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              {PERIODES_ESSAI.map((periode) => (
                <SelectItem key={periode.value} value={periode.value} className="text-white hover:bg-white/10">
                  {periode.label}
                </SelectItem>
              ))}
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
          <Select value={data.motifRecours} onValueChange={(value) => handleChange('motifRecours', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={t.step4.fields.motifRecours.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              {MOTIFS_RECOURS.map((motif) => (
                <SelectItem key={motif} value={motif} className="text-white hover:bg-white/10">
                  {motif}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Délai de paiement */}
        <div>
          <Label className="text-white mb-2 block">
            {t.step4.fields.delaiPaiement.label}
          </Label>
          <Select value={data.delaiPaiement} onValueChange={(value) => handleChange('delaiPaiement', value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={t.step4.fields.delaiPaiement.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              {DELAIS_PAIEMENT.map((delai) => (
                <SelectItem key={delai} value={delai} className="text-white hover:bg-white/10">
                  {delai}
                </SelectItem>
              ))}
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

        {data.repas.type === 'panier' && region && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
            <p className="text-green-200/80 text-sm mt-1">
              {getPanierRepasByPays(pays, region) > 0
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