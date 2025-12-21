import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { validerEmail, validerTelephone } from '../../utils/devis-calculations';
import { useState } from 'react';
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface Step2ContactProps {
  data: {
    civilite?: string;
    nom: string;
    prenom: string;
    fonction: string;
    email: string;
    telephoneFixe: string;
    telephonePortable: string;
  };
  onChange: (data: any) => void;
  lang?: DevisLanguage;
}

export function Step2Contact({ data, onChange, lang = 'fr' }: Step2ContactProps) {
  const { t, isLoading } = useDevisTranslationStatic(lang);
  const [emailError, setEmailError] = useState('');
  const [telError, setTelError] = useState('');

  const handleChange = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleEmailBlur = () => {
    if (data.email && !validerEmail(data.email)) {
      setEmailError(t.step2.fields.email.error);
    } else {
      setEmailError('');
    }
  };

  const handleTelBlur = () => {
    if (data.telephonePortable && !validerTelephone(data.telephonePortable)) {
      setTelError(t.errors.invalidPhone);
    } else {
      setTelError('');
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
        <h2 className="text-white text-2xl mb-2">{t.step2.title}</h2>
        <p className="text-white/70">
          {t.step2.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Civilité */}
        <div className="md:col-span-2">
          <Label className="text-white mb-2 block">
            {t.step2.fields.civilite.label}
          </Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="civilite"
                value="m"
                checked={data.civilite === 'm'}
                onChange={(e) => handleChange('civilite', e.target.value)}
                className="w-4 h-4 text-cyan-500"
              />
              <span className="text-white">{t.step2.fields.civilite.options.m}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="civilite"
                value="mme"
                checked={data.civilite === 'mme'}
                onChange={(e) => handleChange('civilite', e.target.value)}
                className="w-4 h-4 text-cyan-500"
              />
              <span className="text-white">{t.step2.fields.civilite.options.mme}</span>
            </label>
          </div>
        </div>

        {/* Nom */}
        <div>
          <Label htmlFor="nom" className="text-white mb-2 block">
            {t.step2.fields.nom.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="nom"
            value={data.nom}
            onChange={(e) => handleChange('nom', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step2.fields.nom.placeholder}
            required
          />
        </div>

        {/* Prénom */}
        <div>
          <Label htmlFor="prenom" className="text-white mb-2 block">
            {t.step2.fields.prenom.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="prenom"
            value={data.prenom}
            onChange={(e) => handleChange('prenom', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step2.fields.prenom.placeholder}
            required
          />
        </div>

        {/* Fonction */}
        <div className="md:col-span-2">
          <Label htmlFor="fonction" className="text-white mb-2 block">
            {t.step2.fields.fonction.label}
          </Label>
          <Input
            id="fonction"
            value={data.fonction}
            onChange={(e) => handleChange('fonction', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder={t.step2.fields.fonction.placeholder}
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <Label htmlFor="email" className="text-white mb-2 block">
            {t.step2.fields.email.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={handleEmailBlur}
            className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${emailError ? 'border-red-500' : ''}`}
            placeholder={t.step2.fields.email.placeholder}
            required
          />
          {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
        </div>

        {/* Téléphone */}
        <div className="md:col-span-2">
          <Label htmlFor="telephone" className="text-white mb-2 block">
            {t.step2.fields.telephone.label} <span className="text-red-400">{t.common.required}</span>
          </Label>
          <Input
            id="telephone"
            type="tel"
            value={data.telephonePortable}
            onChange={(e) => handleChange('telephonePortable', e.target.value)}
            onBlur={handleTelBlur}
            className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${telError ? 'border-red-500' : ''}`}
            placeholder={t.step2.fields.telephone.placeholder}
            required
          />
          {telError && <p className="text-red-400 text-sm mt-1">{telError}</p>}
        </div>
      </div>
    </div>
  );
}
