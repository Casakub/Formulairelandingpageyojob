import { useState, useEffect } from 'react';
import { Input } from './input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { EU_COUNTRY_CODES, suggestCountryCode, type CountryCode } from '../../data/country-codes';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface PhoneInputProps {
  value: string; // Format: "+33612345678" (numéro complet avec code pays)
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: boolean;
  lang: DevisLanguage;
  suggestedCountry?: string; // Nom du pays pour suggérer le code (ex: "France")
}

export function PhoneInput({
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  className = '',
  error = false,
  lang,
  suggestedCountry
}: PhoneInputProps) {
  // Détecter le code pays depuis la valeur ou suggérer depuis le pays
  const detectCountryCode = (): string => {
    if (value && value.startsWith('+')) {
      // Trouver le pays qui correspond au code
      const country = EU_COUNTRY_CODES.find(c => value.startsWith(c.dialCode));
      return country?.code || 'FR';
    }
    
    // Suggérer depuis le pays de l'entreprise
    if (suggestedCountry) {
      return suggestCountryCode(suggestedCountry);
    }
    
    return 'FR'; // Par défaut
  };

  const [countryCode, setCountryCode] = useState<string>(detectCountryCode());
  const [localNumber, setLocalNumber] = useState<string>('');

  // Initialiser le numéro local depuis la valeur complète
  useEffect(() => {
    if (value && value.startsWith('+')) {
      const country = EU_COUNTRY_CODES.find(c => c.code === countryCode);
      if (country) {
        const local = value.replace(country.dialCode, '').trim();
        setLocalNumber(local);
      }
    }
  }, []);

  // Mettre à jour le code pays suggéré quand le pays de l'entreprise change
  useEffect(() => {
    if (suggestedCountry && !value) {
      const suggested = suggestCountryCode(suggestedCountry);
      setCountryCode(suggested);
    }
  }, [suggestedCountry]);

  const currentCountry = EU_COUNTRY_CODES.find(c => c.code === countryCode) || EU_COUNTRY_CODES[0];

  const handleCountryChange = (newCode: string) => {
    setCountryCode(newCode);
    const newCountry = EU_COUNTRY_CODES.find(c => c.code === newCode);
    if (newCountry && localNumber) {
      // Reconstruire le numéro complet avec le nouveau code pays
      const fullNumber = `${newCountry.dialCode}${localNumber.replace(/\s/g, '')}`;
      onChange(fullNumber);
    }
  };

  const handleLocalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Autoriser uniquement chiffres, espaces, tirets, parenthèses
    input = input.replace(/[^\d\s\-()]/g, '');
    
    // Limiter à la longueur maximale du pays (+2 pour flexibilité)
    const maxLength = currentCountry.phoneLength + 2;
    if (input.replace(/\D/g, '').length > maxLength) {
      return;
    }
    
    setLocalNumber(input);
    
    // Construire le numéro complet au format international
    const digitsOnly = input.replace(/\D/g, '');
    if (digitsOnly.length > 0) {
      const fullNumber = `${currentCountry.dialCode}${digitsOnly}`;
      onChange(fullNumber);
    } else {
      onChange('');
    }
  };

  return (
    <div className="flex gap-2">
      {/* Sélecteur de code pays */}
      <Select value={countryCode} onValueChange={handleCountryChange}>
        <SelectTrigger 
          className={`w-[140px] bg-white/10 border-white/20 text-white ${error ? 'border-red-500' : ''}`}
        >
          <SelectValue>
            <span className="flex items-center gap-2">
              <span className="text-xl">{currentCountry.flag}</span>
              <span className="text-sm">{currentCountry.dialCode}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {EU_COUNTRY_CODES.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{country.flag}</span>
                <span className="text-sm">{country.name[lang]}</span>
                <span className="text-xs text-gray-500">{country.dialCode}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Input du numéro local */}
      <Input
        type="tel"
        value={localNumber}
        onChange={handleLocalNumberChange}
        onBlur={onBlur}
        className={`flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 ${error ? 'border-red-500' : ''} ${className}`}
        placeholder={placeholder || currentCountry.placeholder}
        required={required}
      />
    </div>
  );
}
