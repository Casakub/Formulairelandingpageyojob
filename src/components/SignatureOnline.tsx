import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Download,
  Shield,
  Lock,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface SignatureOnlineProps {
  token: string;
}

interface DevisData {
  id: string;
  numero: string;
  statut: string;
  entreprise: {
    raisonSociale: string;
    siret: string;
  };
  contact: {
    nom: string;
    prenom: string;
    email: string;
    fonction?: string;
  };
  pdfUrl?: string;
  postes: any[];
  conditions?: any;
}

export function SignatureOnline({ token }: SignatureOnlineProps) {
  const [devis, setDevis] = useState<DevisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [acceptCGV, setAcceptCGV] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    loadDevisFromToken();
  }, [token]);

  const loadDevisFromToken = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/verifier-token-signature`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setDevis(data.devis);
        
        // Vérifier si déjà signé
        if (data.devis.statut === 'signe') {
          setSigned(true);
        }
      } else {
        setError(data.error || 'Lien invalide ou expiré');
      }
    } catch (err) {
      console.error('Erreur chargement devis:', err);
      setError('Impossible de charger le devis');
    } finally {
      setLoading(false);
    }
  };

  // Gestion du canvas de signature
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#1E3A8A';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSign = async () => {
    if (!hasSignature) {
      toast.error('Veuillez signer dans le cadre ci-dessus');
      return;
    }

    if (!acceptCGV) {
      toast.error('Veuillez accepter les CGV');
      return;
    }

    try {
      setSigning(true);

      // Convertir la signature en base64
      const canvas = canvasRef.current;
      if (!canvas) return;

      const signatureBase64 = canvas.toDataURL('image/png');

      // Envoyer la signature
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/devis/signer-avec-token`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token,
            signatureBase64,
            accepteCGV: true
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        setSigned(true);
        toast.success('✅ Devis signé avec succès !');
      } else {
        toast.error(data.error || 'Erreur lors de la signature');
      }
    } catch (err) {
      console.error('Erreur signature:', err);
      toast.error('Impossible de signer le devis');
    } finally {
      setSigning(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-12 text-center">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-600">Chargement du devis...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !devis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl text-slate-900 mb-2">Lien invalide</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <p className="text-sm text-slate-500">
              Ce lien a peut-être expiré ou le devis a déjà été signé.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Already signed state
  if (signed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-emerald-200">
            <CardHeader className="text-center bg-gradient-to-br from-emerald-50 to-green-50 border-b border-emerald-100">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-slate-900">Devis signé avec succès ! ✅</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="bg-white rounded-lg p-6 border border-emerald-100">
                <p className="text-slate-700 mb-4">
                  <strong>Devis :</strong> {devis.numero}
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Entreprise :</strong> {devis.entreprise.raisonSociale}
                </p>
                <p className="text-slate-700">
                  <strong>Signataire :</strong> {devis.contact.prenom} {devis.contact.nom}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Prochaines étapes
                </h3>
                <ul className="space-y-2 text-slate-700 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Un email de confirmation vous a été envoyé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Notre équipe va prendre contact avec vous sous 24-48h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Vous recevrez votre devis signé par PDF</span>
                  </li>
                </ul>
              </div>

              {devis.pdfUrl && (
                <Button
                  onClick={() => window.open(devis.pdfUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le devis signé
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Signature form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-2xl border-slate-200">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Signature du devis</CardTitle>
                <p className="text-blue-100 text-sm mt-1">{devis.numero}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Informations devis */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3 className="text-slate-900 mb-4">📋 Informations du devis</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Entreprise</p>
                  <p className="text-slate-900">{devis.entreprise.raisonSociale}</p>
                </div>
                <div>
                  <p className="text-slate-500">SIRET</p>
                  <p className="text-slate-900 font-mono">{devis.entreprise.siret}</p>
                </div>
                <div>
                  <p className="text-slate-500">Contact</p>
                  <p className="text-slate-900">
                    {devis.contact.prenom} {devis.contact.nom}
                    {devis.contact.fonction && ` - ${devis.contact.fonction}`}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Email</p>
                  <p className="text-slate-900">{devis.contact.email}</p>
                </div>
              </div>
            </div>

            {/* PDF à télécharger */}
            {devis.pdfUrl && (
              <div className="bg-violet-50 rounded-lg p-6 border border-violet-200">
                <h3 className="text-slate-900 mb-3">📄 Document à signer</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Veuillez consulter le devis complet avant de le signer :
                </p>
                <Button
                  onClick={() => window.open(devis.pdfUrl, '_blank')}
                  variant="outline"
                  className="border-violet-300 hover:bg-violet-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le PDF du devis
                </Button>
              </div>
            )}

            {/* Zone de signature */}
            <div className="space-y-4">
              <h3 className="text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                Signature électronique
              </h3>
              
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-white">
                <p className="text-slate-600 text-sm mb-3">
                  Signez dans le cadre ci-dessous avec votre souris ou votre doigt :
                </p>
                
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  className="border-2 border-slate-200 rounded-lg w-full cursor-crosshair bg-white"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                
                <div className="flex justify-end mt-3">
                  <Button
                    onClick={clearSignature}
                    variant="outline"
                    size="sm"
                    className="text-slate-600"
                  >
                    Effacer
                  </Button>
                </div>
              </div>
            </div>

            {/* Acceptation CGV */}
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="cgv"
                  checked={acceptCGV}
                  onCheckedChange={(checked) => setAcceptCGV(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="cgv" className="text-sm text-slate-700 cursor-pointer">
                  J'accepte les{' '}
                  <a href="/cgv" target="_blank" className="text-blue-600 hover:underline">
                    Conditions Générales de Vente
                  </a>{' '}
                  et certifie que les informations fournies sont exactes. Cette signature 
                  électronique a la même valeur légale qu'une signature manuscrite conformément 
                  au règlement eIDAS (UE) n°910/2014.
                </label>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-slate-700">
                  <p className="mb-2">
                    <strong>Signature sécurisée et certifiée</strong>
                  </p>
                  <p className="text-slate-600">
                    Votre signature est horodatée, chiffrée et authentifiée. 
                    Vous recevrez un certificat de signature par email.
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton de signature */}
            <Button
              onClick={handleSign}
              disabled={signing || !hasSignature || !acceptCGV}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white h-14 text-lg"
            >
              {signing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signature en cours...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Signer le devis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
