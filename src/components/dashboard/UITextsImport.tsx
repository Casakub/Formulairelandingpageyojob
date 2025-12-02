import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, FileJson, CheckCircle, AlertCircle, Download, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function UITextsImport({ onImportSuccess }: { onImportSuccess?: () => void }) {
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [importedCount, setImportedCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setStatus('idle');

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validation du format
      if (!data.translations || !Array.isArray(data.translations)) {
        throw new Error('Format JSON invalide : champ "translations" manquant ou incorrect');
      }

      console.log(`📦 Importing ${data.translations.length} UI texts...`);

      // Appel à l'API
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/ui-texts/bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ translations: data.translations }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erreur lors de l\'import');
      }

      setStatus('success');
      setMessage(`${result.count} texte(s) importé(s) avec succès !`);
      setImportedCount(result.count);

      // Callback pour rafraîchir la liste
      if (onImportSuccess) {
        setTimeout(() => onImportSuccess(), 500);
      }
    } catch (error: any) {
      console.error('❌ Import error:', error);
      setStatus('error');
      setMessage(error.message || 'Erreur lors de l\'import');
    } finally {
      setImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDownloadTemplate = () => {
    // Générer le JSON d'exemple en mémoire
    const heroTranslationsTemplate = {
      name: "Hero Section Translations",
      description: "Traductions pour la page d'accueil du formulaire (Hero Section)",
      version: "1.0.0",
      date: new Date().toISOString().split('T')[0],
      translations: [
        {
          textId: "hero.badge",
          key: "hero.badge",
          category: "hero",
          translations: {
            fr: { text: "Étude de marché européenne", status: "validated" },
            en: { text: "European Market Study", status: "validated" },
            de: { text: "Europäische Marktstudie", status: "validated" },
            es: { text: "Estudio de mercado europeo", status: "validated" },
            it: { text: "Studio di mercato europeo", status: "validated" },
            nl: { text: "Europese marktstudie", status: "validated" },
            pl: { text: "Europejskie badanie rynku", status: "validated" },
            pt: { text: "Estudo de mercado europeu", status: "validated" }
          }
        },
        {
          textId: "hero.title",
          key: "hero.title",
          category: "hero",
          translations: {
            fr: { text: "Participez à l'avenir du détachement européen", status: "validated" },
            en: { text: "Participate in the future of European secondment", status: "validated" },
            de: { text: "Beteiligen Sie sich an der Zukunft der europäischen Entsendung", status: "validated" },
            es: { text: "Participe en el futuro del desplazamiento europeo", status: "validated" },
            it: { text: "Partecipate al futuro del distacco europeo", status: "validated" },
            nl: { text: "Neem deel aan de toekomst van Europese detachering", status: "validated" },
            pl: { text: "Weź udział w przyszłości europejskiego delegowania", status: "validated" },
            pt: { text: "Participe no futuro do destacamento europeu", status: "validated" }
          }
        },
        {
          textId: "hero.subtitle",
          key: "hero.subtitle",
          category: "hero",
          translations: {
            fr: { text: "Votre avis façonne YoJob. 8 minutes pour transformer votre quotidien administratif.", status: "validated" },
            en: { text: "Your opinion shapes YoJob. 8 minutes to transform your administrative daily life.", status: "validated" },
            de: { text: "Ihre Meinung formt YoJob. 8 Minuten, um Ihren Verwaltungsalltag zu transformieren.", status: "validated" },
            es: { text: "Su opinión da forma a YoJob. 8 minutos para transformar su rutina administrativa.", status: "validated" },
            it: { text: "La vostra opinione plasma YoJob. 8 minuti per trasformare il vostro quotidiano amministrativo.", status: "validated" },
            nl: { text: "Uw mening vormt YoJob. 8 minuten om uw administratieve dagelijkse leven te transformeren.", status: "validated" },
            pl: { text: "Twoja opinia kształtuje YoJob. 8 minut, aby zmienić codzienność administracyjną.", status: "validated" },
            pt: { text: "A sua opinião molda YoJob. 8 minutos para transformar o seu dia-a-dia administrativo.", status: "validated" }
          }
        },
        {
          textId: "hero.stat.countries",
          key: "hero.stat.countries",
          category: "hero",
          translations: {
            fr: { text: "27 pays couverts", status: "validated" },
            en: { text: "27 countries covered", status: "validated" },
            de: { text: "27 Länder abgedeckt", status: "validated" },
            es: { text: "27 países cubiertos", status: "validated" },
            it: { text: "27 paesi coperti", status: "validated" },
            nl: { text: "27 landen gedekt", status: "validated" },
            pl: { text: "27 krajów objętych", status: "validated" },
            pt: { text: "27 países cobertos", status: "validated" }
          }
        },
        {
          textId: "hero.stat.agencies",
          key: "hero.stat.agencies",
          category: "hero",
          translations: {
            fr: { text: "500+ agences partenaires", status: "validated" },
            en: { text: "500+ partner agencies", status: "validated" },
            de: { text: "500+ Partneragenturen", status: "validated" },
            es: { text: "500+ agencias asociadas", status: "validated" },
            it: { text: "500+ agenzie partner", status: "validated" },
            nl: { text: "500+ partnerbureaus", status: "validated" },
            pl: { text: "500+ agencji partnerskich", status: "validated" },
            pt: { text: "500+ agências parceiras", status: "validated" }
          }
        },
        {
          textId: "hero.stat.duration",
          key: "hero.stat.duration",
          category: "hero",
          translations: {
            fr: { text: "8-10 min pour répondre", status: "validated" },
            en: { text: "8-10 min to complete", status: "validated" },
            de: { text: "8-10 Min. zum Ausfüllen", status: "validated" },
            es: { text: "8-10 min para completar", status: "validated" },
            it: { text: "8-10 min per completare", status: "validated" },
            nl: { text: "8-10 min om in te vullen", status: "validated" },
            pl: { text: "8-10 min do wypełnienia", status: "validated" },
            pt: { text: "8-10 min para completar", status: "validated" }
          }
        },
        {
          textId: "hero.cta.start",
          key: "hero.cta.start",
          category: "hero",
          translations: {
            fr: { text: "Commencer l'enquête", status: "validated" },
            en: { text: "Start the survey", status: "validated" },
            de: { text: "Umfrage starten", status: "validated" },
            es: { text: "Iniciar la encuesta", status: "validated" },
            it: { text: "Inizia il sondaggio", status: "validated" },
            nl: { text: "Start de enquête", status: "validated" },
            pl: { text: "Rozpocznij ankietę", status: "validated" },
            pt: { text: "Iniciar a pesquisa", status: "validated" }
          }
        },
        {
          textId: "hero.footer.info",
          key: "hero.footer.info",
          category: "hero",
          translations: {
            fr: { text: "25 questions • Anonyme • Conforme RGPD", status: "validated" },
            en: { text: "25 questions • Anonymous • GDPR compliant", status: "validated" },
            de: { text: "25 Fragen • Anonym • DSGVO-konform", status: "validated" },
            es: { text: "25 preguntas • Anónimo • Conforme RGPD", status: "validated" },
            it: { text: "25 domande • Anonimo • Conforme GDPR", status: "validated" },
            nl: { text: "25 vragen • Anoniem • AVG-conform", status: "validated" },
            pl: { text: "25 pytań • Anonimowo • Zgodne z RODO", status: "validated" },
            pt: { text: "25 perguntas • Anônimo • Conforme RGPD", status: "validated" }
          }
        }
      ]
    };

    // Créer et télécharger le blob JSON
    const dataStr = JSON.stringify(heroTranslationsTemplate, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hero-section-translations.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadSectionsTemplate = () => {
    const sectionsTranslationsTemplate = {
      name: "Survey Sections Titles",
      description: "Traductions des titres de sections du formulaire",
      version: "1.0.0",
      date: new Date().toISOString().split('T')[0],
      translations: [
        {
          textId: "section.1.title",
          key: "section.1.title",
          category: "sections",
          translations: {
            fr: { text: "Profil Agence", status: "validated" },
            en: { text: "Agency Profile", status: "validated" },
            de: { text: "Agentenprofil", status: "validated" },
            es: { text: "Perfil de la Agencia", status: "validated" },
            it: { text: "Profilo Agenzia", status: "validated" },
            nl: { text: "Agentschapsprofiel", status: "validated" },
            pl: { text: "Profil Agencji", status: "validated" },
            pt: { text: "Perfil da Agência", status: "validated" }
          }
        },
        {
          textId: "section.2.title",
          key: "section.2.title",
          category: "sections",
          translations: {
            fr: { text: "Détachement", status: "validated" },
            en: { text: "Secondment", status: "validated" },
            de: { text: "Entsendung", status: "validated" },
            es: { text: "Desplazamiento", status: "validated" },
            it: { text: "Distacco", status: "validated" },
            nl: { text: "Detachering", status: "validated" },
            pl: { text: "Delegowanie", status: "validated" },
            pt: { text: "Destacamento", status: "validated" }
          }
        },
        {
          textId: "section.3.title",
          key: "section.3.title",
          category: "sections",
          translations: {
            fr: { text: "Besoins", status: "validated" },
            en: { text: "Needs", status: "validated" },
            de: { text: "Bedürfnisse", status: "validated" },
            es: { text: "Necesidades", status: "validated" },
            it: { text: "Esigenze", status: "validated" },
            nl: { text: "Behoeften", status: "validated" },
            pl: { text: "Potrzeby", status: "validated" },
            pt: { text: "Necessidades", status: "validated" }
          }
        },
        {
          textId: "section.4.title",
          key: "section.4.title",
          category: "sections",
          translations: {
            fr: { text: "Intérêt YoJob", status: "validated" },
            en: { text: "YoJob Interest", status: "validated" },
            de: { text: "YoJob Interesse", status: "validated" },
            es: { text: "Interés YoJob", status: "validated" },
            it: { text: "Interesse YoJob", status: "validated" },
            nl: { text: "YoJob Interesse", status: "validated" },
            pl: { text: "Zainteresowanie YoJob", status: "validated" },
            pt: { text: "Interesse YoJob", status: "validated" }
          }
        },
        {
          textId: "section.5.title",
          key: "section.5.title",
          category: "sections",
          translations: {
            fr: { text: "Vision Future", status: "validated" },
            en: { text: "Future Vision", status: "validated" },
            de: { text: "Zukunftsvision", status: "validated" },
            es: { text: "Visión Futura", status: "validated" },
            it: { text: "Visione Futura", status: "validated" },
            nl: { text: "Toekomstvisie", status: "validated" },
            pl: { text: "Wizja Przyszłości", status: "validated" },
            pt: { text: "Visão Futura", status: "validated" }
          }
        },
        {
          textId: "section.6.title",
          key: "section.6.title",
          category: "sections",
          translations: {
            fr: { text: "Contact", status: "validated" },
            en: { text: "Contact", status: "validated" },
            de: { text: "Kontakt", status: "validated" },
            es: { text: "Contacto", status: "validated" },
            it: { text: "Contatto", status: "validated" },
            nl: { text: "Contact", status: "validated" },
            pl: { text: "Kontakt", status: "validated" },
            pt: { text: "Contato", status: "validated" }
          }
        }
      ]
    };

    const dataStr = JSON.stringify(sectionsTranslationsTemplate, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'survey-sections-translations.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSectionsDirect = async () => {
    setImporting(true);
    setStatus('idle');

    try {
      const sectionsData = {
        translations: [
          {
            textId: "section.1.title",
            key: "section.1.title",
            category: "sections",
            translations: {
              fr: { text: "Profil Agence", status: "validated" },
              en: { text: "Agency Profile", status: "validated" },
              de: { text: "Agentenprofil", status: "validated" },
              es: { text: "Perfil de la Agencia", status: "validated" },
              it: { text: "Profilo Agenzia", status: "validated" },
              nl: { text: "Agentschapsprofiel", status: "validated" },
              pl: { text: "Profil Agencji", status: "validated" },
              pt: { text: "Perfil da Agência", status: "validated" }
            }
          },
          {
            textId: "section.2.title",
            key: "section.2.title",
            category: "sections",
            translations: {
              fr: { text: "Détachement", status: "validated" },
              en: { text: "Secondment", status: "validated" },
              de: { text: "Entsendung", status: "validated" },
              es: { text: "Desplazamiento", status: "validated" },
              it: { text: "Distacco", status: "validated" },
              nl: { text: "Detachering", status: "validated" },
              pl: { text: "Delegowanie", status: "validated" },
              pt: { text: "Destacamento", status: "validated" }
            }
          },
          {
            textId: "section.3.title",
            key: "section.3.title",
            category: "sections",
            translations: {
              fr: { text: "Besoins", status: "validated" },
              en: { text: "Needs", status: "validated" },
              de: { text: "Bedürfnisse", status: "validated" },
              es: { text: "Necesidades", status: "validated" },
              it: { text: "Esigenze", status: "validated" },
              nl: { text: "Behoeften", status: "validated" },
              pl: { text: "Potrzeby", status: "validated" },
              pt: { text: "Necessidades", status: "validated" }
            }
          },
          {
            textId: "section.4.title",
            key: "section.4.title",
            category: "sections",
            translations: {
              fr: { text: "Intérêt YoJob", status: "validated" },
              en: { text: "YoJob Interest", status: "validated" },
              de: { text: "YoJob Interesse", status: "validated" },
              es: { text: "Interés YoJob", status: "validated" },
              it: { text: "Interesse YoJob", status: "validated" },
              nl: { text: "YoJob Interesse", status: "validated" },
              pl: { text: "Zainteresowanie YoJob", status: "validated" },
              pt: { text: "Interesse YoJob", status: "validated" }
            }
          },
          {
            textId: "section.5.title",
            key: "section.5.title",
            category: "sections",
            translations: {
              fr: { text: "Vision Future", status: "validated" },
              en: { text: "Future Vision", status: "validated" },
              de: { text: "Zukunftsvision", status: "validated" },
              es: { text: "Visión Futura", status: "validated" },
              it: { text: "Visione Futura", status: "validated" },
              nl: { text: "Toekomstvisie", status: "validated" },
              pl: { text: "Wizja Przyszłości", status: "validated" },
              pt: { text: "Visão Futura", status: "validated" }
            }
          },
          {
            textId: "section.6.title",
            key: "section.6.title",
            category: "sections",
            translations: {
              fr: { text: "Contact", status: "validated" },
              en: { text: "Contact", status: "validated" },
              de: { text: "Kontakt", status: "validated" },
              es: { text: "Contacto", status: "validated" },
              it: { text: "Contatto", status: "validated" },
              nl: { text: "Contact", status: "validated" },
              pl: { text: "Kontakt", status: "validated" },
              pt: { text: "Contato", status: "validated" }
            }
          }
        ]
      };

      console.log(`📦 Importing 6 section titles...`);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/ui-texts/bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(sectionsData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erreur lors de l\'import');
      }

      setStatus('success');
      setMessage(`✅ ${result.count} titre(s) de section importé(s) !`);
      setImportedCount(result.count);

      if (onImportSuccess) {
        setTimeout(() => onImportSuccess(), 500);
      }
    } catch (error: any) {
      console.error('❌ Import error:', error);
      setStatus('error');
      setMessage(error.message || 'Erreur lors de l\'import');
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-cyan-600" />
          Importer des traductions UI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700">
            <p className="mb-2">
              Importez un fichier JSON contenant vos traductions d'interface utilisateur.
            </p>
            <p className="text-xs text-slate-600">
              Format attendu : <code className="bg-white px-1 py-0.5 rounded">{'{ "translations": [...] }'}</code>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Download Hero Template */}
          <Button
            onClick={handleDownloadTemplate}
            variant="outline"
            className="border-violet-300 hover:bg-violet-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Hero (8 textes)
          </Button>

          {/* Download Sections Template */}
          <Button
            onClick={handleDownloadSectionsTemplate}
            variant="outline"
            className="border-green-300 hover:bg-green-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Sections (6 titres)
          </Button>

          {/* Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="ui-texts-import"
            />
            <label htmlFor="ui-texts-import">
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                disabled={importing}
                onClick={() => fileInputRef.current?.click()}
              >
                {importing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 mr-2"
                    >
                      <FileJson className="w-4 h-4" />
                    </motion.div>
                    Importation...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Sélectionner un JSON
                  </>
                )}
              </Button>
            </label>
          </div>
        </div>

        {/* Quick Import Sections */}
        <div className="border-t border-slate-200 pt-4">
          <p className="text-sm text-slate-600 mb-3">⚡ Import rapide :</p>
          <Button
            onClick={handleImportSectionsDirect}
            disabled={importing}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
          >
            {importing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 mr-2"
                >
                  <Upload className="w-4 h-4" />
                </motion.div>
                Importation...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Importer les 6 titres de sections maintenant
              </>
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>✅ Succès !</strong> {message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>❌ Erreur :</strong> {message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
