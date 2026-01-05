import * as React from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const SelectContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement> | null;
  valueLabel: string;
  setValueLabel: (label: string) => void;
}>({
  value: '',
  onValueChange: () => {},
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: null,
  valueLabel: '',
  setValueLabel: () => {},
});

export function Select({ value = '', onValueChange, children, disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [valueLabel, setValueLabel] = React.useState('');
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: onValueChange || (() => {}),
        isOpen: !disabled && isOpen,
        setIsOpen,
        triggerRef,
        valueLabel,
        setValueLabel,
      }}
    >
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className = '', children }: SelectTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = React.useContext(SelectContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={handleClick}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value, valueLabel } = React.useContext(SelectContext);
  
  return (
    <span className={value ? '' : 'text-slate-500'}>
      {valueLabel || placeholder}
    </span>
  );
}

export function SelectContent({ children, className = '' }: SelectContentProps) {
  const { isOpen, setIsOpen, triggerRef } = React.useContext(SelectContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0 });
  const justOpenedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    if (!isOpen) return;

    // Marquer que le dropdown vient de s'ouvrir
    justOpenedRef.current = true;

    // Fonction pour calculer la position
    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        const newPosition = {
          top: rect.bottom + 4, // Position fixed + petit offset de 4px
          left: rect.left,      // Position fixed : pas besoin de window.scrollX
          width: rect.width
        };
        setPosition(newPosition);
      }
    };

    // Calculer la position immédiatement
    updatePosition();

    // Recalculer si la fenêtre est redimensionnée ou scrollée
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    // Handler pour les clics en dehors
    const handleClickOutside = (event: MouseEvent) => {
      // Ignorer si le dropdown vient juste de s'ouvrir
      if (justOpenedRef.current) {
        return;
      }

      const target = event.target as Node;
      
      // Fermer si le clic est en dehors du trigger ET du dropdown
      if (
        ref.current && !ref.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    // Réinitialiser le flag après un délai
    const flagTimeout = setTimeout(() => {
      justOpenedRef.current = false;
    }, 100);

    // Ajouter l'event listener après un délai
    const listenerTimeout = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(flagTimeout);
      clearTimeout(listenerTimeout);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, setIsOpen, triggerRef]);

  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      ref={ref}
      onClick={handleContentClick}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        zIndex: 100000,
        animation: 'fadeInDown 0.15s ease-out'
      }}
      className={`max-h-60 overflow-y-auto rounded-md border border-slate-200 bg-white shadow-xl ${className}`}
    >
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {children}
    </div>,
    document.body
  );
}

export function SelectItem({ value, children, className = '' }: SelectItemProps) {
  const { value: selectedValue, onValueChange, setIsOpen, setValueLabel } = React.useContext(SelectContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Extraire le texte du label
    const label = typeof children === 'string' ? children : extractTextFromChildren(children);
    
    onValueChange(value);
    setValueLabel(label);
    setIsOpen(false);
  };

  const isSelected = value === selectedValue;
  
  // Si cet item est sélectionné, mettre à jour le label au montage
  React.useEffect(() => {
    if (isSelected) {
      const label = typeof children === 'string' ? children : extractTextFromChildren(children);
      setValueLabel(label);
    }
  }, [isSelected, children, setValueLabel]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 transition-colors ${
        isSelected ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-900'
      } ${className}`}
    >
      {children}
    </button>
  );
}

// Fonction utilitaire pour extraire le texte des children React
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (React.isValidElement(children)) {
    return extractTextFromChildren(children.props.children);
  }
  return '';
}