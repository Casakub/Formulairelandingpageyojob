import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { validerEmail, validerTelephone } from '../../utils/devis-calculations';
import { useState } from 'react';

interface Step2ContactProps {
  data: {
    nom: string;
    prenom: string;
    fonction: string;
    email: string;
    telephoneFixe: string;
    telephonePortable: string;
  };
  onChange: (data: any) => void;
}

export function Step2Contact({ data, onChange }: Step2ContactProps) {
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
      setEmailError('Email invalide');
    } else {
      setEmailError('');
    }
  };

  const handleTelBlur = () => {
    if (data.telephonePortable && !validerTelephone(data.telephonePortable)) {
      setTelError('Numéro de téléphone invalide');
    } else {
      setTelError('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">Votre contact</h2>
        <p className="text-white/70">
          Renseignez les coordonnées de la personne en charge de ce projet.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Nom */}
        <div>
          <Label htmlFor="nom" className="text-white mb-2 block">
            Nom <span className="text-red-400">*</span>
          </Label>
          <Input
            id="nom"
            value={data.nom}
            onChange={(e) => handleChange('nom', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Nom de famille"
            required
          />
        </div>

        {/* Prénom */}
        <div>
          <Label htmlFor="prenom" className="text-white mb-2 block">
            Prénom <span className="text-red-400">*</span>
          </Label>
          <Input
            id="prenom"
            value={data.prenom}
            onChange={(e) => handleChange('prenom', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Prénom"
            required
          />
        </div>

        {/* Fonction */}
        <div className="md:col-span-2">
          <Label htmlFor="fonction" className="text-white mb-2 block">
            Fonction
          </Label>
          <Input
            id="fonction"
            value={data.fonction}
            onChange={(e) => handleChange('fonction', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="Ex: Responsable RH, Directeur des opérations"
          />
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <Label htmlFor="email" className="text-white mb-2 block">
            Email professionnel <span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={handleEmailBlur}
            className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${emailError ? 'border-red-500' : ''}`}
            placeholder="prenom.nom@entreprise.fr"
            required
          />
          {emailError && <p className="text-red-400 text-sm mt-1">{emailError}</p>}
        </div>

        {/* Téléphone fixe */}
        <div>
          <Label htmlFor="telephoneFixe" className="text-white mb-2 block">
            Téléphone fixe
          </Label>
          <Input
            id="telephoneFixe"
            type="tel"
            value={data.telephoneFixe}
            onChange={(e) => handleChange('telephoneFixe', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            placeholder="01 23 45 67 89"
          />
        </div>

        {/* Téléphone portable */}
        <div>
          <Label htmlFor="telephonePortable" className="text-white mb-2 block">
            Téléphone portable <span className="text-red-400">*</span>
          </Label>
          <Input
            id="telephonePortable"
            type="tel"
            value={data.telephonePortable}
            onChange={(e) => handleChange('telephonePortable', e.target.value)}
            onBlur={handleTelBlur}
            className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 ${telError ? 'border-red-500' : ''}`}
            placeholder="06 12 34 56 78"
            required
          />
          {telError && <p className="text-red-400 text-sm mt-1">{telError}</p>}
        </div>
      </div>

      <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4 mt-6">
        <p className="text-violet-200 text-sm">
          🔒 Vos coordonnées sont sécurisées et ne seront utilisées que dans le cadre de votre demande de devis
        </p>
      </div>
    </div>
  );
}
