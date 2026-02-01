import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Key, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Info, 
  Shield,
  ExternalLink,
  XCircle,
  Zap,
  DollarSign,
  CreditCard,
  Target,
  Users,
  TrendingUp,
  Bug,
  Trash2,
  Database,
  Download,
  Mail,
  Settings,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  TestTube,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MigrateLandingToSupabase } from './MigrateLandingToSupabase';
import { QuickDiagnostic } from './QuickDiagnostic';
import { ClaudeModelSelector } from './ClaudeModelSelector';

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  from_email: string;
  from_name: string;
  provider: 'smtp' | 'sendgrid' | 'mailgun';
  provider_api_key: string;
  provider_domain: string;
  reply_to: string;
  test_email: string;
}

interface ComplianceSettings {
  gdpr_enabled: boolean;
  unsubscribe_link: boolean;
  double_optin: boolean;
  data_retention_days: number;
  consent_tracking: boolean;
}

interface ComplianceConfig {
  companyName: string;
  dpoName: string;
  dpoEmail: string;
  privacyPolicyUrl: string;
  gdprCompliant: boolean;
}

export function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [overridesDebug, setOverridesDebug] = useState<any>(null);
  const [isLoadingOverrides, setIsLoadingOverrides] = useState(false);
  const [isImportingTranslations, setIsImportingTranslations] = useState(false);

  // SMTP & Compliance states
  const [smtpConfig, setSMTPConfig] = useState<SMTPConfig>({
    host: '',
    port: 587,
    secure: false,
    username: '',
    password: '',
    from_email: '',
    from_name: 'YOJOB',
    provider: 'smtp',
    provider_api_key: '',
    provider_domain: '',
    reply_to: '',
    test_email: '',
  });

  const [complianceSettings, setComplianceSettings] = useState<ComplianceSettings>({
    gdpr_enabled: true,
    unsubscribe_link: true,
    double_optin: false,
    data_retention_days: 365,
    consent_tracking: true,
  });

  const [complianceConfig, setComplianceConfig] = useState<ComplianceConfig>({
    companyName: '',
    dpoName: '',
    dpoEmail: '',
    privacyPolicyUrl: '',
    gdprCompliant: false,
  });

  const [isSavingSMTP, setIsSavingSMTP] = useState(false);
  const [isSavingCompliance, setIsSavingCompliance] = useState(false);
  const [isTestingSMTP, setIsTestingSMTP] = useState(false);
  const [isDryRunSMTP, setIsDryRunSMTP] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [smtpTestResult, setSMTPTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [smtpDryRunResult, setSMTPDryRunResult] = useState<{ success: boolean; message: string; preview?: any } | null>(null);
  const [isLoadingDiagnostic, setIsLoadingDiagnostic] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{ healthy: boolean; message: string } | null>(null);

  useEffect(() => {
    loadApiKey();
    loadSMTPSettings();
    loadComplianceSettings();
  }, []);

  const smtpProvider = smtpConfig.provider || 'smtp';
  const smtpIsValid = smtpProvider === 'smtp'
    ? !!(smtpConfig.host && smtpConfig.username && smtpConfig.password && smtpConfig.from_email)
    : smtpProvider === 'sendgrid'
      ? !!(smtpConfig.provider_api_key && smtpConfig.from_email)
      : smtpProvider === 'mailgun'
        ? !!(smtpConfig.provider_api_key && smtpConfig.provider_domain && smtpConfig.from_email)
        : false;

  const loadApiKey = async () => {
    setIsLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/anthropic-key`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.configured) {
          setIsConfigured(true);
          setSavedKey(result.keyPreview || 'sk-ant-api03-••••••••');
        }
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Veuillez saisir une clé API');
      return;
    }

    if (!apiKey.startsWith('sk-ant-api03-')) {
      toast.error('Format de clé invalide. La clé doit commencer par "sk-ant-api03-"');
      return;
    }

    setIsLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/anthropic-key`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ apiKey })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save API key');
      }

      const result = await response.json();
      
      setIsConfigured(true);
      setSavedKey(result.keyPreview);
      setApiKey('');
      
      toast.success('✅ Clé API sauvegardée avec succès !');
      
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('❌ Erreur lors de la sauvegarde: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    } finally {
      setIsLoading(false);
    }
  };

  const testApiKey = async () => {
    setIsTesting(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/test-anthropic`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Connexion Claude réussie !', {
          description: `Modèle: ${result.model || 'claude-3-5-sonnet-20240620'}`,
          duration: 5000
        });
      } else {
        // Check if it's a credit balance error
        const isCreditError = result.error?.includes('credit balance') || result.error?.includes('crédits');
        
        toast.error('❌ Test échoué', {
          description: result.error || 'Erreur inconnue',
          duration: isCreditError ? 10000 : 6000, // Longer duration for credit errors
          action: isCreditError ? {
            label: 'Recharger →',
            onClick: () => window.open('https://console.anthropic.com/settings/plans', '_blank')
          } : undefined
        });
      }
      
    } catch (error) {
      console.error('Error testing API key:', error);
      toast.error('❌ Erreur lors du test de connexion');
    } finally {
      setIsTesting(false);
    }
  };

  const deleteApiKey = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer la clé API ?')) {
      return;
    }

    setIsLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/anthropic-key`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        setIsConfigured(false);
        setSavedKey(null);
        toast.success('Clé API supprimée');
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  };

  const loadOverrides = async () => {
    setIsLoadingOverrides(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/overrides-debug`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        setOverridesDebug(result);
        console.log('🐛 [SettingsPanel] Overrides debug:', result);
      }
    } catch (error) {
      console.error('Error loading overrides:', error);
      toast.error('Erreur lors du chargement des overrides');
    } finally {
      setIsLoadingOverrides(false);
    }
  };

  const deleteOverrides = async () => {
    if (!confirm('⚠️ ATTENTION : Cette action va supprimer TOUS les overrides en base de données.\n\nCela ne touchera PAS les traductions, mais réinitialisera toutes les modifications de questions faites via le dashboard.\n\nÊtes-vous sûr de vouloir continuer ?')) {
      return;
    }

    setIsLoadingOverrides(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/delete-all-overrides`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        setOverridesDebug(null);
        toast.success('✅ Tous les overrides ont été supprimés !', {
          description: 'Rechargez la page pour voir les changements.'
        });
      } else {
        throw new Error('Failed to delete overrides');
      }
    } catch (error) {
      console.error('Error deleting overrides:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoadingOverrides(false);
    }
  };

  const importClientWorkerTranslations = async () => {
    if (!confirm('📦 IMPORT DES TRADUCTIONS CLIENT & WORKER\n\nCette action va importer toutes les traductions françaises et internationales pour les profils Client et Worker (Section 2 - Détachement).\n\nCela inclut :\n- q5_localisation (Pays entreprise)\n- q6_volume_client (Volume intérimaires)\n- q8_nationalites (Nationalités)\n- Et toutes les autres questions client/worker\n\nContinuer ?')) {
      return;
    }

    setIsImportingTranslations(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/seed-client-worker-translations`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success('✅ Traductions importées avec succès !', {
          description: `${result.stats?.imported || 0} traductions ajoutées en base de données`,
          duration: 6000
        });
        console.log('📦 Import result:', result);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Import failed');
      }
    } catch (error) {
      console.error('Error importing translations:', error);
      toast.error('❌ Erreur lors de l\'import des traductions', {
        description: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    } finally {
      setIsImportingTranslations(false);
    }
  };

  const loadSMTPSettings = async () => {
    setIsLoading(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        const config = result?.config || result?.settings || result;
        if (config && typeof config === 'object') {
          const normalizedSecure = typeof config.secure === 'boolean'
            ? config.secure
            : Number(config.port) === 465;
          setSMTPConfig((prev) => ({
            ...prev,
            ...config,
            secure: normalizedSecure,
            provider: (config.provider || prev.provider) as SMTPConfig['provider'],
          }));
        }
      }
    } catch (error) {
      console.error('Error loading SMTP settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadComplianceSettings = async () => {
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/compliance`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.settings) {
          const settings = result.settings;
          
          // Séparer les settings en deux objets
          setComplianceConfig({
            companyName: settings.companyName || '',
            dpoName: settings.dpoName || '',
            dpoEmail: settings.dpoEmail || '',
            privacyPolicyUrl: settings.privacyPolicyUrl || '',
            gdprCompliant: settings.gdprCompliant || false,
          });
          
          setComplianceSettings({
            gdpr_enabled: settings.gdpr_enabled !== undefined ? settings.gdpr_enabled : true,
            unsubscribe_link: settings.unsubscribe_link !== undefined ? settings.unsubscribe_link : true,
            double_optin: settings.double_optin || false,
            data_retention_days: settings.data_retention_days || 365,
            consent_tracking: settings.consent_tracking !== undefined ? settings.consent_tracking : true,
          });
        }
      }
    } catch (error) {
      console.error('Error loading compliance settings:', error);
    }
  };

  const saveSMTPSettings = async () => {
    setIsSavingSMTP(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(smtpConfig)
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save SMTP settings');
      }

      const result = await response.json();
      const config = result?.config || result?.settings || result;
      if (config && typeof config === 'object') {
        setSMTPConfig((prev) => ({
          ...prev,
          ...config,
          provider: (config.provider || prev.provider) as SMTPConfig['provider'],
        }));
      }
      
      toast.success('✅ Paramètres SMTP sauvegardés avec succès !');
      
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      toast.error('❌ Erreur lors de la sauvegarde: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    } finally {
      setIsSavingSMTP(false);
    }
  };

  const testSMTPSettings = async () => {
    setIsTestingSMTP(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp/test`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(smtpConfig)
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success('✅ Connexion SMTP réussie !', {
          description: result.message || 'Email de test envoyé',
          duration: 5000
        });
        setSMTPTestResult(result);
      } else {
        toast.error('❌ Test SMTP échoué', {
          description: result.message || result.error || 'Erreur inconnue',
          duration: 6000
        });
        setSMTPTestResult(result);
      }
      
    } catch (error) {
      console.error('Error testing SMTP settings:', error);
      toast.error('❌ Erreur lors du test de connexion SMTP');
    } finally {
      setIsTestingSMTP(false);
    }
  };

  const dryRunSMTPSettings = async () => {
    setIsDryRunSMTP(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp/dry-run`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(smtpConfig)
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success('🧪 Dry-run SMTP OK', {
          description: result.preview ? `À: ${result.preview.to} • Sujet: ${result.preview.subject}` : result.message,
          duration: 5000
        });
        setSMTPDryRunResult(result);
      } else {
        toast.error('❌ Dry-run SMTP échoué', {
          description: result.message || result.error || 'Erreur inconnue',
          duration: 6000
        });
        setSMTPDryRunResult(result);
      }
    } catch (error) {
      console.error('Error dry-run SMTP settings:', error);
      toast.error('❌ Erreur lors du dry-run SMTP');
    } finally {
      setIsDryRunSMTP(false);
    }
  };

  const saveComplianceSettings = async () => {
    setIsSavingCompliance(true);
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      // Fusionner les deux configurations en une seule
      const mergedSettings = {
        ...complianceConfig,
        ...complianceSettings
      };
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/compliance`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(mergedSettings)
        }
      );

      const responseText = await response.text();
      console.log('📡 [Compliance] Response status:', response.status);
      console.log('📡 [Compliance] Response text:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ [Compliance] Failed to parse JSON:', parseError);
        console.error('📄 [Compliance] Raw response:', responseText);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save compliance settings');
      }
      
      if (result.success) {
        toast.success('✅ Paramètres de conformité sauvegardés avec succès !');
      } else {
        throw new Error(result.error || 'Failed to save compliance settings');
      }
      
    } catch (error) {
      console.error('❌ [Compliance] Error saving compliance settings:', error);
      toast.error('❌ Erreur lors de la sauvegarde: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    } finally {
      setIsSavingCompliance(false);
    }
  };

  const runDiagnostic = async () => {
    setIsLoadingDiagnostic(true);
    setDiagnosticResult(null);
    
    try {
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/diagnostic`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to run diagnostic');
      }

      const result = await response.json();
      setDiagnosticResult(result);
      
      if (result.healthy) {
        toast.success('✅ Diagnostic terminé - Système OK');
      } else {
        toast.warning('⚠️ Diagnostic terminé - Problèmes détectés');
      }
      
    } catch (error) {
      console.error('Error running diagnostic:', error);
      setDiagnosticResult({
        healthy: false,
        message: 'Erreur lors de l\'exécution du diagnostic'
      });
      toast.error('❌ Erreur lors du diagnostic');
    } finally {
      setIsLoadingDiagnostic(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Bannière info si non configuré */}
      {!isConfigured && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 mb-1">Configuration requise</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pour activer l'analyse IA automatique, vous devez d'abord configurer votre clé API Anthropic. 
                Suivez les étapes ci-dessous pour obtenir votre clé et profiter de l'analyse complète de vos données.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header avec status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Settings className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h2 className="text-slate-900">Paramètres & Configuration</h2>
            <p className="text-slate-600">IA, SMTP, Conformité & Debug</p>
          </div>
        </div>
        
        {isConfigured ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2 text-sm shadow-lg shadow-green-500/10">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              API Configurée
            </Badge>
          </motion.div>
        ) : (
          <Badge variant="outline" className="border-orange-500/30 text-orange-600 bg-orange-500/5 px-4 py-2 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            Configuration requise
          </Badge>
        )}
      </motion.div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-slate-100 rounded-xl">
          <TabsTrigger value="api" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Modèles IA</span>
          </TabsTrigger>
          <TabsTrigger value="smtp" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">SMTP</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">RGPD</span>
          </TabsTrigger>
          <TabsTrigger value="debug" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Bug className="w-4 h-4" />
            <span className="hidden sm:inline">Debug</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab: API Anthropic */}
        <TabsContent value="api" className="space-y-6 mt-2">
          
          {/* 🔑 SECTION 1: Configuration Clé API (PRIORITAIRE - EN HAUT) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.01 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-all duration-300">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Clé API Anthropic</CardTitle>
                    <CardDescription>Configurez votre accès à l'API Claude</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Clé actuelle (si configurée) */}
                {isConfigured && savedKey && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <Label className="text-slate-700 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      Clé API actuelle
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={savedKey}
                        disabled
                        className="bg-slate-50 border-slate-200 text-slate-600 font-mono flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={testApiKey}
                        disabled={isTesting}
                        className="border-green-500/30 hover:bg-green-500/10 text-green-600 whitespace-nowrap px-4"
                      >
                        {isTesting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Test...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Tester
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={deleteApiKey}
                        disabled={isLoading}
                        className="border-red-500/30 hover:bg-red-500/10 text-red-500 px-3"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="h-px bg-slate-200 my-6" />
                  </motion.div>
                )}

                {/* Formulaire d'ajout/mise à jour */}
                <div className="space-y-4">
                  <Label htmlFor="apiKey" className="text-slate-700 flex items-center gap-2">
                    {isConfigured ? (
                      <>
                        <span className="text-lg">🔄</span> Mettre à jour la clé API
                      </>
                    ) : (
                      <>
                        <span className="text-lg">➕</span> Ajouter une clé API
                      </>
                    )}
                  </Label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="sk-ant-api03-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 font-mono focus:border-cyan-400 focus:ring-cyan-400/20"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isLoading && apiKey.trim()) {
                          saveApiKey();
                        }
                      }}
                    />
                    {apiKey.trim() && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {apiKey.startsWith('sk-ant-api03-') ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Format requis : <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs font-mono">sk-ant-api03-...</code>
                  </p>
                </div>

                <Button
                  onClick={saveApiKey}
                  disabled={isLoading || !apiKey.trim()}
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white shadow-lg shadow-violet-500/30"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sauvegarde en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      {isConfigured ? 'Mettre à jour la clé' : 'Sauvegarder la clé'}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* 📖 SECTION 2: Guide pas à pas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-md hover:shadow-lg hover:border-cyan-300 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-600" />
                  Comment obtenir une clé API ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { step: 1, text: 'Créez un compte sur', link: 'console.anthropic.com', url: 'https://console.anthropic.com/' },
                    { step: 2, text: 'Naviguez vers la section "API Keys"' },
                    { step: 3, text: 'Cliquez sur "Create Key"' },
                    { step: 4, text: 'Copiez la clé générée (commence par sk-ant-api03-)' },
                    { step: 5, text: 'Collez-la dans le champ ci-dessus et sauvegardez' },
                    { step: 6, text: 'Testez la connexion pour confirmer' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center text-sm shadow-md">
                        {item.step}
                      </div>
                      <p className="text-slate-700 pt-0.5">
                        {item.text}{' '}
                        {item.link && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-700 underline inline-flex items-center gap-1"
                          >
                            {item.link}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Tab: Modèles IA */}
        <TabsContent value="models" className="space-y-6 mt-6">
          <ClaudeModelSelector />
        </TabsContent>

        {/* Tab: SMTP */}
        <TabsContent value="smtp" className="space-y-6 mt-6">
          {/* Card principale - Configuration SMTP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-all duration-300">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Configuration SMTP</CardTitle>
                    <CardDescription>Configurez votre serveur SMTP pour les emails</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {smtpTestResult && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {smtpTestResult.success ? (
                      <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <p className="text-sm text-green-700">{smtpTestResult.message}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <p className="text-sm text-red-700">{smtpTestResult.message}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {smtpDryRunResult && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-700">{smtpDryRunResult.message}</p>
                      </div>
                      {smtpDryRunResult.preview && (
                        <p className="text-xs text-blue-700 mt-2">
                          À: {smtpDryRunResult.preview.to} • Sujet: {smtpDryRunResult.preview.subject}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                <div>
                  <Label htmlFor="smtpProvider">Provider *</Label>
                  <Select
                    value={smtpProvider}
                    onValueChange={(value) => setSMTPConfig({ ...smtpConfig, provider: value as SMTPConfig['provider'] })}
                  >
                    <SelectTrigger id="smtpProvider" className="mt-1 bg-white border-slate-200 text-slate-900">
                      <SelectValue placeholder="Choisir un provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500 mt-1">Choisissez SMTP classique ou un provider avec API.</p>
                </div>

                {smtpProvider === 'smtp' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtpHost">Serveur SMTP *</Label>
                        <Input
                          id="smtpHost"
                          type="text"
                          placeholder="smtp.gmail.com"
                          value={smtpConfig.host}
                          onChange={(e) => setSMTPConfig({ ...smtpConfig, host: e.target.value })}
                          className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="smtpPort">Port *</Label>
                        <Input
                          id="smtpPort"
                          type="number"
                          placeholder="587"
                          value={smtpConfig.port}
                          onChange={(e) => setSMTPConfig({ ...smtpConfig, port: parseInt(e.target.value) || 0 })}
                          className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={smtpConfig.secure}
                          onCheckedChange={(checked) => setSMTPConfig({ ...smtpConfig, secure: checked })}
                        />
                        <Label>Connexion SSL/TLS (port 465)</Label>
                      </div>
                      <p className="text-xs text-slate-500">Pour le port 587, laissez désactivé (STARTTLS).</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="smtpUsername">Nom d'utilisateur / Email *</Label>
                        <Input
                          id="smtpUsername"
                          type="text"
                          placeholder="votre@email.com"
                          value={smtpConfig.username}
                          onChange={(e) => setSMTPConfig({ ...smtpConfig, username: e.target.value })}
                          className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="smtpPassword">Mot de passe *</Label>
                        <Input
                          id="smtpPassword"
                          type="password"
                          placeholder="•••••••••"
                          value={smtpConfig.password}
                          onChange={(e) => setSMTPConfig({ ...smtpConfig, password: e.target.value })}
                          className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                        />
                      </div>
                    </div>
                  </>
                )}

                {smtpProvider === 'sendgrid' && (
                  <div>
                    <Label htmlFor="sendgridKey">Clé API SendGrid *</Label>
                    <Input
                      id="sendgridKey"
                      type="password"
                      placeholder="SG.xxxxxx"
                      value={smtpConfig.provider_api_key}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, provider_api_key: e.target.value })}
                      className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                )}

                {smtpProvider === 'mailgun' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mailgunKey">Clé API Mailgun *</Label>
                      <Input
                        id="mailgunKey"
                        type="password"
                        placeholder="key-xxxxxxxx"
                        value={smtpConfig.provider_api_key}
                        onChange={(e) => setSMTPConfig({ ...smtpConfig, provider_api_key: e.target.value })}
                        className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mailgunDomain">Domaine Mailgun *</Label>
                      <Input
                        id="mailgunDomain"
                        type="text"
                        placeholder="mg.votredomaine.com"
                        value={smtpConfig.provider_domain}
                        onChange={(e) => setSMTPConfig({ ...smtpConfig, provider_domain: e.target.value })}
                        className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpFromEmail">Email d'expédition *</Label>
                    <Input
                      id="smtpFromEmail"
                      type="email"
                      placeholder="noreply@yojob.com"
                      value={smtpConfig.from_email}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, from_email: e.target.value })}
                      className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                    <p className="text-xs text-slate-500 mt-1">Adresse affichée comme expéditeur</p>
                  </div>
                  <div>
                    <Label htmlFor="smtpFromName">Nom expéditeur</Label>
                    <Input
                      id="smtpFromName"
                      type="text"
                      placeholder="YOJOB"
                      value={smtpConfig.from_name}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, from_name: e.target.value })}
                      className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpReplyTo">Reply-To</Label>
                    <Input
                      id="smtpReplyTo"
                      type="email"
                      placeholder="support@yojob.com"
                      value={smtpConfig.reply_to}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, reply_to: e.target.value })}
                      className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpTestEmail">Email de test</Label>
                    <Input
                      id="smtpTestEmail"
                      type="email"
                      placeholder="vous@entreprise.com"
                      value={smtpConfig.test_email}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, test_email: e.target.value })}
                      className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                    />
                    <p className="text-xs text-slate-500 mt-1">Utilisé pour l’envoi du test</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={saveSMTPSettings}
                    disabled={isSavingSMTP || !smtpIsValid}
                    className="sm:flex-1 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white shadow-lg shadow-violet-500/30"
                    size="lg"
                  >
                    {isSavingSMTP ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={testSMTPSettings}
                    disabled={isTestingSMTP || !smtpIsValid}
                    className="sm:flex-1"
                    size="lg"
                  >
                    {isTestingSMTP ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Test en cours...
                      </>
                    ) : (
                      <>
                        <TestTube className="w-4 h-4 mr-2" />
                        Tester la connexion
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={dryRunSMTPSettings}
                    disabled={isDryRunSMTP || !smtpIsValid}
                    className="sm:flex-1"
                    size="lg"
                  >
                    {isDryRunSMTP ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Prévisualisation...
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Dry-run
                      </>
                    )}
                  </Button>
                </div>

                {smtpProvider === 'smtp' && (
                  <div className="text-xs text-slate-500 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <strong>💡 Conseil:</strong> Pour Gmail, utilisez smtp.gmail.com:587 et créez un mot de passe d'application.
                  </div>
                )}
                {smtpProvider === 'sendgrid' && (
                  <div className="text-xs text-slate-500 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <strong>💡 Conseil:</strong> Générez une clé API SendGrid avec permissions "Mail Send".
                  </div>
                )}
                {smtpProvider === 'mailgun' && (
                  <div className="text-xs text-slate-500 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <strong>💡 Conseil:</strong> Utilisez le domaine validé Mailgun et une clé API privée.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Tab: Compliance */}
        <TabsContent value="compliance" className="space-y-6 mt-6">
          {/* Card principale - Configuration Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Conformité RGPD</CardTitle>
                    <CardDescription>Configuration de la conformité légale</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                <div>
                  <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="YOJOB"
                    value={complianceConfig.companyName}
                    onChange={(e) => setComplianceConfig({ ...complianceConfig, companyName: e.target.value })}
                    className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dpoName">Nom du DPO</Label>
                    <Input
                      id="dpoName"
                      type="text"
                      placeholder="Jean Dupont"
                      value={complianceConfig.dpoName}
                      onChange={(e) => setComplianceConfig({ ...complianceConfig, dpoName: e.target.value })}
                      className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dpoEmail">Email du DPO</Label>
                    <Input
                      id="dpoEmail"
                      type="email"
                      placeholder="dpo@yojob.com"
                      value={complianceConfig.dpoEmail}
                      onChange={(e) => setComplianceConfig({ ...complianceConfig, dpoEmail: e.target.value })}
                      className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="privacyPolicyUrl">URL Politique de confidentialité *</Label>
                  <Input
                    id="privacyPolicyUrl"
                    type="url"
                    placeholder="https://yojob.com/privacy"
                    value={complianceConfig.privacyPolicyUrl}
                    onChange={(e) => setComplianceConfig({ ...complianceConfig, privacyPolicyUrl: e.target.value })}
                    className="mt-1 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <input
                    type="checkbox"
                    id="gdprCompliant"
                    checked={complianceConfig.gdprCompliant}
                    onChange={(e) => setComplianceConfig({ ...complianceConfig, gdprCompliant: e.target.checked })}
                    className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="gdprCompliant" className="text-sm text-slate-700 cursor-pointer">
                    Je certifie que mon entreprise est conforme au RGPD
                  </label>
                </div>

                <Button
                  onClick={saveComplianceSettings}
                  disabled={isSavingCompliance || !complianceConfig.companyName || !complianceConfig.privacyPolicyUrl}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/30"
                  size="lg"
                >
                  {isSavingCompliance ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer la configuration
                    </>
                  )}
                </Button>

                <div className="text-xs text-slate-500 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <strong>ℹ️ Information:</strong> Ces informations seront affichées dans les mentions légales et les consentements RGPD des formulaires.
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card Paramètres RGPD Avancés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl hover:border-purple-300 transition-all duration-300">
              <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Paramètres RGPD</CardTitle>
                    <CardDescription>Configuration de conformité avancée</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Label className="text-base">Activer la conformité RGPD</Label>
                      <p className="text-xs text-slate-600 mt-1">
                        Respecte les règles du Règlement Général sur la Protection des Données
                      </p>
                    </div>
                    <Switch
                      checked={complianceSettings.gdpr_enabled}
                      onCheckedChange={(checked) =>
                        setComplianceSettings({ ...complianceSettings, gdpr_enabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Label className="text-base">Lien de désinscription</Label>
                      <p className="text-xs text-slate-600 mt-1">
                        Ajoute automatiquement un lien de désinscription dans chaque email
                      </p>
                    </div>
                    <Switch
                      checked={complianceSettings.unsubscribe_link}
                      onCheckedChange={(checked) =>
                        setComplianceSettings({ ...complianceSettings, unsubscribe_link: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Label className="text-base">Double opt-in</Label>
                      <p className="text-xs text-slate-600 mt-1">
                        Nécessite une confirmation par email avant l'inscription définitive
                      </p>
                    </div>
                    <Switch
                      checked={complianceSettings.double_optin}
                      onCheckedChange={(checked) =>
                        setComplianceSettings({ ...complianceSettings, double_optin: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Label className="text-base">Suivi du consentement</Label>
                      <p className="text-xs text-slate-600 mt-1">
                        Enregistre et horodate chaque consentement
                      </p>
                    </div>
                    <Switch
                      checked={complianceSettings.consent_tracking}
                      onCheckedChange={(checked) =>
                        setComplianceSettings({ ...complianceSettings, consent_tracking: checked })
                      }
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <Label htmlFor="retention">Durée de conservation des données (jours)</Label>
                    <Input
                      id="retention"
                      type="number"
                      placeholder="365"
                      value={complianceSettings.data_retention_days}
                      onChange={(e) =>
                        setComplianceSettings({
                          ...complianceSettings,
                          data_retention_days: parseInt(e.target.value) || 365,
                        })
                      }
                      className="mt-2"
                    />
                    <p className="text-xs text-slate-600 mt-2">
                      Les données prospects seront automatiquement anonymisées après cette période
                    </p>
                  </div>
                </div>

                <Button
                  onClick={saveComplianceSettings}
                  disabled={isSavingCompliance}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 text-white"
                  size="lg"
                >
                  {isSavingCompliance ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer la conformité
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Tab: Debug */}
        <TabsContent value="debug" className="space-y-6 mt-6">
          {/* Diagnostic Rapide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.01 }}
          >
            <QuickDiagnostic />
          </motion.div>

          {/* 🐛 DEBUG OVERRIDES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-orange-200 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300">
              <CardHeader className="border-b border-orange-100 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Bug className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-900">Debug Overrides</CardTitle>
                      <CardDescription>Diagnostiquer les problèmes de traduction</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadOverrides}
                    disabled={isLoadingOverrides}
                    className="border-orange-500/30 hover:bg-orange-500/10 text-orange-600"
                  >
                    {isLoadingOverrides ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Chargement...
                      </>
                    ) : (
                      'Analyser'
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {!overridesDebug ? (
                  <div className="text-center py-8">
                    <Bug className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <p className="text-slate-600 mb-4">
                      Cliquez sur "Analyser" pour vérifier les overrides en base de données
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <p className="text-sm text-slate-600 mb-1">Total overrides</p>
                        <p className="text-2xl text-blue-700">{overridesDebug.count || 0}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                        <p className="text-sm text-slate-600 mb-1">Labels anglais</p>
                        <p className="text-2xl text-red-700">{overridesDebug.problematicCount || 0}</p>
                      </div>
                    </div>

                    {overridesDebug.problematicCount > 0 && (
                      <div className="max-h-64 overflow-y-auto border border-red-200 rounded-xl p-4 bg-red-50/50">
                        <p className="text-sm text-slate-700 mb-3">
                          <strong>Overrides avec labels anglais :</strong>
                        </p>
                        <div className="space-y-2">
                          {overridesDebug.problematicOverrides.map((item: any, idx: number) => (
                            <div key={idx} className="p-3 bg-white rounded-lg border border-red-200 text-xs">
                              <code className="text-red-700 font-mono">{item.id}</code>
                              {item.label && (
                                <div className="mt-1 text-slate-600">
                                  <span className="font-semibold">Label:</span> {item.label}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="destructive"
                        onClick={deleteOverrides}
                        disabled={isLoadingOverrides || overridesDebug.count === 0}
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer tous les overrides
                      </Button>
                    </div>

                    <div className="text-xs text-slate-500 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <strong>💡 Note:</strong> La suppression des overrides ne touchera PAS les traductions. Elle réinitialisera seulement les modifications de structure faites via le dashboard Questions.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* 📦 IMPORT TRADUCTIONS CLIENT & WORKER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border-cyan-200 shadow-lg hover:shadow-xl hover:border-cyan-300 transition-all duration-300">
              <CardHeader className="border-b border-cyan-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">Maintenance Traductions</CardTitle>
                    <CardDescription>Importer les traductions Client & Worker</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
                    <div className="flex items-start gap-3 mb-3">
                      <Info className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-900 mb-1">
                          <strong>Traductions manquantes détectées</strong>
                        </p>
                        <p className="text-xs text-slate-600">
                          Les questions Client et Worker de la Section 2 (Détachement) nécessitent des traductions françaises pour s'afficher correctement.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-slate-700">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        q5_localisation (Pays entreprise)
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        q6_volume_client (Volume intérimaires)
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        q8_nationalites (Nationalités)
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600" />
                        + toutes les autres questions client/worker
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-900">Ce qui sera importé</span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                      <p>• Traductions FR + 22 langues européennes</p>
                      <p>• Questions Client (18 items)</p>
                      <p>• Questions Worker (15 items)</p>
                      <p>• Options de réponses incluses</p>
                    </div>
                  </div>

                  <Button
                    onClick={importClientWorkerTranslations}
                    disabled={isImportingTranslations}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                    size="lg"
                  >
                    {isImportingTranslations ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Import en cours...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Importer les traductions
                      </>
                    )}
                  </Button>

                  <div className="text-xs text-slate-500 p-3 bg-green-50 rounded-lg border border-green-200">
                    <strong>✅ Sécurisé:</strong> L'import utilise "upsert" - les traductions existantes seront mises à jour, pas de duplication.
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
