/**
 * Génère un UUID v4 compatible avec tous les contextes (HTTP et HTTPS)
 * Fallback pour les navigateurs qui ne supportent pas crypto.randomUUID()
 * ou les contextes non-sécurisés (HTTP)
 */
export function generateUUID(): string {
  // Essayer d'abord crypto.randomUUID() si disponible (HTTPS/localhost)
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // Fallback: génération manuelle d'UUID v4
  // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
