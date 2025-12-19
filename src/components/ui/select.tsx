import * as React from 'react';
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
}>({
  value: '',
  onValueChange: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

export function Select({ value = '', onValueChange, children, disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SelectContext.Provider
      value={{
        value,
        onValueChange: onValueChange || (() => {}),
        isOpen: !disabled && isOpen,
        setIsOpen,
      }}
    >
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className = '', children }: SelectTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = React.useContext(SelectContext);
  
  return (
    <span className={value ? '' : 'text-slate-500'}>
      {value || placeholder}
    </span>
  );
}

export function SelectContent({ children, className = '' }: SelectContentProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function SelectItem({ value, children, className = '' }: SelectItemProps) {
  const { value: selectedValue, onValueChange, setIsOpen } = React.useContext(SelectContext);

  const handleClick = () => {
    onValueChange(value);
    setIsOpen(false);
  };

  const isSelected = value === selectedValue;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100 focus:bg-slate-100 cursor-pointer ${
        isSelected ? 'bg-slate-100 font-medium' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}
