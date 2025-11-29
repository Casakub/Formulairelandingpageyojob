import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  X,
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Download,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface AIAnalysisPanelProps {
  responses: any[];
  stats: any;
  onClose: () => void;
}

export function AIAnalysisPanel({ responses, stats, onClose }: AIAnalysisPanelProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'claude' | 'gpt' | 'mcp'>('mcp');

  const prepareDataForAI = () => {
    return {
      summary: {
        totalResponses: responses.length,
        withExperience: stats.withExperience,
        veryInterested: stats.veryInterested,
        averageEmployees: stats.avgEmployees,
        averageWorkers: stats.avgWorkers,
        experienceRate: stats.experienceRate,
        interestRate: stats.interestRate
      },
      countriesDistribution: stats.countriesCount,
      sectorsDistribution: stats.sectorsCount,
      budgetDistribution: stats.budgetCount,
      detailedResponses: responses.map(r => ({
        country: r.country,
        sector: r.sector,
        employees: r.employees,
        experience: r.detachmentExperience,
        interest: r.interestedInPlatform,
        budget: r.budget,
        difficulties: r.difficulties,
        averageWorkers: r.averageWorkers,
        mainCountries: r.mainCountries
      }))
    };
  };

  const handleAnalyzeWithMCP = async () => {
    setIsAnalyzing(true);
    
    try {
      // Call backend AI analysis endpoint
      const { projectId, publicAnonKey } = await import('../../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/ai-analysis`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            responses,
            stats
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        
        // Check if it's a credit balance error
        if (errorData.needsCredit || errorData.error?.includes('crédits') || errorData.error?.includes('credit balance')) {
          toast.error('💳 Crédits Anthropic insuffisants', {
            description: 'Votre compte Anthropic n\'a plus de crédits. Rechargez votre compte pour utiliser l\'analyse IA.',
            duration: 10000,
            action: {
              label: 'Recharger →',
              onClick: () => window.open('https://console.anthropic.com/settings/plans', '_blank')
            }
          });
          throw new Error('Crédits insuffisants');
        }
        
        throw new Error(errorData.error || 'Failed to analyze data');
      }

      const result = await response.json();
      
      if (!result.success) {
        if (result.needsCredit || result.error?.includes('crédits') || result.error?.includes('credit balance')) {
          toast.error('💳 Crédits Anthropic insuffisants', {
            description: result.error || 'Veuillez recharger votre compte Anthropic.',
            duration: 10000,
            action: {
              label: 'Recharger →',
              onClick: () => window.open('https://console.anthropic.com/settings/plans', '_blank')
            }
          });
          throw new Error('Crédits insuffisants');
        }
        throw new Error(result.error || 'Analysis failed');
      }

      setAnalysis(result.analysis);
      toast.success('✅ Analyse IA terminée !', {
        description: 'L\'analyse complète est disponible ci-dessous.'
      });
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      
      // Only show generic error if not already handled
      if (!(error instanceof Error && error.message === 'Crédits insuffisants')) {
        toast.error('❌ Erreur d\'analyse', {
          description: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'analyse.'
        });
      }
      
      // Fallback to mock analysis if API fails
      const mockAnalysis = `# 📊 Analyse de Marché - YOJOB Plateforme ETT Européenne

## 🎯 Synthèse Exécutive

L'étude révèle un **marché mature et réceptif** avec ${responses.length} réponses d'agences ETT européennes. 

### Points Clés
- **${stats.experienceRate}%** des agences ont déjà l'expérience du détachement international
- **${stats.interestRate}%** sont **très intéressées** par la plateforme YOJOB
- Taille moyenne des agences : **${stats.avgEmployees} employés**
- Volume moyen de détachements : **${stats.avgWorkers} travailleurs/an**

---

## 🌍 Analyse Géographique

### Pays les Plus Actifs
${Object.entries(stats.countriesCount)
  .sort((a: any, b: any) => b[1] - a[1])
  .map(([country, count]: [string, any]) => `- **${country}** : ${count} agences (${((count / responses.length) * 100).toFixed(1)}%)`)
  .join('\n')}

### Insight Géographique
Les pays d'Europe de l'Ouest (France, Allemagne, Belgique) dominent le marché, représentant la majorité des réponses. Cela suggère une maturité du marché du détachement dans ces zones.

---

## 🏭 Segmentation Sectorielle

### Répartition
${Object.entries(stats.sectorsCount)
  .sort((a: any, b: any) => b[1] - a[1])
  .map(([sector, count]: [string, any]) => `- **${sector}** : ${count} agences (${((count / responses.length) * 100).toFixed(1)}%)`)
  .join('\n')}

### Opportunités Sectorielles
Le BTP et l'Industrie sont les secteurs les plus représentés, reflétant les besoins traditionnels en main-d'œuvre mobile. Les secteurs Tech et Hôtellerie montrent un potentiel de croissance.

---

## 💰 Analyse Budgétaire

### Distribution des Budgets
${Object.entries(stats.budgetCount)
  .map(([budget, count]: [string, any]) => `- **${budget}** : ${count} agences (${((count / responses.length) * 100).toFixed(1)}%)`)
  .join('\n')}

### Potentiel de Revenus
- **Segment Premium** (>10K€) : ${((Object.values(stats.budgetCount).filter((c: any, i: number) => Object.keys(stats.budgetCount)[i].includes('10000')) as any).reduce((a: number, b: number) => a + b, 0) / responses.length * 100).toFixed(1)}%
- **Segment Standard** (1-10K€) : Majorité du marché
- **Segment Entry** (<1K€) : Agences découvrant le détachement

---

## 🎯 Personas Identifiés

### 1. L'Expert International (${stats.withExperience} agences)
- ✅ Expérience confirmée en détachement
- ✅ Détache régulièrement (${stats.avgWorkers} travailleurs/an)
- ✅ Cherche à simplifier et scale
- 💰 Budget : 5-10K€+
- 🎯 Priorité : Efficacité, conformité, réseau étendu

### 2. Le Découvreur (${responses.length - stats.withExperience} agences)
- 🆕 Pas encore d'expérience en détachement
- 🎓 Veut se lancer dans l'international
- 💡 Besoin d'accompagnement et formation
- 💰 Budget : 500-5K€
- 🎯 Priorité : Facilité, support, risk mitigation

---

## 🚀 Recommandations Stratégiques

### 1. Positionnement Produit
**"La Marketplace Européenne qui Simplifie le Détachement"**
- ✅ Focus sur la **simplification administrative**
- ✅ Mise en avant du **réseau de 500+ agences**
- ✅ **Conformité garantie** (point de douleur majeur)

### 2. Pricing Strategy
- **Tier 1 - Starter** (500-1000€/an) : Accès basique, 10 mises en relation/an
- **Tier 2 - Professional** (5000-10000€/an) : Accès illimité, support prioritaire
- **Tier 3 - Enterprise** (10000€+/an) : Custom, API, account manager

### 3. Go-to-Market
**Phase 1 - Early Adopters** (3 mois)
- Cibler les ${stats.veryInterested} agences "très intéressées"
- Offre de lancement : -50% la première année
- Focus sur France, Allemagne, Belgique

**Phase 2 - Expansion** (6-12 mois)
- Onboarding des agences avec expérience
- Cas clients & success stories
- Extension géographique (Espagne, Italie, Pays-Bas)

**Phase 3 - Scale** (12+ mois)
- Ouverture aux agences sans expérience
- Programmes de formation & certification
- Features premium (IA matching, analytics avancés)

### 4. Quick Wins
1. **Webinar de lancement** : Inviter les ${responses.length} agences contactées
2. **Partenariats stratégiques** : Fédérations nationales ETT
3. **Contenu éducatif** : Guides sur la conformité par pays
4. **Pilot Program** : Beta avec 10 agences early adopters

---

## 📈 Projections de Marché

### Potentiel Adressable
- **Marché total** : 27,000 agences ETT en Europe
- **TAM** (Total Addressable Market) : ~€270M (10% adoption × €10K/agence)
- **SAM** (Serviceable Available Market) : ~€54M (20% TAM, focus pays matures)
- **SOM** (Serviceable Obtainable Market) Year 1 : ~€2.7M (5% SAM)

### Prévisions Année 1
- **Q1** : 50 agences × €5K = €250K ARR
- **Q2** : 100 agences (+50) × €5K = €500K ARR
- **Q3** : 200 agences (+100) × €5K = €1M ARR
- **Q4** : 350 agences (+150) × €5K = €1.75M ARR

**Objectif fin Année 1** : €1.75M ARR, 350 clients actifs

---

## ⚠️ Risques & Mitigations

### Risques Identifiés
1. **Complexité réglementaire** : Chaque pays = règles différentes
   - ✅ Mitigation : Partenariats avec cabinets juridiques spécialisés

2. **Résistance au changement** : Agences habituées à leurs processus
   - ✅ Mitigation : Onboarding personnalisé + support dédié

3. **Concurrence** : Players établis (Randstad, Adecco...)
   - ✅ Mitigation : Focus sur la niche "détachement européen"

4. **Effet réseau** : Besoin de masse critique pour la marketplace
   - ✅ Mitigation : Subventionner early adopters, garantie de mises en relation

---

## 🎓 Insights Qualitatifs

### Difficultés Principales Mentionnées
${responses
  .map(r => `- "${r.difficulties}" (${r.country} - ${r.sector})`)
  .join('\n')}

### Patterns Identifiés
1. **Conformité juridique** : Pain point #1 transverse à tous les pays
2. **Barrière linguistique** : Frein majeur pour PME
3. **Coûts cachés** : Manque de transparence des processus
4. **Délais** : Lenteur administrative = perte business

---

## 💡 Prochaines Actions

### Immédiat (J+0 à J+30)
1. ✅ Contacter les ${stats.veryInterested} agences "très intéressées" pour interviews approfondies
2. ✅ Créer MVP de la plateforme (version beta)
3. ✅ Préparer pitch deck investisseurs avec ces données
4. ✅ Sécuriser partenariats juridiques (1 cabinet par pays cible)

### Court Terme (J+30 à J+90)
1. ✅ Lancer pilot program avec 10 agences early adopters
2. ✅ Itérer product sur base des feedbacks
3. ✅ Construire pipeline de 100 prospects qualifiés
4. ✅ Lever seed round (€1-2M)

### Moyen Terme (J+90 à J+180)
1. ✅ Lancer officiellement la plateforme
2. ✅ Atteindre 50 clients payants
3. ✅ Recruter équipe commerciale (3-5 sales)
4. ✅ Expansion géographique (3 nouveaux pays)

---

## 🏆 Conclusion

**Le marché est MÛR pour YOJOB.** Les signaux sont au vert :
- ✅ ${stats.interestRate}% d'intérêt fort = forte demande
- ✅ ${stats.experienceRate}% avec expérience = marché mature
- ✅ Pain points clairs = product-market fit évident
- ✅ Budgets alloués = willingness to pay confirmée

**Recommandation** : GO pour le lancement. Prioriser l'exécution rapide sur les segments "Experts Internationaux" avec un pricing premium justifié par la simplification apportée.

---

*Analyse générée automatiquement par IA le ${new Date().toLocaleDateString('fr-FR', { dateStyle: 'full' })}*
`;

      setAnalysis(mockAnalysis);
      
      alert('⚠️ Analyse IA non disponible. Mode démo activé.\n\n' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyAnalysis = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadAnalysis = () => {
    if (analysis) {
      const blob = new Blob([analysis], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `yojob-analyse-ia-${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-violet-500/10 to-purple-500/10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-slate-900 text-xl">Analyse IA des Résultats</h2>
              </div>
              <p className="text-slate-600 text-sm">
                Analyse automatique via modèle de langage avancé
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!analysis ? (
            <div className="space-y-6">
              {/* Info Banner */}
              <Card className="bg-violet-50 border-violet-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-violet-900 text-sm mb-2">🤖 Analyse Intelligente</h4>
                      <p className="text-violet-700 text-sm mb-3">
                        L'IA va analyser les {responses.length} réponses et générer :
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 text-violet-700">
                          <TrendingUp className="w-4 h-4" />
                          Tendances du marché
                        </div>
                        <div className="flex items-center gap-2 text-violet-700">
                          <Target className="w-4 h-4" />
                          Segments prioritaires
                        </div>
                        <div className="flex items-center gap-2 text-violet-700">
                          <Lightbulb className="w-4 h-4" />
                          Recommandations stratégiques
                        </div>
                        <div className="flex items-center gap-2 text-violet-700">
                          <Zap className="w-4 h-4" />
                          Quick wins
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Model Selection (Future) */}
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <h4 className="text-slate-900 mb-3">Modèle d'IA à utiliser</h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Card
                      onClick={() => setSelectedModel('mcp')}
                      className={`cursor-pointer transition-all ${
                        selectedModel === 'mcp'
                          ? 'border-violet-400 bg-violet-50'
                          : 'border-slate-200 hover:border-violet-300'
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <Sparkles className={`w-6 h-6 mx-auto mb-2 ${
                          selectedModel === 'mcp' ? 'text-violet-600' : 'text-slate-400'
                        }`} />
                        <div className="text-sm text-slate-900 mb-1">MCP IA</div>
                        <Badge className="bg-violet-500 text-white text-xs">Recommandé</Badge>
                      </CardContent>
                    </Card>

                    <Card
                      onClick={() => setSelectedModel('claude')}
                      className={`cursor-pointer transition-all ${
                        selectedModel === 'claude'
                          ? 'border-orange-400 bg-orange-50'
                          : 'border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <Brain className={`w-6 h-6 mx-auto mb-2 ${
                          selectedModel === 'claude' ? 'text-orange-600' : 'text-slate-400'
                        }`} />
                        <div className="text-sm text-slate-900 mb-1">Claude</div>
                        <div className="text-xs text-slate-500">Anthropic</div>
                      </CardContent>
                    </Card>

                    <Card
                      onClick={() => setSelectedModel('gpt')}
                      className={`cursor-pointer transition-all ${
                        selectedModel === 'gpt'
                          ? 'border-green-400 bg-green-50'
                          : 'border-slate-200 hover:border-green-300'
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <Zap className={`w-6 h-6 mx-auto mb-2 ${
                          selectedModel === 'gpt' ? 'text-green-600' : 'text-slate-400'
                        }`} />
                        <div className="text-sm text-slate-900 mb-1">GPT-4</div>
                        <div className="text-xs text-slate-500">OpenAI</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Data Preview */}
              <Card className="border-slate-200">
                <CardContent className="p-4">
                  <h4 className="text-slate-900 mb-3">📊 Données à analyser</h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Réponses totales</span>
                      <Badge variant="outline">{responses.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Taux d'expérience</span>
                      <Badge variant="outline">{stats.experienceRate}%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Taux d'intérêt</span>
                      <Badge variant="outline">{stats.interestRate}%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">Pays couverts</span>
                      <Badge variant="outline">{Object.keys(stats.countriesCount).length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Start Analysis Button */}
              <Button
                onClick={handleAnalyzeWithMCP}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white shadow-lg py-6"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Lancer l'Analyse IA
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                      <div>
                        <div className="text-blue-900 text-sm mb-1">Analyse en cours...</div>
                        <div className="text-blue-700 text-xs">
                          L'IA traite les données et génère les insights (30-60 secondes)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Actions */}
              <div className="flex items-center gap-3 justify-end">
                <Button
                  onClick={handleCopyAnalysis}
                  variant="outline"
                  size="sm"
                  className="border-slate-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copier
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDownloadAnalysis}
                  variant="outline"
                  size="sm"
                  className="border-slate-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>

              {/* Analysis Result */}
              <Card className="border-slate-200">
                <CardContent className="p-6">
                  <div 
                    className="prose prose-sm max-w-none text-slate-700"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {analysis}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        {analysis && (
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Sparkles className="w-4 h-4" />
                <span>Analyse générée par IA • {new Date().toLocaleString('fr-FR')}</span>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900"
              >
                Fermer
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}
