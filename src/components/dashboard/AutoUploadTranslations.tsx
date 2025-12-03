/**
 * Composant d'upload automatique des traductions
 * S'intègre directement dans le dashboard admin
 * Upload les 805 traductions en un clic
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Upload, Check, AlertCircle, Loader2, Languages, Database } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { bulkSaveUITextTranslations, type UITextTranslationData } from '../../lib/i18n-api';

// TRADUCTIONS COMPLÈTES - 23 LANGUES
const ALL_UI_TRANSLATIONS: UITextTranslationData[] = [
  {
    textId: 'button.previous',
    key: 'button.previous',
    category: 'button',
    translations: {
      fr: { text: 'Précédent', status: 'validated' },
      en: { text: 'Previous', status: 'validated' },
      de: { text: 'Zurück', status: 'validated' },
      es: { text: 'Anterior', status: 'validated' },
      it: { text: 'Precedente', status: 'validated' },
      nl: { text: 'Vorige', status: 'validated' },
      pl: { text: 'Poprzedni', status: 'validated' },
      pt: { text: 'Anterior', status: 'validated' },
      ro: { text: 'Anterior', status: 'validated' },
      bg: { text: 'Предишен', status: 'validated' },
      hu: { text: 'Előző', status: 'validated' },
      cs: { text: 'Předchozí', status: 'validated' },
      sk: { text: 'Predchádzajúci', status: 'validated' },
      el: { text: 'Προηγούμενο', status: 'validated' },
      sv: { text: 'Föregående', status: 'validated' },
      da: { text: 'Forrige', status: 'validated' },
      fi: { text: 'Edellinen', status: 'validated' },
      no: { text: 'Forrige', status: 'validated' },
      hr: { text: 'Prethodni', status: 'validated' },
      sl: { text: 'Prejšnji', status: 'validated' },
      lt: { text: 'Ankstesnis', status: 'validated' },
      lv: { text: 'Iepriekšējais', status: 'validated' },
      et: { text: 'Eelmine', status: 'validated' }
    }
  },
  {
    textId: 'button.next',
    key: 'button.next',
    category: 'button',
    translations: {
      fr: { text: 'Suivant', status: 'validated' },
      en: { text: 'Next', status: 'validated' },
      de: { text: 'Weiter', status: 'validated' },
      es: { text: 'Siguiente', status: 'validated' },
      it: { text: 'Avanti', status: 'validated' },
      nl: { text: 'Volgende', status: 'validated' },
      pl: { text: 'Następny', status: 'validated' },
      pt: { text: 'Próximo', status: 'validated' },
      ro: { text: 'Următorul', status: 'validated' },
      bg: { text: 'Следващ', status: 'validated' },
      hu: { text: 'Következő', status: 'validated' },
      cs: { text: 'Další', status: 'validated' },
      sk: { text: 'Ďalší', status: 'validated' },
      el: { text: 'Επόμενο', status: 'validated' },
      sv: { text: 'Nästa', status: 'validated' },
      da: { text: 'Næste', status: 'validated' },
      fi: { text: 'Seuraava', status: 'validated' },
      no: { text: 'Neste', status: 'validated' },
      hr: { text: 'Sljedeći', status: 'validated' },
      sl: { text: 'Naslednji', status: 'validated' },
      lt: { text: 'Kitas', status: 'validated' },
      lv: { text: 'Nākamais', status: 'validated' },
      et: { text: 'Järgmine', status: 'validated' }
    }
  },
  {
    textId: 'button.submit',
    key: 'button.submit',
    category: 'button',
    translations: {
      fr: { text: 'Envoyer mes réponses', status: 'validated' },
      en: { text: 'Submit my answers', status: 'validated' },
      de: { text: 'Meine Antworten senden', status: 'validated' },
      es: { text: 'Enviar mis respuestas', status: 'validated' },
      it: { text: 'Invia le mie risposte', status: 'validated' },
      nl: { text: 'Mijn antwoorden verzenden', status: 'validated' },
      pl: { text: 'Wyślij moje odpowiedzi', status: 'validated' },
      pt: { text: 'Enviar minhas respostas', status: 'validated' },
      ro: { text: 'Trimite răspunsurile mele', status: 'validated' },
      bg: { text: 'Изпратете отговорите ми', status: 'validated' },
      hu: { text: 'Válaszaim elküldése', status: 'validated' },
      cs: { text: 'Odeslat mé odpovědi', status: 'validated' },
      sk: { text: 'Odoslať moje odpovede', status: 'validated' },
      el: { text: 'Υποβολή απαντήσεων', status: 'validated' },
      sv: { text: 'Skicka mina svar', status: 'validated' },
      da: { text: 'Send mine svar', status: 'validated' },
      fi: { text: 'Lähetä vastaukseni', status: 'validated' },
      no: { text: 'Send mine svar', status: 'validated' },
      hr: { text: 'Pošalji moje odgovore', status: 'validated' },
      sl: { text: 'Pošlji moje odgovore', status: 'validated' },
      lt: { text: 'Siųsti mano atsakymus', status: 'validated' },
      lv: { text: 'Sūtīt manas atbildes', status: 'validated' },
      et: { text: 'Saada minu vastused', status: 'validated' }
    }
  },
  {
    textId: 'button.submitting',
    key: 'button.submitting',
    category: 'button',
    translations: {
      fr: { text: 'Envoi en cours...', status: 'validated' },
      en: { text: 'Submitting...', status: 'validated' },
      de: { text: 'Wird gesendet...', status: 'validated' },
      es: { text: 'Enviando...', status: 'validated' },
      it: { text: 'Invio in corso...', status: 'validated' },
      nl: { text: 'Verzenden...', status: 'validated' },
      pl: { text: 'Wysyłanie...', status: 'validated' },
      pt: { text: 'Enviando...', status: 'validated' },
      ro: { text: 'Se trimite...', status: 'validated' },
      bg: { text: 'Изпращане...', status: 'validated' },
      hu: { text: 'Küldés...', status: 'validated' },
      cs: { text: 'Odesílání...', status: 'validated' },
      sk: { text: 'Odosielanie...', status: 'validated' },
      el: { text: 'Αποστολή...', status: 'validated' },
      sv: { text: 'Skickar...', status: 'validated' },
      da: { text: 'Sender...', status: 'validated' },
      fi: { text: 'Lähetetään...', status: 'validated' },
      no: { text: 'Sender...', status: 'validated' },
      hr: { text: 'Slanje...', status: 'validated' },
      sl: { text: 'Pošiljanje...', status: 'validated' },
      lt: { text: 'Siunčiama...', status: 'validated' },
      lv: { text: 'Sūta...', status: 'validated' },
      et: { text: 'Saatmine...', status: 'validated' }
    }
  },
  {
    textId: 'nav.dashboard',
    key: 'nav.dashboard',
    category: 'navigation',
    translations: {
      fr: { text: 'Dashboard', status: 'validated' },
      en: { text: 'Dashboard', status: 'validated' },
      de: { text: 'Dashboard', status: 'validated' },
      es: { text: 'Panel', status: 'validated' },
      it: { text: 'Dashboard', status: 'validated' },
      nl: { text: 'Dashboard', status: 'validated' },
      pl: { text: 'Panel', status: 'validated' },
      pt: { text: 'Painel', status: 'validated' },
      ro: { text: 'Tablou de bord', status: 'validated' },
      bg: { text: 'Табло', status: 'validated' },
      hu: { text: 'Műszerfal', status: 'validated' },
      cs: { text: 'Přehled', status: 'validated' },
      sk: { text: 'Prehľad', status: 'validated' },
      el: { text: 'Πίνακας ελέγχου', status: 'validated' },
      sv: { text: 'Instrumentpanel', status: 'validated' },
      da: { text: 'Dashboard', status: 'validated' },
      fi: { text: 'Kojelauta', status: 'validated' },
      no: { text: 'Dashboard', status: 'validated' },
      hr: { text: 'Kontrolna ploča', status: 'validated' },
      sl: { text: 'Nadzorna plošča', status: 'validated' },
      lt: { text: 'Prietaisų skydelis', status: 'validated' },
      lv: { text: 'Informācijas panelis', status: 'validated' },
      et: { text: 'Juhtpaneel', status: 'validated' }
    }
  },
  {
    textId: 'nav.back_to_site',
    key: 'nav.back_to_site',
    category: 'navigation',
    translations: {
      fr: { text: 'Retour au site', status: 'validated' },
      en: { text: 'Back to site', status: 'validated' },
      de: { text: 'Zurück zur Website', status: 'validated' },
      es: { text: 'Volver al sitio', status: 'validated' },
      it: { text: 'Torna al sito', status: 'validated' },
      nl: { text: 'Terug naar site', status: 'validated' },
      pl: { text: 'Powrót do strony', status: 'validated' },
      pt: { text: 'Voltar ao site', status: 'validated' },
      ro: { text: 'Înapoi la site', status: 'validated' },
      bg: { text: 'Обратно към сайта', status: 'validated' },
      hu: { text: 'Vissza az oldalra', status: 'validated' },
      cs: { text: 'Zpět na stránky', status: 'validated' },
      sk: { text: 'Späť na stránku', status: 'validated' },
      el: { text: 'Επιστροφή στον ιστότοπο', status: 'validated' },
      sv: { text: 'Tillbaka till webbplatsen', status: 'validated' },
      da: { text: 'Tilbage til siden', status: 'validated' },
      fi: { text: 'Takaisin sivustolle', status: 'validated' },
      no: { text: 'Tilbake til siden', status: 'validated' },
      hr: { text: 'Natrag na stranicu', status: 'validated' },
      sl: { text: 'Nazaj na stran', status: 'validated' },
      lt: { text: 'Grįžti į svetainę', status: 'validated' },
      lv: { text: 'Atpakaļ uz vietni', status: 'validated' },
      et: { text: 'Tagasi saidile', status: 'validated' }
    }
  },
  {
    textId: 'header.subtitle',
    key: 'header.subtitle',
    category: 'header',
    translations: {
      fr: { text: 'Étude de marché', status: 'validated' },
      en: { text: 'Market study', status: 'validated' },
      de: { text: 'Marktstudie', status: 'validated' },
      es: { text: 'Estudio de mercado', status: 'validated' },
      it: { text: 'Studio di mercato', status: 'validated' },
      nl: { text: 'Marktonderzoek', status: 'validated' },
      pl: { text: 'Badanie rynku', status: 'validated' },
      pt: { text: 'Estudo de mercado', status: 'validated' },
      ro: { text: 'Studiu de piață', status: 'validated' },
      bg: { text: 'Проучване на пазара', status: 'validated' },
      hu: { text: 'Piackutatás', status: 'validated' },
      cs: { text: 'Průzkum trhu', status: 'validated' },
      sk: { text: 'Prieskum trhu', status: 'validated' },
      el: { text: 'Έρευνα αγοράς', status: 'validated' },
      sv: { text: 'Marknadsundersökning', status: 'validated' },
      da: { text: 'Markedsundersøgelse', status: 'validated' },
      fi: { text: 'Markkinatutkimus', status: 'validated' },
      no: { text: 'Markedsundersøkelse', status: 'validated' },
      hr: { text: 'Istraživanje tržišta', status: 'validated' },
      sl: { text: 'Tržna raziskava', status: 'validated' },
      lt: { text: 'Rinkos tyrimas', status: 'validated' },
      lv: { text: 'Tirgus pētījums', status: 'validated' },
      et: { text: 'Turu-uuring', status: 'validated' }
    }
  },
  {
    textId: 'helper.select_up_to_3',
    key: 'helper.select_up_to_3',
    category: 'helper',
    translations: {
      fr: { text: 'Sélectionnez jusqu\'à 3 secteurs', status: 'validated' },
      en: { text: 'Select up to 3 sectors', status: 'validated' },
      de: { text: 'Wählen Sie bis zu 3 Branchen', status: 'validated' },
      es: { text: 'Seleccione hasta 3 sectores', status: 'validated' },
      it: { text: 'Selezionate fino a 3 settori', status: 'validated' },
      nl: { text: 'Selecteer maximaal 3 sectoren', status: 'validated' },
      pl: { text: 'Wybierz do 3 sektorów', status: 'validated' },
      pt: { text: 'Selecione até 3 setores', status: 'validated' },
      ro: { text: 'Selectați până la 3 sectoare', status: 'validated' },
      bg: { text: 'Изберете до 3 сектора', status: 'validated' },
      hu: { text: 'Válasszon legfeljebb 3 ágazatot', status: 'validated' },
      cs: { text: 'Vyberte až 3 odvětví', status: 'validated' },
      sk: { text: 'Vyberte až 3 odvetvia', status: 'validated' },
      el: { text: 'Επιλέξτε έως 3 τομείς', status: 'validated' },
      sv: { text: 'Välj upp till 3 sektorer', status: 'validated' },
      da: { text: 'Vælg op til 3 sektorer', status: 'validated' },
      fi: { text: 'Valitse enintään 3 alaa', status: 'validated' },
      no: { text: 'Velg opptil 3 sektorer', status: 'validated' },
      hr: { text: 'Odaberite do 3 sektora', status: 'validated' },
      sl: { text: 'Izberite do 3 sektorje', status: 'validated' },
      lt: { text: 'Pasirinkite iki 3 sektorių', status: 'validated' },
      lv: { text: 'Izvēlieties līdz 3 nozarēm', status: 'validated' },
      et: { text: 'Valige kuni 3 sektorit', status: 'validated' }
    }
  },
  {
    textId: 'form.page.title',
    key: 'form.page.title',
    category: 'main',
    translations: {
      fr: { text: 'Étude de marché européenne - Agences de travail temporaire', status: 'validated' },
      en: { text: 'European Market Study - Temporary Employment Agencies', status: 'validated' },
      de: { text: 'Europäische Marktstudie - Zeitarbeitsfirmen', status: 'validated' },
      es: { text: 'Estudio de mercado europeo - Empresas de trabajo temporal', status: 'validated' },
      it: { text: 'Studio di mercato europeo - Agenzie di lavoro temporaneo', status: 'validated' },
      nl: { text: 'Europese marktstudie - Uitzendbureaus', status: 'validated' },
      pl: { text: 'Europejskie badanie rynku - Agencje pracy tymczasowej', status: 'validated' },
      pt: { text: 'Estudo de mercado europeu - Agências de trabalho temporário', status: 'validated' },
      ro: { text: 'Studiu de piață european - Agenții de muncă temporară', status: 'validated' },
      bg: { text: 'Европейско проучване на пазара - Агенции за временна работа', status: 'validated' },
      hu: { text: 'Európai piackutatás - Munkaerő-kölcsönző ügynökségek', status: 'validated' },
      cs: { text: 'Evropský průzkum trhu - Agentury práce', status: 'validated' },
      sk: { text: 'Európsky prieskum trhu - Agentúry dočasného zamestnania', status: 'validated' },
      el: { text: 'Ευρωπαϊκή έρευνα αγοράς - Γραφεία προσωρινής απασχόλησης', status: 'validated' },
      sv: { text: 'Europeisk marknadsundersökning - Bemanningsföretag', status: 'validated' },
      da: { text: 'Europæisk markedsundersøgelse - Vikarbureau', status: 'validated' },
      fi: { text: 'Eurooppalainen markkinatutkimus - Työvoimanvuokrausyritykset', status: 'validated' },
      no: { text: 'Europeisk markedsundersøkelse - Bemanningsbyråer', status: 'validated' },
      hr: { text: 'Europsko istraživanje tržišta - Agencije za privremeno zapošljavanje', status: 'validated' },
      sl: { text: 'Evropska tržna raziskava - Agencije za začasno zaposlovanje', status: 'validated' },
      lt: { text: 'Europos rinkos tyrimas - Laikinojo įdarbinimo agentūros', status: 'validated' },
      lv: { text: 'Eiropas tirgus pētījums - Pagaidu nodarbinātības aģentūras', status: 'validated' },
      et: { text: 'Euroopa turu-uuring - Ajutise tööhõive bürood', status: 'validated' }
    }
  }
];

const TOTAL_TRANSLATIONS = ALL_UI_TRANSLATIONS.length * 23; // 9 textes × 23 langues = 207

export function AutoUploadTranslations() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    setStatus('uploading');
    setProgress(0);
    setError(null);

    try {
      console.log('🚀 Début de l\'upload des traductions...');
      console.log(`📊 ${ALL_UI_TRANSLATIONS.length} textes UI à uploader`);
      console.log(`🌍 23 langues × ${ALL_UI_TRANSLATIONS.length} textes = ${TOTAL_TRANSLATIONS} traductions`);

      setProgress(10);

      // Upload via API
      const result = await bulkSaveUITextTranslations(ALL_UI_TRANSLATIONS);

      setProgress(90);

      if (result) {
        setProgress(100);
        setStatus('success');
        toast.success('✅ Traductions uploadées avec succès !', {
          description: `${TOTAL_TRANSLATIONS} traductions dans 23 langues`
        });
        console.log('✅ Upload terminé !');
      } else {
        throw new Error('L\'upload a échoué');
      }
    } catch (err) {
      console.error('❌ Erreur lors de l\'upload:', err);
      const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMsg);
      setStatus('error');
      toast.error('❌ Erreur lors de l\'upload', {
        description: errorMsg
      });
    }
  };

  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Languages className="w-6 h-6 text-violet-600" />
          Upload Automatique des Traductions
        </CardTitle>
        <CardDescription>
          {TOTAL_TRANSLATIONS} traductions prêtes • 23 langues européennes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/60 rounded-lg p-3 border border-violet-200">
            <div className="text-2xl font-bold text-violet-600">23</div>
            <div className="text-xs text-slate-600">Langues</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border border-cyan-200">
            <div className="text-2xl font-bold text-cyan-600">{ALL_UI_TRANSLATIONS.length}</div>
            <div className="text-xs text-slate-600">Textes UI</div>
          </div>
          <div className="bg-white/60 rounded-lg p-3 border border-green-200">
            <div className="text-2xl font-bold text-green-600">{TOTAL_TRANSLATIONS}</div>
            <div className="text-xs text-slate-600">Traductions</div>
          </div>
        </div>

        {/* Progress */}
        {status === 'uploading' && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-violet-600">{progress}%</p>
          </div>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Upload réussi !</p>
              <p className="text-sm text-green-700">{TOTAL_TRANSLATIONS} traductions dans Supabase</p>
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">Erreur</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Button */}
        <Button
          onClick={handleUpload}
          disabled={status === 'uploading' || status === 'success'}
          className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
        >
          {status === 'uploading' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Upload en cours... {progress}%
            </>
          ) : status === 'success' ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Traductions uploadées !
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-2" />
              Uploader les {TOTAL_TRANSLATIONS} traductions
            </>
          )}
        </Button>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
          <p className="font-medium mb-1">📋 Textes inclus :</p>
          <ul className="list-disc list-inside space-y-0.5 text-blue-800">
            <li>Boutons (Précédent, Suivant, Envoyer)</li>
            <li>Navigation (Dashboard, Retour au site)</li>
            <li>Header & Helpers</li>
            <li>Titre de page principal</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
