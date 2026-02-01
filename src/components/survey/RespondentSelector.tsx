/**
 * 🎯 COMPOSANT DE SÉLECTION DU TYPE DE RÉPONDANT
 * 
 * Écran de sélection du profil avant de démarrer l'enquête
 * 3 profils disponibles : Agences, Clients, Intérimaires
 */

import { motion } from 'motion/react';
import { Building2, Briefcase, UserCheck, Shield, Globe, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { RespondentType, RespondentProfile } from '../../types/survey';
import { RESPONDENT_PROFILES } from '../../types/survey';
import { useI18n } from '../../src/i18n';

interface RespondentSelectorProps {
  onSelect: (type: RespondentType) => void;
  currentLanguage?: string;
  availableLanguagesCount?: number;
}

const ICON_MAP = {
  building: Building2,
  briefcase: Briefcase,
  'user-check': UserCheck,
};

const COLOR_MAP = {
  orange: {
    gradient: 'from-orange-500 to-amber-500',
    hover: 'hover:border-orange-400/50',
    text: 'text-orange-400',
  },
  blue: {
    gradient: 'from-blue-600 to-cyan-500',
    hover: 'hover:border-cyan-400/50',
    text: 'text-cyan-400',
  },
  green: {
    gradient: 'from-green-500 to-emerald-500',
    hover: 'hover:border-green-400/50',
    text: 'text-green-400',
  },
};

export function RespondentSelector({ onSelect, currentLanguage = 'fr', availableLanguagesCount = 23 }: RespondentSelectorProps) {
  const profiles: RespondentProfile[] = Object.values(RESPONDENT_PROFILES);
  const { t } = useI18n(); // ✅ Le hook ne prend pas de paramètre, il utilise le contexte

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 px-4 py-20 pt-32 md:pt-40">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-8 bg-white/10 backdrop-blur-sm border-white/20 text-white px-6 py-3 text-base whitespace-normal text-center max-w-full mx-auto leading-relaxed">
            {t('selector.badge', '🌍 Étude de marché européen - Recrutement & Intérim')}
          </Badge>
          
          <h1 className="text-white mb-4">
            {t('selector.title', 'Partagez votre expérience du marché européen')}
          </h1>
          
          <p className="text-cyan-200 text-lg max-w-2xl mx-auto">
            {t('selector.subtitle', 'Sélectionnez votre profil pour commencer l\'enquête')}
          </p>
        </motion.div>

        {/* 3 Cards de sélection */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {profiles.map((profile, index) => {
            const Icon = ICON_MAP[profile.icon];
            const colors = COLOR_MAP[profile.color];
            
            return (
              <motion.div
                key={profile.type}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  onClick={() => onSelect(profile.type)}
                  className={`
                    bg-white/10 backdrop-blur-xl rounded-3xl p-8 
                    border border-white/20 ${colors.hover}
                    cursor-pointer transition-all duration-300
                    hover:bg-white/15 hover:shadow-2xl hover:shadow-white/20
                    group
                  `}
                >
                  <CardContent className="p-0">
                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient}
                      flex items-center justify-center mb-6
                      shadow-lg group-hover:shadow-xl
                      transition-shadow duration-300
                    `}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-white mb-3">
                      {t(`respondent.${profile.type}.label`, profile.label)}
                    </h3>

                    {/* Description */}
                    <p className="text-cyan-200 text-sm mb-6 leading-relaxed">
                      {t(`respondent.${profile.type}.description`, profile.description)}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60 flex items-center gap-1">
                        <span>{profile.totalQuestions} {t('hero.stat.questions', 'questions')}</span>
                      </span>
                      <span className={`${colors.text} flex items-center gap-1`}>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t(`respondent.${profile.type}.estimatedTime`, profile.estimatedTime)}</span>
                      </span>
                    </div>

                    {/* Hover indicator */}
                    <div className="mt-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-medium">
                        {t('selector.cta', 'Cliquer pour démarrer →')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>{t('selector.trust.secure', 'Données sécurisées')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>{availableLanguagesCount} {t('selector.trust.languages_suffix', availableLanguagesCount === 1 ? 'langue disponible' : 'langues disponibles')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{t('selector.trust.anonymous', 'Anonyme & confidentiel')}</span>
          </div>
        </motion.div>

        {/* Background decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Blob 1 */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
          />
          
          {/* Blob 2 */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"
          />

          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </section>
  );
}