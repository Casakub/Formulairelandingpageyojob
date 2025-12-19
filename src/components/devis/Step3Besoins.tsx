import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { SECTEURS, getSalairesByRegion, COEFFICIENTS } from '../../data/devis-data';
import { calculerTauxHoraireBrut, calculerTauxETTBase, formaterMontant } from '../../utils/devis-calculations';

interface Poste {
  id: string;
  secteur: string;
  convention: string;
  poste: string;
  classification: string;
  quantite: number;
  salaireBrut: number;
  tauxHoraireBrut: number;
  tauxETT: number;
}

interface Step3BesoinsProps {
  data: Poste[];
  region: string;
  onChange: (data: Poste[]) => void;
}

export function Step3Besoins({ data, region, onChange }: Step3BesoinsProps) {
  const handleAddPoste = () => {
    const newPoste: Poste = {
      id: crypto.randomUUID(),
      secteur: '',
      convention: '',
      poste: '',
      classification: '',
      quantite: 1,
      salaireBrut: 0,
      tauxHoraireBrut: 0,
      tauxETT: 0
    };
    onChange([...data, newPoste]);
  };

  const handleRemovePoste = (id: string) => {
    if (data.length > 1) {
      onChange(data.filter(p => p.id !== id));
    }
  };

  const handlePosteChange = (id: string, field: keyof Poste, value: any) => {
    const updatedPostes = data.map(poste => {
      if (poste.id === id) {
        const updated = { ...poste, [field]: value };

        // Auto-remplir la convention si le secteur change
        if (field === 'secteur' && value) {
          updated.convention = SECTEURS[value as keyof typeof SECTEURS]?.convention || '';
          updated.poste = '';
          updated.classification = '';
          updated.salaireBrut = 0;
        }

        // Auto-remplir le salaire si la classification change
        if (field === 'classification' && value && updated.secteur && region) {
          const salaires = getSalairesByRegion(region, updated.secteur);
          updated.salaireBrut = salaires[value] || 0;
        }

        // Recalculer les taux
        if (updated.salaireBrut > 0) {
          updated.tauxHoraireBrut = calculerTauxHoraireBrut(updated.salaireBrut, 151.67);
          updated.tauxETT = calculerTauxETTBase(updated.tauxHoraireBrut, updated.secteur);
        }

        return updated;
      }
      return poste;
    });
    onChange(updatedPostes);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl mb-2">Vos besoins en recrutement</h2>
        <p className="text-white/70">
          Ajoutez autant de profils que nécessaire pour votre projet.
        </p>
      </div>

      <div className="space-y-4">
        {data.map((poste, index) => (
          <Card key={poste.id} className="border border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">
                Profil {index + 1}
              </CardTitle>
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePoste(poste.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Secteur d'activité */}
                <div>
                  <Label className="text-white mb-2 block">
                    Secteur d'activité <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={poste.secteur}
                    onValueChange={(value) => handlePosteChange(poste.id, 'secteur', value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Sélectionnez un secteur" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white">
                      {Object.keys(SECTEURS).map((secteur) => (
                        <SelectItem key={secteur} value={secteur} className="text-white hover:bg-white/10 focus:bg-white/10">
                          {secteur}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Convention collective */}
                <div>
                  <Label className="text-white mb-2 block">
                    Convention collective
                  </Label>
                  <Input
                    value={poste.convention}
                    className="bg-white/10 border-white/20 text-white/60"
                    readOnly
                    placeholder="Auto-rempli selon le secteur"
                  />
                </div>

                {/* Poste recherché */}
                <div>
                  <Label className="text-white mb-2 block">
                    Poste recherché <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={poste.poste}
                    onValueChange={(value) => handlePosteChange(poste.id, 'poste', value)}
                    disabled={!poste.secteur}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Sélectionnez un poste" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white">
                      {poste.secteur && SECTEURS[poste.secteur as keyof typeof SECTEURS]?.postes.map((p) => (
                        <SelectItem key={p} value={p} className="text-white hover:bg-white/10 focus:bg-white/10">
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Classification */}
                <div>
                  <Label className="text-white mb-2 block">
                    Classification <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={poste.classification}
                    onValueChange={(value) => handlePosteChange(poste.id, 'classification', value)}
                    disabled={!poste.secteur}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Sélectionnez une classification" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white">
                      {poste.secteur && SECTEURS[poste.secteur as keyof typeof SECTEURS]?.classifications.map((c) => (
                        <SelectItem key={c} value={c} className="text-white hover:bg-white/10 focus:bg-white/10">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantité */}
                <div>
                  <Label className="text-white mb-2 block">
                    Quantité de personnes <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    type="number"
                    value={poste.quantite}
                    onChange={(e) => handlePosteChange(poste.id, 'quantite', parseInt(e.target.value) || 1)}
                    min={1}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                {/* Salaire brut mensuel */}
                <div>
                  <Label className="text-white mb-2 block">
                    Salaire brut mensuel
                  </Label>
                  <Input
                    value={poste.salaireBrut > 0 ? formaterMontant(poste.salaireBrut) : ''}
                    className="bg-green-500/10 border-green-500/30 text-green-200 font-medium"
                    readOnly
                    placeholder="Auto-calculé"
                  />
                </div>
              </div>

              {/* Résumé des calculs */}
              {poste.salaireBrut > 0 && (
                <div className="grid md:grid-cols-2 gap-4 mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div>
                    <p className="text-cyan-200 text-sm mb-1">Taux horaire brut</p>
                    <p className="text-white text-xl font-medium">{formaterMontant(poste.tauxHoraireBrut)}/h</p>
                  </div>
                  <div>
                    <p className="text-cyan-200 text-sm mb-1">Taux ETT estimé</p>
                    <p className="text-white text-xl font-medium">{formaterMontant(poste.tauxETT)}/h</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-cyan-200 text-sm mb-1">Coefficient agence ({COEFFICIENTS[poste.secteur] || 1.40})</p>
                    <p className="text-white/70 text-sm">
                      Coût mensuel estimé : {formaterMontant(poste.tauxETT * 151.67 * poste.quantite)}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bouton ajouter un profil */}
      <Button
        onClick={handleAddPoste}
        variant="outline"
        className="w-full relative overflow-hidden group rounded-full border-cyan-400/30 bg-cyan-500/10 backdrop-blur-sm text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all py-6"
      >
        <Plus className="w-5 h-5 mr-2" />
        Ajouter un profil
      </Button>

      {!region && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-yellow-200 text-sm">
            ⚠️ Veuillez sélectionner une région à l'étape 1 pour calculer les salaires
          </p>
        </div>
      )}
    </div>
  );
}