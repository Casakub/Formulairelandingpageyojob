import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Video,
  Mail,
  Users,
  Briefcase,
  FileText,
  Save,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  MessageSquare,
  Building2,
  Globe,
  Tag,
  Sparkles,
  Eye,
  Type,
  AlignLeft,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Event {
  id: string;
  prospect_id: string;
  event_type: 'call' | 'meeting' | 'email' | 'demo' | 'proposal' | 'follow-up';
  title: string;
  description: string | null;
  start_datetime: string;
  end_datetime: string;
  location: string | null;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  created_by: string | null;
  created_at: string;
}

interface Prospect {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  country: string;
  status: string;
}

interface EventDetailsModalProps {
  event: Event | null;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}

const EVENT_TYPES = {
  call: { label: 'Appel téléphonique', icon: Phone, gradient: 'from-blue-600 to-cyan-500' },
  meeting: { label: 'Réunion', icon: Users, gradient: 'from-violet-600 to-purple-500' },
  email: { label: 'Email', icon: Mail, gradient: 'from-cyan-600 to-teal-500' },
  demo: { label: 'Démonstration', icon: Video, gradient: 'from-orange-600 to-amber-500' },
  proposal: { label: 'Proposition commerciale', icon: FileText, gradient: 'from-green-600 to-emerald-500' },
  'follow-up': { label: 'Suivi client', icon: Briefcase, gradient: 'from-slate-600 to-gray-500' },
};

