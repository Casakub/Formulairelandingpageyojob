import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
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
  Briefcase,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Loader2,
  MessageSquare,
  Rocket,
  Trash2,
  RefreshCw,
  Edit,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { TasksSection } from './TasksSection';
import { EventsSection } from './EventsSection';
import { ProspectAutomationPanel } from './ProspectAutomationPanel';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { useDashboard } from '../../contexts/DashboardContext';

interface ProspectSheetProps {
  prospect: {
    id: string;
    type: string;
    source: string;
    status: string;
    name: string | null;
    email: string;
    phone: string | null;
    company: string | null;
    country_code: string | null;
    language_code: string | null;
    sector: string | null;
    need_type: string | null;
    message: string | null;
    responsible_name: string | null;
    next_action_date: string | null;
    next_action_type: string | null;
    next_action_label: string | null;
    created_at: string;
    custom_fields: any;
  } | null;
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void; // Callback pour notifier les changements
}

interface SurveyData {
  response_id: string;
  respondent_type: string;
  q1_nom: string;
  q2_annee: string;
  q3_taille: string;
  q4_secteurs: string[];
  q5_pays: string;
  q6_volume: string;
  q7_origine: string;
  q8_destinations: string;
  q9_defi: string;
  q10_gestion: string;
  q11_incidents: string;
  q12_budget: string;
  q13_manque_gagner: string;
  q14_risques: string;
  q15_probleme: string;
  q16_erp: string;
  q17_migration: string;
  q18_score: number;
  q19_features: string[];
  q20_prix: string;
  q21_budget_mensuel: string;
  q22_mvp: string;
  q23_role: string;
  q24_evolution: string;
  q25_besoins: string;
  email: string;
  autorise_contact: boolean;
  souhaite_rapport: boolean;
  country: string;
  sector: string;
  company_size: number;
  detachment_experience: string;
  interest_level: string;
  completion_time: number;
  created_at: string;
}

const COUNTRY_FLAGS: Record<string, string> = {
  FR: '🇫🇷', DE: '🇩🇪', ES: '🇪🇸', IT: '🇮🇹', PL: '🇵🇱',
  PT: '🇵🇹', CZ: '🇨🇿', NL: '🇳🇱', BE: '🇧🇪', AT: '🇦🇹',
  GB: '🇬🇧', IE: '🇮🇪', SE: '🇸🇪', DK: '🇩🇰', FI: '🇫🇮',
  NO: '🇳🇴', GR: '🇬🇷', HU: '🇭🇺', RO: '🇷🇴', BG: '🇧🇬',
};

const TYPE_LABELS: Record<string, string> = {
  agency: 'Agence ETT',
  client: 'Client (Entreprise)',
  temp_worker: 'Intérimaire',
  waitlist: 'Liste d\'attente Marketplace',
  contact: 'Contact Landing Page',
};

const SOURCE_LABELS: Record<string, string> = {
  survey_agency: 'Enquête Agence',
  survey_client: 'Enquête Client',
  survey_temp_worker: 'Enquête Intérimaire',
  landing_contact: 'Formulaire Contact Landing',
  landing_waitlist: 'Waitlist Marketplace',
  manual: 'Ajout Manuel',
};

