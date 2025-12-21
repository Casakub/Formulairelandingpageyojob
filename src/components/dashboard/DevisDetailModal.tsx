import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Calendar,
  Users,
  Euro,
  Clock,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Globe,
  Award,
  Languages,
  Home,
  Car,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface DevisDetailModalProps {
  devisId: string;
  onClose: () => void;
}

interface Devis {
  id: string;
  numero: string;
  statut: string;
  createdAt: string;
  updatedAt: string;
  entreprise: {
    raisonSociale: string;
    formeJuridique?: string;
    siret: string;
    adresse: string;
    ville: string;
    codePostal: string;
    region: string;
    pays?: string;
    secteurActivite?: string;
    effectifs?: string;
    numeroTVA?: string;
    codeAPE?: string;
    tvaIntracommunautaire?: string;
    siteInternet?: string;
  };
  contact: {
    civilite?: string;
    nom: string;
    prenom: string;
    email: string;
    telephoneFixe?: string;
    telephonePortable?: string;
    fonction?: string;
  };
  postes: Array<{
    id: string;
    secteur: string;
    convention: string;
    nationalite: string;
    poste: string;
    classification: string;
    quantite: number;
    salaireBrut: number;
    tauxHoraireBrut: number;
    tauxETT: number;
    coeffBase: number;
    facteurPays: number;
    coeffFinal: number;
    labelPays: string;
  }>;
  conditions?: {
    dateDebut: string;
    dateFin: string;
    periodeEssai: string;
    baseHoraire: number;
    lieuxMission: string;
    motifRecours: string;
    delaiPaiement: string;
    hebergement?: {
      chargeEU: boolean;
      commentaire: string;
    };
    transportLocal?: {
      chargeETT: boolean;
    };
    repas?: {
      type: 'restaurant' | 'panier' | 'non-concerne';
      montant?: number;
    };
  };
  candidats?: {
    experience?: {
      obligatoire: boolean;
      annees?: number;
    };
    formation?: {
      obligatoire: boolean;
      type?: string;
    };
    travailRisque?: {
      active: boolean;
      precisions?: string;
    };
    langues?: Record<string, string>;
    permis?: {
      requis: boolean;
      categorie?: string;
    };
    outillage?: {
      requis: boolean;
      type?: string;
    };
    epis?: string[];
  };
  recapitulatif?: {
    totalPostes: number;
    totalCandidats: number;
    budgetEstime?: number;
    commentaires?: string;
  };
}