const STATUS_CONFIG = {
  scheduled: { label: 'Planifié', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  completed: { label: 'Terminé', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
  'no-show': { label: 'Prospect absent', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertTriangle },
};

export function EventDetailsModal({ event, onClose, onUpdate, onDelete }: EventDetailsModalProps) {
  const [prospect, setProspect] = useState<Prospect | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProspect, setIsLoadingProspect] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    event_type: 'call' as Event['event_type'],
    status: 'scheduled' as Event['status'],
  });

  const [noteText, setNoteText] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 400)}px`;
    }
  }, [noteText]);

  // Charger les données du prospect
  useEffect(() => {
    if (event) {
      loadProspect(event.prospect_id);
      setFormData({
        title: event.title,
        description: event.description || '',
        start_datetime: new Date(event.start_datetime).toISOString().slice(0, 16),
        end_datetime: new Date(event.end_datetime).toISOString().slice(0, 16),
        location: event.location || '',
        event_type: event.event_type,
        status: event.status,
      });
    }
  }, [event]);

  const loadProspect = async (prospectId: string) => {
    setIsLoadingProspect(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${prospectId}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setProspect(data.prospect);
      }
    } catch (error) {
      console.error('Erreur chargement prospect:', error);
    } finally {
      setIsLoadingProspect(false);
    }
  };

  const handleSave = async () => {
    if (!event) return;

    setIsSaving(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events/${event.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        onUpdate();
      }
    } catch (error) {
      console.error('Erreur mise à jour événement:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNote = async () => {
    if (!event || !noteText.trim()) return;

    setIsSavingNote(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/prospects/${event.prospect_id}/actions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action_type: 'note',
            action_label: `Note ajoutée depuis l'événement : ${event.title}`,
            action_description: noteText,
            user_name: 'Admin',
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setNoteText('');
        // Toast de succès
        const successToast = document.createElement('div');
        successToast.className = 'fixed top-4 right-4 z-[100] bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2';
        successToast.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Note ajoutée à l'historique du prospect !</span>
        `;
        document.body.appendChild(successToast);
        setTimeout(() => {
          successToast.remove();
        }, 3000);
      }
    } catch (error) {
      console.error('Erreur ajout note:', error);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleStatusChange = async (newStatus: Event['status']) => {
    if (!event) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events/${event.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      if (data.success) {
        onUpdate();
      }
    } catch (error) {
      console.error('Erreur changement statut:', error);
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/events/${event.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        onDelete(event.id);
        onClose();
      }
    } catch (error) {
      console.error('Erreur suppression événement:', error);
    }
  };

  const navigateToProspect = () => {
    if (!event) return;
    
    console.log('🔍 Navigation vers prospect:', event.prospect_id);
    
    // Fermer la modale immédiatement
    onClose();
    
    // Attendre que la modale soit fermée, puis naviguer
    setTimeout(() => {
      // Trouver et cliquer sur l'onglet Prospects
      const prospectsTab = document.querySelector('[data-tab="prospects"]') as HTMLElement;
      if (prospectsTab) {
        console.log('✅ Onglet Prospects trouvé, clic...');
        prospectsTab.click();
        
        // Attendre que l'onglet se charge, puis trouver et cliquer sur le prospect
        setTimeout(() => {
          // Chercher la ligne du prospect par son ID
          let prospectRow = document.querySelector(`[data-prospect-id="${event.prospect_id}"]`) as HTMLElement;
          
          if (prospectRow) {
            console.log('✅ Prospect trouvé dans la liste, ouverture de la fiche...');
            prospectRow.click();
            prospectRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            console.warn('⚠️ Prospect non trouvé dans la liste (peut-être sur une autre page ou filtré).');
            console.log('📋 Recherche dans toute la page...');
            
            // Fallback : réessayer après un délai supplémentaire au cas où le chargement prend du temps
            setTimeout(() => {
              prospectRow = document.querySelector(`[data-prospect-id="${event.prospect_id}"]`) as HTMLElement;
              
              if (prospectRow) {
                console.log('✅ Prospect trouvé après rechargement, ouverture...');
                prospectRow.click();
                prospectRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                console.error('❌ Prospect introuvable. Il peut être sur une autre page, filtré, ou archivé.');
                console.log('💡 Astuce : Vérifiez les filtres actifs dans l\'onglet Prospects.');
                
                // Afficher un message utilisateur amical
                alert(`Le prospect lié à cet événement n'est pas visible dans la liste actuelle. Il peut être filtré, archivé, ou sur une autre page. Essayez de modifier les filtres ou la recherche.`);
              }
            }, 1000); // Deuxième tentative après 1s
          }
        }, 800); // Premier essai après 800ms
      } else {
        console.error('❌ Onglet Prospects introuvable');
      }
    }, 100);
  };

  if (!event) return null;

  const eventType = EVENT_TYPES[event.event_type];
  const Icon = eventType.icon;
  const statusConfig = STATUS_CONFIG[event.status];
  const StatusIcon = statusConfig.icon;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const charCount = noteText.length;
  const charMax = 5000;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900/80 via-violet-900/50 to-cyan-900/50 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-slate-200/50"
        >
          {/* Header avec gradient YoJob */}
          <div className={`bg-gradient-to-r ${eventType.gradient} text-white p-8 relative overflow-hidden`}>
            {/* Effet glassmorphism décoratif */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-5">
                  {/* Icône avec animation */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  <div className="flex-1">
                    <Badge className="bg-white/25 backdrop-blur-sm text-white border-white/40 mb-3 shadow-lg">
                      <Tag className="w-3 h-3 mr-1.5" />
                      {eventType.label}
                    </Badge>
                    {isEditing ? (
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="text-white bg-white/10 border-white/30 placeholder:text-white/60 backdrop-blur-sm"
                        placeholder="Titre de l'événement"
                      />
                    ) : (
                      <h2 className="text-white mt-2 drop-shadow-lg">{event.title}</h2>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-white hover:bg-white/20 backdrop-blur-sm"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-white hover:bg-white/20 backdrop-blur-sm"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Statut et actions rapides */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className={`${statusConfig.color} shadow-md border`}>
                  <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
                  {statusConfig.label}
                </Badge>
                {event.status === 'scheduled' && (
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange('completed')}
                        className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30"
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        Marquer terminé
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange('cancelled')}
                        className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30"
                      >
                        <XCircle className="w-3.5 h-3.5 mr-1.5" />
                        Annuler
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Body - 3 colonnes responsive */}
          <div className="p-8 overflow-y-auto max-h-[calc(92vh-280px)] bg-gradient-to-br from-slate-50 to-white">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Colonne 1 : Détails de l'événement */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Card Détails */}
                <Card className="border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-5 border-b border-slate-200">
                    <h3 className="text-slate-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-violet-600" />
                      Détails de l'événement
                    </h3>
                  </div>
                  <div className="p-6 space-y-5">
                    {/* Date et heure de début */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                      <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 mb-1.5">Date et heure de début</p>
                        {isEditing ? (
                          <Input
                            type="datetime-local"
                            value={formData.start_datetime}
                            onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
                            className="bg-white"
                          />
                        ) : (
                          <p className="text-slate-900">{formatDateTime(event.start_datetime)}</p>
                        )}
                      </div>
                    </div>

                    {/* Date et heure de fin */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
                      <div className="p-2 bg-violet-500 rounded-lg shadow-md">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 mb-1.5">Date et heure de fin</p>
                        {isEditing ? (
                          <Input
                            type="datetime-local"
                            value={formData.end_datetime}
                            onChange={(e) => setFormData({ ...formData, end_datetime: e.target.value })}
                            className="bg-white"
                          />
                        ) : (
                          <p className="text-slate-900">{formatDateTime(event.end_datetime)}</p>
                        )}
                      </div>
                    </div>

                    {/* Lieu */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-100">
                      <div className="p-2 bg-cyan-500 rounded-lg shadow-md">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 mb-1.5">Lieu / Lien de visio</p>
                        {isEditing ? (
                          <Input
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Adresse, URL de visioconférence..."
                            className="bg-white"
                          />
                        ) : (
                          <p className="text-slate-900">{event.location || 'Non spécifié'}</p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <AlignLeft className="w-4 h-4 text-slate-600" />
                        <p className="text-sm text-slate-600">Description</p>
                      </div>
                      {isEditing ? (
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Détails de l'événement, objectifs, participants..."
                          rows={5}
                          className="bg-white"
                        />
                      ) : (
                        <p className="text-slate-900 whitespace-pre-wrap leading-relaxed">
                          {event.description || 'Aucune description'}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 p-6 bg-gradient-to-r from-slate-50 to-gray-50 border-t border-slate-200">
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Annuler
                      </Button>
                    </div>
                  )}
                </Card>

                {/* Card Compte-rendu enrichi */}
                <Card className="border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50 backdrop-blur-sm shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-5 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Compte-rendu détaillé
                      </h3>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/40">
                        {charCount} / {charMax} caractères
                      </Badge>
                    </div>
                    <p className="text-white/80 text-sm mt-2">
                      Ajoutez vos notes, points clés, et prochaines actions. Cette note sera enregistrée dans l'historique du prospect.
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Textarea auto-resize avec style amélioré */}
                    <div className="relative">
                      <Textarea
                        ref={textareaRef}
                        value={noteText}
                        onChange={(e) => {
                          if (e.target.value.length <= charMax) {
                            setNoteText(e.target.value);
                          }
                        }}
                        placeholder="📝 Écrivez votre compte-rendu ici...&#10;&#10;Exemples :&#10;• Points clés discutés&#10;• Besoins identifiés&#10;• Prochaines actions&#10;• Objections et réponses&#10;• Engagement du prospect"
                        className="min-h-[180px] max-h-[400px] resize-none bg-white border-2 border-slate-200 focus:border-green-400 rounded-xl p-4 leading-relaxed transition-all"
                        style={{
                          fontSize: '15px',
                          lineHeight: '1.7',
                        }}
                      />
                      
                      {/* Compteur de caractères visuel */}
                      <div className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded-lg ${
                        charCount > charMax * 0.9 
                          ? 'bg-red-100 text-red-700' 
                          : charCount > charMax * 0.7 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {charCount} / {charMax}
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleAddNote}
                        disabled={isSavingNote || !noteText.trim()}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg disabled:opacity-50"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSavingNote ? 'Enregistrement en cours...' : 'Enregistrer dans l\'historique prospect'}
                      </Button>
                    </div>

                    {/* Aide contextuelle */}
                    {noteText.length === 0 && (
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <Type className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 text-sm text-slate-700">
                            <p className="mb-2">💡 <strong>Conseils pour un bon compte-rendu :</strong></p>
                            <ul className="space-y-1 text-slate-600">
                              <li>✅ Résumez les points clés de l'échange</li>
                              <li>✅ Notez les besoins et objections du prospect</li>
                              <li>✅ Définissez les prochaines actions à effectuer</li>
                              <li>✅ Mentionnez l'engagement et l'intérêt du prospect</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Colonne 2 : Prospect & Actions */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Card Prospect */}
                <Card className="border-violet-200 bg-gradient-to-br from-violet-50/50 to-purple-50/50 backdrop-blur-sm shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-5 text-white">
                    <h3 className="text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Prospect associé
                    </h3>
                  </div>

                  {isLoadingProspect ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full mx-auto" />
                      <p className="text-slate-400 text-sm mt-3">Chargement...</p>
                    </div>
                  ) : prospect ? (
                    <div className="p-6 space-y-4">
                      <div className="p-4 rounded-xl bg-white border border-slate-200">
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> Entreprise
                        </p>
                        <p className="text-slate-900">{prospect.company_name}</p>
                      </div>
                      
                      {prospect.contact_name && (
                        <div className="p-4 rounded-xl bg-white border border-slate-200">
                          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <User className="w-3 h-3" /> Contact
                          </p>
                          <p className="text-slate-900">{prospect.contact_name}</p>
                        </div>
                      )}
                      
                      {prospect.contact_email && (
                        <div className="p-4 rounded-xl bg-white border border-slate-200">
                          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> Email
                          </p>
                          <a href={`mailto:${prospect.contact_email}`} className="text-violet-600 hover:text-violet-700 text-sm break-all">
                            {prospect.contact_email}
                          </a>
                        </div>
                      )}
                      
                      {prospect.contact_phone && (
                        <div className="p-4 rounded-xl bg-white border border-slate-200">
                          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> Téléphone
                          </p>
                          <a href={`tel:${prospect.contact_phone}`} className="text-violet-600 hover:text-violet-700">
                            {prospect.contact_phone}
                          </a>
                        </div>
                      )}
                      
                      <div className="p-4 rounded-xl bg-white border border-slate-200">
                        <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                          <Globe className="w-3 h-3" /> Pays
                        </p>
                        <p className="text-slate-900">{prospect.country}</p>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-white border border-slate-200">
                        <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                          <Tag className="w-3 h-3" /> Statut
                        </p>
                        <Badge variant="outline" className="border-violet-200 text-violet-700">
                          {prospect.status}
                        </Badge>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={navigateToProspect}
                          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Voir la fiche complète
                        </Button>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                      <p className="text-slate-600">Prospect introuvable</p>
                    </div>
                  )}
                </Card>

                {/* Zone de danger */}
                <Card className="border-red-300 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white">
                    <h3 className="text-white flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      Zone de danger
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-slate-600 mb-4">
                      Cette action est irréversible. L'événement sera définitivement supprimé.
                    </p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        onClick={handleDelete}
                        className="w-full text-red-600 border-red-300 hover:bg-red-100 hover:border-red-400"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer définitivement
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}