import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Building2, Briefcase, UserCheck, Rocket } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface NewProspectDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PROSPECT_TYPES = [
  { value: 'client', label: 'Client', icon: Building2 },
  { value: 'agency', label: 'Agence ETT', icon: Briefcase },
  { value: 'interim', label: 'Intérimaire', icon: UserCheck },
  { value: 'waitlist', label: 'Liste d\'attente', icon: Rocket },
];

const SECTORS = [
  'BTP',
  'Industrie',
  'Logistique',
  'Hôtellerie-Restauration',
  'Agriculture',
  'Santé',
  'Tech/IT',
  'Services',
  'Commerce',
  'Autre',
];

const COUNTRIES = [
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Allemagne', flag: '🇩🇪' },
  { code: 'ES', name: 'Espagne', flag: '🇪🇸' },
  { code: 'IT', name: 'Italie', flag: '🇮🇹' },
  { code: 'PL', name: 'Pologne', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgique', flag: '🇧🇪' },
  { code: 'CZ', name: 'République Tchèque', flag: '🇨🇿' },
  { code: 'RO', name: 'Roumanie', flag: '🇷🇴' },
];

export function NewProspectDialog({ open, onClose, onSuccess }: NewProspectDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'client',
    name: '',
    email: '',
    phone: '',
    company: '',
    countryCode: 'FR',
    sector: '',
    needType: '',
    message: '',
    customFields: {
      companyId: '',
      website: '',
      companySize: '',
      foundedYear: '',
      agencySpecialties: '',
      operatingCountries: '',
      annualRecruitmentVolume: '',
      hrBudget: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/submit`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            source: 'manual',
            customFields: {
              created_by: 'Admin',
              created_from: 'dashboard',
              manual_entry: true,
              ...formData.customFields,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert('✅ Prospect créé avec succès !');
        setFormData({
          type: 'client',
          name: '',
          email: '',
          phone: '',
          company: '',
          countryCode: 'FR',
          sector: '',
          needType: '',
          message: '',
          customFields: {
            companyId: '',
            website: '',
            companySize: '',
            foundedYear: '',
            agencySpecialties: '',
            operatingCountries: '',
            annualRecruitmentVolume: '',
            hrBudget: '',
          },
        });
        onSuccess();
        onClose();
      } else {
        throw new Error(data.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error creating prospect:', error);
      alert('❌ Erreur lors de la création du prospect');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-500 to-cyan-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-white">Nouveau prospect</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Type de prospect */}
                <div>
                  <Label className="text-slate-700 mb-2 block">Type de prospect *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PROSPECT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.value })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.type === type.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 mx-auto mb-2 ${
                              formData.type === type.value ? 'text-blue-500' : 'text-slate-400'
                            }`}
                          />
                          <p className="text-sm text-slate-900">{type.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Informations de contact */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-700">
                      Nom complet *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Jean Dupont"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="jean.dupont@entreprise.fr"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-slate-700">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-slate-700">
                      Entreprise
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Entreprise SAS"
                      className="mt-1.5"
                    />
                  </div>
                </div>

                {/* Champs spécifiques pour Agences et Clients */}
                {(formData.type === 'agency' || formData.type === 'client') && (
                  <>
                    {/* Numéro d'identification et Site web */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyId" className="text-slate-700">
                          Numéro d&apos;identification {formData.type === 'agency' ? '(SIRET, VAT)' : '(SIRET)'}
                        </Label>
                        <Input
                          id="companyId"
                          value={formData.customFields?.companyId || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customFields: { ...formData.customFields, companyId: e.target.value },
                            })
                          }
                          placeholder={formData.type === 'agency' ? 'FR123456789 ou VAT123' : '12345678901234'}
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="website" className="text-slate-700">
                          Site web
                        </Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.customFields?.website || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customFields: { ...formData.customFields, website: e.target.value },
                            })
                          }
                          placeholder="https://www.entreprise.com"
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    {/* Taille et Année de création */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companySize" className="text-slate-700">
                          Nombre d&apos;employés
                        </Label>
                        <Select
                          value={formData.customFields?.companySize || ''}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              customFields: { ...formData.customFields, companySize: value },
                            })
                          }
                        >
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Sélectionner la taille" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-9">1-9 employés</SelectItem>
                            <SelectItem value="10-49">10-49 employés</SelectItem>
                            <SelectItem value="50-249">50-249 employés</SelectItem>
                            <SelectItem value="250-999">250-999 employés</SelectItem>
                            <SelectItem value="1000+">1000+ employés</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="foundedYear" className="text-slate-700">
                          Année de création
                        </Label>
                        <Input
                          id="foundedYear"
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          value={formData.customFields?.foundedYear || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customFields: { ...formData.customFields, foundedYear: e.target.value },
                            })
                          }
                          placeholder="2010"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Champs spécifiques AGENCES uniquement */}
                {formData.type === 'agency' && (
                  <>
                    <div>
                      <Label htmlFor="agencySpecialties" className="text-slate-700">
                        Spécialités de recrutement
                      </Label>
                      <Input
                        id="agencySpecialties"
                        value={formData.customFields?.agencySpecialties || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customFields: { ...formData.customFields, agencySpecialties: e.target.value },
                          })
                        }
                        placeholder="Ex: BTP, Industrie, Logistique"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="operatingCountries" className="text-slate-700">
                        Pays d&apos;opération
                      </Label>
                      <Input
                        id="operatingCountries"
                        value={formData.customFields?.operatingCountries || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customFields: { ...formData.customFields, operatingCountries: e.target.value },
                          })
                        }
                        placeholder="Ex: France, Pologne, Roumanie"
                        className="mt-1.5"
                      />
                    </div>
                  </>
                )}

                {/* Champs spécifiques CLIENTS uniquement */}
                {formData.type === 'client' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="annualRecruitmentVolume" className="text-slate-700">
                        Volume de recrutement annuel
                      </Label>
                      <Select
                        value={formData.customFields?.annualRecruitmentVolume || ''}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            customFields: { ...formData.customFields, annualRecruitmentVolume: value },
                          })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Sélectionner le volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 recrutements/an</SelectItem>
                          <SelectItem value="11-50">11-50 recrutements/an</SelectItem>
                          <SelectItem value="51-100">51-100 recrutements/an</SelectItem>
                          <SelectItem value="101-500">101-500 recrutements/an</SelectItem>
                          <SelectItem value="500+">500+ recrutements/an</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="hrBudget" className="text-slate-700">
                        Budget annuel RH
                      </Label>
                      <Select
                        value={formData.customFields?.hrBudget || ''}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            customFields: { ...formData.customFields, hrBudget: value },
                          })
                        }
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Sélectionner le budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<50k">&lt; 50k€</SelectItem>
                          <SelectItem value="50k-100k">50k€ - 100k€</SelectItem>
                          <SelectItem value="100k-250k">100k€ - 250k€</SelectItem>
                          <SelectItem value="250k-500k">250k€ - 500k€</SelectItem>
                          <SelectItem value="500k+">500k€+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Localisation et secteur */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-slate-700">
                      Pays
                    </Label>
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) =>
                        setFormData({ ...formData, countryCode: value })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              {country.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sector" className="text-slate-700">
                      Secteur d&apos;activité
                    </Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(value) => setFormData({ ...formData, sector: value })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Sélectionner un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        {SECTORS.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Besoin */}
                <div>
                  <Label htmlFor="needType" className="text-slate-700">
                    Type de besoin
                  </Label>
                  <Input
                    id="needType"
                    value={formData.needType}
                    onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                    placeholder="Ex: Recrutement de 10 ouvriers BTP"
                    className="mt-1.5"
                  />
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-slate-700">
                    Notes / Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Informations complémentaires..."
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Annuler
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                {isSubmitting ? 'Création...' : 'Créer le prospect'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}