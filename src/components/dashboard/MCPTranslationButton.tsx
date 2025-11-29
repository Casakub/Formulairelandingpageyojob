import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { autoTranslate } from '../../services/translationService';

interface MCPTranslationButtonProps {
  sourceText: string;
  sourceLang?: string;
  targetLang: string;
  onTranslated: (translatedText: string, status: 'auto-mcp' | 'auto-api' | 'validated') => void;
  contextWindow?: Array<{ source: string; target: string }>;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
}

export function MCPTranslationButton({
  sourceText,
  sourceLang = 'fr',
  targetLang,
  onTranslated,
  contextWindow = [],
  className = '',
  size = 'sm',
  variant = 'outline',
}: MCPTranslationButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!sourceText?.trim()) {
      toast.error('Pas de texte source', {
        description: 'Impossible de traduire un texte vide',
      });
      return;
    }

    setIsGenerating(true);
    setLastGenerated(false);

    try {
      // Load MCP settings from localStorage
      const settingsJson = localStorage.getItem('mcp_settings');
      const mcpSettings = settingsJson ? JSON.parse(settingsJson) : {};

      console.log('🤖 Generating translation with MCP:', {
        sourceText: sourceText.substring(0, 50) + '...',
        sourceLang,
        targetLang,
        settings: mcpSettings,
        contextSize: contextWindow.length,
      });

      const result = await autoTranslate(
        sourceText,
        targetLang,
        'mcp',
        sourceLang,
        mcpSettings,
        contextWindow
      );

      console.log('✅ Translation received:', {
        length: result.translatedText.length,
        status: result.status,
      });

      // Call parent callback with translated text
      onTranslated(result.translatedText, result.status);

      setLastGenerated(true);
      
      toast.success('Traduction générée !', {
        description: `${result.translatedText.substring(0, 60)}${result.translatedText.length > 60 ? '...' : ''}`,
        duration: 4000,
      });

      // Reset success indicator after 3s
      setTimeout(() => setLastGenerated(false), 3000);

    } catch (error: any) {
      console.error('❌ Error generating translation:', error);
      
      let errorMessage = 'Impossible de générer la traduction';
      let errorDescription = error.message || 'Erreur inconnue';

      // Parse specific errors
      if (error.message?.includes('ANTHROPIC_API_KEY')) {
        errorMessage = 'Clé API non configurée';
        errorDescription = 'Veuillez configurer ANTHROPIC_API_KEY dans les variables d\'environnement Supabase';
      } else if (error.message?.includes('crédits') || error.message?.includes('credit balance')) {
        errorMessage = 'Crédits insuffisants';
        errorDescription = 'Rechargez votre compte Anthropic sur console.anthropic.com';
      } else if (error.message?.includes('rate_limit')) {
        errorMessage = 'Limite de requêtes atteinte';
        errorDescription = 'Réessayez dans quelques instants';
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 6000,
        action: {
          label: 'Réessayer',
          onClick: () => handleGenerate(),
        },
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleGenerate}
      disabled={isGenerating || !sourceText?.trim()}
      className={`gap-2 ${className} ${lastGenerated ? 'border-green-500 bg-green-50' : ''}`}
    >
      {isGenerating ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            <Loader2 className="w-4 h-4" />
          </motion.div>
          Génération...
        </>
      ) : lastGenerated ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-600" />
          Généré !
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          Générer avec MCP
        </>
      )}
    </Button>
  );
}
