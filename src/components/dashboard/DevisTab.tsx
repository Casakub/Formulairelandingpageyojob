import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter,
  Eye,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  PenTool,
  Send,
  Link2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { DevisDetailModal } from './DevisDetailModal';
import { toast } from 'sonner';

interface Devis {
  id: string;
  numero: string;
  entreprise: {
    raisonSociale: string;
    ville: string;
    region: string;
  };
  contact: {
    nom: string;
    prenom: string;
    email: string;
    telephonePortable: string;
  };
  postes: Array<{
    secteur: string;
    poste: string;
    quantite: number;
    classification: string;
  }>;
  statut: string;
  createdAt: string;
  updatedAt: string;
  signatureToken?: string;
  signatureLinkGeneratedAt?: string;
}

interface DevisStats {
  total: number;
  nouveau: number;
  enCours: number;
  devisEnvoye: number;
  signe: number;
  converti: number;
  perdu: number;
}

export function DevisTab() {
  const [demandes, setDemandes] = useState<Devis[]>([]);
  const [filtrees, setFiltrees] = useState<Devis[]>([]);
  const [stats, setStats] = useState<DevisStats>({
    total: 0,
    nouveau: 0,
    enCours: 0,
    devisEnvoye: 0,
    signe: 0,
    converti: 0,
    perdu: 0
  });
  const [loading, setLoading] = useState(true);
  const [recherche, setRecherche] = useState('');
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [devisDetailId, setDevisDetailId] = useState<string | null>(null);
  const [carteActive, setCarteActive] = useState<string | null>(null);

  useEffect(() => {
    chargerDonnees();
  }, []);

  useEffect(() => {
    filtrerDemandes();
  }, [recherche, filtreStatut, demandes]);

  const chargerDonnees = async () => {
    try {
      setLoading(true);
      
      // Charger les stats
      const statsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/api/stats`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Charger les devis
      const devisRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const devisData = await devisRes.json();
      if (devisData.success) {
        setDemandes(devisData.data);
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtrerDemandes = () => {
    let resultat = demandes;

    // Filtre par recherche
    if (recherche) {
      const searchLower = recherche.toLowerCase();
      resultat = resultat.filter(d => 
        d.entreprise.raisonSociale.toLowerCase().includes(searchLower) ||
        d.numero.toLowerCase().includes(searchLower) ||
        d.contact.email.toLowerCase().includes(searchLower) ||
        d.entreprise.ville.toLowerCase().includes(searchLower)
      );
    }

    // Filtre par statut
    if (filtreStatut !== 'tous') {
      resultat = resultat.filter(d => d.statut === filtreStatut);
    }

    setFiltrees(resultat);
  };

  const changerStatut = async (id: string, nouveauStatut: string) => {
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ statut: nouveauStatut })
        }
      );
      
      if (res.ok) {
        chargerDonnees();
      }
    } catch (error) {
      console.error('Erreur changement statut:', error);
    }
  };

  // 🆕 Fonction pour générer et envoyer le lien de signature
  const envoyerLienSignature = async (devisId: string, email: string, numero: string) => {
    try {
      toast.info('Génération du lien de signature...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/generer-lien-signature`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ devisId })
        }
      );

      const data = await response.json();

      if (data.success) {
        // Copier le lien dans le presse-papier
        await navigator.clipboard.writeText(data.signatureUrl);
        
        toast.success(
          `✅ Lien de signature généré et copié !`,
          {
            description: `Le lien a été copié dans votre presse-papier. Vous pouvez l'envoyer à ${email}`,
            duration: 5000
          }
        );
        
        // TODO: Envoyer automatiquement par email via workflow
        
        // Recharger les données pour afficher le token
        chargerDonnees();
      } else {
        toast.error(data.error || 'Erreur lors de la génération du lien');
      }
    } catch (error) {
      console.error('Erreur génération lien:', error);
      toast.error('Impossible de générer le lien de signature');
    }
  };

  // Fonction pour mapper les titres des cartes vers les statuts de filtrage
  const handleCardClick = (titre: string) => {
    const mapTitreToStatut: Record<string, string> = {
      'Total': 'tous',
      'Nouveau': 'nouveau',
      'En cours': 'enCours',
      'Devis envoyé': 'devisEnvoye',
      'Signé': 'signe',
      'Converti': 'converti',
      'Perdu': 'perdu'
    };
    
    const statut = mapTitreToStatut[titre] || 'tous';
    setFiltreStatut(statut);
    setCarteActive(titre);
  };

  const getStatutBadge = (statut: string) => {
    const badges = {
      'nouveau': { bg: '#fef3c7', text: '#b45309', label: 'Nouveau' },
      'enCours': { bg: '#dbeafe', text: '#1d4ed8', label: 'En cours' },
      'devisEnvoye': { bg: '#ede9fe', text: '#6d28d9', label: 'Devis envoyé' },
      'signe': { bg: '#d1fae5', text: '#059669', label: '✍️ Signé' },
      'converti': { bg: '#d1fae5', text: '#047857', label: 'Converti' },
      'perdu': { bg: '#fee2e2', text: '#b91c1c', label: 'Perdu' }
    };
    return badges[statut as keyof typeof badges] || badges.nouveau;
  };

  const cardsStats = [
    {
      titre: 'Total',
      valeur: stats.total,
      icone: FileText,
      couleur: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      titre: 'Nouveau',
      valeur: stats.nouveau,
      icone: Clock,
      couleur: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      titre: 'En cours',
      valeur: stats.enCours,
      icone: TrendingUp,
      couleur: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600'
    },
    {
      titre: 'Devis envoyé',
      valeur: stats.devisEnvoye,
      icone: CheckCircle,
      couleur: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600'
    },
    {
      titre: 'Signé',
      valeur: stats.signe,
      icone: PenTool,
      couleur: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      titre: 'Converti',
      valeur: stats.converti,
      icone: CheckCircle,
      couleur: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      titre: 'Perdu',
      valeur: stats.perdu,
      icone: AlertCircle,
      couleur: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
        {cardsStats.map((card, index) => {
          const Icone = card.icone;
          const estActive = carteActive === card.titre;
          return (
            <motion.div
              key={card.titre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCardClick(card.titre)}
            >
              <Card className={`
                border-2 cursor-pointer transition-all duration-300
                ${estActive 
                  ? `border-${card.textColor.replace('text-', '')} shadow-xl scale-105` 
                  : 'border-slate-200 hover:border-slate-300'
                }
                ${card.bgColor}/50 backdrop-blur-sm hover:shadow-lg
              `}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${card.couleur} ${estActive ? 'shadow-lg' : ''}`}>
                      <Icone className="w-4 h-4 text-white" />
                    </div>
                    <p className={`text-2xl ${card.textColor}`}>{card.valeur}</p>
                  </div>
                  <p className="text-slate-600 text-sm">{card.titre}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filtres */}
      <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  placeholder="Rechercher par entreprise, numéro, email, ville..."
                  className="pl-10 bg-white border-slate-200"
                />
              </div>
            </div>

            {/* Filtre statut */}
            <div>
              <Select value={filtreStatut} onValueChange={setFiltreStatut}>
                <SelectTrigger className="bg-white border-slate-200">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  <SelectItem value="nouveau">Nouveau</SelectItem>
                  <SelectItem value="enCours">En cours</SelectItem>
                  <SelectItem value="devisEnvoye">Devis envoyé</SelectItem>
                  <SelectItem value="converti">Converti</SelectItem>
                  <SelectItem value="perdu">Perdu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des demandes */}
      <div className="space-y-3">
        {filtrees.length === 0 ? (
          <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">
                {recherche || filtreStatut !== 'tous' 
                  ? 'Aucune demande ne correspond à vos critères'
                  : 'Aucune demande de devis pour le moment'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filtrees.map((devis, index) => {
            const badge = getStatutBadge(devis.statut);
            
            return (
              <motion.div
                key={devis.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="border-slate-200 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all hover:border-cyan-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Informations principales */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-slate-900">{devis.numero}</span>
                              <Badge 
                                style={{ 
                                  backgroundColor: badge.bg,
                                  color: badge.text,
                                  border: 'none'
                                }}
                                className="text-xs px-2 py-0.5"
                              >
                                {badge.label}
                              </Badge>
                            </div>
                            <p className="text-slate-900 text-lg">{devis.entreprise.raisonSociale}</p>
                            <p className="text-slate-500 text-sm">
                              {devis.entreprise.ville} • {devis.entreprise.region}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-slate-700 text-sm">
                              {devis.contact.prenom} {devis.contact.nom}
                            </p>
                            <p className="text-slate-500 text-xs">{devis.contact.email}</p>
                            {devis.contact.telephonePortable && (
                              <p className="text-slate-500 text-xs">{devis.contact.telephonePortable}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-slate-500">Postes : </span>
                            <span className="text-slate-700">{devis.postes.length}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Secteur : </span>
                            <span className="text-slate-700">{devis.postes[0]?.secteur || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Quantité : </span>
                            <span className="text-slate-700">
                              {devis.postes.reduce((sum, p) => sum + p.quantite, 0)} personne(s)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>
                            Créé le {new Date(devis.createdAt).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                          {devis.updatedAt !== devis.createdAt && (
                            <span>
                              • Modifié le {new Date(devis.updatedAt).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: 'short'
                              })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => setDevisDetailId(devis.id)}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                          size="sm"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Détail
                        </Button>

                        <Select 
                          value={devis.statut} 
                          onValueChange={(value) => changerStatut(devis.id, value)}
                        >
                          <SelectTrigger className="bg-white border-slate-200 text-xs h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-200">
                            <SelectItem value="nouveau" className="text-xs">Nouveau</SelectItem>
                            <SelectItem value="enCours" className="text-xs">En cours</SelectItem>
                            <SelectItem value="devisEnvoye" className="text-xs">Devis envoyé</SelectItem>
                            <SelectItem value="converti" className="text-xs">Converti</SelectItem>
                            <SelectItem value="perdu" className="text-xs">Perdu</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* 🆕 Bouton pour générer et envoyer le lien de signature */}
                        {devis.statut === 'devisEnvoye' && !devis.signatureToken && (
                          <Button
                            onClick={() => envoyerLienSignature(devis.id, devis.contact.email, devis.numero)}
                            className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white"
                            size="sm"
                          >
                            <Link2 className="w-4 h-4 mr-2" />
                            Générer lien signature
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Modal détail devis */}
      {devisDetailId && (
        <DevisDetailModal
          devisId={devisDetailId}
          onClose={() => setDevisDetailId(null)}
        />
      )}
    </div>
  );
}