/**
 * Utilitaire sécurisé pour copier du texte dans le presse-papier
 * Gère les erreurs de permissions et les fallbacks
 */

export async function copyToClipboard(text: string): Promise<boolean> {
  // Méthode 1: Essayer le fallback immédiatement (plus fiable)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Style pour rendre invisible mais accessible
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
    
    if (successful) {
      return true;
    }
    
    // Méthode 2: Essayer Clipboard API si disponible
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error('Clipboard API failed:', err);
      }
    }
    
    return false;
  } catch (err) {
    console.error('All clipboard methods failed:', err);
    return false;
  }
}

/**
 * Version avec toast intégré
 */
export async function copyToClipboardWithToast(
  text: string,
  toast: any,
  successMessage = 'Copié !',
  errorMessage = 'Impossible de copier'
): Promise<void> {
  const success = await copyToClipboard(text);
  
  if (success) {
    toast.success(successMessage);
  } else {
    toast.error(errorMessage, {
      description: 'Veuillez copier manuellement le texte'
    });
  }
}