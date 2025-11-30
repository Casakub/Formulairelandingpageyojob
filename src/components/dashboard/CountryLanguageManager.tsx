import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { 
  Globe,
  Search,
  MapPin,
  Users,
  CheckCircle,
  Edit2,
  Save,
  X,
  Languages,
  Info,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { ScrollArea } from '../ui/scroll-area';
import { saveCountryLanguageMapping, bulkSaveCountryLanguageMappings, fetchCountryLanguageMappings } from '../../lib/i18n-api';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { EUROPEAN_LANGUAGES } from '../../lib/languages';

// Use centralized language list
const AVAILABLE_LANGUAGES = EUROPEAN_LANGUAGES;

interface Country {
  code: string;
  name: string;
  flag: string;
  defaultLanguages: string[];
  population: string;
  agencies: number;
}

const EUROPEAN_COUNTRIES: Country[] = [
  { code: 'FR', name: 'France', flag: '🇫🇷', defaultLanguages: ['fr', 'en'], population: '67M', agencies: 85 },
  { code: 'DE', name: 'Allemagne', flag: '🇩🇪', defaultLanguages: ['de', 'en'], population: '83M', agencies: 120 },
  { code: 'ES', name: 'Espagne', flag: '🇪🇸', defaultLanguages: ['es', 'en'], population: '47M', agencies: 65 },
  { code: 'IT', name: 'Italie', flag: '🇮🇹', defaultLanguages: ['it', 'en'], population: '60M', agencies: 72 },
  { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱', defaultLanguages: ['nl', 'en'], population: '17M', agencies: 45 },
  { code: 'BE', name: 'Belgique', flag: '🇧🇪', defaultLanguages: ['nl', 'fr', 'de', 'en'], population: '11M', agencies: 38 },
  { code: 'PL', name: 'Pologne', flag: '🇵🇱', defaultLanguages: ['pl', 'en'], population: '38M', agencies: 42 },
  { code: 'RO', name: 'Roumanie', flag: '🇷🇴', defaultLanguages: ['ro', 'en'], population: '19M', agencies: 28 },
  { code: 'CZ', name: 'République tchèque', flag: '🇨🇿', defaultLanguages: ['cs', 'en'], population: '10M', agencies: 22 },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', defaultLanguages: ['pt', 'en'], population: '10M', agencies: 18 },
  { code: 'HU', name: 'Hongrie', flag: '🇭🇺', defaultLanguages: ['hu', 'en'], population: '10M', agencies: 15 },
  { code: 'SE', name: 'Suède', flag: '🇸🇪', defaultLanguages: ['sv', 'en'], population: '10M', agencies: 25 },
  { code: 'AT', name: 'Autriche', flag: '🇦🇹', defaultLanguages: ['de', 'en'], population: '9M', agencies: 20 },
  { code: 'BG', name: 'Bulgarie', flag: '🇧🇬', defaultLanguages: ['bg', 'en'], population: '7M', agencies: 12 },
  { code: 'DK', name: 'Danemark', flag: '🇩🇰', defaultLanguages: ['da', 'en'], population: '6M', agencies: 18 },
  { code: 'FI', name: 'Finlande', flag: '🇫🇮', defaultLanguages: ['fi', 'en'], population: '6M', agencies: 14 },
  { code: 'SK', name: 'Slovaquie', flag: '🇸🇰', defaultLanguages: ['sk', 'en'], population: '5M', agencies: 10 },
  { code: 'IE', name: 'Irlande', flag: '🇮🇪', defaultLanguages: ['en'], population: '5M', agencies: 16 },
  { code: 'HR', name: 'Croatie', flag: '🇭🇷', defaultLanguages: ['hr', 'en'], population: '4M', agencies: 8 },
  { code: 'NO', name: 'Norvège', flag: '🇳🇴', defaultLanguages: ['no', 'en'], population: '5M', agencies: 12 },
  { code: 'LT', name: 'Lituanie', flag: '🇱🇹', defaultLanguages: ['lt', 'en'], population: '3M', agencies: 7 },
  { code: 'SI', name: 'Slovénie', flag: '🇸🇮', defaultLanguages: ['sl', 'en'], population: '2M', agencies: 5 },
  { code: 'LV', name: 'Lettonie', flag: '🇱🇻', defaultLanguages: ['lv', 'en'], population: '2M', agencies: 6 },
  { code: 'EE', name: 'Estonie', flag: '🇪🇪', defaultLanguages: ['et', 'en'], population: '1M', agencies: 4 },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', defaultLanguages: ['fr', 'de', 'en'], population: '0.6M', agencies: 8 },
  { code: 'MT', name: 'Malte', flag: '🇲🇹', defaultLanguages: ['en'], population: '0.5M', agencies: 3 },
  { code: 'CY', name: 'Chypre', flag: '🇨🇾', defaultLanguages: ['el', 'en'], population: '1M', agencies: 4 },
  { code: 'CH', name: 'Suisse', flag: '🇨🇭', defaultLanguages: ['de', 'fr', 'it', 'en'], population: '9M', agencies: 32 },
  { code: 'GR', name: 'Grèce', flag: '🇬🇷', defaultLanguages: ['el', 'en'], population: '11M', agencies: 15 },
  { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', defaultLanguages: ['en'], population: '67M', agencies: 95 },
];

interface CountryLanguageManagerProps {
  onBack: () => void;
}

export function CountryLanguageManager({ onBack }: CountryLanguageManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCountry, setEditingCountry] = useState<string | null>(null);
  const [countryLanguages, setCountryLanguages] = useState<Record<string, string[]>>(
    EUROPEAN_COUNTRIES.reduce((acc, country) => ({
      ...acc,
      [country.code]: country.defaultLanguages
    }), {})
  );
  const [countryAgencies, setCountryAgencies] = useState<Record<string, number>>(
    EUROPEAN_COUNTRIES.reduce((acc, country) => ({
      ...acc,
      [country.code]: country.agencies
    }), {})
  );
  const [tempLanguages, setTempLanguages] = useState<string[]>([]);
  const [tempAgencies, setTempAgencies] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load country-language mappings on mount
  useEffect(() => {
    async function loadMappings() {
      setLoading(true);
      const mappings = await fetchCountryLanguageMappings();
      
      if (mappings.length > 0) {
        const mappingsObj: Record<string, string[]> = {};
        mappings.forEach(m => {
          mappingsObj[m.countryCode] = m.languages;
        });
        setCountryLanguages(prev => ({ ...prev, ...mappingsObj }));
      }
      
      setLoading(false);
    }

    loadMappings();
  }, []);

  const filteredCountries = EUROPEAN_COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartEdit = (countryCode: string) => {
    setEditingCountry(countryCode);
    setTempLanguages(countryLanguages[countryCode] || []);
    setTempAgencies(countryAgencies[countryCode] || 0);
  };

  const handleSaveEdit = async () => {
    if (!editingCountry) return;
    
    setSaving(true);
    
    try {
      const success = await saveCountryLanguageMapping(editingCountry, tempLanguages);
      
      if (success) {
        setCountryLanguages(prev => ({
          ...prev,
          [editingCountry]: tempLanguages
        }));
        
        // Sauvegarder le nombre d'agences localement
        setCountryAgencies(prev => ({
          ...prev,
          [editingCountry]: tempAgencies
        }));
        
        toast.success('Configuration sauvegardée', {
          description: `${EUROPEAN_COUNTRIES.find(c => c.code === editingCountry)?.name} : ${tempAgencies} agences, ${tempLanguages.length} langues.`
        });
        setEditingCountry(null);
        setTempLanguages([]);
        setTempAgencies(0);
      } else {
        toast.error('Erreur de sauvegarde', {
          description: 'Impossible de sauvegarder la configuration. Veuillez réessayer.'
        });
      }
    } catch (error) {
      console.error('Error saving country-language mapping:', error);
      toast.error('Erreur', {
        description: 'Une erreur est survenue lors de la sauvegarde.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingCountry(null);
    setTempLanguages([]);
    setTempAgencies(0);
  };

  const toggleLanguage = (langCode: string) => {
    setTempLanguages(prev =>
      prev.includes(langCode)
        ? prev.filter(l => l !== langCode)
        : [...prev, langCode]
    );
  };

  const getTotalLanguages = () => {
    const allLangs = new Set<string>();
    Object.values(countryLanguages).forEach(langs => {
      langs.forEach(lang => allLangs.add(lang));
    });
    return allLangs.size;
  };

  const getTotalCountries = () => EUROPEAN_COUNTRIES.length;
  const getTotalAgencies = () => EUROPEAN_COUNTRIES.reduce((sum, c) => sum + c.agencies, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-3 -ml-2 text-slate-600 hover:text-slate-900"
        >
          <X className="w-4 h-4 mr-2" />
          Fermer
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900">Pays & langues européennes</h2>
            <p className="text-slate-600 text-sm">
              Configurez les langues disponibles pour chaque pays cible
            </p>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-cyan-200 bg-cyan-50/50">
        <Info className="h-4 w-4 text-cyan-600" />
        <AlertDescription className="text-cyan-800 text-sm">
          <strong>Logique pays → langues :</strong> Chaque pays peut avoir plusieurs langues. Le formulaire détectera automatiquement le pays de l'utilisateur et proposera les langues correspondantes en priorité.
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-700 mb-1">Pays couverts</p>
                <p className="text-blue-900">{getTotalCountries()}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-violet-700 mb-1">Langues actives</p>
                <p className="text-violet-900">{getTotalLanguages()}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Languages className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-700 mb-1">Agences totales</p>
                <p className="text-green-900">{getTotalAgencies()}+</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-teal-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-cyan-700 mb-1">Configurations</p>
                <p className="text-cyan-900">{Object.keys(countryLanguages).length}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Rechercher un pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country, idx) => {
          const isEditing = editingCountry === country.code;
          const languages = countryLanguages[country.code] || [];

          return (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Card className="border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <CardTitle className="text-slate-900">{country.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {country.population} • {countryAgencies[country.code] || country.agencies} agences
                        </CardDescription>
                      </div>
                    </div>
                    {!isEditing && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStartEdit(country.code)}
                        className="text-slate-500 hover:text-slate-900"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      {/* Édition du nombre d'agences */}
                      <div>
                        <Label className="text-xs text-slate-600 mb-2 block">
                          Nombre d'agences
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={tempAgencies}
                          onChange={(e) => setTempAgencies(parseInt(e.target.value) || 0)}
                          placeholder="Ex: 85"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs text-slate-600 mb-2 block">
                          Sélectionnez les langues disponibles
                        </Label>
                        <ScrollArea className="h-[200px] border border-slate-200 rounded-lg p-3">
                          <div className="space-y-2">
                            {AVAILABLE_LANGUAGES.map((lang) => (
                              <div key={lang.code} className="flex items-center gap-2">
                                <Checkbox
                                  id={`${country.code}-${lang.code}`}
                                  checked={tempLanguages.includes(lang.code)}
                                  onCheckedChange={() => toggleLanguage(lang.code)}
                                />
                                <Label
                                  htmlFor={`${country.code}-${lang.code}`}
                                  className="text-sm cursor-pointer flex items-center gap-2"
                                >
                                  <span>{lang.flag}</span>
                                  <span>{lang.nativeName}</span>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={saving}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        >
                          <Save className="w-3 h-3 mr-2" />
                          {saving ? 'Sauvegarde...' : 'Enregistrer'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label className="text-xs text-slate-600 mb-2 block">
                        Langues configurées ({languages.length})
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {languages.length > 0 ? (
                          languages.map((langCode) => {
                            const lang = AVAILABLE_LANGUAGES.find(l => l.code === langCode);
                            return lang ? (
                              <Badge
                                key={langCode}
                                variant="outline"
                                className="border-blue-300 text-blue-700 bg-blue-50"
                              >
                                <span className="mr-1">{lang.flag}</span>
                                {lang.code.toUpperCase()}
                              </Badge>
                            ) : null;
                          })
                        ) : (
                          <p className="text-xs text-slate-400 italic">Aucune langue configurée</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}