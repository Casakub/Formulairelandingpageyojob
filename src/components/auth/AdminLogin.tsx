import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Pour la démo, le mot de passe est "yojob2024"
  // Dans une vraie app, utiliser un backend sécurisé
  const ADMIN_PASSWORD = 'yojob2024';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      // Store auth in localStorage
      localStorage.setItem('yojob_admin_auth', 'true');
      localStorage.setItem('yojob_admin_login_time', new Date().toISOString());
      onLoginSuccess();
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }

    setIsLoading(false);
  };

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
              <div>
                <Label htmlFor="password" className="text-white mb-2 block">
                  Mot de passe administrateur
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
                disabled={isLoading || !password}
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

              {/* Info */}
              <div className="text-center">
                <p className="text-white/60 text-sm">
                  💡 Pour la démo, utilisez : <span className="font-mono text-cyan-400">yojob2024</span>
                </p>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-start gap-2 text-white/50 text-xs">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  Cette page est protégée. L'accès est réservé aux administrateurs YOJOB.
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
