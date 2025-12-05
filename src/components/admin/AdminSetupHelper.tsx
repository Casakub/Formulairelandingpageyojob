import { useState } from 'react';
import { motion } from 'motion/react';
import { UserPlus, Copy, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { signup } from '../../services/authService';

/**
 * Helper component to create the first admin account
 * Shows up when no admin exists yet
 */
export function AdminSetupHelper() {
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const ADMIN_CREDENTIALS = {
    email: 'admin@yojob.com',
    password: 'Adeole@33700',
    name: 'Admin YOJOB',
  };

  const handleCreateAdmin = async () => {
    setIsCreating(true);
    setError('');

    try {
      const result = await signup(
        ADMIN_CREDENTIALS.email,
        ADMIN_CREDENTIALS.password,
        ADMIN_CREDENTIALS.name
      );

      if (result.success) {
        setCreated(true);
        console.log('✅ Admin account created:', result.user);
      } else {
        setError(result.error || 'Erreur lors de la création du compte');
      }
    } catch (err: any) {
      setError('Erreur inattendue');
      console.error('Admin creation error:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(ADMIN_CREDENTIALS.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (created) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Check className="w-5 h-5" />
            Compte administrateur créé !
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <p className="text-sm text-slate-600 mb-3">
              Vous pouvez maintenant vous connecter avec :
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Email :</span>
                <Badge variant="outline" className="font-mono">
                  {ADMIN_CREDENTIALS.email}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Mot de passe :</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    {ADMIN_CREDENTIALS.password}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyPassword}
                    className="h-6 w-6 p-0"
                  >
                    {copied ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              <strong>Important :</strong> Changez ce mot de passe après votre première connexion
              pour des raisons de sécurité.
            </p>
          </div>

          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
          >
            Aller à la page de connexion
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <UserPlus className="w-5 h-5" />
          Configuration Initiale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600">
          Créez votre compte administrateur YOJOB pour accéder au dashboard.
        </p>

        <div className="p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 mb-2">Identifiants configurés :</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Email :</span>
              <Badge variant="outline" className="text-xs font-mono">
                {ADMIN_CREDENTIALS.email}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Mot de passe :</span>
              <Badge variant="outline" className="text-xs font-mono">
                {ADMIN_CREDENTIALS.password}
              </Badge>
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}

        <Button
          onClick={handleCreateAdmin}
          disabled={isCreating}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
        >
          {isCreating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Création en cours...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Créer le compte administrateur
            </>
          )}
        </Button>

        <div className="text-xs text-slate-500 space-y-1">
          <p>✓ Compte sécurisé avec Supabase Auth</p>
          <p>✓ Mot de passe chiffré</p>
          <p>✓ Modifiable après connexion</p>
        </div>
      </CardContent>
    </Card>
  );
}
