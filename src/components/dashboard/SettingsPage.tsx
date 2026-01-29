import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Mail, 
  Shield, 
  Save, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  TestTube,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

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

export function SettingsPage() {
  const [smtpConfig, setSMTPConfig] = useState<SMTPConfig>({
    host: '',
    port: 587,
    secure: true,
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

  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isDryRun, setIsDryRun] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [dryRunResult, setDryRunResult] = useState<{ success: boolean; message: string; preview?: any } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const smtpProvider = smtpConfig.provider || 'smtp';
  const smtpIsValid = smtpProvider === 'smtp'
    ? !!(smtpConfig.host && smtpConfig.username && smtpConfig.password && smtpConfig.from_email)
    : smtpProvider === 'sendgrid'
      ? !!(smtpConfig.provider_api_key && smtpConfig.from_email)
      : smtpProvider === 'mailgun'
        ? !!(smtpConfig.provider_api_key && smtpConfig.provider_domain && smtpConfig.from_email)
        : false;

  const loadSettings = async () => {
    try {
      const [smtpRes, complianceRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp`,
          { headers: { Authorization: `Bearer ${publicAnonKey}` } }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/compliance`,
          { headers: { Authorization: `Bearer ${publicAnonKey}` } }
        ),
      ]);

      const [smtpData, complianceData] = await Promise.all([
        smtpRes.json(),
        complianceRes.json(),
      ]);

      if (smtpData.success) {
        const config = smtpData.config || smtpData.settings || smtpData;
        if (config && typeof config === 'object') {
          setSMTPConfig((prev) => ({
            ...prev,
            ...config,
            provider: (config.provider || prev.provider) as SMTPConfig['provider'],
          }));
        }
      }

      if (complianceData.success && complianceData.settings) {
        setComplianceSettings(complianceData.settings);
      }
    } catch (error) {
      console.error('Erreur chargement paramètres:', error);
    }
  };

  const handleSaveSMTP = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(smtpConfig),
        }
      );

      const data = await response.json();
      if (data.success) {
        if (data.config || data.settings) {
          const config = data.config || data.settings;
          setSMTPConfig((prev) => ({
            ...prev,
            ...config,
            provider: (config.provider || prev.provider) as SMTPConfig['provider'],
          }));
        }
        alert('✅ Configuration SMTP sauvegardée avec succès');
      } else {
        alert('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur sauvegarde SMTP:', error);
      alert('❌ Erreur de connexion');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCompliance = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/compliance`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(complianceSettings),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert('✅ Paramètres de conformité sauvegardés');
      } else {
        alert('❌ Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur sauvegarde conformité:', error);
      alert('❌ Erreur de connexion');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestSMTP = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp/test`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(smtpConfig),
        }
      );

      const data = await response.json();
      setTestResult({
        success: data.success,
        message: data.message || (data.success ? 'Test réussi !' : 'Échec du test'),
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Erreur de connexion au serveur',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleDryRunSMTP = async () => {
    setIsDryRun(true);
    setDryRunResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/settings/smtp/dry-run`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(smtpConfig),
        }
      );

      const data = await response.json();
      setDryRunResult({
        success: data.success,
        message: data.message || (data.success ? 'Dry-run OK' : 'Échec du dry-run'),
        preview: data.preview,
      });
    } catch (error) {
      setDryRunResult({
        success: false,
        message: 'Erreur de connexion au serveur',
      });
    } finally {
      setIsDryRun(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900">Paramètres</h1>
            <p className="text-slate-600 text-sm mt-1">
              Configuration SMTP et conformité RGPD
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2" onClick={loadSettings}>
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </Button>
        </div>
      </motion.div>

      {/* Configuration SMTP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900">Configuration SMTP</CardTitle>
                <p className="text-slate-600 text-sm mt-1">
                  Paramètres du serveur d'envoi d'emails
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Test Result */}
            {testResult && (
              <div
                className={`p-4 rounded-lg border ${
                  testResult.success
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {testResult.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <span
                    className={`text-sm ${
                      testResult.success ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {testResult.message}
                  </span>
                </div>
              </div>
            )}

            {dryRunResult && (
              <div
                className={`p-4 rounded-lg border ${
                  dryRunResult.success
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {dryRunResult.success ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  <span
                    className={`text-sm ${
                      dryRunResult.success ? 'text-blue-700' : 'text-red-700'
                    }`}
                  >
                    {dryRunResult.message}
                  </span>
                </div>
                {dryRunResult.preview && (
                  <p className="text-xs text-blue-700 mt-2">
                    À: {dryRunResult.preview.to} • Sujet: {dryRunResult.preview.subject}
                  </p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="smtp-provider">Provider *</Label>
              <Select
                value={smtpProvider}
                onValueChange={(value) => setSMTPConfig({ ...smtpConfig, provider: value as SMTPConfig['provider'] })}
              >
                <SelectTrigger id="smtp-provider" className="mt-1">
                  <SelectValue placeholder="Choisir un provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {smtpProvider === 'smtp' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-host">Serveur SMTP *</Label>
                    <Input
                      id="smtp-host"
                      placeholder="smtp.gmail.com"
                      value={smtpConfig.host}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, host: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtp-port">Port *</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      placeholder="587"
                      value={smtpConfig.port}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, port: parseInt(e.target.value) })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtp-username">Nom d'utilisateur *</Label>
                    <Input
                      id="smtp-username"
                      placeholder="user@example.com"
                      value={smtpConfig.username}
                      onChange={(e) => setSMTPConfig({ ...smtpConfig, username: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtp-password">Mot de passe *</Label>
                    <div className="relative mt-1">
                      <Input
                        id="smtp-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={smtpConfig.password}
                        onChange={(e) => setSMTPConfig({ ...smtpConfig, password: e.target.value })}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {smtpProvider === 'sendgrid' && (
              <div>
                <Label htmlFor="sendgrid-key">Clé API SendGrid *</Label>
                <Input
                  id="sendgrid-key"
                  type="password"
                  placeholder="SG.xxxxxx"
                  value={smtpConfig.provider_api_key}
                  onChange={(e) => setSMTPConfig({ ...smtpConfig, provider_api_key: e.target.value })}
                  className="mt-1"
                />
              </div>
            )}

            {smtpProvider === 'mailgun' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mailgun-key">Clé API Mailgun *</Label>
                  <Input
                    id="mailgun-key"
                    type="password"
                    placeholder="key-xxxxxxxx"
                    value={smtpConfig.provider_api_key}
                    onChange={(e) => setSMTPConfig({ ...smtpConfig, provider_api_key: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mailgun-domain">Domaine Mailgun *</Label>
                  <Input
                    id="mailgun-domain"
                    placeholder="mg.votredomaine.com"
                    value={smtpConfig.provider_domain}
                    onChange={(e) => setSMTPConfig({ ...smtpConfig, provider_domain: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-from-email">Email expéditeur *</Label>
                <Input
                  id="smtp-from-email"
                  placeholder="noreply@yojob.com"
                  value={smtpConfig.from_email}
                  onChange={(e) => setSMTPConfig({ ...smtpConfig, from_email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="smtp-from-name">Nom expéditeur *</Label>
                <Input
                  id="smtp-from-name"
                  placeholder="YOJOB"
                  value={smtpConfig.from_name}
                  onChange={(e) => setSMTPConfig({ ...smtpConfig, from_name: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-reply-to">Reply-To</Label>
                <Input
                  id="smtp-reply-to"
                  placeholder="support@yojob.com"
                  value={smtpConfig.reply_to}
                  onChange={(e) => setSMTPConfig({ ...smtpConfig, reply_to: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="smtp-test-email">Email de test</Label>
                <Input
                  id="smtp-test-email"
                  placeholder="vous@entreprise.com"
                  value={smtpConfig.test_email}
                  onChange={(e) => setSMTPConfig({ ...smtpConfig, test_email: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            {smtpProvider === 'smtp' && (
              <div className="flex items-center gap-2">
                <Switch
                  checked={smtpConfig.secure}
                  onCheckedChange={(checked) => setSMTPConfig({ ...smtpConfig, secure: checked })}
                />
                <Label>Utiliser SSL/TLS (recommandé)</Label>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={handleSaveSMTP}
                disabled={isSaving || !smtpIsValid}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white gap-2"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleTestSMTP}
                disabled={isTesting || !smtpIsValid}
                className="gap-2"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Test en cours...
                  </>
                ) : (
                  <>
                    <TestTube className="w-4 h-4" />
                    Tester la connexion
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleDryRunSMTP}
                disabled={isDryRun || !smtpIsValid}
                className="gap-2"
              >
                {isDryRun ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Dry-run...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Dry-run
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Conformité RGPD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-slate-900">Conformité & RGPD</CardTitle>
                <p className="text-slate-600 text-sm mt-1">
                  Paramètres de conformité légale
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="mb-1">
                    Ces paramètres garantissent la conformité RGPD de vos campagnes d'emails.
                  </p>
                  <p className="text-xs text-blue-600">
                    Les options activées sont fortement recommandées pour respecter les régulations européennes.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <Label className="text-base">RGPD activé</Label>
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
                      data_retention_days: parseInt(e.target.value),
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
              onClick={handleSaveCompliance}
              disabled={isSaving}
              className="bg-gradient-to-r from-violet-500 to-purple-500 text-white gap-2"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Enregistrer la conformité
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info complémentaires */}
      <Card className="border-slate-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-slate-900 mb-2">Configuration recommandée</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Utilisez un serveur SMTP dédié (ex: SendGrid, AWS SES, Mailgun)</li>
                <li>• Activez SSL/TLS pour sécuriser les connexions</li>
                <li>• Testez la configuration avant d'activer les workflows</li>
                <li>• Maintenez tous les paramètres RGPD activés</li>
                <li>• Conservez les logs pendant au moins 6 mois</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
