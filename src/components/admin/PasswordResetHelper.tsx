import { useState } from 'react';
import { motion } from 'motion/react';
import { KeyRound, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function PasswordResetHelper() {
  const [email, setEmail] = useState('a.auger@yojob.fr');
  const [newPassword, setNewPassword] = useState('Adeole@33700');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      console.log('🔧 Forcing password reset for:', email);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/auth/force-reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            new_password: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setMessage(`✅ ${result.message}`);
        console.log('✅ Password reset successful');
      } else {
        throw new Error(result.error || 'Erreur lors de la réinitialisation');
      }
    } catch (error: any) {
      console.error('❌ Password reset error:', error);
      setStatus('error');
      setMessage(error.message || 'Erreur lors de la réinitialisation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          🚨 Réinitialisation d'urgence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-amber-300 bg-amber-50">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="text-amber-800 text-sm">
            <strong>Utilisez ceci uniquement si :</strong> Vous êtes sûr que le compte existe dans
            Supabase mais vous obtenez "Invalid credentials"
          </AlertDescription>
        </Alert>

        <form onSubmit={handleReset} className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="reset-email" className="text-slate-700">
              Email du compte
            </Label>
            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="a.auger@yojob.fr"
              className="mt-1"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <Label htmlFor="new-password" className="text-slate-700">
              Nouveau mot de passe
            </Label>
            <Input
              id="new-password"
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Adeole@33700"
              className="mt-1 font-mono"
              required
            />
            <p className="text-xs text-slate-500 mt-1">Minimum 6 caractères</p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Réinitialisation...
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4 mr-2" />
                Forcer la réinitialisation
              </>
            )}
          </Button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {message}
                <p className="mt-2 text-sm">
                  👉 <strong>Maintenant, essayez de vous connecter avec ce mot de passe !</strong>
                </p>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Erreur :</strong> {message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="bg-white/50 rounded-lg p-3 text-xs text-slate-600 space-y-1">
          <p className="font-medium text-slate-700">📋 Instructions :</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Vérifiez que l'email est correct (doit exister dans Supabase)</li>
            <li>Entrez le nouveau mot de passe souhaité</li>
            <li>Cliquez sur "Forcer la réinitialisation"</li>
            <li>Utilisez ce nouveau mot de passe pour vous connecter</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
