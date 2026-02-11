import { useRef, useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Minus,
  Loader2,
  Upload,
  Table as TableIcon,
  Columns2,
  Columns3,
  Plus,
  Type,
  Palette,
  Highlighter,
  Code,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  SquareCode,
  X,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  SeparatorHorizontal,
  PanelTopClose,
  Trash2,
  RowsIcon,
  ColumnsIcon,
} from 'lucide-react';
import { Button } from '../../ui/button';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

// Block inserter types
interface BlockType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  description: string;
  action: (editor: any) => void;
}

const COLORS = [
  '#000000', '#374151', '#6B7280', '#9CA3AF',
  '#DC2626', '#EA580C', '#D97706', '#CA8A04',
  '#16A34A', '#059669', '#0D9488', '#0891B2',
  '#2563EB', '#4F46E5', '#7C3AED', '#9333EA',
  '#DB2777', '#E11D48',
];

const HIGHLIGHT_COLORS = [
  '#FEF08A', '#FDE68A', '#BBF7D0', '#A7F3D0',
  '#BAE6FD', '#C7D2FE', '#E9D5FF', '#FBCFE8',
  '#FCA5A5', '#FED7AA',
];

export function TipTapEditor({ content, onChange, placeholder, onImageUpload }: TipTapEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOverEditor, setDragOverEditor] = useState(false);
  const [showBlockInserter, setShowBlockInserter] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const handleImageFile = useCallback(async (file: File, insertAt?: number) => {
    if (!onImageUpload || !file.type.startsWith('image/')) return;

    setUploading(true);
    try {
      const url = await onImageUpload(file);
      if (editor) {
        if (insertAt !== undefined) {
          const node = editor.schema.nodes.image.create({ src: url });
          editor.view.dispatch(editor.state.tr.insert(insertAt, node));
        } else {
          editor.chain().focus().setImage({ src: url }).run();
        }
      }
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
    }
  }, [onImageUpload]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: {
          HTMLAttributes: { class: 'bg-slate-900 text-slate-100 rounded-lg p-4 font-mono text-sm' },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: { class: 'rounded-lg max-w-full mx-auto' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: placeholder || 'Commencez à écrire...' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose max-w-none min-h-[500px] p-6 focus:outline-none',
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!onImageUpload || moved || !event.dataTransfer?.files?.length) return false;
        const file = event.dataTransfer.files[0];
        if (!file?.type.startsWith('image/')) return false;

        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
        handleImageFile(file, pos?.pos);
        return true;
      },
      handlePaste: (view, event) => {
        if (!onImageUpload) return false;
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.startsWith('image/'));
        if (!imageItem) return false;

        const file = imageItem.getAsFile();
        if (!file) return false;

        event.preventDefault();
        handleImageFile(file);
        return true;
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL du lien :', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    if (onImageUpload) {
      imageInputRef.current?.click();
    } else {
      const url = window.prompt('URL de l\'image :');
      if (url) editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleImageFile(file);
    e.target.value = '';
  };

  // Block types for the inserter
  const blockTypes: BlockType[] = [
    {
      id: 'paragraph',
      label: 'Paragraphe',
      icon: Type,
      category: 'Texte',
      description: 'Bloc de texte simple',
      action: (ed) => ed.chain().focus().setParagraph().run(),
    },
    {
      id: 'h1',
      label: 'Titre 1',
      icon: Heading1,
      category: 'Texte',
      description: 'Titre principal',
      action: (ed) => ed.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      id: 'h2',
      label: 'Titre 2',
      icon: Heading2,
      category: 'Texte',
      description: 'Titre secondaire',
      action: (ed) => ed.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      id: 'h3',
      label: 'Titre 3',
      icon: Heading3,
      category: 'Texte',
      description: 'Sous-titre',
      action: (ed) => ed.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      id: 'bullet-list',
      label: 'Liste à puces',
      icon: List,
      category: 'Texte',
      description: 'Liste non ordonnée',
      action: (ed) => ed.chain().focus().toggleBulletList().run(),
    },
    {
      id: 'ordered-list',
      label: 'Liste numérotée',
      icon: ListOrdered,
      category: 'Texte',
      description: 'Liste ordonnée',
      action: (ed) => ed.chain().focus().toggleOrderedList().run(),
    },
    {
      id: 'blockquote',
      label: 'Citation',
      icon: Quote,
      category: 'Texte',
      description: 'Bloc de citation',
      action: (ed) => ed.chain().focus().toggleBlockquote().run(),
    },
    {
      id: 'code-block',
      label: 'Bloc de code',
      icon: SquareCode,
      category: 'Texte',
      description: 'Code source formaté',
      action: (ed) => ed.chain().focus().toggleCodeBlock().run(),
    },
    {
      id: 'image',
      label: 'Image',
      icon: ImageIcon,
      category: 'Média',
      description: 'Insérer une image',
      action: () => addImage(),
    },
    {
      id: 'separator',
      label: 'Séparateur',
      icon: SeparatorHorizontal,
      category: 'Mise en page',
      description: 'Ligne de séparation',
      action: (ed) => ed.chain().focus().setHorizontalRule().run(),
    },
    {
      id: 'table-2col',
      label: '2 colonnes',
      icon: Columns2,
      category: 'Mise en page',
      description: 'Tableau à 2 colonnes pour mise en page',
      action: (ed) => ed.chain().focus().insertTable({ rows: 1, cols: 2, withHeaderRow: false }).run(),
    },
    {
      id: 'table-3col',
      label: '3 colonnes',
      icon: Columns3,
      category: 'Mise en page',
      description: 'Tableau à 3 colonnes pour mise en page',
      action: (ed) => ed.chain().focus().insertTable({ rows: 1, cols: 3, withHeaderRow: false }).run(),
    },
    {
      id: 'table',
      label: 'Tableau',
      icon: TableIcon,
      category: 'Mise en page',
      description: 'Tableau avec en-tête',
      action: (ed) => ed.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      id: 'callout-info',
      label: 'Info',
      icon: Info,
      category: 'Encadrés',
      description: 'Encadré informatif bleu',
      action: (ed) => {
        ed.chain().focus().insertContent(
          '<blockquote><p><strong>&#8505;&#65039; Information</strong></p><p>Votre texte informatif ici...</p></blockquote>'
        ).run();
      },
    },
    {
      id: 'callout-warning',
      label: 'Attention',
      icon: AlertTriangle,
      category: 'Encadrés',
      description: 'Encadré d\'avertissement',
      action: (ed) => {
        ed.chain().focus().insertContent(
          '<blockquote><p><strong>&#9888;&#65039; Attention</strong></p><p>Votre avertissement ici...</p></blockquote>'
        ).run();
      },
    },
    {
      id: 'callout-success',
      label: 'Succès',
      icon: CheckCircle2,
      category: 'Encadrés',
      description: 'Encadré de succès vert',
      action: (ed) => {
        ed.chain().focus().insertContent(
          '<blockquote><p><strong>&#9989; Bon à savoir</strong></p><p>Votre conseil ici...</p></blockquote>'
        ).run();
      },
    },
    {
      id: 'callout-tip',
      label: 'Astuce',
      icon: Sparkles,
      category: 'Encadrés',
      description: 'Encadré astuce',
      action: (ed) => {
        ed.chain().focus().insertContent(
          '<blockquote><p><strong>&#128161; Astuce</strong></p><p>Votre astuce ici...</p></blockquote>'
        ).run();
      },
    },
    {
      id: 'cta-button',
      label: 'Bouton CTA',
      icon: PanelTopClose,
      category: 'Interactif',
      description: 'Bouton d\'appel à l\'action',
      action: (ed) => {
        ed.chain().focus().insertContent(
          '<p style="text-align: center"><a href="https://yojob.fr" target="_blank" rel="noopener noreferrer"><strong>Demander un devis gratuit</strong></a></p>'
        ).run();
      },
    },
  ];

  const categories = [...new Set(blockTypes.map((b) => b.category))];

  const ToolbarButton = ({
    onClick,
    isActive,
    children,
    title,
    disabled,
    className: btnClassName,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
    disabled?: boolean;
    className?: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`h-8 w-8 p-0 rounded-md transition-all ${
        isActive
          ? 'bg-blue-100 text-blue-700 shadow-sm'
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${btnClassName || ''}`}
    >
      {children}
    </Button>
  );

  const Separator = () => <div className="w-px h-6 bg-slate-200 mx-0.5" />;

  const DropdownWrapper = ({
    show,
    onClose,
    children,
  }: {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) => {
    if (!show) return null;
    return (
      <>
        <div className="fixed inset-0 z-40" onClick={onClose} />
        <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-xl shadow-xl border border-slate-200 p-2 min-w-[200px]">
          {children}
        </div>
      </>
    );
  };

  return (
    <div className={`border rounded-xl overflow-hidden bg-white shadow-sm transition-all ${dragOverEditor ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}>
      {/* Main Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-slate-100 bg-slate-50/80">
        {/* Block inserter button */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              setShowBlockInserter(!showBlockInserter);
              setShowColorPicker(false);
              setShowHighlightPicker(false);
            }}
            isActive={showBlockInserter}
            title="Insérer un bloc"
            className="bg-blue-50 hover:bg-blue-100 text-blue-600"
          >
            <Plus className="w-4 h-4" />
          </ToolbarButton>

          {/* Block Inserter Panel */}
          <DropdownWrapper show={showBlockInserter} onClose={() => setShowBlockInserter(false)}>
            <div className="w-72 max-h-96 overflow-auto">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-100 mb-2">
                <span className="text-sm font-semibold text-slate-700">Insérer un bloc</span>
                <button onClick={() => setShowBlockInserter(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="mb-2">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-2 mb-1">{cat}</p>
                  {blockTypes
                    .filter((b) => b.category === cat)
                    .map((block) => (
                      <button
                        key={block.id}
                        onClick={() => {
                          block.action(editor);
                          setShowBlockInserter(false);
                        }}
                        className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <block.icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{block.label}</p>
                          <p className="text-[11px] text-slate-400 truncate">{block.description}</p>
                        </div>
                      </button>
                    ))}
                </div>
              ))}
            </div>
          </DropdownWrapper>
        </div>

        <Separator />

        {/* Text formatting */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Gras (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italique (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Souligné (Ctrl+U)">
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Barré">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Code inline">
          <Code className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive('superscript')} title="Exposant">
          <SuperscriptIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive('subscript')} title="Indice">
          <SubscriptIcon className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Color picker */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowHighlightPicker(false);
              setShowBlockInserter(false);
            }}
            isActive={showColorPicker}
            title="Couleur du texte"
          >
            <div className="flex flex-col items-center">
              <Palette className="w-3.5 h-3.5" />
              <div
                className="w-3.5 h-0.5 rounded-full mt-0.5"
                style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000' }}
              />
            </div>
          </ToolbarButton>
          <DropdownWrapper show={showColorPicker} onClose={() => setShowColorPicker(false)}>
            <div className="p-2">
              <p className="text-xs font-medium text-slate-500 mb-2">Couleur du texte</p>
              <div className="grid grid-cols-6 gap-1.5">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColorPicker(false);
                    }}
                    className="w-6 h-6 rounded-md border border-slate-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setShowColorPicker(false);
                }}
                className="mt-2 text-xs text-slate-500 hover:text-slate-700 w-full text-center py-1 rounded hover:bg-slate-50"
              >
                Supprimer la couleur
              </button>
            </div>
          </DropdownWrapper>
        </div>

        {/* Highlight picker */}
        <div className="relative">
          <ToolbarButton
            onClick={() => {
              setShowHighlightPicker(!showHighlightPicker);
              setShowColorPicker(false);
              setShowBlockInserter(false);
            }}
            isActive={showHighlightPicker || editor.isActive('highlight')}
            title="Surligner"
          >
            <Highlighter className="w-4 h-4" />
          </ToolbarButton>
          <DropdownWrapper show={showHighlightPicker} onClose={() => setShowHighlightPicker(false)}>
            <div className="p-2">
              <p className="text-xs font-medium text-slate-500 mb-2">Surlignage</p>
              <div className="grid grid-cols-5 gap-1.5">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color }).run();
                      setShowHighlightPicker(false);
                    }}
                    className="w-6 h-6 rounded-md border border-slate-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setShowHighlightPicker(false);
                }}
                className="mt-2 text-xs text-slate-500 hover:text-slate-700 w-full text-center py-1 rounded hover:bg-slate-50"
              >
                Supprimer le surlignage
              </button>
            </div>
          </DropdownWrapper>
        </div>

        <Separator />

        {/* Headings */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Titre 1">
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Titre 2">
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Titre 3">
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Lists & Quote */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Liste à puces">
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Liste numérotée">
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Citation">
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Bloc de code">
          <SquareCode className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Séparateur">
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Gauche">
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Centrer">
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Droite">
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justifier">
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>

        <Separator />

        {/* Table controls */}
        <ToolbarButton
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insérer un tableau"
        >
          <TableIcon className="w-4 h-4" />
        </ToolbarButton>

        {/* Show table controls when inside a table */}
        {editor.isActive('table') && (
          <>
            <ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()} title="Ajouter une ligne">
              <RowsIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()} title="Ajouter une colonne">
              <ColumnsIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteRow().run()} title="Supprimer la ligne">
              <Minus className="w-4 h-4 text-red-500" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} title="Supprimer le tableau">
              <Trash2 className="w-4 h-4 text-red-500" />
            </ToolbarButton>
          </>
        )}

        <Separator />

        {/* Media */}
        <ToolbarButton onClick={addLink} isActive={editor.isActive('link')} title="Lien">
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} disabled={uploading} title={onImageUpload ? 'Insérer une image (upload)' : 'Insérer une image (URL)'}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        </ToolbarButton>

        <div className="flex-1" />

        {/* Undo/Redo */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Annuler (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Refaire (Ctrl+Y)">
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Upload indicator */}
      {uploading && (
        <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 border-b border-blue-100 text-xs text-blue-600">
          <Loader2 className="w-3 h-3 animate-spin" />
          Upload de l'image en cours...
        </div>
      )}

      {/* Editor area with drag & drop support */}
      <div
        onDragOver={(e) => {
          if (onImageUpload && e.dataTransfer.types.includes('Files')) {
            e.preventDefault();
            setDragOverEditor(true);
          }
        }}
        onDragLeave={() => setDragOverEditor(false)}
        onDrop={() => setDragOverEditor(false)}
        className="relative"
      >
        {dragOverEditor && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-50/80 border-2 border-dashed border-blue-300 rounded-b-xl pointer-events-none">
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <Upload className="w-5 h-5" />
              Déposez votre image ici
            </div>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {/* Hidden file input */}
      {onImageUpload && (
        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleImageInput}
        />
      )}

      {/* Word count footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-400">
        <span>
          {editor.storage.characterCount?.characters?.() ?? editor.getText().length} caractères
        </span>
        <span>
          ~{Math.max(1, Math.ceil(editor.getText().split(/\s+/).filter(Boolean).length / 200))} min de lecture
        </span>
      </div>
    </div>
  );
}
