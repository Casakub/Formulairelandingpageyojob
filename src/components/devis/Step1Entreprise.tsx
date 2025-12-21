import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { REGIONS, PAYS_EUROPEENS } from '../../data/devis-data';
import { validerSIRET } from '../../utils/devis-calculations';
import { useState, useEffect } from 'react';
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface Step1EntrepriseProps {
  data: {
    pays: string;
    raisonSociale: string;
    siret: string;
    codeAPE: string;
    tvaIntracommunautaire: string;
    adresse: string;
    codePostal: string;
    ville: string;
    region: string;
    siteInternet: string;
  };
  onChange: (data: any) => void;
  lang?: DevisLanguage;
}

export function Step1Entreprise({ data, onChange, lang = 'fr' }: Step1EntrepriseProps) {
  const { t, isLoading } = useDevisTranslationStatic(lang);
  const [siretError, setSiretError] = useState('');
  const estFrance = data.pays === 'France' || !data.pays;

  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleSiretBlur = () => {
    // Valider SIRET uniquement pour la France
    if (estFrance && data.siret && !validerSIRET(data.siret)) {
      setSiretError(t.step1.fields.siret.error);
    } else {
      setSiretError('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">{t.step1.title}</h2>
        <p className="text-white/70">
          {t.step1.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Pays */}
        <div className="md:col-span-2">
          <Label className="text-white mb-2 block">
            {t.step1.fields.pays.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Select value={data.pays} onValueChange={(value) => handleChange('pays', value)} required>
            <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/60">
              <SelectValue placeholder={t.step1.fields.pays.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-[9999] p-[0px] overflow-hidden">
              {PAYS_EUROPEENS.map((pays) => (
                <SelectItem 
                  key={pays} 
                  value={pays}
                  className="hover:bg-white/10 focus:bg-white/10 text-white"
                >
                  {pays}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Raison sociale */}
        <div className="md:col-span-2">
          <Label htmlFor="raisonSociale" className="text-white mb-2 block">
            {t.step1.fields.raisonSociale.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="raisonSociale"
            value={data.raisonSociale}
            onChange={(e) => handleChange('raisonSociale', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step1.fields.raisonSociale.placeholder}
            required
          />
        </div>

        {/* SIRET */}
        <div>
          <Label htmlFor="siret" className="text-white mb-2 block">
            {t.step1.fields.siret.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="siret"
            value={data.siret}
            onChange={(e) => handleChange('siret', e.target.value.replace(/\s/g, ''))}
            onBlur={handleSiretBlur}
            className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${siretError ? 'border-red-500' : ''}`}
            placeholder={t.step1.fields.siret.placeholder}
            maxLength={14}
            required
          />
          {siretError && <p className="text-red-400 text-sm mt-1">{siretError}</p>}
        </div>

        {/* Code APE */}
        <div>
          <Label htmlFor="codeAPE" className="text-white mb-2 block">
            {t.step1.fields.codeAPE.label}
          </Label>
          <Input
            id="codeAPE"
            value={data.codeAPE}
            onChange={(e) => handleChange('codeAPE', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step1.fields.codeAPE.placeholder}
          />
        </div>

        {/* N° TVA Intracommunautaire */}
        <div className="md:col-span-2">
          <Label htmlFor="tva" className="text-white mb-2 block">
            {t.step1.fields.tvaIntracommunautaire.label}
          </Label>
          <Input
            id="tva"
            value={data.tvaIntracommunautaire}
            onChange={(e) => handleChange('tvaIntracommunautaire', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step1.fields.tvaIntracommunautaire.placeholder}
          />
        </div>

        {/* Adresse */}
        <div className="md:col-span-2">
          <Label htmlFor="adresse" className="text-white mb-2 block">
            {t.step1.fields.adresse.label}
          </Label>
          <Input
            id="adresse"
            value={data.adresse}
            onChange={(e) => handleChange('adresse', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step1.fields.adresse.placeholder}
          />
        </div>

        {/* Code postal */}
        <div>
          <Label htmlFor="codePostal" className="text-white mb-2 block">
            {t.step1.fields.codePostal.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="codePostal"
            value={data.codePostal}
            onChange={(e) => handleChange('codePostal', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step1.fields.codePostal.placeholder}
            maxLength={5}
            required
          />
        </div>

        {/* Ville */}
        <div>
          <Label htmlFor="ville" className="text-white mb-2 block">
            {t.step1.fields.ville.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="ville"
            value={data.ville}
            onChange={(e) => handleChange('ville', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step1.fields.ville.placeholder}
            required
          />
        </div>

        {/* Région - Conditionnel selon le pays */}
        <div>
          <Label className="text-white mb-2 block">
            {t.step1.fields.region.label} {estFrance && <span className="text-red-400">{t.common.required}</span>}
          </Label>
          {estFrance ? (
            // France : Sélecteur avec les 13 régions françaises
            <Select value={data.region} onValueChange={(value) => handleChange('region', value)} required>
              <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/60">
                <SelectValue placeholder={t.step1.fields.region.placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-[9999] p-[0px] overflow-hidden">
                {REGIONS.map((region) => (
                  <SelectItem 
                    key={region} 
                    value={region}
                    className="hover:bg-white/10 focus:bg-white/10 text-white"
                  >
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            // Autres pays : Champ texte libre
            <Input
              id="region"
              value={data.region}
              onChange={(e) => handleChange('region', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              placeholder={t.step1.fields.region.placeholderOtherCountry}
            />
          )}
        </div>

        {/* Site internet */}
        <div>
          <Label htmlFor="siteInternet" className="text-white mb-2 block">
            {t.step1.fields.siteInternet.label}
          </Label>
          <Input
            id="siteInternet"
            value={data.siteInternet}
            onChange={(e) => handleChange('siteInternet', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step1.fields.siteInternet.placeholder}
            type="url"
          />
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mt-6">
        <p className="text-cyan-200 text-sm">
          {t.step1.infoMessage}
        </p>
      </div>
    </div>
  );
}