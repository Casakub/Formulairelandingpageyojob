/**
 * Composant pour auto-importer les traductions manquantes au premier chargement
 * Se lance automatiquement si les traductions critiques sont absentes
 */

import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { convertToSectionsFormat, convertToNavigationFormat } from '../lib/ui-texts-all-languages';

export function AutoImportTranslations() {
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkAndImport = async () => {
      // Ne vérifier qu'une seule fois par session
      if (hasChecked) return;
      
      const alreadyImported = localStorage.getItem('yojob_translations_imported');
      if (alreadyImported === 'true') {
        setHasChecked(true);
        return;
      }

      try {
        // Vérifier si les traductions de base existent
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/translate/fr`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const data = await response.json();
        
        // Vérifier si les clés critiques sont présentes
        const hasSections = data.translations?.ui?.['section.1.title'];
        const hasHelper = data.translations?.ui?.['helper.select_up_to_3'];
        
        if (!hasSections || !hasHelper) {
          // Importer les sections
          if (!hasSections) {
            console.log('📥 Importing sections...');
            await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/ui-texts/bulk`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${publicAnonKey}`,
                },
                body: JSON.stringify({ translations: convertToSectionsFormat() }),
              }
            );
          }
          
          // Importer la navigation
          if (!hasHelper) {
            await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-10092a63/i18n/ui-texts/bulk`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${publicAnonKey}`,
                },
                body: JSON.stringify({ translations: convertToNavigationFormat() }),
              }
            );
          }
          
          localStorage.setItem('yojob_translations_imported', 'true');
          
          // Recharger la page pour appliquer les nouvelles traductions
          window.location.reload();
        } else {
          localStorage.setItem('yojob_translations_imported', 'true');
        }
      } catch (error) {
        console.error('❌ Error checking/importing translations:', error);
      } finally {
        setHasChecked(true);
      }
    };

    checkAndImport();
  }, [hasChecked]);

  // Ce composant ne rend rien visuellement
  return null;
}