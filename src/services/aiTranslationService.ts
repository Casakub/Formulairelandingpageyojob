/**
 * 🤖 AI Translation Service
 * Couche d'abstraction pour les services de traduction IA
 * Permet de changer facilement de provider (Claude, OpenAI, DeepL, etc.)
 */

import type {
  AITranslationRequest,
  AITranslationResponse,
  LanguageCode,
} from '../types/translationWorkflow';
import type { LandingPageContent } from '../types/landingContent';

/**
 * Configuration du service IA
 */
interface AIServiceConfig {
  provider: 'claude' | 'openai' | 'deepl' | 'mock';
  apiKey?: string;
  apiEndpoint?: string;
  model?: string;
  maxRetries?: number;
  timeout?: number;
}

/**
 * Service de traduction IA
 */
class AITranslationService {
  private config: AIServiceConfig;

  constructor(config: AIServiceConfig) {
    this.config = {
      maxRetries: 3,
      timeout: 30000,
      ...config,
    };
  }

  /**
   * Traduire le contenu complet d'une langue
   */
  async translateContent(request: AITranslationRequest): Promise<AITranslationResponse> {
    console.log('🤖 AI Translation Request:', {
      from: request.sourceLang,
      to: request.targetLang,
      keysCount: request.keysToTranslate?.length || 'all',
    });

    // TODO: Implémenter l'appel réel à l'API IA
    // Pour l'instant, retourne une réponse mock

    if (this.config.provider === 'mock') {
      return this.mockTranslate(request);
    }

    // Future implémentation Claude
    if (this.config.provider === 'claude') {
      return this.translateWithClaude(request);
    }

    // Future implémentation OpenAI
    if (this.config.provider === 'openai') {
      return this.translateWithOpenAI(request);
    }

    throw new Error(`Provider ${this.config.provider} not implemented yet`);
  }

  /**
   * Traduire des clés spécifiques uniquement
   */
  async translateKeys(
    sourceLang: LanguageCode,
    targetLang: LanguageCode,
    keys: Record<string, string>
  ): Promise<Record<string, string>> {
    console.log('🤖 Translating specific keys:', Object.keys(keys));

    // TODO: Implémenter traduction par clés

    if (this.config.provider === 'mock') {
      return this.mockTranslateKeys(targetLang, keys);
    }

    throw new Error(`Provider ${this.config.provider} not implemented yet`);
  }

  /**
   * MOCK: Traduction simulée pour les tests
   */
  private async mockTranslate(request: AITranslationRequest): Promise<AITranslationResponse> {
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { sourceContent, targetLang } = request;

    // Créer une copie modifiée du contenu source
    const translatedContent: Partial<LandingPageContent> = {
      language: targetLang,
      hero: {
        ...sourceContent.hero,
        title: `[${targetLang.toUpperCase()}] ${sourceContent.hero.title}`,
        subtitle: `[${targetLang.toUpperCase()}] ${sourceContent.hero.subtitle}`,
        badge: `[${targetLang.toUpperCase()}] ${sourceContent.hero.badge}`,
        benefits: sourceContent.hero.benefits.map(b => `[${targetLang.toUpperCase()}] ${b}`),
      },
    };

    return {
      targetLang,
      translatedContent,
      translatedKeys: ['hero.title', 'hero.subtitle', 'hero.badge', 'hero.benefits'],
      warnings: [
        'This is a MOCK translation for testing purposes',
        'Replace with real AI translation in production',
      ],
      confidence: 0.95,
      processingTime: 2000,
    };
  }

  /**
   * MOCK: Traduction de clés spécifiques
   */
  private async mockTranslateKeys(
    targetLang: LanguageCode,
    keys: Record<string, string>
  ): Promise<Record<string, string>> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const translated: Record<string, string> = {};
    for (const [key, value] of Object.entries(keys)) {
      translated[key] = `[${targetLang.toUpperCase()}] ${value}`;
    }

