import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Building2,
  Mail,
  Phone,
  Globe as GlobeIcon,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';

interface ProspectSheetProps {
  prospect: {
    id: string;
    type: 'client' | 'agency' | 'interim';
    name: string;
    country: string;
    countryFlag: string;
    sector: string;
    status: string;
    responsible: {
      initials: string;
      color: string;
    };
  } | null;
  open: boolean;
  onClose: () => void;
}

const MOCK_PROSPECT_DETAILS = {
  email: 'contact@bouygues-btp.fr',
  phone: '+33 1 44 20 10 00',
  website: 'www.bouygues-construction.com',
  address: '1 avenue Eugène Freyssinet, 78280 Guyancourt, France',
  createdAt: '15 oct. 2024',
  nextActions: [
    {
      id: '1',
      icon: '📞',
      date: '15 déc. 2024',
      label: 'Appel de suivi commercial',
      responsible: 'JD',
      done: false,
    },
    {
      id: '2',
      icon: '📧',
      date: '18 déc. 2024',
      label: 'Envoyer proposition détaillée',
      responsible: 'JD',
      done: false,
    },
    {
      id: '3',
      icon: '📅',
      date: '20 déc. 2024',
      label: 'Rendez-vous en visio',
      responsible: 'AF',
      done: false,
    },
  ],
  history: [
    {
      id: '1',
      date: '10 déc. 2024',
      type: 'Appel',
      description: 'Premier contact téléphonique - Intéressé par recrutement BTP Pologne',
      user: 'Jean Dupont',
    },
    {
      id: '2',
      date: '5 déc. 2024',
      type: 'Email',
      description: 'Email de relance suite à la demande de devis',
      user: 'Marie Laurent',
    },
    {
      id: '3',
      date: '1 déc. 2024',
      type: 'Formulaire',
      description: 'Soumission formulaire de contact depuis la landing page',
      user: 'Système',
    },
  ],
  notes: [
    {
      id: '1',
      date: '10 déc. 2024',
      author: 'Jean Dupont',
      content:
        'Projet de recrutement de 50 ouvriers BTP pour un chantier en Pologne. Budget conséquent. Contact : M. Leblanc (DRH).',
    },
  ],
};

export function ProspectSheet({ prospect, open, onClose }: ProspectSheetProps) {
  if (!prospect) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
              <h2 className="text-slate-900">Fiche prospect</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-200">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Section Identité */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${prospect.responsible.color} flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg`}
                    >
                      {prospect.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 mb-1">{prospect.name}</h3>
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="mr-2">🏢 {prospect.type === 'client' ? 'Client' : prospect.type === 'agency' ? 'Agence' : 'Intérimaire'}</span>
                        <span className="mr-2">• {prospect.countryFlag} {prospect.country}</span>
                        <span>• {prospect.sector}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {prospect.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Créé : {MOCK_PROSPECT_DETAILS.createdAt}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Resp. : {prospect.responsible.initials}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section Coordonnées */}
              <div>
                <h3 className="text-slate-900 mb-3">Coordonnées</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-600 mb-0.5">Email</p>
                      <a
                        href={`mailto:${MOCK_PROSPECT_DETAILS.email}`}
                        className="text-sm text-cyan-600 hover:underline break-all"
                      >
                        {MOCK_PROSPECT_DETAILS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Phone className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-600 mb-0.5">Téléphone</p>
                      <a
                        href={`tel:${MOCK_PROSPECT_DETAILS.phone}`}
                        className="text-sm text-slate-900"
                      >
                        {MOCK_PROSPECT_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <GlobeIcon className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-600 mb-0.5">Site web</p>
                      <a
                        href={`https://${MOCK_PROSPECT_DETAILS.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-600 hover:underline break-all"
                      >
                        {MOCK_PROSPECT_DETAILS.website}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-600 mb-0.5">Adresse</p>
                      <p className="text-sm text-slate-900">{MOCK_PROSPECT_DETAILS.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Prochaines actions */}
              <div>
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <span>🔔</span>
                  Prochaines actions
                </h3>
                <div className="space-y-2">
                  {MOCK_PROSPECT_DETAILS.nextActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <span className="text-lg">{action.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">{action.label}</p>
                        <p className="text-xs text-slate-600">
                          {action.date} • Resp. {action.responsible}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0 text-xs gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Fait
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-3 gap-2">
                  <Calendar className="w-4 h-4" />
                  Planifier une action
                </Button>
              </div>

              {/* Section Historique */}
              <div>
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <span>📋</span>
                  Historique
                </h3>
                <div className="relative pl-6 space-y-4">
                  {/* Ligne verticale */}
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-slate-200" />

                  {MOCK_PROSPECT_DETAILS.history.map((entry, idx) => (
                    <div key={entry.id} className="relative">
                      {/* Point */}
                      <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-cyan-500 border-2 border-white shadow-sm" />

                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-xs text-slate-600">{entry.date}</span>
                          <Badge variant="secondary" className="text-xs">
                            {entry.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-900">{entry.description}</p>
                        <p className="text-xs text-slate-500 mt-1">Par {entry.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Notes */}
              <div>
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <span>📝</span>
                  Notes internes
                </h3>

                {MOCK_PROSPECT_DETAILS.notes.map((note) => (
                  <Card key={note.id} className="mb-3 border-slate-200 bg-slate-50">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-600">{note.date}</span>
                        <span className="text-xs text-slate-500">{note.author}</span>
                      </div>
                      <p className="text-sm text-slate-900">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}

                <Textarea
                  placeholder="Ajouter une note…"
                  className="min-h-[80px] bg-white border-slate-200 focus:border-cyan-500"
                />
                <Button variant="outline" size="sm" className="mt-2">
                  Enregistrer la note
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  Modifier le statut
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md">
                  Envoyer un email
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