export function DevisDetailModal({ devisId, onClose }: DevisDetailModalProps) {
  const [devis, setDevis] = useState<Devis | null>(null);
  const [loading, setLoading] = useState(true);
  const [sectionsOuvertes, setSectionsOuvertes] = useState({
    entreprise: true,
    contact: true,
    postes: true,
    conditions: false,
    candidats: false,
    recapitulatif: true
  });

  useEffect(() => {
    chargerDevis();
  }, [devisId]);

  // Fonction utilitaire pour extraire le texte d'une valeur qui peut être string ou objet de traduction
  const getTextValue = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      // Si c'est un objet de traduction, on prend la valeur française en priorité
      return value.Français || value.fr || value.French || Object.values(value)[0] || '';
    }
    return String(value);
  };

  const chargerDevis = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/${devisId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await res.json();
      if (data.success) {
        setDevis(data.data);
      }
    } catch (error) {
      console.error('Erreur chargement devis:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: keyof typeof sectionsOuvertes) => {
    setSectionsOuvertes(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatutBadge = (statut: string) => {
    const badges = {
      'nouveau': { bg: '#fef3c7', text: '#b45309', label: 'Nouveau' },
      'enCours': { bg: '#dbeafe', text: '#1d4ed8', label: 'En cours' },
      'devisEnvoye': { bg: '#ede9fe', text: '#6d28d9', label: 'Devis envoyé' },
      'converti': { bg: '#d1fae5', text: '#047857', label: 'Converti' },
      'perdu': { bg: '#fee2e2', text: '#b91c1c', label: 'Perdu' }
    };
    return badges[statut as keyof typeof badges] || badges.nouveau;
  };

  const calculerCoutPoste = (poste: any, conditions: any) => {
    // baseHoraire contient directement les heures/mois (ex: 151,67h/mois)
    const heuresMois = conditions?.baseHoraire || 151.67;
    const salaireBrut = poste.salaireBrut || 0;
    const panierRepas = conditions?.repas?.montant || 0;
    
    const coutSalarial = salaireBrut; 
    const coutRepas = panierRepas * 22; // 22 jours/mois
    const coutTotal = coutSalarial + coutRepas;
    
    return {
      heuresMois,
      coutSalarial,
      coutRepas,
      coutTotal
    };
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white">
          <CardContent className="p-12 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-600">Chargement des détails...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!devis) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-slate-600">Erreur de chargement</p>
            <Button onClick={onClose} className="mt-4">Fermer</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const badge = getStatutBadge(devis.statut);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-6xl my-8"
        >
          <Card className="bg-white shadow-2xl">
            {/* Header */}
            <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-6 h-6 text-cyan-600" />
                    <CardTitle className="text-slate-900">{devis.numero}</CardTitle>
                    <Badge 
                      style={{ 
                        backgroundColor: badge.bg,
                        color: badge.text,
                        border: 'none'
                      }}
                      className="px-3 py-1"
                    >
                      {badge.label}
                    </Badge>
                  </div>
                  <p className="text-slate-600">
                    Créé le {new Date(devis.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {/* TODO: Export PDF */}}
                    className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Section Entreprise */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('entreprise')}
                  className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-900">Informations entreprise</span>
                  </div>
                  {sectionsOuvertes.entreprise ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                
                {sectionsOuvertes.entreprise && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-6 bg-white"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-slate-900 mb-4">Identité</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-slate-500 text-sm">Raison sociale</p>
                            <p className="text-slate-900">{devis.entreprise.raisonSociale}</p>
                          </div>
                          {devis.entreprise.formeJuridique && (
                            <div>
                              <p className="text-slate-500 text-sm">Forme juridique</p>
                              <p className="text-slate-900">{devis.entreprise.formeJuridique}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-slate-500 text-sm">SIRET</p>
                            <p className="text-slate-900 font-mono">{devis.entreprise.siret}</p>
                          </div>
                          {devis.entreprise.numeroTVA && (
                            <div>
                              <p className="text-slate-500 text-sm">N° TVA</p>
                              <p className="text-slate-900 font-mono">{devis.entreprise.numeroTVA}</p>
                            </div>
                          )}
                          {devis.entreprise.codeAPE && (
                            <div>
                              <p className="text-slate-500 text-sm">Code APE</p>
                              <p className="text-slate-900 font-mono">{devis.entreprise.codeAPE}</p>
                            </div>
                          )}
                          {devis.entreprise.tvaIntracommunautaire && (
                            <div>
                              <p className="text-slate-500 text-sm">TVA intracommunautaire</p>
                              <p className="text-slate-900 font-mono">{devis.entreprise.tvaIntracommunautaire}</p>
                            </div>
                          )}
                          {devis.entreprise.siteInternet && (
                            <div>
                              <p className="text-slate-500 text-sm">Site internet</p>
                              <a href={devis.entreprise.siteInternet} className="text-cyan-600 hover:underline">
                                {devis.entreprise.siteInternet}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-slate-900 mb-4">Coordonnées</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-slate-900">{devis.entreprise.adresse}</p>
                              <p className="text-slate-900">
                                {devis.entreprise.codePostal} {devis.entreprise.ville}
                              </p>
                              <p className="text-slate-600">{devis.entreprise.region}, {devis.entreprise.pays}</p>
                            </div>
                          </div>
                          {devis.entreprise.secteurActivite && (
                            <div>
                              <p className="text-slate-500 text-sm">Secteur d'activité</p>
                              <p className="text-slate-900">{devis.entreprise.secteurActivite}</p>
                            </div>
                          )}
                          {devis.entreprise.effectifs && (
                            <div>
                              <p className="text-slate-500 text-sm">Effectifs</p>
                              <p className="text-slate-900">{devis.entreprise.effectifs}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Section Contact */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('contact')}
                  className="w-full p-4 bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-900">Personne de contact</span>
                  </div>
                  {sectionsOuvertes.contact ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                
                {sectionsOuvertes.contact && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-6 bg-white"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-slate-900 mb-4">Identité</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-slate-500 text-sm">Nom complet</p>
                            <p className="text-slate-900">
                              {devis.contact.civilite} {devis.contact.prenom} {devis.contact.nom}
                            </p>
                          </div>
                          {devis.contact.fonction && (
                            <div>
                              <p className="text-slate-500 text-sm">Fonction</p>
                              <p className="text-slate-900">{devis.contact.fonction}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-slate-900 mb-4">Contact</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-cyan-500" />
                            <a href={`mailto:${devis.contact.email}`} className="text-cyan-600 hover:underline">
                              {devis.contact.email}
                            </a>
                          </div>
                          {devis.contact.telephonePortable && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-green-500" />
                              <a href={`tel:${devis.contact.telephonePortable}`} className="text-slate-900">
                                {devis.contact.telephonePortable}
                              </a>
                            </div>
                          )}
                          {devis.contact.telephoneFixe && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-slate-400" />
                              <a href={`tel:${devis.contact.telephoneFixe}`} className="text-slate-900">
                                {devis.contact.telephoneFixe}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Section Postes */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('postes')}
                  className="w-full p-4 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-900">Postes à pourvoir ({devis.postes.length})</span>
                  </div>
                  {sectionsOuvertes.postes ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                
                {sectionsOuvertes.postes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-6 bg-white space-y-4"
                  >
                    {devis.postes.map((poste, index) => {
                      const calculs = calculerCoutPoste(poste, devis.conditions);
                      
                      return (
                        <Card key={index} className="border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-slate-900 text-lg mb-1">{poste.poste}</h4>
                                <div className="flex items-center gap-3 text-sm">
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                    {getTextValue(poste.secteur)}
                                  </Badge>
                                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                    {getTextValue(poste.classification)}
                                  </Badge>
                                  <span className="text-slate-500">
                                    Quantité: <span className="text-slate-900">{poste.quantite}</span>
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-emerald-600 text-2xl">{calculs.coutTotal.toFixed(2)} €</p>
                                <p className="text-slate-500 text-xs">/ mois / personne</p>
                              </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="grid md:grid-cols-3 gap-6">
                              <div>
                                <h5 className="text-slate-700 text-sm mb-3">💰 Informations salariales</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-slate-500">Salaire brut</span>
                                    <span className="text-slate-900">{(poste.salaireBrut || 0).toFixed(2)} €</span>
                                  </div>
                                  {devis.conditions?.repas?.montant && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-500">Panier repas</span>
                                      <span className="text-slate-900">{devis.conditions.repas.montant.toFixed(2)} €/jour</span>
                                    </div>
                                  )}
                                  {devis.conditions?.baseHoraire && (
                                    <div className="flex justify-between">
                                      <span className="text-slate-500">Heures/mois</span>
                                      <span className="text-slate-900">{calculs.heuresMois.toFixed(2)}h</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h5 className="text-slate-700 text-sm mb-3">📅 Période</h5>
                                <div className="space-y-2 text-sm">
                                  {devis.conditions?.dateDebut && (
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-slate-400" />
                                      <div>
                                        <p className="text-slate-500">Début</p>
                                        <p className="text-slate-900">
                                          {new Date(devis.conditions.dateDebut).toLocaleDateString('fr-FR')}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  {devis.conditions?.dateFin && (
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-slate-400" />
                                      <div>
                                        <p className="text-slate-500">Fin</p>
                                        <p className="text-slate-900">
                                          {new Date(devis.conditions.dateFin).toLocaleDateString('fr-FR')}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h5 className="text-slate-700 text-sm mb-3">🌍 Nationalité</h5>
                                <div className="flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-slate-400" />
                                  <span className="text-slate-900">{poste.labelPays || poste.nationalite || 'Non renseignée'}</span>
                                </div>
                                {devis.conditions?.lieuxMission && (
                                  <div className="mt-3">
                                    <p className="text-slate-500 text-xs mb-1">Lieu de mission</p>
                                    <p className="text-slate-900 text-sm">{devis.conditions.lieuxMission}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* Section Conditions (optionnelle) */}
              {devis.conditions && (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('conditions')}
                    className="w-full p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-900">Conditions de travail</span>
                    </div>
                    {sectionsOuvertes.conditions ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  
                  {sectionsOuvertes.conditions && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-6 bg-white"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-slate-500 text-sm">Type de contrat</p>
                            <p className="text-slate-900">{getTextValue(devis.conditions.typeContrat)}</p>
                          </div>
                          {devis.conditions.dureeContrat && (
                            <div>
                              <p className="text-slate-500 text-sm">Durée du contrat</p>
                              <p className="text-slate-900">{getTextValue(devis.conditions.dureeContrat)}</p>
                            </div>
                          )}
                          {devis.conditions.periodeEssai && (
                            <div>
                              <p className="text-slate-500 text-sm">Période d'essai</p>
                              <p className="text-slate-900">{getTextValue(devis.conditions.periodeEssai)}</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          {devis.conditions.lieu && (
                            <div>
                              <p className="text-slate-500 text-sm">Lieu de travail</p>
                              <p className="text-slate-900">{getTextValue(devis.conditions.lieu)}</p>
                            </div>
                          )}
                          {devis.conditions.dateDebutSouhaitee && (
                            <div>
                              <p className="text-slate-500 text-sm">Date de début souhaitée</p>
                              <p className="text-slate-900">
                                {new Date(devis.conditions.dateDebutSouhaitee).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Section Candidats (optionnelle) */}
              {devis.candidats && (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection('candidats')}
                    className="w-full p-4 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-900">Profil des candidats recherchés</span>
                    </div>
                    {sectionsOuvertes.candidats ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  
                  {sectionsOuvertes.candidats && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-6 bg-white space-y-4"
                    >
                      {devis.candidats.experience && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-slate-400" />
                            <p className="text-slate-700">Expérience requise</p>
                          </div>
                          <p className="text-slate-900 pl-6">
                            {devis.candidats.experience.obligatoire ? 'Oui' : 'Non'}
                            {devis.candidats.experience.annees && ` - ${devis.candidats.experience.annees} ans`}
                          </p>
                        </div>
                      )}
                      {devis.candidats.formation && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-slate-400" />
                            <p className="text-slate-700">Formation</p>
                          </div>
                          <p className="text-slate-900 pl-6">
                            {devis.candidats.formation.obligatoire ? 'Obligatoire' : 'Non obligatoire'}
                            {devis.candidats.formation.type && ` - ${getTextValue(devis.candidats.formation.type)}`}
                          </p>
                        </div>
                      )}
                      {devis.candidats.travailRisque && devis.candidats.travailRisque.active && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-orange-500" />
                            <p className="text-slate-700">Travail à risque</p>
                          </div>
                          <p className="text-slate-900 pl-6">
                            {devis.candidats.travailRisque.precisions || 'Oui'}
                          </p>
                        </div>
                      )}
                      {devis.candidats.langues && Object.keys(devis.candidats.langues).length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Languages className="w-4 h-4 text-slate-400" />
                            <p className="text-slate-700">Langues</p>
                          </div>
                          <div className="pl-6 space-y-1">
                            {Object.entries(devis.candidats.langues).map(([langue, niveau]) => (
                              <p key={langue} className="text-slate-900">
                                {getTextValue(langue)} - {getTextValue(niveau)}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                      {devis.candidats.permis && devis.candidats.permis.requis && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Car className="w-4 h-4 text-slate-400" />
                            <p className="text-slate-700">Permis de conduire</p>
                          </div>
                          <p className="text-slate-900 pl-6">
                            Requis{devis.candidats.permis.categorie && ` - Catégorie ${getTextValue(devis.candidats.permis.categorie)}`}
                          </p>
                        </div>
                      )}
                      {devis.candidats.outillage && devis.candidats.outillage.requis && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-slate-400" />
                            <p className="text-slate-700">Outillage</p>
                          </div>
                          <p className="text-slate-900 pl-6">
                            {devis.candidats.outillage.type ? getTextValue(devis.candidats.outillage.type) : 'Requis'}
                          </p>
                        </div>
                      )}
                      {devis.candidats.epis && devis.candidats.epis.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-slate-400" />
                            <p className="text-slate-700">EPIs requis</p>
                          </div>
                          <div className="pl-6 space-y-1">
                            {devis.candidats.epis.map((epi, idx) => (
                              <p key={idx} className="text-slate-900">• {getTextValue(epi)}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Section Récapitulatif */}
              {devis.recapitulatif && (
                <div className="border-2 border-cyan-200 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50">
                  <button
                    onClick={() => toggleSection('recapitulatif')}
                    className="w-full p-4 bg-gradient-to-r from-cyan-100 to-blue-100 hover:from-cyan-200 hover:to-blue-200 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-900">Récapitulatif de la demande</span>
                    </div>
                    {sectionsOuvertes.recapitulatif ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  
                  {sectionsOuvertes.recapitulatif && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-6 bg-white"
                    >
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <Card className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
                          <CardContent className="p-4 text-center">
                            <p className="text-cyan-600 text-3xl mb-1">{devis.recapitulatif.totalPostes}</p>
                            <p className="text-slate-600 text-sm">Poste(s) à pourvoir</p>
                          </CardContent>
                        </Card>
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                          <CardContent className="p-4 text-center">
                            <p className="text-blue-600 text-3xl mb-1">{devis.recapitulatif.totalCandidats}</p>
                            <p className="text-slate-600 text-sm">Candidat(s) recherché(s)</p>
                          </CardContent>
                        </Card>
                        {devis.recapitulatif.budgetEstime && (
                          <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-white">
                            <CardContent className="p-4 text-center">
                              <p className="text-violet-600 text-3xl mb-1">
                                {devis.recapitulatif.budgetEstime.toLocaleString('fr-FR')} €
                              </p>
                              <p className="text-slate-600 text-sm">Budget estimé</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      {devis.recapitulatif.commentaires && (
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <p className="text-slate-700 mb-2">💬 Commentaires</p>
                          <p className="text-slate-900">{devis.recapitulatif.commentaires}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>

            {/* Footer Actions */}
            <div className="border-t border-slate-200 p-6 bg-slate-50 flex items-center justify-between">
              <div className="text-sm text-slate-500">
                Dernière modification: {new Date(devis.updatedAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Fermer
                </Button>
                <Button
                  onClick={() => {/* TODO: Export PDF */}}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}