    return translated;
  }

  /**
   * TODO: Traduction avec Claude API
   */
  private async translateWithClaude(request: AITranslationRequest): Promise<AITranslationResponse> {
    const prompt = this.buildClaudePrompt(request);

    try {
      const apiKey = this.config.apiKey || (typeof process !== 'undefined' && process.env?.ANTHROPIC_API_KEY);
      
      if (!apiKey) {
        throw new Error('ANTHROPIC_API_KEY not configured. Please set it in environment variables.');
      }

      const response = await fetch(this.config.apiEndpoint || 'https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model || 'claude-sonnet-4-5-20250929',
          max_tokens: 8192,
          messages: [{
            role: 'user',
            content: prompt,
          }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Claude API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return this.parseClaudeResponse(data, request);
    } catch (error: any) {
      console.error('❌ Claude translation error:', error);
      throw new Error(`Claude translation failed: ${error.message}`);
    }
  }

  /**
   * Construire le prompt pour Claude
   */
  private buildClaudePrompt(request: AITranslationRequest): string {
    const { sourceLang, targetLang, sourceContent, adaptCulturally, tone } = request;

    return `You are a professional translator specializing in B2B SaaS content.

Task: Translate the following landing page content from ${sourceLang.toUpperCase()} to ${targetLang.toUpperCase()}.

Instructions:
- ${adaptCulturally ? 'Adapt culturally, not literal translation' : 'Translate as literally as possible'}
- Tone: ${tone || 'professional'}
- Preserve all variables in {{brackets}}
- Keep approximately the same text length for UI elements (CTAs, badges)
- For meta tags, respect character limits (title: 60 chars, description: 160 chars)
- Maintain the same brand voice and professionalism
- Do not translate brand names like "YOJOB"

Source content (JSON):
${JSON.stringify(sourceContent, null, 2)}

Return ONLY a valid JSON object with the translated content in the same structure.`;
  }

  /**
   * Parser la réponse de Claude
   */
  private parseClaudeResponse(data: any, request: AITranslationRequest): AITranslationResponse {
    const startTime = Date.now();
    
    try {
      // Extraire le contenu texte de la réponse Claude
      const content = data.content?.[0]?.text;
      
      if (!content) {
        throw new Error('No content in Claude response');
      }

      // Parser le JSON de la traduction
      // Claude peut entourer le JSON avec ```json ... ```, donc on nettoie
      let jsonContent = content.trim();
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace(/^```json\n/, '').replace(/\n```$/, '');
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/^```\n/, '').replace(/\n```$/, '');
      }

      const translatedContent = JSON.parse(jsonContent);

      // Extraire toutes les clés traduites
      const translatedKeys = this.extractTranslatedKeys(translatedContent);

      const processingTime = Date.now() - startTime;

      return {
        targetLang: request.targetLang,
        translatedContent,
        translatedKeys,
        warnings: [],
        confidence: 0.98, // Claude est généralement très fiable
        processingTime,
        usage: {
          inputTokens: data.usage?.input_tokens || 0,
          outputTokens: data.usage?.output_tokens || 0,
        },
      };
    } catch (error: any) {
      console.error('❌ Failed to parse Claude response:', error);
      throw new Error(`Failed to parse Claude response: ${error.message}`);
    }
  }

  /**
   * Extraire toutes les clés d'un objet de manière récursive
   */
  private extractTranslatedKeys(obj: any, prefix = ''): string[] {
    const keys: string[] = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'string') {
        keys.push(fullKey);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'string') {
            keys.push(`${fullKey}[${index}]`);
          } else if (typeof item === 'object' && item !== null) {
            keys.push(...this.extractTranslatedKeys(item, `${fullKey}[${index}]`));
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        keys.push(...this.extractTranslatedKeys(value, fullKey));
      }
    }
    
    return keys;
  }

  /**
   * TODO: Traduction avec OpenAI API
   */
  private async translateWithOpenAI(request: AITranslationRequest): Promise<AITranslationResponse> {
    throw new Error('OpenAI integration not implemented yet');
  }
}

/**
 * Instance singleton du service
 * Par défaut en mode MOCK pour les tests
 */
export const aiTranslationService = new AITranslationService({
  provider: 'claude', // Mode Claude activé par défaut
  model: 'claude-sonnet-4-5-20250929',
});

/**
 * Changer le provider de traduction dynamiquement
 */
export function setTranslationProvider(provider: 'claude' | 'openai' | 'deepl' | 'mock', apiKey?: string) {
  (aiTranslationService as any).config = {
    ...(aiTranslationService as any).config,
    provider,
    apiKey: apiKey || (aiTranslationService as any).config.apiKey,
  };
  console.log(`🔄 Translation provider changed to: ${provider}`);
}

/**
 * Hook pour utiliser le service de traduction IA
 */
export function useAITranslation() {
  const translateContent = async (request: AITranslationRequest): Promise<AITranslationResponse> => {
    try {
      const response = await aiTranslationService.translateContent(request);
      return response;
    } catch (error) {
      console.error('❌ AI Translation error:', error);
      throw error;
    }
  };

  const translateKeys = async (
    sourceLang: LanguageCode,
    targetLang: LanguageCode,
    keys: Record<string, string>
  ): Promise<Record<string, string>> => {
    try {
      const response = await aiTranslationService.translateKeys(sourceLang, targetLang, keys);
      return response;
    } catch (error) {
      console.error('❌ AI Translation error:', error);
      throw error;
    }
  };

  return {
    translateContent,
    translateKeys,
  };
}

/**
 * Helper pour estimer le coût de traduction
 * (tokens approximatifs pour l'API)
 */
export function estimateTranslationCost(content: LandingPageContent): {
  estimatedTokens: number;
  estimatedCostUSD: number;
} {
  const contentString = JSON.stringify(content);
  const estimatedTokens = Math.ceil(contentString.length / 4); // Approximation rough

  // Prix approximatifs Claude Sonnet (à ajuster selon le provider)
  const inputCostPer1kTokens = 0.003; // $0.003 per 1K input tokens
  const outputCostPer1kTokens = 0.015; // $0.015 per 1K output tokens

  const estimatedCostUSD =
    (estimatedTokens / 1000) * inputCostPer1kTokens +
    (estimatedTokens / 1000) * outputCostPer1kTokens;

  return {
    estimatedTokens,
    estimatedCostUSD: Number(estimatedCostUSD.toFixed(4)),
  };
}