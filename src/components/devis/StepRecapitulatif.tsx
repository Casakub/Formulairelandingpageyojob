import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useState } from 'react';
import { ArrowRight, Download, CheckCircle, Building2, User, Briefcase, FileText } from 'lucide-react';
import { DevisFormData } from '../../DemandeDevis';
import { calculerRecapitulatif, formaterMontant } from '../../utils/devis-calculations';

interface StepRecapitulatifProps {
  formData: DevisFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function StepRecapitulatif({ formData, onSubmit, isSubmitting }: StepRecapitulatifProps) {
  const [accepteConditions, setAccepteConditions] = useState(false);

  // Calculer le récapitulatif complet
  const postesAvecDetails = formData.postes.map(poste => ({
    ...poste,
    secteur: poste.secteur,
    poste: poste.poste,
    classification: poste.classification,
    quantite: poste.quantite,
    salaireBrut: poste.salaireBrut,
    baseHoraire: formData.conditions.baseHoraire,
    hebergementEU: formData.conditions.hebergement.chargeEU,
    transportETT: formData.conditions.transportLocal.chargeETT,
    panierRepas: formData.conditions.repas.type === 'panier',
    region: formData.entreprise.region
  }));

  const recap = calculerRecapitulatif(
    postesAvecDetails,
    formData.conditions.dateDebut,
    formData.conditions.dateFin
  );

  const handleSubmit = () => {
    if (!accepteConditions) {
      alert('Veuillez accepter les conditions avant de continuer');
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">Récapitulatif de votre demande</h2>
        <p className="text-white/70">
          Vérifiez les informations avant d'envoyer votre demande de devis.
        </p>
      </div>

      {/* Informations Entreprise */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            Entreprise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">Raison sociale</p>
              <p className="text-white">{formData.entreprise.raisonSociale}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">SIRET</p>
              <p className="text-white">{formData.entreprise.siret}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Ville</p>
              <p className="text-white">{formData.entreprise.ville}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Région</p>
              <p className="text-white">{formData.entreprise.region}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">Nom et prénom</p>
              <p className="text-white">{formData.contact.prenom} {formData.contact.nom}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Email</p>
              <p className="text-white">{formData.contact.email}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Téléphone</p>
              <p className="text-white">{formData.contact.telephonePortable}</p>
            </div>
            {formData.contact.fonction && (
              <div>
                <p className="text-white/60 text-sm">Fonction</p>
                <p className="text-white">{formData.contact.fonction}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Postes demandés */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-violet-400" />
            Postes demandés ({formData.postes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recap.postes.map((poste, index) => (
            <div key={index} className="border border-white/10 rounded-lg p-4 bg-white/5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{poste.poste}</h4>
                  <p className="text-white/60 text-sm">{poste.secteur} • {poste.classification}</p>
                </div>
                <span className="bg-cyan-500/20 text-cyan-200 px-3 py-1 rounded-full text-sm">
                  × {poste.quantite}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Taux horaire brut</p>
                  <p className="text-white font-medium">{formaterMontant(poste.tauxHoraireBrut)}/h</p>
                </div>
                <div>
                  <p className="text-white/60">Taux ETT</p>
                  <p className="text-white font-medium">{formaterMontant(poste.tauxETTFinal)}/h</p>
                </div>
                <div>
                  <p className="text-white/60">Coût mensuel</p>
                  <p className="text-green-400 font-medium">{formaterMontant(poste.coutMensuel)}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Conditions de mission */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-400" />
            Conditions de mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-sm">Date de début</p>
              <p className="text-white">{new Date(formData.conditions.dateDebut).toLocaleDateString('fr-FR')}</p>
            </div>
            {formData.conditions.dateFin && (
              <div>
                <p className="text-white/60 text-sm">Date de fin</p>
                <p className="text-white">{new Date(formData.conditions.dateFin).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
            <div>
              <p className="text-white/60 text-sm">Durée estimée</p>
              <p className="text-white">{recap.dureeMission} mois</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Lieu de mission</p>
              <p className="text-white">{formData.conditions.lieuxMission}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Estimation */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-green-500/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-white">Total mensuel HT</span>
              <span className="text-white font-medium">{formaterMontant(recap.totalHT)}</span>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span className="text-white">Total mensuel TTC</span>
              <span className="text-white font-medium">{formaterMontant(recap.totalTTC)}</span>
            </div>
            <div className="h-px bg-white/20 my-4"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Coût total mission</p>
                <p className="text-white/60 text-xs">({recap.dureeMission} mois)</p>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                {formaterMontant(recap.totalMission)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note légale */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-yellow-200 text-sm">
          ℹ️ Cette estimation est donnée à titre indicatif. Le tarif définitif sera confirmé après validation par notre équipe et l'ETT partenaire sélectionnée.
        </p>
      </div>

      {/* Acceptation des conditions */}
      <div className="flex items-start space-x-2 border border-white/10 rounded-lg p-4 bg-white/5">
        <Checkbox
          id="conditions"
          checked={accepteConditions}
          onCheckedChange={(checked) => setAccepteConditions(checked as boolean)}
          className="mt-1 border-white/20"
        />
        <div className="flex-1">
          <Label htmlFor="conditions" className="text-white cursor-pointer">
            J'accepte que mes données soient traitées conformément à la{' '}
            <a href="/privacy" className="text-cyan-400 hover:underline">
              politique de confidentialité
            </a>
          </Label>
        </div>
      </div>

      {/* Bouton d'envoi */}
      <Button
        onClick={handleSubmit}
        disabled={!accepteConditions || isSubmitting}
        className="w-full relative overflow-hidden group rounded-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white shadow-2xl hover:shadow-cyan-500/50 transition-all py-8 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 flex items-center justify-center">
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Envoi en cours...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Envoyer ma demande de devis
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </span>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </Button>

      <p className="text-center text-white/60 text-sm">
        ✓ Réponse sous 24h ouvrées • ✓ Sans engagement
      </p>
    </div>
  );
}
