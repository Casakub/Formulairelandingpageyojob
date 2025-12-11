/**
 * 🔄 MIGRATION BUTTON - Migrer les traductions vers le nouveau format
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { 
  Database, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Eye,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { toast } from 'sonner';

interface MigrationSummary {
  oldFormatFound: number;
  newFormatFound: number;
  questionsMigrated: number;
  uiTextsMigrated: number;
  totalMigrated: number;
  questionIds: string[];
  uiKeys: string[];
}

interface PreviewData {
  oldFormat: {
    questions: string[];
    uiTexts: string[];
  };
  newFormat: {
    questions: string[];
    uiTexts: string[];
  };
  summary: {
    oldQuestions: number;
    oldUITexts: number;
    newQuestions: number;
    newUITexts: number;
  };
}

export function MigrateTranslationsButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [migrationResult, setMigrationResult] = useState<MigrationSummary | null>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/migrate-translations`;

  const handlePreview = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/preview`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la prévisualisation');
      }

      setPreview(data.preview);
      toast.success('Prévisualisation chargée');

    } catch (error: any) {
      console.error('Erreur prévisualisation:', error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMigrate = async () => {
    if (!confirm('⚠️ Confirmer la migration des traductions ?\n\nCette opération va fusionner les anciennes traductions (i18n:fr:question:*) vers le nouveau format (i18n:question:*.translations.fr).')) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la migration');
      }

      setMigrationResult(data.summary);
      toast.success(`✅ Migration réussie ! ${data.summary.totalMigrated} traductions migrées`);

      // Rafraîchir la prévisualisation
      await handlePreview();

    } catch (error: any) {
      console.error('Erreur migration:', error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCleanup = async () => {
    if (!confirm('⚠️ ATTENTION : Supprimer les anciennes clés ?\n\nCette action est IRRÉVERSIBLE. Les anciennes clés (i18n:fr:question:*) seront supprimées définitivement.\n\nAssurez-vous que la migration a bien fonctionné avant de continuer.')) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/cleanup`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erreur lors du nettoyage');
      }

      toast.success(`✅ Nettoyage réussi ! ${data.deletedKeys} anciennes clés supprimées`);

      // Rafraîchir la prévisualisation
      await handlePreview();

    } catch (error: any) {
      console.error('Erreur nettoyage:', error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Database className="w-5 h-5" />
              Migration des traductions
            </CardTitle>
            <CardDescription>
              Migrer les traductions vers le nouveau format multi-langue
            </CardDescription>
          </div>
          <Button
            variant={isExpanded ? "secondary" : "default"}
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded && !preview) {
                handlePreview();
              }
            }}
            disabled={isLoading}
          >
            {isExpanded ? 'Masquer' : 'Afficher les détails'}
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              {/* Preview */}
              {preview && preview.summary && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Ancien format */}
                    <Card className="border-red-200 bg-red-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-red-900">
                          Ancien format (à migrer)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-700">Questions</span>
                          <Badge variant="destructive">{preview.summary.oldQuestions || 0}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-700">Textes UI</span>
                          <Badge variant="destructive">{preview.summary.oldUITexts || 0}</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Nouveau format */}
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-green-900">
                          Nouveau format (actuel)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-700">Questions</span>
                          <Badge className="bg-green-600">{preview.summary.newQuestions || 0}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-700">Textes UI</span>
                          <Badge className="bg-green-600">{preview.summary.newUITexts || 0}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Résultat de migration */}
                  {migrationResult && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-blue-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Dernière migration
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-700">Questions migrées</span>
                          <Badge className="bg-blue-600">{migrationResult.questionsMigrated}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-700">Textes UI migrés</span>
                          <Badge className="bg-blue-600">{migrationResult.uiTextsMigrated}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-900">Total migré</span>
                          <Badge className="bg-blue-700">{migrationResult.totalMigrated}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Avertissement */}
                  {preview.summary.oldQuestions > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-amber-900">
                          Migration recommandée
                        </p>
                        <p className="text-sm text-amber-700 mt-1">
                          Il y a {preview.summary.oldQuestions} questions dans l'ancien format. 
                          Elles ne seront pas chargées par le nouveau système de traductions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handlePreview}
                  variant="outline"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Rafraîchir la prévisualisation
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleMigrate}
                  disabled={isLoading || !preview || !preview.summary || preview.summary.oldQuestions === 0}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Migration...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Lancer la migration
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleCleanup}
                  variant="destructive"
                  disabled={isLoading || !preview || !preview.summary || preview.summary.oldQuestions === 0}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Nettoyage...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Nettoyer (après migration)
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}