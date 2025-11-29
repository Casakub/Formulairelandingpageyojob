import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Database, CheckCircle, XCircle, Loader2, AlertCircle, Rocket, Copy, ExternalLink, FileCode } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DatabaseStatus {
  exists: boolean;
  stats?: {
    total_responses: number;
  };
}

export function DatabaseDeployer() {
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [databaseStatus, setDatabaseStatus] = useState<DatabaseStatus | null>(null);
  const [sqlContent, setSqlContent] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);

  // Charger le contenu SQL au montage
  useEffect(() => {
    loadSqlContent();
  }, []);

  const loadSqlContent = async () => {
    try {
      const response = await fetch('/supabase/migrations/00_create_complete_database.sql');
      const text = await response.text();
      setSqlContent(text);
    } catch (error) {
      console.error('Erreur chargement SQL:', error);
    }
  };

  const checkDatabaseStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/database/status`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setDatabaseStatus({
          exists: data.exists,
          stats: data.stats,
        });
        
        if (data.exists) {
          toast.success('✅ La base de données existe déjà', {
            description: `${data.stats?.total_responses || 0} réponses enregistrées`,
          });
        } else {
          toast.info('⚠️ Base de données non créée', {
            description: 'Suivez les étapes ci-dessous pour la créer',
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      toast.error('Erreur de vérification', {
        description: 'Impossible de vérifier le statut de la base',
      });
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlContent);
    setIsCopied(true);
    toast.success('✅ SQL copié !', {
      description: 'Collez-le dans le SQL Editor de Supabase',
    });
    setTimeout(() => setIsCopied(false), 3000);
  };

  const openSupabaseDashboard = () => {
    window.open(`https://supabase.com/dashboard/project/${projectId}/sql/new`, '_blank');
    toast.info('📝 Dashboard Supabase ouvert', {
      description: 'Collez le SQL dans l\'éditeur et cliquez sur Run',
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header Card */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-blue-900 via-violet-900 to-cyan-900 text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Assistant de Déploiement Base de Données</CardTitle>
                <CardDescription className="text-blue-100">
                  Créez la structure complète de votre base en 3 étapes simples
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Status Check */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Statut de la Base de Données
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={checkDatabaseStatus}
                  disabled={isCheckingStatus}
                >
                  {isCheckingStatus ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    'Vérifier'
                  )}
                </Button>
              </div>

              {databaseStatus && (
                <div className="space-y-2">
                  {databaseStatus.exists ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">✅ Base de données existante</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">⚠️ Base de données non créée</span>
                    </div>
                  )}
                  
                  {databaseStatus.stats && (
                    <div className="text-sm text-gray-600 ml-7">
                      📊 {databaseStatus.stats.total_responses} réponses enregistrées
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Instructions en 3 étapes */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Rocket className="w-6 h-6" />
                Déploiement en 3 Étapes (3 minutes)
              </h3>

              <div className="space-y-4">
                {/* Étape 1 */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">Copier le SQL</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Cliquez sur le bouton ci-dessous pour copier le script SQL complet (600+ lignes)
                      </p>
                      <Button
                        onClick={copySqlToClipboard}
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            SQL Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copier le SQL
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-cyan-900 mb-2">Ouvrir Supabase Dashboard</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Cliquez pour ouvrir directement le SQL Editor de votre projet Supabase
                      </p>
                      <Button
                        onClick={openSupabaseDashboard}
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ouvrir SQL Editor
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-violet-900 mb-2">Coller et Exécuter</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p>Dans le SQL Editor de Supabase :</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Collez le SQL copié (<kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+V</kbd>)</li>
                          <li>Cliquez sur le bouton <strong>"Run"</strong> (ou <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Ctrl+Enter</kbd>)</li>
                          <li>Attendez 5-10 secondes</li>
                          <li>Vérifiez le message de succès ✅</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Que va créer ce script ? */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <FileCode className="w-5 h-5" />
                  Ce Que Ce Script Va Créer
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    Table avec 26 colonnes de questions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    11 index pour performances
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    3 triggers intelligents
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    4 policies RLS (sécurité)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    2 fonctions utilitaires
                  </li>
                </ul>
              </div>

              <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                <h4 className="font-semibold text-violet-900 mb-3">Structure des Questions</h4>
                <div className="space-y-1.5 text-sm text-violet-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Section 1: Profil (4 questions)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                    Section 2: Détachement (7 questions)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                    Section 3: Besoins (6 questions)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Section 4: Intérêt (6 questions)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    Section 5: Vision (2 questions)
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                    Section 6: Contact (1 question)
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            {databaseStatus?.exists && (
              <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-orange-900">
                    <p className="font-semibold mb-1">⚠️ Attention</p>
                    <p className="text-sm">
                      Le script commence par <code className="bg-orange-100 px-1 py-0.5 rounded">DROP TABLE IF EXISTS</code>.
                      Vos données existantes ({databaseStatus.stats?.total_responses || 0} réponses) seront supprimées.
                      Faites un backup si nécessaire avant d'exécuter.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bouton de vérification final */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={checkDatabaseStatus}
                disabled={isCheckingStatus}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                {isCheckingStatus ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Vérifier que la Base Est Créée
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SQL Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="w-5 h-5" />
              Aperçu du Script SQL
            </CardTitle>
            <CardDescription>
              Voici un aperçu des premières lignes du script (600+ lignes au total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs max-h-64 overflow-y-auto">
              <code>{sqlContent.slice(0, 1500)}...</code>
            </pre>
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copySqlToClipboard}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copier le SQL Complet
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/supabase/migrations/00_create_complete_database.sql', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Voir le Fichier Complet
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
