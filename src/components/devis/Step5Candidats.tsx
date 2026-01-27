import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { NIVEAUX_LANGUE, LANGUES, EPIS } from '../../data/config/constants';
import { useDevisTranslationStatic } from '../../hooks/useDevisTranslation';
import { translateLanguageName, translateLanguageLevel, translateEPI } from '../../utils/step5-translations';
import type { DevisLanguage } from '../../src/i18n/devis/types';

interface Step5CandidatsProps {
  data: {
    experience: {
      obligatoire: boolean;
      annees?: number;
    };
    formation: {
      obligatoire: boolean;
      type?: string;
    };
    travailRisque: {
      active: boolean;
      precisions?: string;
    };
    langues: Record<string, string>;
    permis: {
      requis: boolean;
      categorie?: string;
    };
    outillage: {
      requis: boolean;
      type?: string;
    };
    epis: string[];
  };
  onChange: (data: any) => void;
  lang?: DevisLanguage;
}

export function Step5Candidats({ data, onChange, lang = 'fr' }: Step5CandidatsProps) {
  const { t, isLoading: isLoadingTranslations } = useDevisTranslationStatic(lang);

  const handleNestedChange = (section: string, field: string, value: any) => {
    onChange({
      ...data,
      [section]: {
        ...data[section as keyof typeof data],
        [field]: value
      }
    });
  };

  const handleLangueChange = (langue: string, niveau: string) => {
    onChange({
      ...data,
      langues: {
        ...data.langues,
        [langue]: niveau
      }
    });
  };

  const handleEPIToggle = (epi: string, checked: boolean) => {
    const updatedEPIs = checked
      ? [...data.epis, epi]
      : data.epis.filter(e => e !== epi);
    
    onChange({
      ...data,
      epis: updatedEPIs
    });
  };

  if (isLoadingTranslations) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white/70">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">{t.step5.title}</h2>
        <p className="text-white/70">
          {t.step5.subtitle}
        </p>
      </div>

      {/* Section Expérience & Compétences */}
      <div className="border border-white/10 rounded-lg p-6 bg-white/5">
        <h3 className="text-white text-lg mb-4">{t.step5.sections.experience.title}</h3>
        
        <div className="space-y-4">
          {/* Expérience */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">{t.step5.sections.experience.obligatoire.label}</Label>
              <Switch
                checked={data.experience.obligatoire}
                onCheckedChange={(checked) => handleNestedChange('experience', 'obligatoire', checked)}
              />
            </div>
            
            {data.experience.obligatoire && (
              <div>
                <Label htmlFor="anneesExp" className="text-white mb-2 block">
                  {t.step5.sections.experience.annees.label}
                </Label>
                <Input
                  id="anneesExp"
                  type="number"
                  value={data.experience.annees || ''}
                  onChange={(e) => handleNestedChange('experience', 'annees', Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  min={0}
                  placeholder={t.step5.sections.experience.annees.placeholder}
                />
              </div>
            )}
          </div>

          {/* Formation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">{t.step5.sections.formation.obligatoire.label}</Label>
              <Switch
                checked={data.formation.obligatoire}
                onCheckedChange={(checked) => handleNestedChange('formation', 'obligatoire', checked)}
              />
            </div>
            
            {data.formation.obligatoire && (
              <div>
                <Label htmlFor="typeFormation" className="text-white mb-2 block">
                  {t.step5.sections.formation.type.label}
                </Label>
                <Input
                  id="typeFormation"
                  value={data.formation.type || ''}
                  onChange={(e) => handleNestedChange('formation', 'type', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  placeholder={t.step5.sections.formation.type.placeholder}
                />
              </div>
            )}
          </div>

          {/* Travail à risque */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">{t.step5.sections.travailRisque.active.label}</Label>
              <Switch
                checked={data.travailRisque.active}
                onCheckedChange={(checked) => handleNestedChange('travailRisque', 'active', checked)}
              />
            </div>
            
            {data.travailRisque.active && (
              <div>
                <Label htmlFor="precisionsRisque" className="text-white mb-2 block">
                  {t.step5.sections.travailRisque.precisions.label}
                </Label>
                <Input
                  id="precisionsRisque"
                  value={data.travailRisque.precisions || ''}
                  onChange={(e) => handleNestedChange('travailRisque', 'precisions', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  placeholder={t.step5.sections.travailRisque.precisions.placeholder}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Langues */}
      <div className="border border-white/10 rounded-lg p-6 bg-white/5">
        <h3 className="text-white text-lg mb-4">{t.step5.sections.langues.title}</h3>
        <div className="space-y-3">
          {LANGUES.map((langue) => (
            <div key={langue} className="grid grid-cols-2 gap-4 items-center">
              <Label className="text-white">{translateLanguageName(langue, lang)}</Label>
              <Select
                value={data.langues[langue] || 'non-requis'}
                onValueChange={(value) => handleLangueChange(langue, value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {NIVEAUX_LANGUE.map((niveau) => (
                    <SelectItem key={niveau.value} value={niveau.value} className="text-gray-900 hover:bg-slate-100">
                      {translateLanguageLevel(niveau.value, lang)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* Section Permis & Équipements */}
      <div className="border border-white/10 rounded-lg p-6 bg-white/5">
        <h3 className="text-white text-lg mb-4">{t.step5.sections.permis.title}</h3>
        
        <div className="space-y-4">
          {/* Permis de conduire */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">{t.step5.sections.permis.requis.label}</Label>
              <Switch
                checked={data.permis.requis}
                onCheckedChange={(checked) => handleNestedChange('permis', 'requis', checked)}
              />
            </div>
            
            {data.permis.requis && (
              <div>
                <Label htmlFor="categoriePermis" className="text-white mb-2 block">
                  {t.step5.sections.permis.categorie.label}
                </Label>
                <Input
                  id="categoriePermis"
                  value={data.permis.categorie || ''}
                  onChange={(e) => handleNestedChange('permis', 'categorie', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  placeholder={t.step5.sections.permis.categorie.placeholder}
                />
              </div>
            )}
          </div>

          {/* Petit outillage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">{t.step5.sections.outillage.requis.label}</Label>
              <Switch
                checked={data.outillage.requis}
                onCheckedChange={(checked) => handleNestedChange('outillage', 'requis', checked)}
              />
            </div>
            
            {data.outillage.requis && (
              <div>
                <Label htmlFor="typeOutillage" className="text-white mb-2 block">
                  {t.step5.sections.outillage.type.label}
                </Label>
                <Input
                  id="typeOutillage"
                  value={data.outillage.type || ''}
                  onChange={(e) => handleNestedChange('outillage', 'type', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  placeholder={t.step5.sections.outillage.type.placeholder}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section EPI */}
      <div className="border border-white/10 rounded-lg p-6 bg-white/5">
        <h3 className="text-white text-lg mb-4">{t.step5.sections.epi.title}</h3>
        
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-blue-200 text-sm">
            {t.step5.sections.epi.infoLegale}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {EPIS.map((epi) => (
            <div key={epi} className="flex items-center space-x-2">
              <Checkbox
                id={epi}
                checked={data.epis.includes(epi)}
                onCheckedChange={(checked) => handleEPIToggle(epi, checked as boolean)}
                className="border-white/20"
              />
              <Label htmlFor={epi} className="text-white cursor-pointer text-sm">
                {translateEPI(epi, lang)}
              </Label>
            </div>
          ))}
        </div>

        {data.epis.length > 0 && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-200 text-sm">
              {t.step5.sections.epi.selectionCount.replace('{count}', data.epis.length.toString())}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}