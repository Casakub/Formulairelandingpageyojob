import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, X, Save, Eye, Code } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import type { EmailTemplate } from '../../types/automations';

interface EmailTemplateEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (template: Partial<EmailTemplate>) => void;
  editingTemplate?: EmailTemplate | null;
}

const CATEGORY_OPTIONS = [
  { value: 'waitlist', label: 'Waitlist', color: 'from-blue-500 to-cyan-500' },
  { value: 'agency', label: 'Agence ETT', color: 'from-purple-500 to-violet-500' },
  { value: 'client', label: 'Client', color: 'from-orange-500 to-amber-500' },
  { value: 'nurturing', label: 'Nurturing', color: 'from-green-500 to-emerald-500' },
  { value: 'notification', label: 'Notification', color: 'from-pink-500 to-red-500' },
];

const LANGUAGE_OPTIONS = [
  { value: 'fr', label: '🇫🇷 Français' },
  { value: 'en', label: '🇬🇧 English' },
  { value: 'de', label: '🇩🇪 Deutsch' },
  { value: 'es', label: '🇪🇸 Español' },
  { value: 'pl', label: '🇵🇱 Polski' },
  { value: 'ro', label: '🇷🇴 Română' },
];

const COMMON_VARIABLES = [
  '{{name}}',
  '{{email}}',
  '{{company}}',
  '{{country}}',
  '{{phone}}',
  '{{sender_name}}',
  '{{quote_date}}',
  '{{need_type}}',
];

export function EmailTemplateEditor({ open, onClose, onSave, editingTemplate }: EmailTemplateEditorProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [category, setCategory] = useState<string>('waitlist');
  const [language, setLanguage] = useState<string>('fr');
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');

  // Synchroniser avec editingTemplate
  useEffect(() => {
    if (editingTemplate) {
      setName(editingTemplate.name);
      setDescription(editingTemplate.description || '');
      setSubject(editingTemplate.subject);
      setBodyHtml(editingTemplate.body_html);
      setCategory(editingTemplate.category);
      setLanguage(editingTemplate.language);
    } else {
      // Réinitialiser
      setName('');
      setDescription('');
      setSubject('');
      setBodyHtml('');
      setCategory('waitlist');
      setLanguage('fr');
    }
  }, [editingTemplate, open]);

  const handleInsertVariable = (variable: string) => {
    setBodyHtml(prev => prev + ' ' + variable);
  };

  const handleSave = () => {
    const template: Partial<EmailTemplate> = {
      name,
      description,
      subject,
      body_html: bodyHtml,
      body_text: bodyHtml.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      category,
      language,
    };

    if (editingTemplate) {
      (template as any).id = editingTemplate.id;
    }

    onSave(template);
    handleReset();
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setSubject('');
    setBodyHtml('');
    setCategory('waitlist');
    setLanguage('fr');
    onClose();
  };

  const renderPreview = () => {
    if (previewMode === 'text') {
      return (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 whitespace-pre-wrap text-sm">
          {bodyHtml.replace(/<[^>]*>/g, '')}
        </div>
      );
    }

    return (
      <div 
        className="p-4 bg-white rounded-lg border border-slate-200 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    );
  };

  const isValid = name.trim().length > 0 && subject.trim().length > 0 && bodyHtml.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 to-white border-0 shadow-2xl p-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              {editingTemplate ? 'Modifier le template' : 'Nouveau template d\'email'}
            </DialogTitle>
            <DialogDescription className="text-white/90 text-sm mt-2">
              Créez un template réutilisable pour vos campagnes d'automatisation
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-5 mt-6">
            {/* Informations de base */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template-name">Nom du template *</Label>
                <Input
                  id="template-name"
                  placeholder="Ex: Waitlist - Bienvenue"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="template-category">Catégorie</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="template-category" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="template-language">Langue</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="template-language" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map(lang => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  placeholder="Ex: Premier email envoyé aux inscrits"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Sujet */}
            <div>
              <Label htmlFor="template-subject">Sujet de l'email *</Label>
              <Input
                id="template-subject"
                placeholder="Ex: 🎉 Bienvenue sur la liste d'attente YoJob !"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Variables disponibles */}
            <div>
              <Label className="text-xs text-slate-600 mb-2 block">Variables disponibles (cliquez pour insérer)</Label>
              <div className="flex flex-wrap gap-2">
                {COMMON_VARIABLES.map(variable => (
                  <Badge
                    key={variable}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-colors"
                    onClick={() => handleInsertVariable(variable)}
                  >
                    {variable}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Éditeur de contenu */}
            <div>
              <Label htmlFor="template-body">Contenu de l'email *</Label>
              <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as 'html' | 'text')} className="mt-2">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="html" onClick={() => setPreviewMode('html')}>
                    <Code className="w-4 h-4 mr-2" />
                    Éditer HTML
                  </TabsTrigger>
                  <TabsTrigger value="preview-html">
                    <Eye className="w-4 h-4 mr-2" />
                    Aperçu HTML
                  </TabsTrigger>
                  <TabsTrigger value="text">
                    <Mail className="w-4 h-4 mr-2" />
                    Aperçu Texte
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="html" className="mt-3">
                  <Textarea
                    id="template-body"
                    placeholder="<p>Bonjour {{name}},</p><p>Merci de votre inscription...</p>"
                    value={bodyHtml}
                    onChange={(e) => setBodyHtml(e.target.value)}
                    rows={12}
                    className="font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="preview-html" className="mt-3">
                  {renderPreview()}
                </TabsContent>

                <TabsContent value="text" className="mt-3">
                  {renderPreview()}
                </TabsContent>
              </Tabs>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <Button variant="outline" onClick={handleReset}>
                <X className="w-4 h-4 mr-1" />
                Annuler
              </Button>

              <Button
                onClick={handleSave}
                disabled={!isValid}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              >
                <Save className="w-4 h-4 mr-1" />
                {editingTemplate ? 'Mettre à jour' : 'Créer le template'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}