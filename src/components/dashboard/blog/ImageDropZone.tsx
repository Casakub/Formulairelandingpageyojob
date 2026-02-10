import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { uploadBlogImage, deleteBlogImage } from '../../../services/blogService';

interface ImageDropZoneProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  compact?: boolean;
}

export function ImageDropZone({ value, onChange, className = '', compact = false }: ImageDropZoneProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Seuls les fichiers image sont acceptés');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5 Mo');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadBlogImage(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleRemove = useCallback(async () => {
    if (!value) return;
    try {
      await deleteBlogImage(value);
    } catch {
      // Ignore delete errors (URL might be external)
    }
    onChange('');
  }, [value, onChange]);

  // Image preview mode
  if (value && !uploading) {
    return (
      <div className={`relative group rounded-xl overflow-hidden ${className}`}>
        <img
          src={value}
          alt="Aperçu"
          className={`w-full object-cover ${compact ? 'h-32' : 'h-48'}`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-white/90 text-slate-700 text-xs font-medium mr-2 hover:bg-white transition-colors"
          >
            Changer
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 rounded-lg bg-red-500/90 text-white hover:bg-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>
    );
  }

  // Drop zone mode
  return (
    <div className={className}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`
          relative rounded-xl border-2 border-dashed transition-all cursor-pointer
          ${compact ? 'p-4' : 'p-8'}
          ${dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
          }
          ${uploading ? 'pointer-events-none' : ''}
        `}
      >
        <div className="flex flex-col items-center text-center">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
              <p className="text-sm text-slate-500">Upload en cours...</p>
            </>
          ) : (
            <>
              {dragOver ? (
                <Upload className="w-8 h-8 text-blue-500 mb-2" />
              ) : (
                <ImageIcon className={`text-slate-300 mb-2 ${compact ? 'w-6 h-6' : 'w-10 h-10'}`} />
              )}
              <p className={`font-medium text-slate-600 ${compact ? 'text-xs' : 'text-sm'}`}>
                {dragOver ? 'Déposez ici' : 'Glissez-déposez une image'}
              </p>
              {!compact && (
                <p className="text-xs text-slate-400 mt-1">
                  ou cliquez pour parcourir (JPG, PNG, WebP - max 5 Mo)
                </p>
              )}
            </>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
