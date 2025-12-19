import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './button';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>({
  open: false,
  onOpenChange: () => {},
});

export function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogContent({ children, className = '', onClose }: DialogContentProps) {
  const { open, onOpenChange } = React.useContext(DialogContext);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 ${className}`}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute right-4 top-4 rounded-full p-2 hover:bg-slate-100 z-10"
              >
                <X className="w-4 h-4" />
              </Button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return (
    <div className={`px-6 py-5 border-b border-slate-200 ${className}`}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return (
    <h2 className={`text-slate-900 ${className}`}>
      {children}
    </h2>
  );
}

export function DialogDescription({ children, className = '' }: DialogDescriptionProps) {
  return (
    <p className={`text-slate-600 text-sm mt-1 ${className}`}>
      {children}
    </p>
  );
}

export function DialogTrigger({ children, asChild = false, ...props }: { 
  children: React.ReactNode; 
  asChild?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  const handleClick = () => {
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
    });
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export function DialogFooter({ children, className = '' }: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 ${className}`}>
      {children}
    </div>
  );
}