import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { login } from '../../services/authService';
import { FirstTimeSetup } from './FirstTimeSetup';
import { PasswordResetHelper } from '../admin/PasswordResetHelper';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('a.auger@yojob.fr');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [showResetHelper, setShowResetHelper] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        console.log('✅ Login successful:', result.user?.email);
        onLoginSuccess();
      } else {
        // Auto-detect if no account exists and switch to setup
        if (result.error?.toLowerCase().includes('invalid') || 
            result.error?.toLowerCase().includes('credentials') ||
            result.error?.toLowerCase().includes('incorrect')) {
          setError('Aucun compte trouvé. Créez votre compte ci-dessous. 👇');
          // Don't auto-switch, let user click the link
        } else {
          setError(result.error || 'Erreur de connexion');
        }
        setPassword('');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Erreur inattendue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSetup) {
    return (
      <FirstTimeSetup
        onSetupComplete={() => {
          setShowSetup(false);
          // Auto-fill with created account
          setPassword('');
        }}
        onBackToLogin={() => setShowSetup(false)}
      />
    );
  }

  if (showResetHelper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center p-4">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg relative z-10 space-y-4"
        >
          <PasswordResetHelper />
          
          <Button
            onClick={() => setShowResetHelper(false)}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            ← Retour à la connexion
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-violet-900 to-cyan-900 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid-admin" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-admin)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardContent className="p-8">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <ShieldCheck className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-white text-3xl mb-2">YOJOB Admin</h1>
              <p className="text-white/70">
                Accès au dashboard d'analyse
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email administrateur
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="a.auger@yojob.fr"
                    className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/50"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-white mb-2 block">
                  Mot de passe
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="pl-11 pr-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400 focus:ring-cyan-400/50"
                    required
                    autoFocus
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/20 border border-red-400/50 flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !password || !email}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Connexion...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Se connecter
                  </>
                )}
              </Button>

              {/* First Time Setup Link & Reset Helper */}
              <div className="text-center pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setShowSetup(true)}
                  className={`text-sm transition-all ${
                    error 
                      ? 'text-white bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-2 rounded-full hover:shadow-lg font-medium'
                      : 'text-cyan-400 hover:text-cyan-300'
                  }`}
                >
                  {error ? '✨ Créer mon compte maintenant' : 'Première connexion ? Créer un compte →'}
                </button>

                {error && error.toLowerCase().includes('incorrect') && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setShowResetHelper(true)}
                      className="text-xs text-red-300 hover:text-red-200 underline transition-colors"
                    >
                      🚨 Réinitialiser le mot de passe (urgence)
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-start gap-2 text-white/50 text-xs">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  Cette page est protégée par Supabase Auth. L'accès est réservé aux administrateurs YOJOB.
                  Toutes les actions sont enregistrées.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-white/50 text-sm">
            Dashboard d'Analyse de Marché YOJOB
          </p>
          <p className="text-white/30 text-xs mt-1">
            © 2024 YOJOB - Tous droits réservés
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
