import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import type { RespondentType } from '../../types/survey';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  isPremium?: boolean;
  respondentType?: RespondentType;
  sectionNumber?: number;
}

// Titres et descriptions adaptés selon le profil
const SECTION_CONTENT: Record<number, Record<RespondentType, { title: string; description: string }>> = {
  1: {
    agency: {
      title: '📋 Profil de votre agence',
      description: 'Présentez votre agence d\'intérim et votre expertise'
    },
    client: {
      title: '📋 Profil de votre entreprise',
      description: 'Présentez votre entreprise et vos besoins en recrutement'
    },
    worker: {
      title: '📋 Votre profil',
      description: 'Parlez-nous de votre parcours professionnel'
    }
  },
  2: {
    agency: {
      title: '💼 Expérience en détachement',
      description: 'Votre activité de détachement de travailleurs'
    },
    client: {
      title: '💼 Votre expérience en recrutement',
      description: 'Vos pratiques actuelles de recrutement et intérim'
    },
    worker: {
      title: '💼 Votre expérience en intérim',
      description: 'Votre parcours dans le travail temporaire'
    }
  },
  3: {
    agency: {
      title: '🎯 Besoins et outils',
      description: 'Vos défis et solutions actuelles'
    },
    client: {
      title: '🎯 Vos besoins actuels',
      description: 'Difficultés et attentes en matière de recrutement'
    },
    worker: {
      title: '🎯 Vos attentes',
      description: 'Ce qui compte pour vous dans une mission'
    }
  },
  4: {
    agency: {
      title: '⭐ Intérêt pour une plateforme européenne',
      description: 'Découvrez notre vision d\'une marketplace innovante'
    },
    client: {
      title: '⭐ Intérêt pour une plateforme européenne',
      description: 'Une solution innovante pour vos besoins'
    },
    worker: {
      title: '⭐ Votre intérêt pour une plateforme',
      description: 'Une plateforme pour trouver vos missions facilement'
    }
  },
  5: {
    agency: {
      title: '🔮 Vision du futur',
      description: 'Budget et perspectives de développement'
    },
    client: {
      title: '🔮 Vos priorités futures',
      description: 'Budget et stratégie de recrutement'
    },
    worker: {
      title: '🔮 Vos objectifs',
      description: 'Vos projets professionnels à venir'
    }
  },
  6: {
    agency: {
      title: '📧 Restons en contact',
      description: 'Recevez les résultats de l\'étude et restez informé'
    },
    client: {
      title: '📧 Restons en contact',
      description: 'Recevez les résultats et nos recommandations'
    },
    worker: {
      title: '📧 Restons en contact',
      description: 'Recevez les résultats et des opportunités'
    }
  }
};

export function SectionHeader({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  isPremium,
  respondentType = 'agency',
  sectionNumber
}: SectionHeaderProps) {
  // Si sectionNumber est fourni et qu'on a du contenu adapté, on l'utilise
  const adaptedContent = sectionNumber && SECTION_CONTENT[sectionNumber]
    ? SECTION_CONTENT[sectionNumber][respondentType]
    : { title, description };

  const displayTitle = adaptedContent.title;
  const displayDescription = adaptedContent.description;

  if (isPremium) {
    return (
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl" />
        <div className="relative flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/20">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-cyan-500/30 flex-shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-white mb-1">{displayTitle}</h3>
            <p className="text-cyan-300 text-sm">{displayDescription}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-4 mb-8"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 className="text-white mb-1">{displayTitle}</h3>
        <p className="text-white/60 text-sm">{displayDescription}</p>
      </div>
    </motion.div>
  );
}
