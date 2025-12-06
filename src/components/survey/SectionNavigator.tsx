import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { useI18n } from '../../hooks/useI18n';

interface Section {
  id: number;
  labelKey: string;
  labelFallback: string;
  icon: string;
  questions: number;
  time: string;
}

interface SectionNavigatorProps {
  sections: Section[];
  currentSection: number;
  completedSections: number[];
  setCurrentSection: (section: number | ((prev: number) => number)) => void;
}

export function SectionNavigator({
  sections,
  currentSection,
  completedSections,
  setCurrentSection
}: SectionNavigatorProps) {
  const { t } = useI18n();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll to active section button when currentSection changes
  useEffect(() => {
    if (currentSection >= 1 && currentSection <= sections.length) {
      const activeButtonIndex = currentSection - 1;
      const activeButton = buttonRefs.current[activeButtonIndex];
      
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  }, [currentSection, sections.length]);

  return (
    <div className="flex overflow-x-auto gap-2 mb-8 justify-start md:justify-center pb-2 px-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {sections.map((section, index) => (
        <button
          key={section.id}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => section.id < currentSection && setCurrentSection(section.id)}
          disabled={section.id > currentSection}
          className={`px-3 py-1.5 rounded-full text-sm transition-all whitespace-nowrap flex-shrink-0 ${
            section.id === currentSection
              ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/30'
              : completedSections.includes(section.id)
              ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-pointer hover:bg-green-500/30'
              : section.id < currentSection
              ? 'bg-white/10 text-white/60 border border-white/20 cursor-pointer hover:bg-white/20'
              : 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed'
          }`}
        >
          {completedSections.includes(section.id) && section.id !== currentSection && (
            <CheckCircle className="w-3 h-3 inline mr-1" />
          )}
          {section.icon} {t(section.labelKey, section.labelFallback)}
        </button>
      ))}
    </div>
  );
}
