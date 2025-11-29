import { useAuth } from '../../hooks/useAuth';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';

export function AuthStatusIndicator() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <Badge variant="outline" className="gap-2">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>Vérification...</span>
      </Badge>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Badge variant="outline" className="gap-2 border-red-200 text-red-700 bg-red-50">
        <XCircle className="w-3 h-3" />
        <span>Non connecté</span>
      </Badge>
    );
  }

  return (
    <Badge className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
      <CheckCircle className="w-3 h-3" />
      <span>{user.email}</span>
    </Badge>
  );
}