export function ProspectSheet({ prospect, open, onClose, onUpdate }: ProspectSheetProps) {
  const { setActiveTab } = useDashboard();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Array<{
    id: string;
    content: string;
    author_name: string;
    created_at: string;
  }>>([]);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(prospect?.status || 'new');
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country_code: '',
    sector: '',
    need_type: '',
    message: '',
  });

  // Charger les données complètes de l'enquête (si source = survey_*)
  useEffect(() => {
    if (!prospect || !open) return;

    // Seulement charger les données d'enquête si la source est survey_*
    if (!prospect.source?.startsWith('survey_')) {
      setSurveyData(null);
      return;
    }

    const loadSurveyData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/details/${prospect.id}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        if (data.success && data.prospect) {
          setSurveyData(data.prospect);
        }
      } catch (error) {
        console.error('Erreur chargement données enquête:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSurveyData();
  }, [prospect?.id, open]);

  // Charger les notes existantes
  useEffect(() => {
    if (!prospect || !open) return;

    const loadNotes = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospect.id}/notes`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        if (data.success && data.notes) {
          setNotes(data.notes);
        }
      } catch (error) {
        console.error('Erreur chargement notes:', error);
      }
    };

    loadNotes();
  }, [prospect?.id, open]);

  // Réinitialiser le statut actuel quand le prospect change
  useEffect(() => {
    if (prospect) {
      setCurrentStatus(prospect.status);
    }
  }, [prospect?.id, prospect?.status]);

  // Ouvrir la modal d'édition et initialiser le formulaire
  const handleOpenEditModal = () => {
    if (!prospect) return;
    setEditForm({
      name: prospect.name || '',
      email: prospect.email || '',
      phone: prospect.phone || '',
      company: prospect.company || '',
      country_code: prospect.country_code || '',
      sector: prospect.sector || '',
      need_type: prospect.need_type || '',
      message: prospect.message || '',
    });
    setShowEditModal(true);
  };

  // Mettre à jour les informations du prospect
  const handleUpdateInfo = async () => {
    if (!prospect) return;

    setIsUpdatingInfo(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospect.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editForm),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        // Mettre à jour les données localement
        Object.assign(prospect, editForm);
        setShowEditModal(false);
        
        // Appeler le callback pour rafraîchir la liste
        if (onUpdate) {
          onUpdate();
        }
      } else {
        console.error('❌ Erreur mise à jour infos:', data.error);
        alert(`Erreur: ${data.error || 'Erreur inconnue'}`);
      }
    } catch (error: any) {
      console.error('❌ Erreur mise à jour infos:', error);
      alert(`Erreur lors de la mise à jour: ${error.message}\n\nVérifiez que le serveur backend est démarré.`);
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  // Sauvegarder une nouvelle note
  const handleSaveNote = async () => {
    if (!newNote.trim() || !prospect) return;

    setIsSavingNote(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospect.id}/notes`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newNote.trim(),
            authorName: 'Admin',
          }),
        }
      );

      const data = await response.json();
      if (data.success && data.note) {
        // Ajouter la nouvelle note en tête de liste
        setNotes([data.note, ...notes]);
        setNewNote('');
      } else {
        console.error('❌ Erreur sauvegarde note:', data.error);
      }
    } catch (error) {
      console.error('❌ Erreur sauvegarde note:', error);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Supprimer une note
  const handleDeleteNote = async (noteId: string) => {
    if (!prospect || !confirm('Voulez-vous vraiment supprimer cette note ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospect.id}/notes/${noteId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        // Retirer la note de la liste
        setNotes(notes.filter(note => note.id !== noteId));
      } else {
        console.error('❌ Erreur suppression note:', data.error);
      }
    } catch (error) {
      console.error('❌ Erreur suppression note:', error);
    }
  };

  // Mettre à jour le statut du prospect
  const handleUpdateStatus = async () => {
    if (!prospect || !currentStatus) return;

    setIsUpdatingStatus(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospect.id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: currentStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        // Mettre à jour le statut localement
        prospect.status = currentStatus;
        setShowStatusModal(false);
        
        // Appeler le callback pour rafraîchir la liste
        if (onUpdate) {
          onUpdate();
        }
      } else {
        console.error('❌ Erreur mise à jour statut:', data.error);
        alert(`Erreur: ${data.error || 'Erreur inconnue'}`);
      }
    } catch (error: any) {
      console.error('❌ Erreur mise à jour statut:', error);
      alert(`Erreur lors de la mise à jour du statut: ${error.message}\n\nVérifiez que le serveur backend est démarré.`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (!prospect) return null;

  const responsible = {
    initials: prospect.name?.substring(0, 2).toUpperCase() || prospect.email.substring(0, 2).toUpperCase() || '??',
    color: 'from-blue-600 to-cyan-600',
  };

  const countryFlag = prospect.country_code ? COUNTRY_FLAGS[prospect.country_code] || '🌍' : '🌍';
  const typeLabel = TYPE_LABELS[prospect.type] || prospect.type;
  const sourceLabel = SOURCE_LABELS[prospect.source] || prospect.source;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Détermine quel layout afficher
  const isSurveySource = prospect.source?.startsWith('survey_');
  const isLandingContact = prospect.source === 'landing_contact';
  const isWaitlist = prospect.source === 'landing_waitlist';
  const isManual = prospect.source === 'manual';

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-cyan-600">
              <h2 className="text-white">Fiche prospect</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-white/20 text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Section Identité (commune à tous) */}
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${responsible.color} flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg`}
                    >
                      {responsible.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 mb-1">{prospect.name || 'Sans nom'}</h3>
                      <p className="text-sm text-slate-600 mb-2">
                        <span className="mr-2">🏢 {typeLabel}</span>
                        {prospect.country_code && (
                          <span className="mr-2">• {countryFlag} {prospect.country_code}</span>
                        )}
                        {prospect.sector && <span>• {prospect.sector}</span>}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {prospect.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Créé : {formatDate(prospect.created_at)}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          {sourceLabel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section Coordonnées (commune à tous) */}
              <div>
                <h3 className="text-slate-900 mb-3">📧 Coordonnées</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-600 mb-0.5">Email</p>
                      <a
                        href={`mailto:${prospect.email}`}
                        className="text-sm text-cyan-600 hover:underline break-all"
                      >
                        {prospect.email}
                      </a>
                    </div>
                  </div>

                  {prospect.phone && (
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <Phone className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-600 mb-0.5">Téléphone</p>
                        <a href={`tel:${prospect.phone}`} className="text-sm text-slate-900">
                          {prospect.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {prospect.company && (
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <Building2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-600 mb-0.5">Entreprise</p>
                        <p className="text-sm text-slate-900">{prospect.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* LAYOUT SPÉCIFIQUE : Landing Contact */}
              {isLandingContact && (
                <>
                  <div>
                    <h3 className="text-slate-900 mb-3">📋 Profil de l&apos;entreprise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {prospect.company && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Nom de l&apos;entreprise</p>
                          <p className="text-sm text-slate-900">{prospect.company}</p>
                        </div>
                      )}
                      {prospect.sector && (
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-xs text-slate-600 mb-1">Secteur d&apos;activité</p>
                          <p className="text-sm text-slate-900">{prospect.sector}</p>
                        </div>
                      )}
                      {prospect.need_type && (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 md:col-span-2">
                          <p className="text-xs text-slate-600 mb-1">Type de besoin</p>
                          <p className="text-sm text-slate-900">{prospect.need_type}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Informations complémentaires (si disponibles) */}
                  {prospect.custom_fields && Object.keys(prospect.custom_fields).length > 0 && (
                    <div>
                      <h3 className="text-slate-900 mb-3">🏢 Informations complémentaires</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {prospect.custom_fields.companyId && (
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-600 mb-1">Numéro d&apos;identification</p>
                            <p className="text-sm text-slate-900 font-mono">{prospect.custom_fields.companyId}</p>
                          </div>
                        )}
                        {prospect.custom_fields.website && (
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-600 mb-1">Site web</p>
                            <a
                              href={prospect.custom_fields.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-cyan-600 hover:underline break-all"
                            >
                              {prospect.custom_fields.website}
                            </a>
                          </div>
                        )}
                        {prospect.custom_fields.companySize && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-xs text-slate-600 mb-1">Nombre d&apos;employés</p>
                            <p className="text-sm text-slate-900">{prospect.custom_fields.companySize}</p>
                          </div>
                        )}
                        {prospect.custom_fields.foundedYear && (
                          <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                            <p className="text-xs text-slate-600 mb-1">Année de création</p>
                            <p className="text-sm text-slate-900">{prospect.custom_fields.foundedYear}</p>
                          </div>
                        )}
                        {prospect.custom_fields.agencySpecialties && (
                          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 md:col-span-2">
                            <p className="text-xs text-slate-600 mb-1">Spécialités de recrutement</p>
                            <p className="text-sm text-slate-900">{prospect.custom_fields.agencySpecialties}</p>
                          </div>
                        )}
                        {prospect.custom_fields.operatingCountries && (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200 md:col-span-2">
                            <p className="text-xs text-slate-600 mb-1">Pays d&apos;opération</p>
                            <p className="text-sm text-slate-900">{prospect.custom_fields.operatingCountries}</p>
                          </div>
                        )}
                        {prospect.custom_fields.annualRecruitmentVolume && (
                          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-xs text-slate-600 mb-1">Volume de recrutement annuel</p>
                            <p className="text-sm text-slate-900">{prospect.custom_fields.annualRecruitmentVolume}</p>
                          </div>
                        )}
                        {prospect.custom_fields.hrBudget && (
                          <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                            <p className="text-xs text-slate-600 mb-1">Budget annuel RH</p>
                            <p className="text-sm text-slate-900">{prospect.custom_fields.hrBudget}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {prospect.message && (
                    <div>
                      <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Message du prospect
                      </h3>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{prospect.message}</p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* LAYOUT SPÉCIFIQUE : Waitlist */}
              {isWaitlist && (
                <div>
                  <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-purple-600" />
                    Inscription Waitlist Marketplace
                  </h3>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-slate-700 mb-2">
                      Ce prospect s&apos;est inscrit sur la liste d&apos;attente pour la marketplace YOJOB.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Intéressé par l&apos;accès anticipé à la plateforme</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LAYOUT SPÉCIFIQUE : Survey (Enquête détaillée) */}
              {isSurveySource && (
                <>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                  ) : surveyData ? (
                    <>
                      {/* Profil Entreprise */}
                      <div>
                        <h3 className="text-slate-900 mb-3">🏢 Profil de l&apos;entreprise</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-xs text-slate-600 mb-1">Année de création</p>
                            <p className="text-sm text-slate-900">{surveyData.q2_annee || 'N/A'}</p>
                          </div>
                          <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                            <p className="text-xs text-slate-600 mb-1">Taille</p>
                            <p className="text-sm text-slate-900">{surveyData.q3_taille || 'N/A'}</p>
                          </div>
                          <div className="p-3 bg-violet-50 rounded-lg border border-violet-200 md:col-span-2">
                            <p className="text-xs text-slate-600 mb-1">Secteurs d&apos;activité</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {surveyData.q4_secteurs?.map((secteur: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {secteur}
                                </Badge>
                              )) || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Détachement Européen */}
                      <div>
                        <h3 className="text-slate-900 mb-3">🌍 Détachement européen</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-600 mb-1">Volume annuel</p>
                            <p className="text-sm text-slate-900">{surveyData.q6_volume || 'N/A'}</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-600 mb-1">Pays d&apos;origine des travailleurs</p>
                            <p className="text-sm text-slate-900">{surveyData.q7_origine || 'N/A'}</p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-600 mb-1">Destinations principales</p>
                            <p className="text-sm text-slate-900">{surveyData.q8_destinations || 'N/A'}</p>
                          </div>
                          {surveyData.q9_defi && (
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <p className="text-xs text-slate-600 mb-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Principal défi
                              </p>
                              <p className="text-sm text-slate-900">{surveyData.q9_defi}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Besoins & Budget */}
                      <div>
                        <h3 className="text-slate-900 mb-3">💰 Besoins & Budget</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-xs text-slate-600 mb-1">Budget temps/personne pour conformité</p>
                            <p className="text-sm text-slate-900">{surveyData.q12_budget || 'N/A'}</p>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-xs text-slate-600 mb-1">Manque à gagner annuel estimé</p>
                            <p className="text-sm text-slate-900">{surveyData.q13_manque_gagner || 'N/A'}</p>
                          </div>
                          {surveyData.q21_budget_mensuel && (
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-xs text-slate-600 mb-1">Budget mensuel acceptable</p>
                              <p className="text-sm text-slate-900">{surveyData.q21_budget_mensuel}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Score d'intérêt */}
                      <div>
                        <h3 className="text-slate-900 mb-3">📊 Niveau d&apos;intérêt</h3>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600">Score NPS</span>
                            <span className="text-3xl text-purple-700">{surveyData.q18_score}/10</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                              style={{ width: `${surveyData.q18_score * 10}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-600 mt-2">
                            Niveau : <span className="text-slate-900">{surveyData.interest_level}</span>
                          </p>
                        </div>
                      </div>

                      {/* Features souhaitées */}
                      {surveyData.q19_features && surveyData.q19_features.length > 0 && (
                        <div>
                          <h3 className="text-slate-900 mb-3">✨ Fonctionnalités souhaitées</h3>
                          <div className="flex flex-wrap gap-2">
                            {surveyData.q19_features.map((feature: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-cyan-50 border-cyan-200">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Besoins complémentaires */}
                      {surveyData.q25_besoins && (
                        <div>
                          <h3 className="text-slate-900 mb-3">💬 Besoins & Attentes</h3>
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">{surveyData.q25_besoins}</p>
                          </div>
                        </div>
                      )}

                      {/* Consentements */}
                      <div>
                        <h3 className="text-slate-900 mb-3">🔒 Consentements</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <CheckCircle
                              className={`w-4 h-4 ${
                                surveyData.autorise_contact ? 'text-green-600' : 'text-slate-300'
                              }`}
                            />
                            <span className="text-sm text-slate-700">
                              {surveyData.autorise_contact ? 'Autorise le contact' : 'N\'autorise pas le contact'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                            <CheckCircle
                              className={`w-4 h-4 ${
                                surveyData.souhaite_rapport ? 'text-green-600' : 'text-slate-300'
                              }`}
                            />
                            <span className="text-sm text-slate-700">
                              {surveyData.souhaite_rapport
                                ? 'Souhaite recevoir le rapport'
                                : 'Ne souhaite pas le rapport'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Métadonnées */}
                      <div>
                        <h3 className="text-slate-900 mb-3">📈 Métadonnées</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-600 mb-1">Temps de complétion</p>
                            <p className="text-sm text-slate-900">
                              {Math.floor(surveyData.completion_time / 60)}min {surveyData.completion_time % 60}s
                            </p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-xs text-slate-600 mb-1">ID Réponse</p>
                            <p className="text-xs text-slate-900 font-mono">{surveyData.response_id}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-orange-800">
                        Aucune donnée d&apos;enquête trouvée pour ce prospect.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* LAYOUT SPÉCIFIQUE : Ajout Manuel */}
              {isManual && (
                <div>
                  <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Ajout Manuel
                  </h3>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-slate-700 mb-2">
                      Ce prospect a été ajouté manuellement par un administrateur.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Informations fournies manuellement</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section Notes (commune à tous) */}
              <div>
                <h3 className="text-slate-900 mb-3">📝 Notes internes</h3>
                
                {/* Liste des notes existantes */}
                {notes.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {notes.map(note => (
                      <div key={note.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative group">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm text-slate-700 flex-1">{note.content}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onClick={() => handleDeleteNote(note.id)}
                            title="Supprimer cette note"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Par {note.author_name} • {formatDate(note.created_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Message si aucune note */}
                {notes.length === 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                    <p className="text-sm text-blue-700">Aucune note pour le moment. Ajoutez-en une ci-dessous !</p>
                  </div>
                )}

                {/* Formulaire nouvelle note */}
                <Textarea
                  placeholder="Ajouter une note sur ce prospect…"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[80px] bg-white border-slate-200 focus:border-cyan-500"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  disabled={!newNote.trim() || isSavingNote}
                  onClick={handleSaveNote}
                >
                  {isSavingNote ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    'Enregistrer la note'
                  )}
                </Button>
              </div>

              {/* Section Tâches (commune à tous) */}
              <TasksSection prospectId={prospect.id} onUpdate={onUpdate} />

              {/* Section Événements (commune à tous) */}
              <EventsSection prospectId={prospect.id} onUpdate={onUpdate} />

              {/* Section Automatisations (commune à tous) */}
              <div className="mt-6">
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  Automatisations
                </h3>
                <ProspectAutomationPanel 
                  prospectId={prospect.id}
                  prospectEmail={prospect.email}
                  prospectType={prospect.type}
                  onNavigateToAutomations={() => {
                    onClose(); // Fermer le sheet d'abord
                    setActiveTab('automations'); // Naviguer vers automations
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={handleOpenEditModal}
                >
                  <Edit className="w-4 h-4" />
                  Éditer
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => setShowStatusModal(true)}
                >
                  <RefreshCw className="w-4 h-4" />
                  Statut
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md flex items-center justify-center gap-2"
                  onClick={() => window.open(`mailto:${prospect.email}`)}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Modale de modification du statut */}
          {showStatusModal && (
            <>
              {/* Overlay modale */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowStatusModal(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />

              {/* Modale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[70] p-6"
              >
                <div className="mb-4">
                  <h3 className="text-slate-900 mb-1 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    Modifier le statut
                  </h3>
                  <p className="text-sm text-slate-600">
                    Sélectionnez le nouveau statut pour ce prospect
                  </p>
                </div>

                {/* Options de statut */}
                <div className="space-y-2 mb-6">
                  {[
                    { value: 'new', label: 'Nouveau', color: 'bg-blue-100 text-blue-800 border-blue-200' },
                    { value: 'qualified', label: 'Qualifié', color: 'bg-purple-100 text-purple-800 border-purple-200' },
                    { value: 'follow-up', label: 'Suivi en cours', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
                    { value: 'proposal', label: 'Proposition envoyée', color: 'bg-orange-100 text-orange-800 border-orange-200' },
                    { value: 'won', label: 'Gagné', color: 'bg-green-100 text-green-800 border-green-200' },
                    { value: 'lost', label: 'Perdu', color: 'bg-red-100 text-red-800 border-red-200' },
                  ].map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setCurrentStatus(status.value)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        currentStatus === status.value
                          ? `${status.color} border-opacity-100 shadow-md scale-[1.02]`
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{status.label}</span>
                        {currentStatus === status.value && (
                          <CheckCircle className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowStatusModal(false)}
                    disabled={isUpdatingStatus}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md"
                    onClick={handleUpdateStatus}
                    disabled={isUpdatingStatus || currentStatus === prospect.status}
                  >
                    {isUpdatingStatus ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      'Confirmer'
                    )}
                  </Button>
                </div>
              </motion.div>
            </>
          )}

          {/* Modale d'édition des informations */}
          {showEditModal && (
            <>
              {/* Overlay modale */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowEditModal(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />

              {/* Modale */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl z-[70] flex flex-col"
              >
                {/* Header fixe */}
                <div className="p-6 border-b border-slate-200 flex-shrink-0">
                  <h3 className="text-slate-900 mb-1 flex items-center gap-2">
                    <Edit className="w-5 h-5 text-blue-600" />
                    Modifier les informations
                  </h3>
                  <p className="text-sm text-slate-600">
                    Mettez à jour les informations du prospect
                  </p>
                </div>

                {/* Contenu scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {/* Section Identité */}
                    <div>
                      <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Identité
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-600 mb-1.5 block">Nom complet</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Jean Dupont"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-1.5 block">Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="email"
                              placeholder="email@exemple.com"
                              value={editForm.email}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-1.5 block">Téléphone</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="tel"
                              placeholder="+33 6 12 34 56 78"
                              value={editForm.phone}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-1.5 block">Code pays</label>
                          <div className="relative">
                            <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="FR"
                              maxLength={2}
                              value={editForm.country_code}
                              onChange={(e) => setEditForm({ ...editForm, country_code: e.target.value.toUpperCase() })}
                              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm uppercase"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Entreprise */}
                    <div>
                      <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-violet-600" />
                        Entreprise
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-600 mb-1.5 block">Nom de l'entreprise</label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="ACME Corp"
                              value={editForm.company}
                              onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-1.5 block">Secteur d'activité</label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="BTP, Industrie, Services..."
                              value={editForm.sector}
                              onChange={(e) => setEditForm({ ...editForm, sector: e.target.value })}
                              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-xs text-slate-600 mb-1.5 block">Type de besoin</label>
                          <div className="relative">
                            <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Recrutement, Intérim, Formation..."
                              value={editForm.need_type}
                              onChange={(e) => setEditForm({ ...editForm, need_type: e.target.value })}
                              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Message */}
                    <div>
                      <h4 className="text-sm text-slate-900 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-cyan-600" />
                        Message
                      </h4>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <Textarea
                          placeholder="Contexte, demande spécifique, informations complémentaires..."
                          value={editForm.message}
                          onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all text-sm min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer fixe */}
                <div className="p-6 border-t border-slate-200 bg-slate-50 flex-shrink-0">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowEditModal(false)}
                      disabled={isUpdatingInfo}
                    >
                      Annuler
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md"
                      onClick={handleUpdateInfo}
                      disabled={isUpdatingInfo || !editForm.email}
                    >
                      {isUpdatingInfo ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Mise à jour...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}