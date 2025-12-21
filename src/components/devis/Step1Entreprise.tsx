import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { REGIONS, PAYS_EUROPEENS } from '../../data/devis-data';
import { validerSIRET } from '../../utils/devis-calculations';
import { useState, useEffect } from 'react';

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
}

export function Step1Entreprise({ data, onChange }: Step1EntrepriseProps) {
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
      setSiretError('SIRET invalide (14 chiffres requis)');
    } else {
      setSiretError('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">Informations de l'entreprise</h2>
        <p className="text-white/70">
          Renseignez les informations légales de votre entreprise utilisatrice.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Pays */}
        <div className="md:col-span-2">
          <Label className="text-white mb-2 block">
            Pays <span className="text-red-400">*</span>
          </Label>
          <Select value={data.pays} onValueChange={(value) => handleChange('pays', value)} required>
            <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/60">
              <SelectValue placeholder="Sélectionnez un pays" />
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
            Raison sociale <span className="text-red-400">*</span>
          </Label>
          <Input
            id="raisonSociale"
            value={data.raisonSociale}
            onChange={(e) => handleChange('raisonSociale', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Ex: YOJOB SAS"
            required
          />
        </div>

        {/* SIRET */}
        <div>
          <Label htmlFor="siret" className="text-white mb-2 block">
            SIRET <span className="text-red-400">*</span>
          </Label>
          <Input
            id="siret"
            value={data.siret}
            onChange={(e) => handleChange('siret', e.target.value.replace(/\s/g, ''))}
            onBlur={handleSiretBlur}
            className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${siretError ? 'border-red-500' : ''}`}
            placeholder="14 chiffres"
            maxLength={14}
            required
          />
          {siretError && <p className="text-red-400 text-sm mt-1">{siretError}</p>}
        </div>

        {/* Code APE */}
        <div>
          <Label htmlFor="codeAPE" className="text-white mb-2 block">
            Code APE/NAF
          </Label>
          <Input
            id="codeAPE"
            value={data.codeAPE}
            onChange={(e) => handleChange('codeAPE', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Ex: 7830Z"
          />
        </div>

        {/* N° TVA Intracommunautaire */}
        <div className="md:col-span-2">
          <Label htmlFor="tva" className="text-white mb-2 block">
            N° TVA Intracommunautaire
          </Label>
          <Input
            id="tva"
            value={data.tvaIntracommunautaire}
            onChange={(e) => handleChange('tvaIntracommunautaire', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Ex: FR12345678901"
          />
        </div>

        {/* Adresse */}
        <div className="md:col-span-2">
          <Label htmlFor="adresse" className="text-white mb-2 block">
            Adresse complète
          </Label>
          <Input
            id="adresse"
            value={data.adresse}
            onChange={(e) => handleChange('adresse', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Numéro et nom de rue"
          />
        </div>

        {/* Code postal */}
        <div>
          <Label htmlFor="codePostal" className="text-white mb-2 block">
            Code postal <span className="text-red-400">*</span>
          </Label>
          <Input
            id="codePostal"
            value={data.codePostal}
            onChange={(e) => handleChange('codePostal', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Ex: 75001"
            maxLength={5}
            required
          />
        </div>

        {/* Ville */}
        <div>
          <Label htmlFor="ville" className="text-white mb-2 block">
            Ville <span className="text-red-400">*</span>
          </Label>
          <Input
            id="ville"
            value={data.ville}
            onChange={(e) => handleChange('ville', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Ex: Paris"
            required
          />
        </div>

        {/* Région - Conditionnel selon le pays */}
        <div>
          <Label className="text-white mb-2 block">
            Région/État {estFrance && <span className="text-red-400">*</span>}
          </Label>
          {estFrance ? (
            // France : Sélecteur avec les 13 régions françaises
            <Select value={data.region} onValueChange={(value) => handleChange('region', value)} required>
              <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/60">
                <SelectValue placeholder="Sélectionnez une région" />
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
              placeholder="Ex: Bavaria, Cataluña, Lombardia..."
            />
          )}
        </div>

        {/* Site internet */}
        <div>
          <Label htmlFor="siteInternet" className="text-white mb-2 block">
            Site internet
          </Label>
          <Input
            id="siteInternet"
            value={data.siteInternet}
            onChange={(e) => handleChange('siteInternet', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="https://www.exemple.fr"
            type="url"
          />
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mt-6">
        <p className="text-cyan-200 text-sm">
          ✓ Ces informations seront utilisées pour générer votre devis personnalisé
        </p>
      </div>
    </div>
  );
}