/**
 * 🔍 UTILS DEBUG OVERRIDES
 * 
 * Outils pour diagnostiquer et nettoyer les overrides qui écrasent les traductions
 * 
 * Usage dans la console :
 * - window.overrideDebug.listOverrides() : Liste tous les overrides
 * - window.overrideDebug.clearAll() : Supprime tous les overrides
 * - window.overrideDebug.clearAgency() : Supprime les overrides AGENCY uniquement
 */

import { projectId, publicAnonKey } from './supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/questions`;

export const overrideDebug = {
  /**
   * Liste tous les overrides en base
   */
  async listOverrides() {
    try {
      console.log('🔍 Chargement des overrides...');
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        console.error('❌ Erreur:', data.error);
        return;
      }

      const overrides = data.overrides || {};
      const count = Object.keys(overrides).length;

      console.log(`📦 ${count} overrides trouvés :`);
      console.table(
        Object.entries(overrides).map(([id, override]: [string, any]) => ({
          ID: id,
          Label: override.label || '-',
          Type: override.type || '-',
          Profiles: override.visibleFor?.join(', ') || '-',
          HasOptions: override.options?.length || 0,
        }))
      );

      // Analyser les overrides AGENCY avec labels anglais
      const agencyOverridesWithEnglish = Object.entries(overrides)
        .filter(([id, override]: [string, any]) => {
          const hasAgency = override.visibleFor?.includes('agency');
          const hasEnglishLabel = override.label && /^[A-Z]/.test(override.label);
          return hasAgency && hasEnglishLabel;
        });

      if (agencyOverridesWithEnglish.length > 0) {
        console.warn(`⚠️ ${agencyOverridesWithEnglish.length} overrides AGENCY avec labels anglais :`);
        console.table(
          agencyOverridesWithEnglish.map(([id, override]: [string, any]) => ({
            ID: id,
            Label: override.label,
          }))
        );
      }

      return overrides;
    } catch (error) {
      console.error('❌ Erreur lors du chargement des overrides:', error);
    }
  },

  /**
   * Supprime TOUS les overrides
   */
  async clearAll() {
    const confirm = window.confirm(
      '⚠️ ATTENTION : Cette action va supprimer TOUS les overrides !\n\n' +
      'Les questions utiliseront directement la config.\n\n' +
      'Continuer ?'
    );

    if (!confirm) {
      console.log('❌ Annulé');
      return;
    }

    try {
      console.log('🗑️ Suppression de tous les overrides...');
      const response = await fetch(`${API_URL}/overrides`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log(`✅ ${data.count} overrides supprimés !`);
        console.log('🔄 Rechargement de la page dans 2 secondes...');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        console.error('❌ Erreur:', data.error);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la suppression:', error);
    }
  },

  /**
   * Supprime uniquement les overrides du profil AGENCY
   */
  async clearAgency() {
    console.log('⚠️ Cette fonctionnalité n\'est pas encore implémentée.');
    console.log('💡 Utilisez clearAll() pour supprimer tous les overrides.');
  },
};

// Exposer dans window pour usage dans la console
if (typeof window !== 'undefined') {
  (window as any).overrideDebug = overrideDebug;
  console.log('%c🔍 Override Debug Tools loaded!', 'background: #ef4444; color: white; padding: 5px; border-radius: 3px;');
  console.log('Available commands:');
  console.log('  overrideDebug.listOverrides()  - Liste tous les overrides');
  console.log('  overrideDebug.clearAll()       - Supprime TOUS les overrides');
}
