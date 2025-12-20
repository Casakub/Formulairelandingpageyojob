import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { SECTEURS, getSalairesByRegion } from '../../data/devis-data';
import { calculerTauxHoraireBrut, calculerTauxETTAvecPays, formaterMontant, calculerCoutMensuelProfil } from '../../utils/devis-calculations';
import { useDevisConfig } from '../../hooks/useDevisConfig';

interface Poste {
  id: string;
  secteur: string;
  convention: string;
  nationalite: string;  // 🆕 Code pays (RO, PL, PT, etc.)
  poste: string;
  classification: string;
  quantite: number;
  salaireBrut: number;
  tauxHoraireBrut: number;
  tauxETT: number;
  // Détails du coefficient pour affichage
  coeffBase: number;
  facteurPays: number;
  coeffFinal: number;
  labelPays: string;
}

interface Step3BesoinsProps {
  data: Poste[];
  region: string;
  onChange: (data: Poste[]) => void;
}

export function Step3Besoins({ data, region, onChange }: Step3BesoinsProps) {
  // 🆕 Charger la configuration dynamique
  const { getPaysActifs, getCoefficientDetail, isLoading } = useDevisConfig();
  const paysDisponibles = getPaysActifs();

  const handleAddPoste = () => {
    const newPoste: Poste = {
      id: crypto.randomUUID(),
      secteur: '',
      convention: '',
      nationalite: 'RO',  // 🆕 Roumanie par défaut
      poste: '',
      classification: '',
      quantite: 1,
      salaireBrut: 0,
      tauxHoraireBrut: 0,
      tauxETT: 0,
      coeffBase: 1.92,
      facteurPays: 1.00,
      coeffFinal: 1.92,
      labelPays: 'Roumanie'
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

        // 🆕 Recalculer le coefficient si secteur, classification ou nationalité change
        if ((field === 'secteur' || field === 'classification' || field === 'nationalite') && 
            updated.secteur && updated.classification && updated.nationalite) {
          const detail = getCoefficientDetail(updated.secteur, updated.classification, updated.nationalite);
          updated.coeffBase = detail.coeffBase;
          updated.facteurPays = detail.facteurPays;
          updated.coeffFinal = detail.coeffFinal;
          updated.labelPays = detail.labelPays;
        }

        // Recalculer les taux
        if (updated.salaireBrut > 0 && updated.coeffBase && updated.facteurPays) {
          updated.tauxHoraireBrut = calculerTauxHoraireBrut(updated.salaireBrut, 151.67);
          updated.tauxETT = calculerTauxETTAvecPays(updated.tauxHoraireBrut, updated.coeffBase, updated.facteurPays);
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
                    <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/90">
                      <SelectValue placeholder="Sélectionnez un secteur" className="text-white/90 text-[14px]" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
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
                    className="bg-white/10 border-white/20 text-white/90 placeholder:text-white/40"
                    readOnly
                    placeholder="Auto-rempli selon le secteur"
                  />
                </div>

                {/* 🆕 Nationalité souhaitée */}
                <div>
                  <Label className="text-white mb-2 block">
                    Nationalité souhaitée <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    value={poste.nationalite}
                    onValueChange={(value) => handlePosteChange(poste.id, 'nationalite', value)}
                    disabled={isLoading || paysDisponibles.length === 0}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/90">
                      <SelectValue placeholder={isLoading ? "Chargement des pays..." : "Sélectionnez un pays"} />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
                      {paysDisponibles.length > 0 ? (
                        paysDisponibles.map((pays) => (
                          <SelectItem key={pays.code} value={pays.code} className="text-white hover:bg-white/10 focus:bg-white/10">
                            <span className="mr-2">{pays.flag}</span>
                            {pays.label}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="RO" className="text-white hover:bg-white/10 focus:bg-white/10">
                          <span className="mr-2">🇷🇴</span>
                          Roumanie
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {isLoading && (
                    <p className="text-xs text-cyan-300/70 mt-1">⏳ Chargement de la configuration...</p>
                  )}
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
                    <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/90">
                      <SelectValue placeholder="Sélectionnez un poste" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
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
                    <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span]:text-white/90">
                      <SelectValue placeholder="Sélectionnez une classification" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5} className="bg-[#2d1b69]/95 backdrop-blur-xl border border-white/20 text-white z-50">
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
                    className="bg-green-500/10 border-green-500/30 text-green-200 font-medium placeholder:text-green-400/40"
                    readOnly
                    placeholder="Auto-calculé"
                  />
                </div>
              </div>

              {/* Résumé des calculs */}
              {poste.salaireBrut > 0 && (
                <div className="space-y-3 mt-4">
                  {/* Taux horaire et ETT */}
                  <div className="grid md:grid-cols-2 gap-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div>
                      <p className="text-cyan-200 text-sm mb-1">Taux horaire brut</p>
                      <p className="text-white text-xl font-medium">{formaterMontant(poste.tauxHoraireBrut)}/h</p>
                    </div>
                    <div>
                      <p className="text-cyan-200 text-sm mb-1">Taux ETT estimé</p>
                      <p className="text-white text-xl font-medium">{formaterMontant(poste.tauxETT)}/h</p>
                    </div>
                  </div>

                  {/* Détail du coefficient */}
                  <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                    <p className="text-violet-200 text-sm mb-3 font-medium">💰 Détail du calcul</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Coefficient de base</span>
                        <span className="text-white font-medium">{poste.coeffBase}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-white/50">
                        <span>({poste.secteur} - {poste.classification})</span>
                      </div>
                      
                      {poste.facteurPays !== 1.00 && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Facteur pays</span>
                            <span className="text-white font-medium">× {poste.facteurPays}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-white/50">
                            <span>({poste.labelPays})</span>
                          </div>
                          <div className="border-t border-white/10 my-2"></div>
                        </>
                      )}
                      
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-cyan-200 font-medium">Coefficient final</span>
                        <span className="text-cyan-200 font-bold">{poste.coeffFinal}</span>
                      </div>
                      
                      <div className="border-t border-white/10 my-2"></div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Coût mensuel estimé</span>
                        <span className="text-white font-medium">{formaterMontant(poste.tauxETT * 151.67 * poste.quantite)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-white/50">
                        <span>({poste.quantite} {poste.quantite > 1 ? 'personnes' : 'personne'} × 151,67h × {formaterMontant(poste.tauxETT)}/h)</span>
                      </div>
                    </div>
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