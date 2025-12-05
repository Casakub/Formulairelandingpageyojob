import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Zap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner@2.0.3';
import { bulkSaveCountryLanguageMappings } from '../../lib/i18n-api';

// Mappings pays-langues pour les 27 pays de l'UE
const EU_COUNTRY_LANGUAGE_MAPPINGS = [
  { countryCode: 'FR', languages: ['fr', 'en'] },
  { countryCode: 'DE', languages: ['de', 'en'] },
  { countryCode: 'ES', languages: ['es', 'en'] },
  { countryCode: 'IT', languages: ['it', 'en'] },
  { countryCode: 'NL', languages: ['nl', 'en'] },
  { countryCode: 'PL', languages: ['pl', 'en'] },
  { countryCode: 'PT', languages: ['pt', 'en'] },
  { countryCode: 'GR', languages: ['el', 'en'] },
  { countryCode: 'SE', languages: ['sv', 'en'] },
  { countryCode: 'DK', languages: ['da', 'en'] },
  { countryCode: 'FI', languages: ['fi', 'en'] },
  { countryCode: 'CZ', languages: ['cs', 'en'] },
  { countryCode: 'HU', languages: ['hu', 'en'] },
  { countryCode: 'RO', languages: ['ro', 'en'] },
  { countryCode: 'BG', languages: ['bg', 'en'] },
  { countryCode: 'SK', languages: ['sk', 'en'] },
  { countryCode: 'SI', languages: ['sl', 'en'] },
  { countryCode: 'HR', languages: ['hr', 'en'] },
  { countryCode: 'LT', languages: ['lt', 'en'] },
  { countryCode: 'LV', languages: ['lv', 'en'] },
  { countryCode: 'EE', languages: ['et', 'en'] },
  { countryCode: 'AT', languages: ['de', 'en'] }, // Autriche → allemand
  { countryCode: 'BE', languages: ['nl', 'fr', 'en'] }, // Belgique → néerlandais, français
  { countryCode: 'LU', languages: ['fr', 'de', 'en'] }, // Luxembourg → français, allemand
  { countryCode: 'IE', languages: ['en'] }, // Irlande → anglais
  { countryCode: 'MT', languages: ['en'] }, // Malte → anglais
  { countryCode: 'CY', languages: ['el', 'en'] }, // Chypre → grec
];

const COUNTRY_NAMES: Record<string, string> = {
  FR: '🇫🇷 France',
  DE: '🇩🇪 Allemagne',
  ES: '🇪🇸 Espagne',
  IT: '🇮🇹 Italie',
  NL: '🇳🇱 Pays-Bas',
  PL: '🇵🇱 Pologne',
  PT: '🇵🇹 Portugal',
  GR: '🇬🇷 Grèce',
  SE: '🇸🇪 Suède',
  DK: '🇩🇰 Danemark',
  FI: '🇫🇮 Finlande',
  CZ: '🇨🇿 République tchèque',
  HU: '🇭🇺 Hongrie',
  RO: '🇷🇴 Roumanie',
  BG: '🇧🇬 Bulgarie',
  SK: '🇸🇰 Slovaquie',
  SI: '🇸🇮 Slovénie',
  HR: '🇭🇷 Croatie',
  LT: '🇱🇹 Lituanie',
  LV: '🇱🇻 Lettonie',
  EE: '🇪🇪 Estonie',
  AT: '🇦🇹 Autriche',
  BE: '🇧🇪 Belgique',
  LU: '🇱🇺 Luxembourg',
  IE: '🇮🇪 Irlande',
  MT: '🇲🇹 Malte',
  CY: '🇨🇾 Chypre',
};

export function CountryLanguageGenerator() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      console.log('🗺️ Generating country-language mappings for 27 EU countries...');
      
      const result = await bulkSaveCountryLanguageMappings(EU_COUNTRY_LANGUAGE_MAPPINGS);

      if (result) {
        setSuccess(true);
        toast.success('✅ Mappings générés avec succès', {
          description: `27 pays européens configurés`
        });
        
        // Reload after 2 seconds to refresh data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Failed to save mappings');
      }
    } catch (error) {
      console.error('❌ Error generating country mappings:', error);
      toast.error('❌ Erreur de génération', {
        description: error instanceof Error ? error.message : 'Impossible de créer les mappings'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-orange-200 bg-orange-50/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100">
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Générer les Mappings Pays-Langues</CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                Configuration automatique pour les 27 pays de l'UE
              </p>
            </div>
          </div>
          {success && (
            <CheckCircle className="w-6 h-6 text-green-500" />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!success ? (
          <>
            <Alert className="bg-orange-50 border-orange-200">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <AlertDescription className="text-orange-800 text-sm">
                <strong>⚠️ Attention :</strong> Vous n'avez que <strong>1 mapping</strong> sur 27 nécessaires.
                Cliquez ci-dessous pour générer automatiquement tous les mappings pays-langues.
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-white rounded-xl border border-orange-100">
              <h4 className="text-sm mb-3">📋 Pays qui seront configurés :</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                {EU_COUNTRY_LANGUAGE_MAPPINGS.map((mapping) => (
                  <div key={mapping.countryCode} className="text-xs p-2 bg-slate-50 rounded border">
                    <div className="mb-1">{COUNTRY_NAMES[mapping.countryCode]}</div>
                    <Badge variant="secondary" className="text-xs">
                      {mapping.languages.join(', ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Générer les 27 mappings automatiquement
                </>
              )}
            </Button>

            <div className="text-xs text-slate-500 text-center">
              💡 Cette opération créera automatiquement les associations pays → langues pour toute l'Europe
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-green-50 rounded-xl border-2 border-green-200 text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-green-900 mb-2">✅ Mappings générés avec succès !</h3>
            <p className="text-sm text-green-700">
              Les 27 pays européens sont maintenant configurés.
              La page va se recharger automatiquement...
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
